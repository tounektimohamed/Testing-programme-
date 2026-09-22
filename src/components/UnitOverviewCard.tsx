import React from 'react';
import { GradeData, UnitData } from '../types';
import { SUBJECT_INFO, TRIMESTER_INFO } from '../data/curriculum';
import { Award, BookOpen, Calendar, CheckCircle, Flag, Layers, Sparkles, Target } from 'lucide-react';

interface UnitOverviewCardProps {
  currentGrade: GradeData;
  currentUnit: UnitData;
  onGoToSubject: (subjectId: string) => void;
}

export const UnitOverviewCard: React.FC<UnitOverviewCardProps> = ({
  currentGrade,
  currentUnit,
  onGoToSubject,
}) => {
  const trimesterMeta = TRIMESTER_INFO[currentUnit.trimester];
  const subjectList = Object.values(currentUnit.subjects);

  return (
    <div className="space-y-6">
      {/* Hero Unit Card */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Background decorative patterns */}
        <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 translate-x-12 translate-y-12 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
              {currentGrade.name}
            </span>
            <span className="bg-emerald-500/30 text-white text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
              {trimesterMeta.arabicName} ({trimesterMeta.period})
            </span>
            <span className="bg-amber-500/30 text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
              الوحدة البيداغوجية {currentUnit.unitNumber} من 6
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            {currentUnit.unitTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-1.5">
                <Target className="w-4 h-4" />
                <span>المحور البيداغوجي العام (Thème général):</span>
              </div>
              <p className="text-sm text-slate-100 font-medium leading-relaxed">
                {currentUnit.unitGeneralTheme}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>مشروع الوحدة التعليمية (Projet de l'unité):</span>
              </div>
              <p className="text-sm text-slate-100 font-medium leading-relaxed">
                {currentUnit.unitProject}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
            <div>
              <span className="text-xs text-emerald-200 block">المواد المقررة</span>
              <span className="text-xl font-black text-white">{subjectList.length} مواد</span>
            </div>
            <div>
              <span className="text-xs text-blue-200 block">أسابيع التعلم</span>
              <span className="text-xl font-black text-white">3 أسابيع (1-3)</span>
            </div>
            <div>
              <span className="text-xs text-amber-200 block">أسبوع الإدماج</span>
              <span className="text-xl font-black text-white">الأسبوع 4</span>
            </div>
            <div>
              <span className="text-xs text-teal-200 block">أسبوع التقييم والدعم</span>
              <span className="text-xl font-black text-white">الأسبوع 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Competencies Matrix Table for Inspectors & Teachers */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>مصفوفة الكفايات المستهدفة والمحاور الخاصة بالوحدة {currentUnit.unitNumber}</span>
            </h3>
            <p className="text-xs text-slate-500">
              المرجع الرسمي لوزارة التربية التونسية لجميع المواد في هذه الوحدة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectList.map((subj) => {
            const meta = SUBJECT_INFO[subj.subjectId];
            return (
              <div
                key={subj.subjectId}
                className="p-4 rounded-xl border border-slate-200/80 hover:border-emerald-300 transition-all bg-slate-50/50 hover:bg-slate-50 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-xs ${meta?.bgLight || 'bg-slate-100'} ${meta?.color || 'text-slate-700'}`}>
                      <i className={`fa-solid ${meta?.icon || 'fa-book'}`}></i>
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {subj.subjectName}
                    </h4>
                  </div>
                  <button
                    onClick={() => onGoToSubject(subj.subjectId)}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                  >
                    عرض المخطط ←
                  </button>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 text-xs">
                  <span className="font-bold text-slate-500 block mb-0.5">محور المادة:</span>
                  <span className="text-slate-800 font-medium">{subj.unitTheme}</span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 text-xs">
                  <span className="font-bold text-emerald-800 block mb-0.5">الكفاية المستهدفة:</span>
                  <span className="text-slate-700 leading-relaxed font-medium">
                    {subj.targetedCompetency}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
