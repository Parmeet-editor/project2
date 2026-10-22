import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import {
  CompanySummary,
  CompanyProfile,
  DashboardSkill,
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  proficiencyToBloom,
} from './companyData';
import { SEED_COMPANIES } from '@/src/data/seedCompanies';
import { SKILL_TOPICS_MAP, SkillTopicLevel } from '@/src/data/skillTopics';

export interface CompanySkillsData {
  skills: DashboardSkill[];
  topicsMap: Record<number, SkillTopicLevel[]>;
}

/**
 * Hook 1: useCompanies
 * SELECT company_id, short_json FROM company_json
 * Maps each row through normalizeCompanySummary(short_json)
 */
export function useCompanies() {
  return useQuery<CompanySummary[]>({
    queryKey: ['companies'],
    queryFn: async () => {
      // If Supabase is unconfigured, return seed companies immediately
      if (!isSupabaseConfigured || !supabase) {
        return SEED_COMPANIES.map((c) =>
          normalizeCompanySummary(c.short_json, c.company_id)
        );
      }

      try {
        const { data, error } = await supabase
          .from('company_json')
          .select('company_id, short_json')
          .order('company_id', { ascending: true });

        if (error) {
          console.warn('Error fetching from company_json, falling back to seed data:', error.message);
          return SEED_COMPANIES.map((c) =>
            normalizeCompanySummary(c.short_json, c.company_id)
          );
        }

        if (!data || data.length === 0) {
          return SEED_COMPANIES.map((c) =>
            normalizeCompanySummary(c.short_json, c.company_id)
          );
        }

        return data.map((row) =>
          normalizeCompanySummary(row.short_json, row.company_id)
        );
      } catch (err) {
        console.warn('Exception querying company_json:', err);
        return SEED_COMPANIES.map((c) =>
          normalizeCompanySummary(c.short_json, c.company_id)
        );
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook 2: useCompanyProfile(id)
 * SELECT company_id, short_json, full_json FROM company_json WHERE company_id = :id
 * Maps through normalizeCompanyProfile(full_json, short_json)
 */
export function useCompanyProfile(id: number | null | undefined) {
  const companyId = id ?? 1;

  return useQuery<CompanyProfile | null>({
    queryKey: ['companyProfile', companyId],
    queryFn: async () => {
      // Fallback helper
      const getSeedProfile = () => {
        const match =
          SEED_COMPANIES.find((c) => c.company_id === companyId) ||
          SEED_COMPANIES[0];
        return match
          ? normalizeCompanyProfile(match.full_json, match.short_json, match.company_id)
          : null;
      };

      if (!isSupabaseConfigured || !supabase) {
        return getSeedProfile();
      }

      try {
        const { data, error } = await supabase
          .from('company_json')
          .select('company_id, short_json, full_json')
          .eq('company_id', companyId)
          .maybeSingle();

        if (error) {
          console.warn(`Error fetching profile for company_id ${companyId}:`, error.message);
          return getSeedProfile();
        }

        if (!data) {
          return getSeedProfile();
        }

        return normalizeCompanyProfile(data.full_json, data.short_json, data.company_id);
      } catch (err) {
        console.warn(`Exception fetching company profile ${companyId}:`, err);
        return getSeedProfile();
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook 3: useCompanySkills(id)
 * Queries the 4 specified skill tables:
 * - company_skill_levels
 * - skill_set_master
 * - proficiency_levels
 * - skill_set_topics
 * Assembles and maps through normalizeDashboardSkills(...) and topic ladder shape
 */
export function useCompanySkills(id: number | null | undefined) {
  const companyId = id ?? 1;

  return useQuery<CompanySkillsData>({
    queryKey: ['companySkills', companyId],
    queryFn: async () => {
      const getSeedSkills = (): CompanySkillsData => {
        const match =
          SEED_COMPANIES.find((c) => c.company_id === companyId) ||
          SEED_COMPANIES[0];
        return {
          skills: normalizeDashboardSkills(match.skill_levels || []),
          topicsMap: SKILL_TOPICS_MAP,
        };
      };

      if (!isSupabaseConfigured || !supabase) {
        return getSeedSkills();
      }

      try {
        // Run queries on the 4 skill tables in parallel
        const [levelsRes, masterRes, profRes, topicsRes] = await Promise.all([
          supabase
            .from('company_skill_levels')
            .select('company_id, skill_set_id, required_level, required_proficiency_level_id')
            .eq('company_id', companyId),
          supabase
            .from('skill_set_master')
            .select('skill_set_id, skill_set_name, short_name'),
          supabase
            .from('proficiency_levels')
            .select('proficiency_level_id, proficiency_name, proficiency_code'),
          supabase
            .from('skill_set_topics')
            .select('skill_set_id, level_number, topics')
            .order('level_number', { ascending: true }),
        ]);

        if (levelsRes.error || !levelsRes.data || levelsRes.data.length === 0) {
          console.warn('company_skill_levels query fallback:', levelsRes.error?.message);
          return getSeedSkills();
        }

        // Build lookup maps
        const masterMap = new Map<number, string>();
        if (masterRes.data) {
          masterRes.data.forEach((m) => {
            masterMap.set(m.skill_set_id, m.skill_set_name || m.short_name || `Skill ${m.skill_set_id}`);
          });
        }

        const profMap = new Map<number, string>();
        if (profRes.data) {
          profRes.data.forEach((p) => {
            profMap.set(p.proficiency_level_id, p.proficiency_name || 'Proficient');
          });
        }

        // Assemble skill levels
        const assembledLevels = levelsRes.data.map((row) => ({
          skill_set_id: row.skill_set_id,
          skill_set_name: masterMap.get(row.skill_set_id) || `Skill #${row.skill_set_id}`,
          required_level: Number(row.required_level) || 5,
          required_proficiency: profMap.get(row.required_proficiency_level_id) || 'Proficient',
        }));

        const normalizedSkills = normalizeDashboardSkills(assembledLevels);

        // Build topic roadmap map: skill_set_id -> 10 levels
        const assembledTopicsMap: Record<number, SkillTopicLevel[]> = {};

        if (topicsRes.data && topicsRes.data.length > 0) {
          topicsRes.data.forEach((t) => {
            const sid = t.skill_set_id;
            const lvl = Number(t.level_number) || 1;
            const bloom = proficiencyToBloom(lvl);
            const rawTopicStr = String(t.topics || '').trim();

            let title = rawTopicStr || `Level ${lvl} Topics`;
            let summary = `Level ${lvl} competency target`;

            if (rawTopicStr.includes(':')) {
              const parts = rawTopicStr.split(':');
              title = parts[0].trim();
              summary = parts.slice(1).join(':').trim();
            } else if (rawTopicStr.includes('—')) {
              const parts = rawTopicStr.split('—');
              title = parts[0].trim();
              summary = parts.slice(1).join('—').trim();
            } else if (rawTopicStr.includes('-')) {
              const parts = rawTopicStr.split('-');
              title = parts[0].trim();
              summary = parts.slice(1).join('-').trim();
            }

            if (!assembledTopicsMap[sid]) {
              assembledTopicsMap[sid] = [];
            }

            assembledTopicsMap[sid].push({
              level: lvl,
              title,
              bloomCode: bloom,
              summary,
            });
          });

          // Sort each topic array by level_number
          Object.keys(assembledTopicsMap).forEach((key) => {
            const numKey = Number(key);
            assembledTopicsMap[numKey].sort((a, b) => a.level - b.level);
          });
        }

        // Merge with existing fallback topic ladders if any skill lacks topics from the DB
        normalizedSkills.forEach((s) => {
          if (!assembledTopicsMap[s.skill_set_id] || assembledTopicsMap[s.skill_set_id].length === 0) {
            assembledTopicsMap[s.skill_set_id] = SKILL_TOPICS_MAP[s.skill_set_id] || [];
          }
        });

        return {
          skills: normalizedSkills,
          topicsMap: assembledTopicsMap,
        };
      } catch (err) {
        console.warn('Exception querying skill tables:', err);
        return getSeedSkills();
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
