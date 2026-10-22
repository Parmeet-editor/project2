import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Building2 } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full text-center shadow-xs">
        <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-red-600 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="font-heading text-2xl font-bold text-slate-900">
          Page Not Found (404)
        </h1>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          The requested URL path does not exist on the JSS Placement Intelligence Portal.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Companies</span>
        </Link>
      </div>
    </div>
  );
};
