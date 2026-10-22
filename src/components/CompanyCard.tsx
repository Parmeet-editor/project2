import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { CompanySummary, CATEGORY_COLORS, isNullish } from '@/src/lib/companyData';
import { useCompany } from '@/src/context/CompanyContext';
import { CompanyLogo } from './CompanyLogo';

interface CompanyCardProps {
  company: CompanySummary;
}

export const CompanyCard = memo(({ company }: CompanyCardProps) => {
  const navigate = useNavigate();
  const { selectCompanyById } = useCompany();

  const handleClick = () => {
    // 1. Save selected-company to localStorage & 2. Update context via selectCompanyById
    selectCompanyById(company.id);
    // 3. Navigate to /company/intelligence
    navigate('/company/intelligence');
  };

  const badgeColor = CATEGORY_COLORS[company.company_type] || '#2563eb';
  const isNegativeGrowth = company.yoy_growth_rate?.trim().startsWith('-');

  const formatText = (text: string | null | undefined, fallback = 'not publicly available') => {
    if (isNullish(text)) {
      return <span className="italic text-slate-400 text-xs">{fallback}</span>;
    }
    return <span>{text}</span>;
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className="group relative flex flex-col justify-between bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 rounded-xl p-5 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    >
      <div>
        {/* Top Header Row: Logo & Category Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <CompanyLogo
            name={company.name}
            websiteUrl={company.website_url}
            fallbackLogoUrl={company.logo_url}
            sizeClassName="w-12 h-12"
          />
          <span
            style={{
              backgroundColor: `${badgeColor}14`,
              color: badgeColor,
              borderColor: `${badgeColor}30`,
            }}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide uppercase"
          >
            {company.company_type}
          </span>
        </div>

        {/* Company Title & Short Name */}
        <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {company.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium mb-3">
          {company.short_name !== company.name ? company.short_name : company.category}
        </p>

        {/* Info Rows */}
        <div className="space-y-2 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{formatText(company.headquarters_address)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{formatText(company.employee_size)}</span>
          </div>

          <div className="flex items-center gap-2">
            {isNegativeGrowth ? (
              <TrendingDown className="w-3.5 h-3.5 text-red-500 shrink-0" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            )}
            <span className="font-medium">
              YoY Growth:{' '}
              <span className={isNegativeGrowth ? 'text-red-600 font-semibold' : 'text-emerald-700 font-semibold'}>
                {formatText(company.yoy_growth_rate)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
        <span className="text-slate-400 text-[11px]">View Intelligence Dossier</span>
        <div className="flex items-center gap-1 font-semibold text-blue-600">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';
