import { describe, it, expect } from 'vitest';
import { SEED_COMPANIES } from './data/seedCompanies';
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  proficiencyToBloom,
  scoreToCriticality,
} from './lib/companyData';
import { SKILL_TOPICS_MAP } from './data/skillTopics';
import { buildIntelligenceSections } from './data/intelligenceData';
import { isSupabaseConfigured, supabase } from './lib/supabaseClient';

describe('Portal Smoke Test Suite', () => {
  it('loads the seed company Accenture successfully', () => {
    expect(SEED_COMPANIES.length).toBeGreaterThanOrEqual(1);
    const accenture = SEED_COMPANIES[0];
    expect(accenture.short_json.name).toBe('Accenture plc');
    expect(accenture.short_json.company_type).toBe('Dream');
  });

  it('normalizes summary and profile correctly', () => {
    const raw = SEED_COMPANIES[0];
    const summary = normalizeCompanySummary(raw.short_json, raw.company_id);
    const profile = normalizeCompanyProfile(raw.full_json, raw.short_json, raw.company_id);

    expect(summary.name).toBe('Accenture plc');
    expect(summary.company_type).toBe('Dream');
    expect(profile.name).toBe('Accenture plc');

    // HARD CONSTRAINT: Verify CTC, Stipend, and Selection Ratio are strictly absent
    const allFieldKeys = Object.keys(profile.fields).map((k) => k.toLowerCase());
    expect(allFieldKeys.some((k) => k.includes('ctc'))).toBe(false);
    expect(allFieldKeys.some((k) => k.includes('stipend'))).toBe(false);
    expect(allFieldKeys.some((k) => k.includes('selection_ratio'))).toBe(false);
  });

  it('normalizes 12 skills and verifies 10-level roadmaps', () => {
    const raw = SEED_COMPANIES[0];
    const skills = normalizeDashboardSkills(raw.skill_levels);
    expect(skills.length).toBe(12);

    skills.forEach((s) => {
      expect(s.required_level).toBeGreaterThanOrEqual(1);
      expect(s.required_level).toBeLessThanOrEqual(10);

      // Verify Bloom calculation
      const expectedBloom = proficiencyToBloom(s.required_level);
      expect(s.bloom_code).toBe(expectedBloom);

      // Verify Criticality calculation
      const expectedCrit = scoreToCriticality(s.required_level);
      expect(s.criticality).toBe(expectedCrit);

      // Verify 10-level roadmap exists
      const topics = SKILL_TOPICS_MAP[s.skill_set_id];
      expect(topics).toBeDefined();
      expect(topics.length).toBe(10);
    });
  });

  it('builds all 22 intelligence sections', () => {
    const raw = SEED_COMPANIES[0];
    const profile = normalizeCompanyProfile(raw.full_json, raw.short_json, raw.company_id);
    const sections = buildIntelligenceSections(profile);

    expect(sections.length).toBe(22);
    expect(sections[0].title).toBe('Company Identity');
    expect(sections[21].title).toBe('Contact Information');
  });

  it('gracefully evaluates Supabase client configuration', () => {
    // When placeholders are empty, client handles gracefully without throwing
    expect(typeof isSupabaseConfigured).toBe('boolean');
    if (!isSupabaseConfigured) {
      expect(supabase).toBeNull();
    }
  });
});
