import React from 'react';
import { GradeData, GradeId, SubjectId, TrimesterNumber, UnitNumber } from '../types';
import { ALL_GRADES, SUBJECT_INFO, TRIMESTER_INFO } from '../data/curriculum';
import { LayoutGrid, FileText, BookMarked, Search, Layers, Calendar, CheckCircle2 } from 'lucide-react';

interface NavigationFiltersProps {
  currentGradeId: GradeId;
  onSelectGrade: (gradeId: GradeId) => void;
  currentTrimester: TrimesterNumber;
  onSelectTrimester: (trimester: TrimesterNumber) => void;
  currentUnitNumber: UnitNumber;
  onSelectUnit: (unitNumber: UnitNumber) => void;
  currentSubjectFilter: SubjectId | 'all';
  onSelectSubjectFilter: (subjId: SubjectId | 'all') => void;
  activeView: 'table' | 'overview' | 'subject' | 'search';
  setActiveView: (view: 'table' | 'overview' | 'subject' | 'search') => void;
  currentGrade: GradeData;
}

export const NavigationFilters: React.FC<NavigationFiltersProps> = ({
  currentGradeId,
  onSelectGrade,
  currentTrimester,
  onSelectTrimester,
  currentUnitNumber,
  onSelectUnit,
  currentSubjectFilter,
  onSelectSubjectFilter,
  activeView,
  setActiveView,
  currentGrade,
}) => {
  // Trimester's units
  const trimesterUnits = TRIMESTER_INFO[currentTrimester].units;

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
        
        {/* Tier 1: Grade Selection (All 6 Primary Grades) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              المستوى الدراسي (السنوات الابتدائية)
            </span>
            <span className="text-xs text-slate-400">
              {currentGrade.cycle}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {ALL_GRADES.map((grade, idx) => {
              const isSelected = grade.id === currentGradeId;
              const gradeNum = idx + 1;
              return (
                <button
                  key={grade.id}
                  id={`grade-btn-${grade.id}`}
                  onClick={() => onSelectGrade(grade.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-md shadow-emerald-700/20 scale-[1.02]'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-white text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {gradeNum}
                    </span>
                    <span className="font-bold text-sm leading-none">{grade.name.replace(' ابتدائي', '')}</span>
                  </div>
                  <span className={`text-[11px] line-clamp-1 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {gradeNum <= 2 ? 'مرحلة 1 (كفايات أولى)' : gradeNum <= 4 ? 'مرحلة 2 (+ فرنسية)' : 'مرحلة 3 (+ إنكليزية)'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier 2: Trimester & Unit Selection */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-1 border-t border-slate-100">
          
          {/* Trimesters (3) */}
          <div className="md:col-span-6 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              الثلاثي:
            </span>
            <div className="grid grid-cols-3 gap-1.5 w-full">
              {([1, 2, 3] as TrimesterNumber[]).map((tNum) => {
                const isSelected = currentTrimester === tNum;
                const info = TRIMESTER_INFO[tNum];
                return (
                  <button
                    key={tNum}
                    id={`trimester-btn-${tNum}`}
                    onClick={() => {
                      onSelectTrimester(tNum);
                      // Auto pick first unit of that trimester
                      onSelectUnit(info.units[0]);
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center border ${
                      isSelected
                        ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>{info.arabicName}</div>
                    <div className={`text-[10px] font-normal ${isSelected ? 'text-teal-200' : 'text-slate-400'}`}>
                      {info.period}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Units within Trimester (2 per Trimester) */}
          <div className="md:col-span-6 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 shrink-0">
              الوحدات:
            </span>
            <div className="grid grid-cols-2 gap-2 w-full">
              {trimesterUnits.map((uNum) => {
                const isSelected = currentUnitNumber === uNum;
                const unitTitle = currentGrade.units[uNum]?.unitTitle.split(':')[0] || `الوحدة ${uNum}`;
                return (
                  <button
                    key={uNum}
                    id={`unit-btn-${uNum}`}
                    onClick={() => onSelectUnit(uNum)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-right flex items-center justify-between border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-emerald-50/60 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
                    }`}
                  >
                    <span>{unitTitle}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-200/80 text-emerald-800'
                    }`}>
                      5 أسابيع
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Tier 3: Subject Filter Chips & View Mode Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          
          {/* Subject Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 shrink-0 ml-1">
              تصفية المادة:
            </span>
            <button
              id="filter-subject-all"
              onClick={() => onSelectSubjectFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                currentSubjectFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              جميع المواد ({currentGrade.availableSubjects.length})
            </button>

            {currentGrade.availableSubjects.map((s) => {
              const isSelected = currentSubjectFilter === s.id;
              const meta = SUBJECT_INFO[s.id];
              return (
                <button
                  key={s.id}
                  id={`filter-subject-${s.id}`}
                  onClick={() => onSelectSubjectFilter(s.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                      : `${meta?.bgLight || 'bg-slate-50'} ${meta?.color || 'text-slate-700'} ${meta?.border || 'border-slate-200'} hover:opacity-80`
                  }`}
                >
                  <i className={`fa-solid ${s.icon} text-xs`}></i>
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>

          {/* View Modes */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-start lg:self-center">
            <button
              id="view-mode-table"
              onClick={() => setActiveView('table')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'table'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>جدول الأسابيع</span>
            </button>

            <button
              id="view-mode-overview"
              onClick={() => setActiveView('overview')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'overview'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>بطاقة الوحدة</span>
            </button>

            <button
              id="view-mode-subject"
              onClick={() => setActiveView('subject')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'subject'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>استكشاف المادة</span>
            </button>

            <button
              id="view-mode-search"
              onClick={() => setActiveView('search')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'search'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>البحث</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
