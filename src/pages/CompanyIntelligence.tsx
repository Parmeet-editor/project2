import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Globe,
  Star,
  Tv,
  Mail,
  Linkedin,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext';
import { CompanyLogo } from '@/src/components/CompanyLogo';
import {
  buildIntelligenceSections,
  IntelligenceSection,
  IntelligenceField,
} from '@/src/data/intelligenceData';
import { isNullish, splitItems, CATEGORY_COLORS } from '@/src/lib/companyData';
import { useCompanyProfile } from '@/src/lib/companyApi';

// Memoized Field Row Component
interface FieldRowProps {
  field: IntelligenceField;
}

const FieldRow: React.FC<FieldRowProps> = memo(({ field }) => {
  const { label, value, type } = field;

  // Nullish fallback
  if (isNullish(value)) {
    return (
      <div className="py-2.5 sm:py-3 border-b border-slate-100 last:border-0 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
        <dt className="text-xs font-semibold text-slate-500 sm:w-1/3 shrink-0">
          {label}
        </dt>
        <dd className="sm:w-2/3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-400">
            Not Available
          </span>
        </dd>
      </div>
    );
  }

  const strVal = String(value).trim();

  // Value renderer handling url, video, rating, email, paragraph, or auto-pill detection on ; and ,
  const renderValue = () => {
    if (type === 'url') {
      return (
        <a
          href={strVal.startsWith('http') ? strVal : `https://${strVal}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline break-all"
        >
          <span>{strVal}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
      );
    }

    if (type === 'video') {
      return (
        <a
          href={strVal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
        >
          <Tv className="w-3.5 h-3.5 text-red-600" />
          <span>Watch Showcase Channel</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      );
    }

    if (type === 'email') {
      return (
        <a
          href={`mailto:${strVal}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
        >
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          <span>{strVal}</span>
        </a>
      );
    }

    if (type === 'rating') {
      return (
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{strVal}</span>
        </div>
      );
    }

    if (type === 'paragraph') {
      return (
        <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
          {strVal}
        </p>
      );
    }

    // Auto-pill detection: if type is pills or contains ';' or multiple comma items
    const hasSemicolons = strVal.includes(';');
    const items = hasSemicolons
      ? splitItems(strVal)
      : type === 'pills' && strVal.includes(',')
      ? strVal.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
      : null;

    if (items && items.length > 1) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    return <span className="text-xs text-slate-800 font-medium">{strVal}</span>;
  };

  return (
    <div className="py-2.5 sm:py-3 border-b border-slate-100 last:border-0 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
      <dt className="text-xs font-semibold text-slate-500 sm:w-1/3 shrink-0">
        {label}
      </dt>
      <dd className="sm:w-2/3">{renderValue()}</dd>
    </div>
  );
});

FieldRow.displayName = 'FieldRow';

// Memoized Section Card
interface SectionCardProps {
  section: IntelligenceSection;
  sectionIndex: number;
}

const SectionCard: React.FC<SectionCardProps> = memo(({ section, sectionIndex }) => {
  const availableCount = section.fields.filter((f) => !isNullish(f.value)).length;

  return (
    <section
      id={section.id}
      data-section-index={sectionIndex}
      className="scroll-mt-32 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-6 shadow-2xs transition-shadow hover:shadow-xs"
    >
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 text-slate-700">
            {section.icon}
          </div>
          <div>
            <h2 className="font-heading text-base font-bold text-slate-900">
              {section.title}
            </h2>
            <span className="text-[11px] text-slate-400">
              Section {sectionIndex + 1} of 22
            </span>
          </div>
        </div>

        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
          {availableCount} / {section.fields.length} metrics
        </span>
      </div>

      <dl className="divide-y divide-slate-100">
        {section.fields.map((field) => (
          <FieldRow key={field.key} field={field} />
        ))}
      </dl>
    </section>
  );
});

SectionCard.displayName = 'SectionCard';

export const CompanyIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCompanyId, isInitialized } = useCompany();
  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useCompanyProfile(selectedCompanyId);

  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Fallback guard: redirect home only if initialization finished and companyId is invalid
  useEffect(() => {
    if (isInitialized && !selectedCompanyId) {
      navigate('/');
    }
  }, [isInitialized, selectedCompanyId, navigate]);

  const sections = useMemo(() => {
    return buildIntelligenceSections(profile || undefined);
  }, [profile]);

  // Scroll spy implementation with isScrollingRef guard
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPos = window.scrollY + 160;
      let currentIdx = 0;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            currentIdx = i;
          }
        }
      }

      setActiveTabIdx(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Auto-center active tab in horizontal tab bar
  useEffect(() => {
    if (!tabsRef.current) return;
    const container = tabsRef.current;
    const activeBtn = container.children[activeTabIdx] as HTMLElement;
    if (activeBtn) {
      const containerWidth = container.offsetWidth;
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      const targetScroll = btnOffsetLeft - containerWidth / 2 + btnWidth / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  }, [activeTabIdx]);

  const scrollToSection = (idx: number) => {
    const section = sections[idx];
    if (!section) return;

    setActiveTabIdx(idx);
    isScrollingRef.current = true;

    const el = document.getElementById(section.id);
    if (el) {
      const headerOffset = 135;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50/50 p-6 sm:p-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="h-20 bg-white border border-slate-200 rounded-xl p-4 animate-pulse flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-200 rounded-xl" />
              <div className="space-y-2">
                <div className="h-5 w-48 bg-slate-200 rounded-md" />
                <div className="h-3.5 w-32 bg-slate-200 rounded-md" />
              </div>
            </div>
            <div className="h-9 w-24 bg-slate-200 rounded-lg" />
          </div>

          <div className="h-10 bg-white border border-slate-200 rounded-lg animate-pulse" />

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-white border border-slate-200 rounded-xl p-6 animate-pulse space-y-3"
            >
              <div className="h-5 w-40 bg-slate-200 rounded-md mb-4" />
              <div className="h-3.5 w-full bg-slate-200 rounded-md" />
              <div className="h-3.5 w-5/6 bg-slate-200 rounded-md" />
              <div className="h-3.5 w-3/4 bg-slate-200 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-6 bg-white border border-red-200 rounded-xl shadow-xs text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h2 className="text-base font-bold text-slate-900">
          Error Loading Company Intelligence
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          {error instanceof Error ? error.message : 'Unable to retrieve company intelligence dossier from database.'}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Loading</span>
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading intelligence dossier...
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[profile.company_type] || '#2563eb';

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Sticky Top Information Bar:
          Left: Company logo, Company name, Industry badge
          Right: Website button, LinkedIn button
          No hero section. No gradient background.
      */}
      <div className="sticky top-14 z-20 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Left: Logo, Name, Industry Badge */}
          <div className="flex items-center gap-3.5">
            <CompanyLogo
              name={profile.name}
              websiteUrl={profile.website_url}
              fallbackLogoUrl={profile.logo_url}
              sizeClassName="w-11 h-11"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-lg font-bold text-slate-900 leading-tight">
                  {profile.name}
                </h1>
                <span
                  style={{
                    backgroundColor: `${categoryColor}14`,
                    color: categoryColor,
                    borderColor: `${categoryColor}30`,
                  }}
                  className="px-2 py-0.5 rounded text-[11px] font-bold border uppercase tracking-wider hidden sm:inline-block"
                >
                  {profile.company_type}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                <span className="font-medium text-slate-600">{profile.category}</span>
                {profile.fields.headquarters_address && (
                  <>
                    <span>•</span>
                    <span>HQ: {profile.fields.headquarters_address}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Official External Links */}
          <div className="flex items-center gap-2 shrink-0">
            {profile.website_url && profile.website_url !== '#' && (
              <a
                href={profile.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0077B5]/10 text-[#0077B5] border border-[#0077B5]/20 hover:bg-[#0077B5]/20 text-xs font-semibold rounded-lg transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Sticky 22 Tab Bar with Scroll Spy */}
      <div className="sticky top-[77px] z-10 bg-white border-b border-slate-200 px-4 sm:px-8 py-2 overflow-x-auto no-scrollbar shadow-2xs">
        <div
          ref={tabsRef}
          className="max-w-6xl mx-auto flex items-center gap-1.5 whitespace-nowrap overflow-x-auto scrollbar-none py-0.5"
        >
          {sections.map((section, idx) => {
            const isActive = activeTabIdx === idx;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="mr-1.5 text-[10px] opacity-75">{idx + 1}.</span>
                {section.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 22 Sections Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Enterprise Placement Intelligence Dossier (22 Comprehensive Sections)
          </div>
          <span className="text-xs text-slate-400">
            JSS Placement Intelligence Platform
          </span>
        </div>

        {sections.map((sec, idx) => (
          <SectionCard key={sec.id} section={sec} sectionIndex={idx} />
        ))}
      </div>
    </div>
  );
};
