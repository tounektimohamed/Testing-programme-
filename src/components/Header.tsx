import React from 'react';
import { Printer, Download, BookOpen, Search, Sparkles, Award } from 'lucide-react';
import { GradeData, UnitData } from '../types';

interface HeaderProps {
  currentGrade: GradeData;
  currentUnit: UnitData;
  onOpenGuide: () => void;
  onOpenNotes: () => void;
  activeView: string;
  setActiveView: (view: 'table' | 'overview' | 'subject' | 'search') => void;
  completedLessonsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentGrade,
  currentUnit,
  onOpenGuide,
  onOpenNotes,
  activeView,
  setActiveView,
  completedLessonsCount,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportText = () => {
    let summaryText = `الجمهورية التونسية - وزارة التربية\nالمخطط السنوي للبرامج الرسمية\n`;
    summaryText += `المستوى: ${currentGrade.name}\n`;
    summaryText += `الوحدة: ${currentUnit.unitTitle}\n`;
    summaryText += `المحور العام: ${currentUnit.unitGeneralTheme}\n`;
    summaryText += `مشروع الوحدة: ${currentUnit.unitProject}\n\n`;
    summaryText += `=========================================\n`;

    Object.values(currentUnit.subjects).forEach((subj) => {
      summaryText += `\n[ ${subj.subjectName} ]\n`;
      summaryText += `الكفاية المستهدفة: ${subj.targetedCompetency}\n`;
      Object.values(subj.weeks).forEach((w) => {
        const typeLabel = w.type === 'learning' ? 'أسبوع تعلم' : w.type === 'integration' ? 'أسبوع إدماج' : 'أسبوع تقييم';
        summaryText += `  - الأسبوع ${w.weekNumber} (${typeLabel}): ${w.title}\n`;
        w.content.forEach((c) => {
          summaryText += `      * ${c}\n`;
        });
      });
    });

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `مخطط_${currentGrade.id}_الوحدة_${currentUnit.unitNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Ministry Ribbon */}
      <div className="bg-emerald-800 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-medium tracking-wide">الجمهورية التونسية — وزارة التربية — الإدارة العامة للمرحلة الابتدائية</span>
          </div>
          <div className="flex items-center gap-3 text-emerald-100 text-xs">
            <span className="hidden sm:inline">نظام الـ 5 أسابيع البيداغوجي المعتمد</span>
            <span className="bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] font-mono">2024 - 2025</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-600 text-white flex items-center justify-center shadow-md shrink-0">
              <i className="fa-solid fa-graduation-cap text-2xl"></i>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  مخطط المناهج الابتدائية التونسية
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  البرامج الرسمية
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                توزيع الوحدات البيداغوجية للسنوات الست (1 - 6) • 3 أسابيع تعلم + أسبوع إدماج + أسبوع تقييم
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 flex-wrap self-end md:self-center no-print">
            
            {/* Search Quick Button */}
            <button
              id="header-search-btn"
              onClick={() => setActiveView(activeView === 'search' ? 'table' : 'search')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                activeView === 'search'
                  ? 'bg-amber-500 text-white shadow-amber-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>بحث بيداغوجي</span>
            </button>

            {/* 5-Week Guide Button */}
            <button
              id="header-guide-btn"
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>دليل الـ 5 أسابيع</span>
            </button>

            {/* Teacher Notes & Checklist */}
            <button
              id="header-notes-btn"
              onClick={onOpenNotes}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-all"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>مفكرة المربي</span>
              {completedLessonsCount > 0 && (
                <span className="bg-indigo-600 text-white text-[11px] px-1.5 py-0.2 rounded-full font-mono">
                  {completedLessonsCount}
                </span>
              )}
            </button>

            {/* Print Button */}
            <button
              id="header-print-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white transition-all shadow-xs"
              title="طباعة التوزيع الأسبوعي الرسمي (A4)"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة</span>
            </button>

            {/* Export Summary Button */}
            <button
              id="header-export-btn"
              onClick={handleExportText}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all"
              title="تحميل ملخص نصي للوحدة الحالية"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">تصدير</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
