import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, ChevronRight, Building2, Home } from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext';
import { AppSidebar } from './AppSidebar';

export const AppLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { summary } = useCompany();
  const location = useLocation();

  const isSkillsPage = location.pathname.includes('/company/skills');
  const currentSectionName = isSkillsPage ? 'Skill Intelligence' : 'Company Intelligence';

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col lg:flex-row">
      {/* Sidebar Component */}
      <AppSidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header with Mobile Trigger & Breadcrumbs */}
        <header className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-hidden">
              <Link
                to="/"
                className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors shrink-0"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Directory</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              <span className="text-slate-700 font-semibold truncate max-w-[140px] sm:max-w-[220px]">
                {summary?.name || 'Company'}
              </span>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-blue-600 font-semibold truncate">
                {currentSectionName}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 px-2.5 py-1 rounded-md hover:bg-slate-50 transition-colors border border-slate-200 hidden sm:inline-flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Switch Company</span>
            </Link>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
