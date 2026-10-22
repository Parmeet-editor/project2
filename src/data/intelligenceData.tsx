import React from 'react';
import {
  Building2,
  Compass,
  Users2,
  DollarSign,
  Globe2,
  Boxes,
  Cpu,
  Handshake,
  Swords,
  TrendingUp,
  Award,
  HeartHandshake,
  Newspaper,
  BarChart3,
  ShieldAlert,
  MapPin,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Gift,
  Share2,
  Mail,
} from 'lucide-react';
import { CompanyProfile } from '@/src/lib/companyData';

export type FieldDisplayType = 'text' | 'paragraph' | 'pills' | 'url' | 'video' | 'rating' | 'email';

export interface IntelligenceField {
  key: string;
  label: string;
  type?: FieldDisplayType;
  value?: string;
}

export interface IntelligenceSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  fields: IntelligenceField[];
}

export function buildIntelligenceSections(profile?: CompanyProfile): IntelligenceSection[] {
  const f = profile?.fields || {};

  const getVal = (key: string, directProp?: string): string => {
    if (directProp) return directProp;
    return f[key] || '';
  };

  const sections: IntelligenceSection[] = [
    {
      id: 'section-identity',
      title: 'Company Identity',
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      fields: [
        { key: 'name', label: 'Company Name', value: getVal('name', profile?.name) },
        { key: 'short_name', label: 'Short Name / Ticker', value: getVal('short_name', profile?.short_name) },
        { key: 'category', label: 'Enterprise Category', value: getVal('category', profile?.category) },
        { key: 'company_type', label: 'Placement Tier', value: getVal('company_type', profile?.company_type) },
        { key: 'nature_of_company', label: 'Company Structure', value: getVal('nature_of_company') },
        { key: 'incorporation_year', label: 'Year Established', value: getVal('incorporation_year') },
      ],
    },
    {
      id: 'section-overview',
      title: 'Overview & Vision',
      icon: <Compass className="w-5 h-5 text-indigo-600" />,
      fields: [
        { key: 'overview_text', label: 'Executive Overview', type: 'paragraph', value: getVal('overview_text') },
        { key: 'vision_statement', label: 'Vision Statement', type: 'paragraph', value: getVal('vision_statement') },
        { key: 'mission_statement', label: 'Mission Statement', type: 'paragraph', value: getVal('mission_statement') },
        { key: 'core_values', label: 'Core Values & Principles', type: 'pills', value: getVal('core_values') },
        { key: 'history_timeline', label: 'History & Milestones', type: 'paragraph', value: getVal('history_timeline') },
      ],
    },
    {
      id: 'section-leadership',
      title: 'Leadership',
      icon: <Users2 className="w-5 h-5 text-sky-600" />,
      fields: [
        { key: 'ceo_name', label: 'Chief Executive Officer', value: getVal('ceo_name') },
        { key: 'ceo_linkedin_url', label: 'CEO LinkedIn Profile', type: 'url', value: getVal('ceo_linkedin_url') },
        { key: 'key_leaders', label: 'Key Executive Leadership', type: 'pills', value: getVal('key_leaders') },
        { key: 'board_members', label: 'Board of Directors', type: 'pills', value: getVal('board_members') },
        { key: 'decision_maker_access', label: 'Decision-Maker Access', value: getVal('decision_maker_access') },
        { key: 'warm_intro_pathways', label: 'Warm Intro & Networking Pathways', type: 'pills', value: getVal('warm_intro_pathways') },
      ],
    },
    {
      id: 'section-funding',
      title: 'Funding & Financials',
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      fields: [
        { key: 'annual_revenue', label: 'Annual Revenue (FY)', value: getVal('annual_revenue') },
        { key: 'annual_profit', label: 'Net Annual Profit', value: getVal('annual_profit') },
        { key: 'revenue_mix', label: 'Revenue Streams & Mix', type: 'pills', value: getVal('revenue_mix') },
        { key: 'valuation', label: 'Market Valuation / Cap', value: getVal('valuation') },
        { key: 'yoy_growth_rate', label: 'YoY Growth Rate', value: getVal('yoy_growth_rate') },
        { key: 'profitability_status', label: 'Profitability Status', value: getVal('profitability_status') },
        { key: 'key_investors', label: 'Major Institutional Investors', type: 'pills', value: getVal('key_investors') },
        { key: 'recent_funding_rounds', label: 'Funding Stage / Rounds', value: getVal('recent_funding_rounds') },
        { key: 'total_capital_raised', label: 'Total Capital Raised', value: getVal('total_capital_raised') },
      ],
    },
    {
      id: 'section-global',
      title: 'Global Presence',
      icon: <Globe2 className="w-5 h-5 text-blue-700" />,
      fields: [
        { key: 'headquarters_address', label: 'Headquarters Location', value: getVal('headquarters_address') },
        { key: 'operating_countries', label: 'Operating Countries', type: 'pills', value: getVal('operating_countries') },
        { key: 'office_count', label: 'Total Offices Worldwide', value: getVal('office_count') },
        { key: 'office_locations', label: 'Key Office Hubs', type: 'pills', value: getVal('office_locations') },
        { key: 'employee_size', label: 'Global Workforce Size', value: getVal('employee_size') },
      ],
    },
    {
      id: 'section-products',
      title: 'Products & Services',
      icon: <Boxes className="w-5 h-5 text-violet-600" />,
      fields: [
        { key: 'offerings_description', label: 'Core Offerings & Service Lines', type: 'pills', value: getVal('offerings_description') },
        { key: 'focus_sectors', label: 'Focus Industry Sectors', type: 'pills', value: getVal('focus_sectors') },
        { key: 'pain_points_addressed', label: 'Client Pain Points Solved', type: 'pills', value: getVal('pain_points_addressed') },
        { key: 'top_customers', label: 'Key Enterprise Client Segments', type: 'pills', value: getVal('top_customers') },
        { key: 'product_pipeline', label: 'Product & Service Pipeline', type: 'pills', value: getVal('product_pipeline') },
      ],
    },
    {
      id: 'section-tech',
      title: 'Technology Stack',
      icon: <Cpu className="w-5 h-5 text-teal-600" />,
      fields: [
        { key: 'tech_stack', label: 'Primary Technologies & Tooling', type: 'pills', value: getVal('tech_stack') },
        { key: 'ai_ml_adoption_level', label: 'AI & ML Adoption Level', type: 'paragraph', value: getVal('ai_ml_adoption_level') },
        { key: 'tech_adoption_rating', label: 'Tech Stack Maturity', value: getVal('tech_adoption_rating') },
        { key: 'r_and_d_investment', label: 'Annual R&D Investment', value: getVal('r_and_d_investment') },
        { key: 'intellectual_property', label: 'Proprietary IP & Accelerators', type: 'pills', value: getVal('intellectual_property') },
        { key: 'cybersecurity_posture', label: 'Security & Compliance Certifications', type: 'pills', value: getVal('cybersecurity_posture') },
      ],
    },
    {
      id: 'section-partnerships',
      title: 'Partnerships & Ecosystem',
      icon: <Handshake className="w-5 h-5 text-cyan-600" />,
      fields: [
        { key: 'technology_partners', label: 'Strategic Cloud & Tech Partners', type: 'pills', value: getVal('technology_partners') },
        { key: 'partnership_ecosystem', label: 'Alliances & Ecosystem', type: 'pills', value: getVal('partnership_ecosystem') },
        { key: 'industry_associations', label: 'Industry Alliances & Forums', type: 'pills', value: getVal('industry_associations') },
      ],
    },
    {
      id: 'section-competitors',
      title: 'Competitive Landscape',
      icon: <Swords className="w-5 h-5 text-rose-600" />,
      fields: [
        { key: 'key_competitors', label: 'Primary Market Competitors', type: 'pills', value: getVal('key_competitors') },
        { key: 'market_share_percentage', label: 'Estimated Global Market Share', value: getVal('market_share_percentage') },
        { key: 'benchmark_vs_peers', label: 'Performance Benchmark vs Peers', type: 'paragraph', value: getVal('benchmark_vs_peers') },
        { key: 'weaknesses_gaps', label: 'Structural Vulnerabilities / Gaps', type: 'pills', value: getVal('weaknesses_gaps') },
        { key: 'key_challenges_needs', label: 'Current Operational Challenges', type: 'pills', value: getVal('key_challenges_needs') },
      ],
    },
    {
      id: 'section-market',
      title: 'Market Opportunity',
      icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
      fields: [
        { key: 'tam', label: 'Total Addressable Market (TAM)', value: getVal('tam') },
        { key: 'sam', label: 'Serviceable Available Market (SAM)', value: getVal('sam') },
        { key: 'som', label: 'Serviceable Obtainable Market (SOM)', value: getVal('som') },
        { key: 'future_projections', label: 'Strategic Revenue Projections', value: getVal('future_projections') },
        { key: 'strategic_priorities', label: 'Strategic Expansion Priorities', type: 'pills', value: getVal('strategic_priorities') },
      ],
    },
    {
      id: 'section-value-prop',
      title: 'Core Value Proposition & ESG',
      icon: <Award className="w-5 h-5 text-emerald-700" />,
      fields: [
        { key: 'core_value_proposition', label: 'Core Value Proposition', type: 'pills', value: getVal('core_value_proposition') },
        { key: 'unique_differentiators', label: 'Unique Competitive Differentiators', type: 'pills', value: getVal('unique_differentiators') },
        { key: 'competitive_advantages', label: 'Moat & Strategic Advantages', type: 'pills', value: getVal('competitive_advantages') },
        { key: 'esg_ratings', label: 'ESG Initiatives & Ratings', type: 'pills', value: getVal('esg_ratings') },
        { key: 'sustainability_csr', label: 'CSR & Environmental Goals', type: 'pills', value: getVal('sustainability_csr') },
        { key: 'carbon_footprint', label: 'Carbon Reduction Initiatives', value: getVal('carbon_footprint') },
        { key: 'ethical_sourcing', label: 'Ethical Sourcing & Supplier Audit', type: 'pills', value: getVal('ethical_sourcing') },
      ],
    },
    {
      id: 'section-culture',
      title: 'Culture & Work Life',
      icon: <HeartHandshake className="w-5 h-5 text-pink-600" />,
      fields: [
        { key: 'work_culture_summary', label: 'Workplace Culture Overview', type: 'pills', value: getVal('work_culture_summary') },
        { key: 'manager_quality', label: 'Management Style & Coaching', value: getVal('manager_quality') },
        { key: 'psychological_safety', label: 'Psychological Safety', value: getVal('psychological_safety') },
        { key: 'feedback_culture', label: 'Feedback & Review Cadence', type: 'pills', value: getVal('feedback_culture') },
        { key: 'diversity_metrics', label: 'Diversity & Inclusion Statistics', type: 'pills', value: getVal('diversity_metrics') },
        { key: 'diversity_inclusion_score', label: 'Inclusion Initiatives', type: 'pills', value: getVal('diversity_inclusion_score') },
        { key: 'ethical_standards', label: 'Ethical Standards & Integrity', type: 'pills', value: getVal('ethical_standards') },
        { key: 'burnout_risk', label: 'Burnout Risk Assessment', value: getVal('burnout_risk') },
        { key: 'layoff_history', label: 'Restructuring / Layoff History', value: getVal('layoff_history') },
        { key: 'mission_clarity', label: 'Strategic Mission Clarity', value: getVal('mission_clarity') },
        { key: 'crisis_behavior', label: 'Crisis Management & Transparency', value: getVal('crisis_behavior') },
      ],
    },
    {
      id: 'section-news',
      title: 'Recent News & Milestones',
      icon: <Newspaper className="w-5 h-5 text-indigo-700" />,
      fields: [
        { key: 'recent_news', label: 'Strategic Announcements & Deals', type: 'pills', value: getVal('recent_news') },
        { key: 'case_studies', label: 'Flagship Client Success Cases', type: 'pills', value: getVal('case_studies') },
        { key: 'exit_strategy_history', label: 'Market Position & Acquisition History', type: 'pills', value: getVal('exit_strategy_history') },
      ],
    },
    {
      id: 'section-sales-metrics',
      title: 'Sales & Customer Metrics',
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      fields: [
        { key: 'sales_motion', label: 'Primary Go-To-Market Motion', value: getVal('sales_motion') },
        { key: 'go_to_market_strategy', label: 'GTM Strategy & Channel Alliances', type: 'pills', value: getVal('go_to_market_strategy') },
        { key: 'customer_acquisition_cost', label: 'Enterprise CAC Benchmark', value: getVal('customer_acquisition_cost') },
        { key: 'customer_lifetime_value', label: 'Enterprise LTV Benchmark', value: getVal('customer_lifetime_value') },
        { key: 'cac_ltv_ratio', label: 'LTV / CAC Efficiency', value: getVal('cac_ltv_ratio') },
        { key: 'churn_rate', label: 'Annual Enterprise Churn Rate', value: getVal('churn_rate') },
        { key: 'net_promoter_score', label: 'Net Promoter Score (NPS)', value: getVal('net_promoter_score') },
        { key: 'customer_concentration_risk', label: 'Customer Concentration Exposure', value: getVal('customer_concentration_risk') },
      ],
    },
    {
      id: 'section-risk',
      title: 'Risk & Compliance',
      icon: <ShieldAlert className="w-5 h-5 text-red-600" />,
      fields: [
        { key: 'regulatory_status', label: 'Regulatory & Governance Standards', type: 'pills', value: getVal('regulatory_status') },
        { key: 'legal_issues', label: 'Litigation & Legal Scrutiny', type: 'paragraph', value: getVal('legal_issues') },
        { key: 'supply_chain_dependencies', label: 'Critical Supply Chain Dependencies', type: 'pills', value: getVal('supply_chain_dependencies') },
        { key: 'geopolitical_risks', label: 'Geopolitical & Cross-Border Risks', type: 'pills', value: getVal('geopolitical_risks') },
        { key: 'macro_risks', label: 'Macroeconomic Sensitivity', type: 'pills', value: getVal('macro_risks') },
      ],
    },
    {
      id: 'section-location',
      title: 'Work Location & Commute',
      icon: <MapPin className="w-5 h-5 text-orange-600" />,
      fields: [
        { key: 'remote_policy_details', label: 'Remote / In-Office Policy', value: getVal('remote_policy_details') },
        { key: 'flexibility_level', label: 'Working Model Flexibility', type: 'pills', value: getVal('flexibility_level') },
        { key: 'typical_hours', label: 'Typical Daily Working Hours', value: getVal('typical_hours') },
        { key: 'overtime_expectations', label: 'Overtime Expectations', value: getVal('overtime_expectations') },
        { key: 'weekend_work', label: 'Weekend Work Occurrence', value: getVal('weekend_work') },
        { key: 'location_centrality', label: 'Office Accessibility & Zone', value: getVal('location_centrality') },
        { key: 'office_zone_type', label: 'Hub Zone Classification', value: getVal('office_zone_type') },
        { key: 'airport_commute_time', label: 'Airport Transit Time', value: getVal('airport_commute_time') },
        { key: 'cab_policy', label: 'Commute & Cab Support', type: 'pills', value: getVal('cab_policy') },
        { key: 'public_transport_access', label: 'Transit Connectivity (Metro/Bus)', type: 'pills', value: getVal('public_transport_access') },
      ],
    },
    {
      id: 'section-safety',
      title: 'Safety & Wellbeing',
      icon: <HeartPulse className="w-5 h-5 text-rose-500" />,
      fields: [
        { key: 'area_safety', label: 'Campus & Surrounding Area Safety', type: 'pills', value: getVal('area_safety') },
        { key: 'safety_policies', label: 'Night Transport & Safety Protocols', type: 'pills', value: getVal('safety_policies') },
        { key: 'infrastructure_safety', label: 'Physical Security & Fire Readiness', type: 'pills', value: getVal('infrastructure_safety') },
        { key: 'emergency_preparedness', label: 'Emergency Response Protocols', type: 'pills', value: getVal('emergency_preparedness') },
        { key: 'health_support', label: 'Health & Medical Support', type: 'pills', value: getVal('health_support') },
      ],
    },
    {
      id: 'section-growth',
      title: 'Career Growth & Learning',
      icon: <GraduationCap className="w-5 h-5 text-purple-600" />,
      fields: [
        { key: 'training_spend', label: 'Annual Training Investment per Employee', value: getVal('training_spend') },
        { key: 'onboarding_quality', label: 'Fresher Onboarding & Bootcamps', value: getVal('onboarding_quality') },
        { key: 'learning_culture', label: 'Learning Resources & Certifications', type: 'pills', value: getVal('learning_culture') },
        { key: 'mentorship_availability', label: 'Mentorship Programs', type: 'pills', value: getVal('mentorship_availability') },
        { key: 'internal_mobility', label: 'Internal Mobility & Project Switching', value: getVal('internal_mobility') },
        { key: 'promotion_clarity', label: 'Promotion Path & Transparency', type: 'pills', value: getVal('promotion_clarity') },
        { key: 'tools_access', label: 'Enterprise Tooling & Cloud Access', type: 'pills', value: getVal('tools_access') },
        { key: 'role_clarity', label: 'Role Definition & Expectations', value: getVal('role_clarity') },
        { key: 'early_ownership', label: 'Early Responsibility & Ownership', value: getVal('early_ownership') },
        { key: 'work_impact', label: 'Business Impact of Projects', type: 'pills', value: getVal('work_impact') },
        { key: 'execution_thinking_balance', label: 'Thinking vs Execution Balance', value: getVal('execution_thinking_balance') },
        { key: 'automation_level', label: 'Process Automation Maturity', value: getVal('automation_level') },
        { key: 'cross_functional_exposure', label: 'Cross-Functional Exposure', type: 'pills', value: getVal('cross_functional_exposure') },
        { key: 'exit_opportunities', label: 'Downstream Career Exit Opportunities', type: 'pills', value: getVal('exit_opportunities') },
        { key: 'skill_relevance', label: 'Market Skill Relevance', value: getVal('skill_relevance') },
        { key: 'external_recognition', label: 'Industry Resume Recognition', value: getVal('external_recognition') },
        { key: 'network_strength', label: 'Alumni Network & Connections', type: 'pills', value: getVal('network_strength') },
        { key: 'global_exposure', label: 'Global Client & Project Exposure', type: 'pills', value: getVal('global_exposure') },
      ],
    },
    {
      id: 'section-brand',
      title: 'Brand & Reputation',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      fields: [
        { key: 'brand_sentiment_score', label: 'Brand Sentiment & Industry Perception', value: getVal('brand_sentiment_score') },
        { key: 'brand_value', label: 'Brand Prestige Tier', value: getVal('brand_value') },
        { key: 'client_quality', label: 'Client Tier Quality', type: 'pills', value: getVal('client_quality') },
        { key: 'awards_recognitions', label: 'Major Industry Recognitions & Awards', type: 'pills', value: getVal('awards_recognitions') },
        { key: 'event_participation', label: 'Global Tech Summits & Keynotes', type: 'pills', value: getVal('event_participation') },
        { key: 'customer_testimonials', label: 'Client Transformations & Endorsements', type: 'pills', value: getVal('customer_testimonials') },
        { key: 'marketing_video_url', label: 'Brand Showcase Channel', type: 'video', value: getVal('marketing_video_url') },
      ],
    },
    {
      id: 'section-benefits',
      title: 'Compensation & Benefits',
      icon: <Gift className="w-5 h-5 text-teal-600" />,
      fields: [
        { key: 'leave_policy', label: 'Leave & PTO Entitlement', type: 'pills', value: getVal('leave_policy') },
        { key: 'fixed_vs_variable_pay', label: 'Pay Structure Ratio', value: getVal('fixed_vs_variable_pay') },
        { key: 'bonus_predictability', label: 'Performance Bonus Predictability', value: getVal('bonus_predictability') },
        { key: 'esops_incentives', label: 'Stock Units / Equity Incentives', type: 'pills', value: getVal('esops_incentives') },
        { key: 'family_health_insurance', label: 'Dependent Health & OPD Coverage', type: 'pills', value: getVal('family_health_insurance') },
        { key: 'relocation_support', label: 'Relocation Assistance & Housing', type: 'pills', value: getVal('relocation_support') },
        { key: 'lifestyle_benefits', label: 'Wellness, Gym & Meal Allowances', type: 'pills', value: getVal('lifestyle_benefits') },
      ],
    },
    {
      id: 'section-digital',
      title: 'Digital Presence & Ratings',
      icon: <Share2 className="w-5 h-5 text-blue-600" />,
      fields: [
        { key: 'website_url', label: 'Official Website', type: 'url', value: getVal('website_url', profile?.website_url) },
        { key: 'linkedin_url', label: 'LinkedIn Company Page', type: 'url', value: getVal('linkedin_url', profile?.linkedin_url) },
        { key: 'twitter_handle', label: 'X / Twitter Profile', value: getVal('twitter_handle', profile?.twitter_handle) },
        { key: 'facebook_url', label: 'Facebook Page', type: 'url', value: getVal('facebook_url', profile?.facebook_url) },
        { key: 'instagram_url', label: 'Instagram Profile', type: 'url', value: getVal('instagram_url', profile?.instagram_url) },
        { key: 'website_quality', label: 'Digital Brand Experience', type: 'paragraph', value: getVal('website_quality') },
        { key: 'website_rating', label: 'Website Rating', type: 'rating', value: getVal('website_rating') },
        { key: 'website_traffic_rank', label: 'Global / Regional Traffic Rank', type: 'pills', value: getVal('website_traffic_rank') },
        { key: 'social_media_followers', label: 'Audience Reach / Followers', value: getVal('social_media_followers') ? `${Number(getVal('social_media_followers')).toLocaleString()} followers` : '' },
        { key: 'glassdoor_rating', label: 'Glassdoor Employee Rating', type: 'rating', value: getVal('glassdoor_rating') },
        { key: 'indeed_rating', label: 'Indeed Employee Rating', type: 'rating', value: getVal('indeed_rating') },
        { key: 'google_rating', label: 'Google Rating', type: 'rating', value: getVal('google_rating') },
      ],
    },
    {
      id: 'section-contact',
      title: 'Contact Information',
      icon: <Mail className="w-5 h-5 text-slate-700" />,
      fields: [
        { key: 'primary_contact_email', label: 'Primary Enterprise Email', type: 'email', value: getVal('primary_contact_email', profile?.primary_contact_email) },
        { key: 'primary_phone_number', label: 'Direct Phone / Switchboard', value: getVal('primary_phone_number', profile?.primary_phone_number) },
        { key: 'contact_person_name', label: 'Key Campus Liaison / Executive', value: getVal('contact_person_name') },
        { key: 'contact_person_title', label: 'Title / Designation', value: getVal('contact_person_title') },
        { key: 'contact_person_email', label: 'Direct Executive Contact Email', type: 'email', value: getVal('contact_person_email') },
        { key: 'contact_person_phone', label: 'Direct Desk Phone', value: getVal('contact_person_phone') },
      ],
    },
  ];

  return sections;
}
