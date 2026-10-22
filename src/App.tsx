import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CompanyProvider } from '@/src/context/CompanyContext';
import { AppLayout } from '@/src/components/AppLayout';
import { Index } from '@/src/pages/Index';
import { CompanyIntelligence } from '@/src/pages/CompanyIntelligence';
import { SkillIntelligence } from '@/src/pages/SkillIntelligence';
import { NotFound } from '@/src/pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CompanyProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-slate-500 font-medium">Loading Portal...</span>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />

              <Route path="/company" element={<AppLayout />}>
                <Route index element={<Navigate to="intelligence" replace />} />
                <Route path="intelligence" element={<CompanyIntelligence />} />
                <Route path="skills" element={<SkillIntelligence />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CompanyProvider>
    </QueryClientProvider>
  );
}
