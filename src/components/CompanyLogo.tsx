import React, { useState } from 'react';

interface CompanyLogoProps {
  name: string;
  websiteUrl?: string;
  fallbackLogoUrl?: string;
  className?: string;
  sizeClassName?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  websiteUrl,
  fallbackLogoUrl,
  className = '',
  sizeClassName = 'w-10 h-10',
}) => {
  const [hasError, setHasError] = useState(false);
  const logoDevKey = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY;

  // Determine logo URL candidate
  let logoSrc = '';
  if (logoDevKey && websiteUrl && !hasError) {
    try {
      const domain = new URL(websiteUrl).hostname.replace(/^www\./, '');
      logoSrc = `https://img.logo.dev/${domain}?token=${logoDevKey}&size=128&format=png`;
    } catch {
      logoSrc = fallbackLogoUrl || '';
    }
  } else if (fallbackLogoUrl && !hasError) {
    logoSrc = fallbackLogoUrl;
  }

  const initial = (name || 'C').trim().charAt(0).toUpperCase();

  if (!logoSrc || hasError) {
    return (
      <div
        className={`${sizeClassName} rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 select-none shadow-xs shrink-0 ${className}`}
        aria-label={`${name} logo fallback`}
      >
        <span className="text-sm font-semibold tracking-wide text-blue-700">{initial}</span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClassName} rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1.5 overflow-hidden shadow-xs shrink-0 ${className}`}
    >
      <img
        src={logoSrc}
        alt={`${name} logo`}
        className="w-full h-full object-contain"
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
};
