import React, { useState, useEffect } from 'react';
import { GradeId, SubjectId, TrimesterNumber, UnitNumber } from './types';
import { ALL_GRADES, GRADES_MAP } from './data/curriculum';
import { Header } from './components/Header';
import { NavigationFilters } from './components/NavigationFilters';
import { CurriculumTable } from './components/CurriculumTable';
import { UnitOverviewCard } from './components/UnitOverviewCard';
import { SubjectDeepView } from './components/SubjectDeepView';
import { SearchExplorer } from './components/SearchExplorer';
import { FiveWeekGuideModal } from './components/FiveWeekGuideModal';
import { TeacherNotesDrawer } from './components/TeacherNotesDrawer';
import { PrintHeader } from './components/PrintHeader';
import { BookOpen, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentGradeId, setCurrentGradeId] = useState<GradeId>('grade1');
  const [currentTrimester, setCurrentTrimester] = useState<TrimesterNumber>(1);
  const [currentUnitNumber, setCurrentUnitNumber] = useState<UnitNumber>(1);
  const [currentSubjectFilter, setCurrentSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [activeView, setActiveView] = useState<'table' | 'overview' | 'subject' | 'search'>('table');
  const [deepSubjectInitial, setDeepSubjectInitial] = useState<SubjectId | undefined>(undefined);

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Lesson completion tracker persisted in localStorage
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tunisian_curriculum_completed_lessons');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tunisian_curriculum_completed_lessons', JSON.stringify(completedLessons));
    } catch (e) {
      console.error('Failed to save completed lessons', e);
    }
  }, [completedLessons]);

  const handleToggleLesson = (lessonKey: string) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonKey]: !prev[lessonKey],
    }));
  };

  const handleResetCompletedLessons = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة تعيين جميع الدروس المنجزة؟')) {
      setCompletedLessons({});
    }
  };

  const currentGrade = GRADES_MAP[currentGradeId] || GRADES_MAP.grade1;
  const currentUnit = currentGrade.units[currentUnitNumber] || currentGrade.units[1];

  // Handle grade change: reset subject filter if not available
  const handleSelectGrade = (gradeId: GradeId) => {
    setCurrentGradeId(gradeId);
    const newGrade = GRADES_MAP[gradeId];
    if (currentSubjectFilter !== 'all') {
      const exists = newGrade.availableSubjects.some((s) => s.id === currentSubjectFilter);
      if (!exists) {
        setCurrentSubjectFilter('all');
      }
    }
  };

  // Handle unit change
  const handleSelectUnit = (uNum: UnitNumber) => {
    setCurrentUnitNumber(uNum);
    // synchronize trimester
    const tr = (uNum <= 2 ? 1 : uNum <= 4 ? 2 : 3) as TrimesterNumber;
    setCurrentTrimester(tr);
  };

  // Handle Trimester change
  const handleSelectTrimester = (tr: TrimesterNumber) => {
    setCurrentTrimester(tr);
    const startUnit = (tr === 1 ? 1 : tr === 2 ? 3 : 5) as UnitNumber;
    setCurrentUnitNumber(startUnit);
  };

  // Jump to lesson from search
  const handleNavigateFromSearch = (gradeId: GradeId, unitNumber: UnitNumber, subjectId: SubjectId) => {
    setCurrentGradeId(gradeId);
    setCurrentUnitNumber(unitNumber);
    const tr = (unitNumber <= 2 ? 1 : unitNumber <= 4 ? 2 : 3) as TrimesterNumber;
    setCurrentTrimester(tr);
    setCurrentSubjectFilter(subjectId);
    setActiveView('table');
  };

  // Jump to subject view from unit overview
  const handleGoToSubjectDeep = (subjId: string) => {
    setDeepSubjectInitial(subjId as SubjectId);
    setActiveView('subject');
  };

  const completedCount = Object.values(completedLessons).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800">
      
      {/* Print-Only Header */}
      <PrintHeader currentGrade={currentGrade} currentUnit={currentUnit} />

      {/* Main Screen Header & Navbar */}
      <Header
        currentGrade={currentGrade}
        currentUnit={currentUnit}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        completedLessonsCount={completedCount}
      />

      {/* Navigation Filter Controls */}
      <NavigationFilters
        currentGradeId={currentGradeId}
        onSelectGrade={handleSelectGrade}
        currentTrimester={currentTrimester}
        onSelectTrimester={handleSelectTrimester}
        currentUnitNumber={currentUnitNumber}
        onSelectUnit={handleSelectUnit}
        currentSubjectFilter={currentSubjectFilter}
        onSelectSubjectFilter={setCurrentSubjectFilter}
        activeView={activeView}
        setActiveView={setActiveView}
        currentGrade={currentGrade}
      />

      {/* Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1">
        {activeView === 'table' && (
          <CurriculumTable
            currentGrade={currentGrade}
            currentUnit={currentUnit}
            subjectFilter={currentSubjectFilter}
            completedLessons={completedLessons}
            onToggleLesson={handleToggleLesson}
          />
        )}

        {activeView === 'overview' && (
          <UnitOverviewCard
            currentGrade={currentGrade}
            currentUnit={currentUnit}
            onGoToSubject={handleGoToSubjectDeep}
          />
        )}

        {activeView === 'subject' && (
          <SubjectDeepView
            currentGrade={currentGrade}
            initialSubjectId={deepSubjectInitial}
            completedLessons={completedLessons}
            onToggleLesson={handleToggleLesson}
          />
        )}

        {activeView === 'search' && (
          <SearchExplorer onNavigateToLesson={handleNavigateFromSearch} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 px-4 no-print text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-right">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
              ت
            </div>
            <div>
              <p className="font-bold text-slate-800">
                مخطط المناهج الابتدائية التونسية — المرجعية الرسمية المعتمدة
              </p>
              <p className="text-slate-500">
                مطابق للبرامج الرسمية لوزارة التربية التونسية • نظام الـ 5 أسابيع البيداغوجي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>6 سنوات ابتدائية</span>
            <span>•</span>
            <span>6 وحدات بيداغوجية</span>
            <span>•</span>
            <span>30 أسبوعاً بيداغوجياً كاملاً</span>
          </div>
        </div>
      </footer>

      {/* 5-Week Guide Modal */}
      <FiveWeekGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Teacher Notes & Inspector Tracker Drawer */}
      <TeacherNotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        currentGrade={currentGrade}
        currentUnit={currentUnit}
        completedLessonsCount={completedCount}
        onResetCompletedLessons={handleResetCompletedLessons}
      />
    </div>
  );
}
