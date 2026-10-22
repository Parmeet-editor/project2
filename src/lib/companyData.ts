/**
 * Company Data Layer & Normalizers
 * Phase 1: Pure normalizers accepting raw short_json and full_json
 * Swappable to Supabase rows in Phase 2 with zero schema change
 */

export interface CompanySummary {
  id: number;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_type: 'Super Dream' | 'Dream' | 'Standard' | 'Regular';
  incorporation_year: string;
  employee_size: string;
  headquarters_address: string;
  operating_countries: string[];
  office_locations: string[];
  yoy_growth_rate: string;
  website_url: string;
}

export interface CompanyProfile {
  id: number;
  name: string;
  short_name: string;
  category: string;
  company_type: 'Super Dream' | 'Dream' | 'Standard' | 'Regular';
  logo_url: string;
  website_url: string;
  linkedin_url: string;
  twitter_handle: string;
  facebook_url: string;
  instagram_url: string;
  primary_contact_email: string;
  primary_phone_number: string;
  fields: Record<string, string>;
}

export interface DashboardSkill {
  skill_set_id: number;
  skill_set_name: string;
  required_level: number;
  required_proficiency: string;
  bloom_code: 'CU' | 'AP' | 'AS' | 'EV' | 'CR';
  bloom_label: string;
  bloom_color: string;
  criticality: 'Critical' | 'Important' | 'Baseline';
  difficulty: 'EXPERT' | 'ADVANCED' | 'PRO' | 'BEGINNER';
}

export const CATEGORY_COLORS: Record<string, string> = {
  'Super Dream': '#7c3aed',
  Dream: '#2563eb',
  Standard: '#16a34a',
  Regular: '#d97706',
};

export const BLOOM_COLORS: Record<string, string> = {
  CU: '#3b82f6',
  AP: '#22c55e',
  AS: '#eab308',
  EV: '#ef4444',
  CR: '#a855f7',
};

export const BLOOM_NAMES: Record<string, string> = {
  CU: 'Conceptual Understanding',
  AP: 'Application & Execution',
  AS: 'Analysis & Synthesis',
  EV: 'Evaluation & Optimization',
  CR: 'Creation & Architecture',
};

// Helper: asString
export function asString(val: unknown, fallback = ''): string {
  if (val === null || val === undefined) return fallback;
  const s = String(val).trim();
  return s;
}

// Helper: asRecord
export function asRecord(val: unknown): Record<string, unknown> {
  if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
    return val as Record<string, unknown>;
  }
  return {};
}

// Helper: splitItems (split on newlines, periods, semicolons, bullets)
export function splitItems(val: string): string[] {
  if (!val) return [];
  return val
    .split(/[\n;•\r]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0 && !isNullish(item));
}

// Helper: isNullish - matches na/n/a/none/-/null/undefined
export function isNullish(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  const s = String(val).trim().toLowerCase();
  return (
    s === '' ||
    s === 'na' ||
    s === 'n/a' ||
    s === 'none' ||
    s === '-' ||
    s === 'null' ||
    s === 'undefined' ||
    s === 'not applicable' ||
    s === 'not available'
  );
}

