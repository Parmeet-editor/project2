import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Building, RotateCcw, AlertCircle, RefreshCw } from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext';
import { CompanyCard } from '@/src/components/CompanyCard';
import { CATEGORY_COLORS } from '@/src/lib/companyData';
import { useCompanies } from '@/src/lib/companyApi';

type FilterCategory = 'All' | 'Super Dream' | 'Dream' | 'Standard' | 'Regular';

export const Index: React.FC = () => {
  const { data: companies = [], isLoading, isError, error, refetch } = useCompanies();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');

  // 200ms debounce for search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtered companies based on search and category
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesCategory =
        activeCategory === 'All' || company.company_type === activeCategory;

      if (!matchesCategory) return false;

      if (!debouncedSearch.trim()) return true;

      const q = debouncedSearch.toLowerCase();
      const inName = company.name.toLowerCase().includes(q);
      const inShort = company.short_name.toLowerCase().includes(q);
      const inHq = company.headquarters_address.toLowerCase().includes(q);
      const inCat = company.category.toLowerCase().includes(q);

      return inName || inShort || inHq || inCat;
    });
  }, [companies, activeCategory, debouncedSearch]);

  // Counts for the 5 category pills
  const counts = useMemo(() => {
    const res: Record<FilterCategory, number> = {
      All: companies.length,
      'Super Dream': 0,
      Dream: 0,
      Standard: 0,
      Regular: 0,
    };
    companies.forEach((c) => {
      if (c.company_type in res) {
        res[c.company_type as FilterCategory] += 1;
      }
    });
    return res;
  }, [companies]);

  const categoryPills: Array<{ key: FilterCategory; label: string; color: string }> = [
    { key: 'All', label: 'All', color: '#334155' },
    { key: 'Super Dream', label: 'Super Dream', color: CATEGORY_COLORS['Super Dream'] },
    { key: 'Dream', label: 'Dream', color: CATEGORY_COLORS['Dream'] },
    { key: 'Standard', label: 'Standard', color: CATEGORY_COLORS['Standard'] },
    { key: 'Regular', label: 'Regular', color: CATEGORY_COLORS['Regular'] },
  ];

  const handleReset = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setActiveCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Enterprise Top Bar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              JSS · INTELLIGENCE PLATFORM
            </span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Campus Placement Analytics
          </div>
        </div>
      </header>

      {/* Hero Section: White background, bottom border, large heading, small subtitle, search bar directly below */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              JSS University, Noida Companies Research & Placement Analytics Portal
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal">
              Your strategic edge for campus placements
            </p>
          </div>

          {/* Search bar directly below with 200ms debounce + clear X */}
          <div className="mt-6 max-w-2xl relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search enterprise by name, short name, sector, or headquarters..."
                className="w-full pl-11 pr-10 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-blue-600 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-2xs focus:ring-2 focus:ring-blue-100"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 5 Filter Pills with Live Counts */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {categoryPills.map((pill) => {
              const isActive = activeCategory === pill.key;
              const count = counts[pill.key];

              return (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => setActiveCategory(pill.key)}
                  style={{
                    backgroundColor: isActive ? pill.color : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : pill.color,
                    borderColor: isActive ? pill.color : '#E2E8F0',
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 shadow-2xs hover:shadow-xs active:scale-95`}
                >
                  <span>{pill.label}</span>
                  <span
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#475569',
                    }}
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Company Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Results summary bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Displaying {filteredCompanies.length} of {companies.length} Participating Enterprises
          </div>
          {(debouncedSearch || activeCategory !== 'All') && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Error State */}
        {isError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-red-800">
                  Failed to fetch companies from database
                </p>
                <p className="text-[11px] text-red-600">
                  {error instanceof Error ? error.message : 'Please check database connectivity.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Loading Skeleton (8 cards) */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse flex flex-col justify-between h-56"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                    <div className="w-16 h-5 bg-slate-200 rounded-full" />
                  </div>
                  <div className="h-5 bg-slate-200 rounded-md w-3/4 mb-2" />
                  <div className="h-3.5 bg-slate-200 rounded-md w-1/2 mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded-md w-4/5" />
                    <div className="h-3 bg-slate-200 rounded-md w-3/5" />
                  </div>
                </div>
                <div className="h-4 bg-slate-200 rounded-md w-full pt-2" />
              </div>
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          /* Grid of memoized CompanyCard hoisted outside */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          /* Empty State with Reset CTA */
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
              <Building className="w-6 h-6" />
            </div>
            <h2 className="font-heading text-lg font-bold text-slate-800">
              No matching companies found
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              No recruiting enterprises matched your current query "{debouncedSearch}" or selected filter.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search & Filters</span>
            </button>
          </div>
        )}
      </main>

      {/* Enterprise Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} JSS University, Noida · Placement Intelligence Hub
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Enterprise Research</span>
            <span>•</span>
            <span>Skill Roadmaps</span>
            <span>•</span>
            <span>Placement Analytics</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
