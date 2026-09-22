import React, { useState, useMemo } from 'react';
import { ALL_GRADES, SUBJECT_INFO, TRIMESTER_INFO } from '../data/curriculum';
import { GradeId, SubjectId, UnitNumber } from '../types';
import { Search, Sparkles, Filter, BookOpen, ArrowRight, ExternalLink } from 'lucide-react';

interface SearchResultItem {
  gradeId: GradeId;
  gradeName: string;
  unitNumber: UnitNumber;
  unitTitle: string;
  subjectId: SubjectId;
  subjectName: string;
  weekNumber: number;
  weekType: 'learning' | 'integration' | 'evaluation';
  weekTitle: string;
  matchedContent: string[];
}

interface SearchExplorerProps {
  onNavigateToLesson: (gradeId: GradeId, unitNumber: UnitNumber, subjectId: SubjectId) => void;
}

export const SearchExplorer: React.FC<SearchExplorerProps> = ({
  onNavigateToLesson,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  // Popular search suggestions
  const suggestions = [
    'الأعداد الكسرية',
    'القسمة الإقليدية',
    'الجملة الفعلية',
    'المبتدأ والخبر',
    'Passé composé',
    'Present simple',
    'الهضم والتنفس',
    'الدارة الكهربائية',
    'تونس في العهد الحفصي',
    'سورة النبأ',
    'حقوق الطفل',
  ];

  // Perform search across all grades, units, subjects, weeks
  const results = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    const found: SearchResultItem[] = [];

    ALL_GRADES.forEach((grade) => {
      if (selectedGradeFilter !== 'all' && grade.id !== selectedGradeFilter) return;

      Object.values(grade.units).forEach((unit) => {
        Object.values(unit.subjects).forEach((subj) => {
          if (selectedSubjectFilter !== 'all' && subj.subjectId !== selectedSubjectFilter) return;

          Object.values(subj.weeks).forEach((w) => {
            const matchesWeekTitle = w.title.toLowerCase().includes(query);
            const matchingContent = w.content.filter((c) => c.toLowerCase().includes(query));

            if (matchesWeekTitle || matchingContent.length > 0) {
              found.push({
                gradeId: grade.id,
                gradeName: grade.name,
                unitNumber: unit.unitNumber,
                unitTitle: unit.unitTitle,
                subjectId: subj.subjectId,
                subjectName: subj.subjectName,
                weekNumber: w.weekNumber,
                weekType: w.type,
                weekTitle: w.title,
                matchedContent: matchingContent.length > 0 ? matchingContent : w.content.slice(0, 2),
              });
            }
          });
        });
      });
    });

    return found;
  }, [searchTerm, selectedGradeFilter, selectedSubjectFilter]);

  return (
    <div className="space-y-5">
      {/* Search Input Box */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-1">
            <Search className="w-5 h-5 text-emerald-600" />
            <span>محرك البحث في البرامج الرسمية التونسية</span>
          </h2>
          <p className="text-xs text-slate-500">
            ابحث بالدرس، المفهوم، القاعدة، المحور، أو السورة عبر جميع السنوات الابتدائية (1 - 6)
          </p>
        </div>

        {/* Input Field */}
        <div className="relative">
          <input
            id="curriculum-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="اكتب كلمة البحث (مثال: الكسور، الإدماج، Passé composé، الجهاز الهضمي، سورة الملك...)"
            className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 focus:border-emerald-600 rounded-xl text-sm font-medium focus:outline-hidden transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute left-10 top-3 text-xs text-slate-400 hover:text-slate-600 px-2 py-0.5 rounded cursor-pointer"
            >
              مسح
            </button>
          )}
        </div>

        {/* Quick Search Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-slate-400 shrink-0">اقتراحات سريعة:</span>
          {suggestions.map((sug) => (
            <button
              key={sug}
              onClick={() => setSearchTerm(sug)}
              className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-500">تصفية بالسنة:</span>
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              <option value="all">كل السنوات (1 - 6)</option>
              {ALL_GRADES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-500">تصفية بالمادة:</span>
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              <option value="all">كل المواد</option>
              <option value="arabic">اللغة العربية</option>
              <option value="french">اللغة الفرنسية</option>
              <option value="english">اللغة الإنكليزية</option>
              <option value="math">الرياضيات</option>
              <option value="science">الإيقاظ العلمي</option>
              <option value="history">التاريخ</option>
              <option value="geography">الجغرافيا</option>
              <option value="islamic">التربية الإسلامية</option>
              <option value="civics">التربية المدنية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results Display */}
      {searchTerm.trim() ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              تم العثور على <strong className="text-emerald-700 font-bold">{results.length}</strong> نتيجة
            </span>
            <span>البحث في قاعدة بيانات المنهاج التونسي الرسمي</span>
          </div>

          {results.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <p className="text-slate-500 text-sm">
                لم يتم العثور على نتائج تطابق "{searchTerm}". جرب البحث بكلمات أخرى كاسم الدرس أو المفهوم.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((item, idx) => {
                const meta = SUBJECT_INFO[item.subjectId];
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded">
                            {item.gradeName}
                          </span>
                          <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded">
                            الوحدة {item.unitNumber}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.weekType === 'learning'
                              ? 'bg-blue-50 text-blue-800'
                              : item.weekType === 'integration'
                              ? 'bg-amber-50 text-amber-800'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          الأسبوع {item.weekNumber} ({item.weekType === 'learning' ? 'تعلم' : item.weekType === 'integration' ? 'إدماج' : 'تقييم'})
                        </span>
                      </div>

                      {/* Subject and Lesson Title */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${meta?.bgLight || 'bg-slate-100'} ${meta?.color || 'text-slate-700'}`}>
                          <i className={`fa-solid ${meta?.icon || 'fa-book'}`}></i>
                        </span>
                        <span className="text-xs font-black text-slate-800">
                          {item.subjectName}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mb-2">
                        {item.weekTitle}
                      </h4>

                      {/* Content excerpts */}
                      <ul className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
                        {item.matchedContent.map((c, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                            <span className="line-clamp-2">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => onNavigateToLesson(item.gradeId, item.unitNumber, item.subjectId)}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-emerald-200"
                    >
                      <span>عرض في جدول المنهاج</span>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 text-center space-y-2">
          <BookOpen className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="text-sm font-bold text-emerald-950">
            قاعدة البيانات المنهجية الكاملة جاهزة للبحث
          </h3>
          <p className="text-xs text-emerald-800 max-w-lg mx-auto">
            تحتوي المنظومة على التوزيع الرسمي لجميع مواد التعليم الابتدائي في تونس (اللغة العربية، الفرنسية، الإنكليزية، الرياضيات، الإيقاظ العلمي، التاريخ، الجغرافيا، التربية الإسلامية، التربية المدنية) عبر الأسابيع الخمسة.
          </p>
        </div>
      )}
    </div>
  );
};
