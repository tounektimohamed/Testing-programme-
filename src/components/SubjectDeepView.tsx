import React, { useState } from 'react';
import { GradeData, SubjectId, UnitNumber } from '../types';
import { SUBJECT_INFO, TRIMESTER_INFO } from '../data/curriculum';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Layers, Sparkles } from 'lucide-react';

interface SubjectDeepViewProps {
  currentGrade: GradeData;
  initialSubjectId?: SubjectId;
  completedLessons: Record<string, boolean>;
  onToggleLesson: (lessonKey: string) => void;
}

export const SubjectDeepView: React.FC<SubjectDeepViewProps> = ({
  currentGrade,
  initialSubjectId,
  completedLessons,
  onToggleLesson,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>(
    initialSubjectId || currentGrade.availableSubjects[0].id
  );

  const subjectMeta = SUBJECT_INFO[selectedSubjectId];

  // Collect all 6 units for this subject
  const unitsList = ([1, 2, 3, 4, 5, 6] as UnitNumber[]).map((uNum) => {
    const unit = currentGrade.units[uNum];
    const subjectPlan = unit?.subjects[selectedSubjectId];
    return {
      unitNumber: uNum,
      unitTitle: unit?.unitTitle,
      trimester: unit?.trimester,
      subjectPlan,
    };
  }).filter((item) => item.subjectPlan !== undefined);

  return (
    <div className="space-y-5">
      {/* Subject Picker Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-500 block mb-2">
          اختر المادة التعليمية لمتابعة التدرج السنوي الشامل (30 أسبوعاً):
        </span>
        <div className="flex flex-wrap gap-2">
          {currentGrade.availableSubjects.map((s) => {
            const isSelected = s.id === selectedSubjectId;
            const meta = SUBJECT_INFO[s.id];
            return (
              <button
                key={s.id}
                id={`deep-subject-tab-${s.id}`}
                onClick={() => setSelectedSubjectId(s.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <i className={`fa-solid ${s.icon} text-xs`}></i>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Header Banner */}
      <div className={`rounded-2xl p-5 border ${subjectMeta?.bgLight || 'bg-slate-50'} ${subjectMeta?.border || 'border-slate-200'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-white shadow-xs ${subjectMeta?.color || 'text-slate-800'}`}>
              <i className={`fa-solid ${subjectMeta?.icon || 'fa-book'}`}></i>
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                التدرج البيداغوجي السنوي: {subjectMeta?.name || selectedSubjectId}
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                {currentGrade.name} • 6 وحدات تعليمية • 30 أسبوعاً بيداغوجياً كاملاً
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-700">
            <span className="font-bold text-slate-900">نظام التدريس: </span>
            <span>3 أسابيع تعلم + أسبوع إدماج + أسبوع تقييم لكل وحدة</span>
          </div>
        </div>
      </div>

      {/* All 6 Units Sequential Breakdown */}
      <div className="space-y-4">
        {unitsList.map((item) => {
          const subjectPlan = item.subjectPlan!;
          const trimester = TRIMESTER_INFO[item.trimester!];
          const weeks = [
            subjectPlan.weeks.week1,
            subjectPlan.weeks.week2,
            subjectPlan.weeks.week3,
            subjectPlan.weeks.week4,
            subjectPlan.weeks.week5,
          ];

          return (
            <div
              key={item.unitNumber}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden print-break-inside-avoid"
            >
              {/* Unit Header */}
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                    الوحدة {item.unitNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {trimester.arabicName} ({trimester.period})
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {item.unitTitle}
                  </span>
                </div>

                <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                  المحور: {subjectPlan.unitTheme}
                </span>
              </div>

              {/* Targeted Competency */}
              <div className="p-3.5 bg-emerald-50/40 border-b border-slate-100 text-xs text-emerald-950 font-medium">
                <strong className="font-bold text-emerald-900">الكفاية المستهدفة للوحدة: </strong>
                {subjectPlan.targetedCompetency}
              </div>

              {/* 5 Weeks Row */}
              <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-100">
                {weeks.map((w) => {
                  const lessonKey = `${currentGrade.id}_u${item.unitNumber}_${selectedSubjectId}_w${w.weekNumber}`;
                  const isDone = !!completedLessons[lessonKey];
                  const isLearning = w.type === 'learning';
                  const isIntegration = w.type === 'integration';
                  const isEvaluation = w.type === 'evaluation';

                  return (
                    <div
                      key={w.weekNumber}
                      className={`p-3.5 flex flex-col justify-between ${
                        isDone ? 'bg-emerald-50/40' : ''
                      } ${
                        isIntegration
                          ? 'bg-amber-50/30'
                          : isEvaluation
                          ? 'bg-emerald-50/30'
                          : 'bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              isLearning
                                ? 'bg-blue-100 text-blue-800'
                                : isIntegration
                                ? 'bg-amber-100 text-amber-900 font-black'
                                : 'bg-emerald-100 text-emerald-900 font-black'
                            }`}
                          >
                            الأسبوع {w.weekNumber} {isIntegration ? '(إدماج)' : isEvaluation ? '(تقييم)' : ''}
                          </span>

                          <button
                            onClick={() => onToggleLesson(lessonKey)}
                            title={isDone ? 'منجز' : 'غير منجز'}
                            className="text-slate-400 hover:text-emerald-600 cursor-pointer no-print"
                          >
                            <CheckCircle2
                              className={`w-4 h-4 ${isDone ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'}`}
                            />
                          </button>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 mb-2 leading-snug">
                          {w.title}
                        </h4>

                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {w.content.map((c: string, cIdx: number) => (
                            <li key={cIdx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                              <span className="line-clamp-3">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
