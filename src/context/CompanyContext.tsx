import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SEED_COMPANIES } from '@/src/data/seedCompanies';
import {
  CompanySummary,
  CompanyProfile,
  DashboardSkill,
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
} from '@/src/lib/companyData';
import { useCompanies } from '@/src/lib/companyApi';

export interface PersistedCompanyRef {
  companyId: number;
  companyName: string;
  logoUrl: string;
}

interface CompanyContextType {
  selectedCompanyId: number;
  selectedCompanyRef: PersistedCompanyRef | null;
  summary: CompanySummary | null;
  selectCompanyById: (companyId: number) => void;
  selectCompany: (company: { id: number; name: string; logo_url?: string }) => void;
  allCompanies: CompanySummary[];
  isInitialized: boolean;
}

const STORAGE_KEY = 'selected-company';

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: remoteCompanies = [] } = useCompanies();

  const [persistedRef, setPersistedRef] = useState<PersistedCompanyRef | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as PersistedCompanyRef;
      }
    } catch {
      // ignore
    }
    const defaultCo = SEED_COMPANIES[0];
    return {
      companyId: defaultCo?.company_id ?? 1,
      companyName: defaultCo?.short_json.name ?? 'Accenture plc',
      logoUrl: defaultCo?.short_json.logo_url ?? '',
    };
  });

  const [selectedCompanyId, setSelectedCompanyId] = useState<number>(() => {
    return persistedRef?.companyId ?? SEED_COMPANIES[0]?.company_id ?? 1;
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Restore on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PersistedCompanyRef;
        if (parsed?.companyId) {
          setSelectedCompanyId(parsed.companyId);
          setPersistedRef(parsed);
        }
      } else if (SEED_COMPANIES.length > 0) {
        const defaultCo = SEED_COMPANIES[0];
        const toPersist: PersistedCompanyRef = {
          companyId: defaultCo.company_id,
          companyName: defaultCo.short_json.name,
          logoUrl: defaultCo.short_json.logo_url,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
        setSelectedCompanyId(defaultCo.company_id);
        setPersistedRef(toPersist);
      }
    } catch {
      // ignore
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const selectCompany = (company: { id: number; name: string; logo_url?: string }) => {
    const toPersist: PersistedCompanyRef = {
      companyId: company.id,
      companyName: company.name,
      logoUrl: company.logo_url || '',
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
    } catch {
      // ignore
    }
    setPersistedRef(toPersist);
    setSelectedCompanyId(company.id);
  };

  const selectCompanyById = (companyId: number) => {
    // Check in remote companies first, then seed companies
    const fromRemote = remoteCompanies.find((c) => c.id === companyId);
    if (fromRemote) {
      selectCompany({
        id: fromRemote.id,
        name: fromRemote.name,
        logo_url: fromRemote.logo_url,
      });
      return;
    }

    const fromSeed = SEED_COMPANIES.find((c) => c.company_id === companyId);
    if (fromSeed) {
      selectCompany({
        id: fromSeed.company_id,
        name: fromSeed.short_json.name,
        logo_url: fromSeed.short_json.logo_url,
      });
      return;
    }

    // Default fallback
    setSelectedCompanyId(companyId);
  };

  // Derive allCompanies
  const allCompanies = useMemo(() => {
    if (remoteCompanies.length > 0) {
      return remoteCompanies;
    }
    return SEED_COMPANIES.map((c) =>
      normalizeCompanySummary(c.short_json, c.company_id)
    );
  }, [remoteCompanies]);

  // Derive active summary for layout/sidebar display
  const summary = useMemo(() => {
    const match = allCompanies.find((c) => c.id === selectedCompanyId);
    if (match) return match;

    if (allCompanies.length > 0) return allCompanies[0];

    const fallbackSeed = SEED_COMPANIES[0];
    return fallbackSeed
      ? normalizeCompanySummary(fallbackSeed.short_json, fallbackSeed.company_id)
      : null;
  }, [allCompanies, selectedCompanyId]);

  return (
    <CompanyContext.Provider
      value={{
        selectedCompanyId,
        selectedCompanyRef: persistedRef,
        summary,
        selectCompanyById,
        selectCompany,
        allCompanies,
        isInitialized,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export function useCompany(): CompanyContextType {
  const ctx = useContext(CompanyContext);
  if (!ctx) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return ctx;
}
