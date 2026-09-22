import React, { useState } from 'react';
import { GradeData, SubjectId, UnitData, WeekPlan } from '../types';
import { SUBJECT_INFO } from '../data/curriculum';
import { CheckCircle2, Circle, Eye, Info, Sparkles, BookOpen, Layers } from 'lucide-react';

interface CurriculumTableProps {
  currentGrade: GradeData;
  currentUnit: UnitData;
  subjectFilter: SubjectId | 'all';
  completedLessons: Record<string, boolean>;
  onToggleLesson: (lessonKey: string) => void;
}

export const CurriculumTable: React.FC<CurriculumTableProps> = ({
  currentGrade,
  currentUnit,
  subjectFilter,
  completedLessons,
  onToggleLesson,
}) => {
  const [selectedLessonModal, setSelectedLessonModal] = useState<{
    subjectName: string;
    weekPlan: WeekPlan;
    lessonKey: string;
  } | null>(null);

  // Filter subjects based on selected filter
  const subjectsToDisplay = Object.values(currentUnit.subjects).filter((s) => {
    if (subjectFilter === 'all') return true;
    return s.subjectId === subjectFilter;
  });

  return (
    <div className="space-y-4">
      {/* Unit Header Banner in Print Mode and Screen Mode */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-md">
                {currentGrade.name}
              </span>
              <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-md">
                {currentUnit.unitTitle.split(':')[0]}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                نظام الـ 5 أسابيع التونسي الرسمي
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {currentUnit.unitTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              <strong className="text-slate-800 font-bold">المحور العام: </strong>
              {currentUnit.unitGeneralTheme}
            </p>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 lg:max-w-md shrink-0">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>مشروع الوحدة التعليمية (Projet de l'unité):</span>
            </div>
            <p className="text-xs text-emerald-800 font-medium leading-relaxed">
              {currentUnit.unitProject}
            </p>
          </div>
        </div>
      </div>

      {/* Week Header Explanation Bar */}
      <div className="grid grid-cols-5 gap-2 no-print">
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-2.5 text-center">
          <span className="text-xs font-bold text-blue-900 block">الأسبوع 1</span>
          <span className="text-[11px] text-blue-700">تعلم وبناء معارف 1</span>
        </div>
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-2.5 text-center">
          <span className="text-xs font-bold text-blue-900 block">الأسبوع 2</span>
          <span className="text-[11px] text-blue-700">تعلم وبناء معارف 2</span>
        </div>
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-2.5 text-center">
          <span className="text-xs font-bold text-blue-900 block">الأسبوع 3</span>
          <span className="text-[11px] text-blue-700">تعلم وبناء معارف 3</span>
        </div>
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-center">
          <span className="text-xs font-bold text-amber-900 block">الأسبوع 4</span>
          <span className="text-[11px] text-amber-800 font-bold">أسبوع الإدماج المركب</span>
        </div>
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-2.5 text-center">
          <span className="text-xs font-bold text-emerald-900 block">الأسبوع 5</span>
          <span className="text-[11px] text-emerald-800 font-bold">تقييم ودعم وعلاج</span>
        </div>
      </div>

      {/* The Curriculum Matrix Cards / Rows */}
      <div className="space-y-4">
        {subjectsToDisplay.map((subjectPlan) => {
          const meta = SUBJECT_INFO[subjectPlan.subjectId];
          const weeksList: WeekPlan[] = [
            subjectPlan.weeks.week1,
            subjectPlan.weeks.week2,
            subjectPlan.weeks.week3,
            subjectPlan.weeks.week4,
            subjectPlan.weeks.week5,
          ];

          return (
            <div
              key={subjectPlan.subjectId}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden print-break-inside-avoid"
            >
              {/* Subject Title Strip */}
              <div className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2 ${meta?.bgLight || 'bg-slate-50'} ${meta?.border || 'border-slate-200'}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-xs ${meta?.bgLight || 'bg-slate-100'} ${meta?.color || 'text-slate-700'}`}>
                    <i className={`fa-solid ${meta?.icon || 'fa-book'}`}></i>
                  </div>
                  <div>
                    <h3 className={`font-black text-base ${meta?.color || 'text-slate-900'}`}>
                      {subjectPlan.subjectName}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      المحور: {subjectPlan.unitTheme}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 max-w-xl bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/80">
                  <span className="font-bold text-slate-900">الكفاية المستهدفة: </span>
                  <span className="text-slate-700">{subjectPlan.targetedCompetency}</span>
                </div>
              </div>

              {/* 5 Weeks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-100">
                {weeksList.map((week, wIdx) => {
                  const lessonKey = `${currentGrade.id}_u${currentUnit.unitNumber}_${subjectPlan.subjectId}_w${week.weekNumber}`;
                  const isDone = !!completedLessons[lessonKey];

                  // Color styling based on week type
                  const isLearning = week.type === 'learning';
                  const isIntegration = week.type === 'integration';
                  const isEvaluation = week.type === 'evaluation';

                  return (
                    <div
                      key={week.weekNumber}
                      className={`p-3.5 flex flex-col justify-between transition-colors ${
                        isDone ? 'bg-emerald-50/40' : ''
                      } ${
                        isIntegration
                          ? 'bg-amber-50/20 hover:bg-amber-50/40'
                          : isEvaluation
                          ? 'bg-emerald-50/20 hover:bg-emerald-50/40'
                          : 'hover:bg-slate-50/60'
                      }`}
                    >
                      {/* Week Header */}
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span
                            className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                              isLearning
                                ? 'bg-blue-100 text-blue-800'
                                : isIntegration
                                ? 'bg-amber-100 text-amber-900 font-black'
                                : 'bg-emerald-100 text-emerald-900 font-black'
                            }`}
                          >
                            الأسبوع {week.weekNumber} {isIntegration ? '• إدماج' : isEvaluation ? '• تقييم' : ''}
                          </span>

                          {/* Completion Toggle Button */}
                          <button
                            id={`toggle-done-${lessonKey}`}
                            onClick={() => onToggleLesson(lessonKey)}
                            title={isDone ? 'تم إنجاز هذا الدرس' : 'تحديد كمنجز'}
                            className="text-slate-400 hover:text-emerald-600 transition-colors p-1 cursor-pointer no-print"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Title of the Week lesson */}
                        <h4 className={`text-xs font-bold mb-2 line-clamp-2 leading-snug ${
                          isDone ? 'text-emerald-950' : 'text-slate-900'
                        }`}>
                          {week.title}
                        </h4>

                        {/* Content bullets */}
                        <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
                          {week.content.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                isIntegration ? 'bg-amber-500' : isEvaluation ? 'bg-emerald-500' : 'bg-blue-400'
                              }`}></span>
                              <span className="line-clamp-3">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* View details button if has more or to view in modal */}
                      <div className="pt-3 mt-2 border-t border-slate-100/80 flex items-center justify-between no-print">
                        <span className={`text-[10px] font-mono ${isDone ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                          {isDone ? 'منجز ✓' : 'قيد الإنجاز'}
                        </span>
                        <button
                          id={`open-modal-${lessonKey}`}
                          onClick={() =>
                            setSelectedLessonModal({
                              subjectName: subjectPlan.subjectName,
                              weekPlan: week,
                              lessonKey,
                            })
                          }
                          className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>التفاصيل</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Details Modal */}
      {selectedLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  {selectedLessonModal.subjectName} • الأسبوع {selectedLessonModal.weekPlan.weekNumber}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-2">
                  {selectedLessonModal.weekPlan.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLessonModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                عناصر المحتوى البيداغوجي والأنشطة المقررة:
              </span>
              <ul className="space-y-2 text-xs text-slate-800">
                {selectedLessonModal.weekPlan.content.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed font-medium">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  onToggleLesson(selectedLessonModal.lessonKey);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  completedLessons[selectedLessonModal.lessonKey]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {completedLessons[selectedLessonModal.lessonKey] ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم تحديد الدرس كمنجز ✓</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>تحديد كمنجز</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedLessonModal(null)}
                className="px-4 py-2 text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 rounded-xl cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
