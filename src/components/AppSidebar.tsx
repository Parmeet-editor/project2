import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FileText,
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Building,
  Menu,
  X,
} from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext';
import { CompanyLogo } from './CompanyLogo';

interface AppSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const { summary } = useCompany();

  const navItems = [
    {
      label: 'Company Intelligence',
      path: '/company/intelligence',
      icon: FileText,
      badge: '22 Sections',
    },
    {
      label: 'Skill Intelligence',
      path: '/company/skills',
      icon: GraduationCap,
      badge: 'Roadmaps',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#F8FAFC] border-r border-[#E5E7EB] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header: Text Wordmark (NO college logo image) */}
        <div>
          <div className="p-5 border-b border-[#E5E7EB] bg-white">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                JSS · INTELLIGENCE PLATFORM
              </span>
              <button
                type="button"
                onClick={onMobileClose}
                className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h1 className="mt-2.5 font-heading text-base font-bold text-slate-900 tracking-tight leading-tight">
              JSS University, Noida
            </h1>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Placement Intelligence Hub
            </p>
          </div>

          {/* Currently Selected Company Indicator in Sidebar */}
          {summary && (
            <div className="mx-3 mt-3 p-3 bg-white border border-slate-200 rounded-lg shadow-xs">
              <div className="flex items-center gap-3">
                <CompanyLogo
                  name={summary.name}
                  websiteUrl={summary.website_url}
                  fallbackLogoUrl={summary.logo_url}
                  sizeClassName="w-9 h-9"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-600 block">
                    Active Company
                  </span>
                  <div className="font-heading font-semibold text-xs text-slate-900 truncate">
                    {summary.short_name || summary.name}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            <div className="px-3 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Intelligence Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold shadow-xs border border-blue-100'
                        : 'text-[#334155] hover:bg-slate-100/80 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB]' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: All Companies */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F8FAFC]">
          <button
            type="button"
            onClick={() => {
              onMobileClose();
              navigate('/');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>All Companies</span>
          </button>
          <div className="mt-2.5 text-center text-[10px] text-slate-600">
            JSS Placement Intelligence Hub v1.0
          </div>
        </div>
      </aside>
    </>
  );
};
