import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Trash2, Download, Save, Sparkles } from 'lucide-react';
import { GradeData, UnitData } from '../types';

interface TeacherNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: GradeData;
  currentUnit: UnitData;
  completedLessonsCount: number;
  onResetCompletedLessons: () => void;
}

export const TeacherNotesDrawer: React.FC<TeacherNotesDrawerProps> = ({
  isOpen,
  onClose,
  currentGrade,
  currentUnit,
  completedLessonsCount,
  onResetCompletedLessons,
}) => {
  const notesKey = `teacher_notes_${currentGrade.id}_u${currentUnit.unitNumber}`;
  const [noteContent, setNoteContent] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(notesKey) || '';
      setNoteContent(saved);
    }
  }, [isOpen, notesKey]);

  const handleSave = () => {
    localStorage.setItem(notesKey, noteContent);
    setSaveStatus('تم الحفظ بنجاح ✓');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleDownloadNotes = () => {
    const text = `مفكرة المربي البيداغوجية\nالمستوى: ${currentGrade.name}\nالوحدة: ${currentUnit.unitTitle}\n\nملاحظات وتوجيهات:\n${noteContent}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ملاحظات_${currentGrade.id}_الوحدة_${currentUnit.unitNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs no-print">
      <div className="bg-white w-full max-w-md h-full shadow-2xl p-5 flex flex-col justify-between border-r border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-black text-sm text-slate-900">مفكرة المربي والتفقد</h3>
                <span className="text-xs text-slate-500">
                  {currentGrade.name} • الوحدة {currentUnit.unitNumber}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Completed Lessons Tracker Badge */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-950">إجمالي الدروس المنجزة:</span>
              </div>
              <span className="bg-indigo-600 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded-full">
                {completedLessonsCount} درس
              </span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-indigo-100">
              <span className="text-[11px] text-indigo-700">تتبع تقدمك عبر النقر على علامات الدوائر في الجدول</span>
              {completedLessonsCount > 0 && (
                <button
                  onClick={onResetCompletedLessons}
                  className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                >
                  إعادة ضبط
                </button>
              )}
            </div>
          </div>

          {/* Notes Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              ملاحظات بيداغوجية ومتابعة صعوبات المتعلمين:
            </label>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="سجل ملاحظاتك هنا: خطة الدعم للأسبوع الخامس، ملاحظات أسبوع الإدماج، التلاميذ ذوي الحاجة إلى علاج..."
              rows={12}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs leading-relaxed focus:bg-white focus:border-indigo-500 focus:outline-hidden resize-none font-medium"
            />
            {saveStatus && (
              <span className="text-xs font-bold text-emerald-600 block animate-fade-in">
                {saveStatus}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={handleDownloadNotes}
            disabled={!noteContent.trim()}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تنزيل</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>حفظ الملاحظات</span>
          </button>
        </div>

      </div>
    </div>
  );
};