// Helper: titleCaseFromCode
export function titleCaseFromCode(code: string): string {
  return code
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Helper: scoreToDifficulty
export function scoreToDifficulty(score: number): 'EXPERT' | 'ADVANCED' | 'PRO' | 'BEGINNER' {
  if (score >= 8) return 'EXPERT';
  if (score >= 6) return 'ADVANCED';
  if (score >= 4) return 'PRO';
  return 'BEGINNER';
}

// Helper: proficiencyToBloom
export function proficiencyToBloom(level: number): 'CU' | 'AP' | 'AS' | 'EV' | 'CR' {
  if (level <= 2) return 'CU';
  if (level <= 4) return 'AP';
  if (level <= 6) return 'AS';
  if (level <= 8) return 'EV';
  return 'CR';
}

// Helper: scoreToCriticality
export function scoreToCriticality(score: number): 'Critical' | 'Important' | 'Baseline' {
  if (score >= 7) return 'Critical';
  if (score >= 5) return 'Important';
  return 'Baseline';
}

/**
 * Normalizes short_json into CompanySummary
 */
export function normalizeCompanySummary(rawShort: Record<string, unknown>, companyId = 1): CompanySummary {
  const short = asRecord(rawShort);
  const rawType = asString(short.company_type, 'Dream');
  const company_type: 'Super Dream' | 'Dream' | 'Standard' | 'Regular' =
    rawType === 'Super Dream' || rawType === 'Standard' || rawType === 'Regular'
      ? rawType
      : 'Dream';

  return {
    id: companyId,
    name: asString(short.name, 'Unknown Enterprise'),
    short_name: asString(short.short_name, asString(short.name, 'Enterprise')),
    logo_url: asString(short.logo_url),
    category: asString(short.category, 'Enterprise'),
    company_type,
    incorporation_year: asString(short.incorporation_year, '1989'),
    employee_size: asString(short.employee_size, '10,000+ employees'),
    headquarters_address: asString(short.headquarters_address, 'Global'),
    operating_countries: splitItems(asString(short.operating_countries)),
    office_locations: splitItems(asString(short.office_locations)),
    yoy_growth_rate: asString(short.yoy_growth_rate, '0%'),
    website_url: asString(short.website_url, '#'),
  };
}

/**
 * Normalizes full_json and short_json into CompanyProfile
 * STRICT RULE: Strips out any CTC, Stipend, or Selection Ratio fields
 */
export function normalizeCompanyProfile(
  rawFull: Record<string, unknown>,
  rawShort: Record<string, unknown>,
  companyId = 1
): CompanyProfile {
  const full = asRecord(rawFull);
  const short = asRecord(rawShort);

  const rawType = asString(short.company_type || full.company_type, 'Dream');
  const company_type: 'Super Dream' | 'Dream' | 'Standard' | 'Regular' =
    rawType === 'Super Dream' || rawType === 'Standard' || rawType === 'Regular'
      ? rawType
      : 'Dream';

  const fields: Record<string, string> = {};

  // Copy allowed fields only, excluding ctc, stipend, selection ratio
  const forbiddenKeywords = ['ctc', 'stipend', 'selection_ratio', 'selection ratio', 'package'];

  for (const [k, v] of Object.entries(full)) {
    const lowerKey = k.toLowerCase();
    if (forbiddenKeywords.some((forbidden) => lowerKey.includes(forbidden))) {
      continue;
    }
    fields[k] = asString(v);
  }

  return {
    id: companyId,
    name: asString(full.name || short.name, 'Enterprise'),
    short_name: asString(full.short_name || short.short_name, 'Enterprise'),
    category: asString(full.category || short.category, 'Enterprise'),
    company_type,
    logo_url: asString(short.logo_url || full.logo_url),
    website_url: asString(full.website_url || short.website_url, '#'),
    linkedin_url: asString(full.linkedin_url),
    twitter_handle: asString(full.twitter_handle),
    facebook_url: asString(full.facebook_url),
    instagram_url: asString(full.instagram_url),
    primary_contact_email: asString(full.primary_contact_email),
    primary_phone_number: asString(full.primary_phone_number),
    fields,
  };
}

/**
 * Normalizes skill_levels array into DashboardSkill[]
 */
export function normalizeDashboardSkills(
  skills: Array<{
    skill_set_id: number;
    skill_set_name: string;
    required_level: number;
    required_proficiency: string;
  }>
): DashboardSkill[] {
  if (!Array.isArray(skills)) return [];

  return skills.map((s) => {
    const level = Number(s.required_level) || 5;
    const bloom = proficiencyToBloom(level);
    return {
      skill_set_id: s.skill_set_id,
      skill_set_name: s.skill_set_name,
      required_level: level,
      required_proficiency: s.required_proficiency || 'Proficient',
      bloom_code: bloom,
      bloom_label: BLOOM_NAMES[bloom],
      bloom_color: BLOOM_COLORS[bloom],
      criticality: scoreToCriticality(level),
      difficulty: scoreToDifficulty(level),
    };
  });
}
