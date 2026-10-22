import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Target,
  Layers,
} from 'lucide-react';
import { useCompany } from '@/src/context/CompanyContext';
import { CompanyLogo } from '@/src/components/CompanyLogo';
import {
  DashboardSkill,
  BLOOM_COLORS,
} from '@/src/lib/companyData';
import { SkillTopicLevel } from '@/src/data/skillTopics';
import { useCompanySkills } from '@/src/lib/companyApi';

export const SkillIntelligence: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCompanyId, summary, isInitialized } = useCompany();
  const {
    data: skillsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useCompanySkills(selectedCompanyId);

  const [expandedSkillIds, setExpandedSkillIds] = useState<Record<number, boolean>>({});
  const [activeCriticalityFilter, setActiveCriticalityFilter] = useState<string>('All');

  // Fallback guard: redirect to home if no company is selected
  useEffect(() => {
    if (isInitialized && !selectedCompanyId) {
      navigate('/');
    }
  }, [isInitialized, selectedCompanyId, navigate]);

  const skills = useMemo(() => skillsData?.skills || [], [skillsData]);
  const topicsMap = useMemo(() => skillsData?.topicsMap || {}, [skillsData]);

  // Sort skills descending by required_level
  const sortedSkills = useMemo(() => {
    const list = [...skills].sort((a, b) => b.required_level - a.required_level);
    if (activeCriticalityFilter === 'All') return list;
    return list.filter((s) => s.criticality === activeCriticalityFilter);
  }, [skills, activeCriticalityFilter]);

  const toggleExpand = (id: number) => {
    setExpandedSkillIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    skills.forEach((s) => {
      allExpanded[s.skill_set_id] = true;
    });
    setExpandedSkillIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSkillIds({});
  };

  // Criticality summary counts
  const criticalityCounts = useMemo(() => {
    const counts = { Critical: 0, Important: 0, Baseline: 0 };
    skills.forEach((s) => {
      if (s.criticality in counts) {
        counts[s.criticality as keyof typeof counts]++;
      }
    });
    return counts;
  }, [skills]);

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
            <div className="h-8 w-32 bg-slate-200 rounded-lg" />
          </div>

          <div className="h-24 bg-white border border-slate-200 rounded-xl animate-pulse p-4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-white border border-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>

          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-white border border-slate-200 rounded-xl animate-pulse" />
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
          Error Loading Skill Intelligence
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          {error instanceof Error ? error.message : 'Unable to query skill tables from database.'}
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

  const companyName = summary?.short_name || summary?.name || 'Company';

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Header: Company Logo + "{Company} Skill Intelligence" */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <CompanyLogo
              name={companyName}
              websiteUrl={summary?.website_url}
              fallbackLogoUrl={summary?.logo_url}
              sizeClassName="w-12 h-12"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200 mb-1">
                <Target className="w-3 h-3 text-blue-600" />
                Target Competency Framework
              </div>
              <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {companyName} Skill Intelligence
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Curated 10-level competency ladders benchmarked against enterprise selection standards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Bloom 5-col legend (CU/AP/AS/EV/CR tints) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-700">
                Bloom's Revised Taxonomy Scale (Target Competency Depths)
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Levels 1 – 10</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { code: 'CU', label: 'Conceptual Understanding', range: 'Lv 1–2', color: BLOOM_COLORS.CU },
              { code: 'AP', label: 'Application & Execution', range: 'Lv 3–4', color: BLOOM_COLORS.AP },
              { code: 'AS', label: 'Analysis & Synthesis', range: 'Lv 5–6', color: BLOOM_COLORS.AS },
              { code: 'EV', label: 'Evaluation & Optimization', range: 'Lv 7–8', color: BLOOM_COLORS.EV },
              { code: 'CR', label: 'Creation & Architecture', range: 'Lv 9–10', color: BLOOM_COLORS.CR },
            ].map((b) => (
              <div
                key={b.code}
                style={{
                  backgroundColor: `${b.color}0D`,
                  borderColor: `${b.color}33`,
                }}
                className="p-3 rounded-lg border flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ backgroundColor: b.color }}
                    className="w-6 h-6 rounded-md text-white text-[10px] font-extrabold flex items-center justify-center shadow-2xs"
                  >
                    {b.code}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{b.range}</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-800 leading-tight">
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Criticality 3-card legend (Critical/Important/Baseline) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              key: 'Critical',
              label: 'Critical Priority',
              minScore: 'Level ≥ 7',
              desc: 'Hard filter in technical rounds & interviews',
              count: criticalityCounts.Critical,
              color: '#ef4444',
              bg: 'bg-red-50',
              border: 'border-red-200',
              text: 'text-red-700',
            },
            {
              key: 'Important',
              label: 'Important Competency',
              minScore: 'Level 5–6',
              desc: 'Crucial for clearing assessment cutoffs',
              count: criticalityCounts.Important,
              color: '#f59e0b',
              bg: 'bg-amber-50',
              border: 'border-amber-200',
              text: 'text-amber-800',
            },
            {
              key: 'Baseline',
              label: 'Baseline Foundation',
              minScore: 'Level 1–4',
              desc: 'Expected foundational prerequisite',
              count: criticalityCounts.Baseline,
              color: '#3b82f6',
              bg: 'bg-blue-50',
              border: 'border-blue-200',
              text: 'text-blue-700',
            },
          ].map((card) => {
            const isSelected = activeCriticalityFilter === card.key;
            return (
              <div
                key={card.key}
                onClick={() =>
                  setActiveCriticalityFilter(isSelected ? 'All' : card.key)
                }
                role="button"
                tabIndex={0}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-2 ring-blue-600 shadow-md border-blue-400'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${card.bg} ${card.text} border ${card.border}`}
                  >
                    {card.label}
                  </span>
                  <span className="text-xs font-extrabold text-slate-800">
                    {card.count} {card.count === 1 ? 'skill' : 'skills'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">
                  Threshold: {card.minScore}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Section Header: Sorted Skills */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-500" />
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-700">
              Evaluated Skills ({sortedSkills.length} Total) · Sorted by Target Proficiency
            </h2>
          </div>
          {activeCriticalityFilter !== 'All' && (
            <button
              type="button"
              onClick={() => setActiveCriticalityFilter('All')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Clear filter ({activeCriticalityFilter})
            </button>
          )}
        </div>

        {/* Skill Cards Sorted Descending */}
        <div className="space-y-4">
          {sortedSkills.map((skill: DashboardSkill) => {
            const isExpanded = !!expandedSkillIds[skill.skill_set_id];
            const bloomColor = skill.bloom_color;
            const topics: SkillTopicLevel[] = topicsMap[skill.skill_set_id] || [];

            // Criticality badge colors
            const critStyle =
              skill.criticality === 'Critical'
                ? 'bg-red-50 text-red-700 border-red-200'
                : skill.criticality === 'Important'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-blue-50 text-blue-700 border-blue-200';

            return (
              <div
                key={skill.skill_set_id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:border-slate-300 transition-all"
              >
                {/* Main Card Header */}
                <div
                  onClick={() => toggleExpand(skill.skill_set_id)}
                  role="button"
                  tabIndex={0}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Bloom Code Badge */}
                    <div
                      style={{ backgroundColor: bloomColor }}
                      className="w-10 h-10 rounded-xl text-white font-heading font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs"
                    >
                      {skill.bloom_code}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading text-base font-bold text-slate-900">
                          {skill.skill_set_name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${critStyle}`}
                        >
                          {skill.criticality}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {skill.difficulty}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span>Target Bloom: <strong className="text-slate-700">{skill.bloom_label}</strong></span>
                        <span>•</span>
                        <span>Proficiency: <strong className="text-slate-700">{skill.required_proficiency}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar & Score Display */}
                  <div className="flex items-center gap-4 sm:gap-6 self-stretch md:self-auto justify-between md:justify-end">
                    <div className="w-36 sm:w-44">
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="text-slate-500 text-[11px]">Benchmark Target</span>
                        <span style={{ color: bloomColor }}>{skill.required_level} / 10</span>
                      </div>
                      {/* Colored Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          style={{
                            width: `${(skill.required_level / 10) * 100}%`,
                            backgroundColor: bloomColor,
                          }}
                          className="h-full rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Expand/Collapse Chevron */}
                    <div className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable 10-level Roadmap */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40">
                    <div className="flex items-center justify-between py-2 text-xs font-semibold text-slate-600">
                      <span>10-Level Curriculum Ladder & Milestones</span>
                      <span className="text-[11px] text-slate-400">
                        Target benchmark: Level {skill.required_level}
                      </span>
                    </div>

                    <div className="space-y-2 mt-2">
                      {topics.map((topic: SkillTopicLevel) => {
                        const isTargetBoundary = topic.level === skill.required_level;
                        const isBeyondScope = topic.level > skill.required_level;
                        const topicBloomColor = BLOOM_COLORS[topic.bloomCode] || '#64748b';

                        return (
                          <div
                            key={topic.level}
                            style={{
                              borderColor: isTargetBoundary
                                ? bloomColor
                                : isBeyondScope
                                ? '#E2E8F0'
                                : '#CBD5E1',
                            }}
                            className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
                              isBeyondScope
                                ? 'bg-slate-100/60 opacity-60'
                                : isTargetBoundary
                                ? 'bg-white shadow-xs'
                                : 'bg-white'
                            }`}
                          >
                            <div className="flex items-start sm:items-center gap-3">
                              {/* Level Badge */}
                              <div
                                style={{
                                  backgroundColor: isBeyondScope
                                    ? '#94a3b8'
                                    : isTargetBoundary
                                    ? bloomColor
                                    : '#334155',
                                }}
                                className="w-6 h-6 rounded-md text-white text-[11px] font-bold flex items-center justify-center shrink-0"
                              >
                                {topic.level}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-800">
                                    {topic.title}
                                  </span>
                                  <span
                                    style={{
                                      backgroundColor: `${topicBloomColor}18`,
                                      color: topicBloomColor,
                                      borderColor: `${topicBloomColor}40`,
                                    }}
                                    className="px-1.5 py-0.2 rounded text-[10px] font-bold border uppercase"
                                  >
                                    {topic.bloomCode}
                                  </span>
                                  {isTargetBoundary && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-700 uppercase tracking-wider">
                                      Company Requirement Target
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                  {topic.summary}
                                </p>
                              </div>
                            </div>

                            {/* Status Tag: In-Scope vs Beyond Scope with lock */}
                            <div className="shrink-0 flex items-center gap-1.5 self-end sm:self-center">
                              {isBeyondScope ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-semibold bg-slate-200 text-slate-600">
                                  <Lock className="w-3 h-3 text-slate-500" />
                                  <span>Beyond scope</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>Required Competency</span>
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
