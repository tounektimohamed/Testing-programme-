import React from 'react';
import { FIVE_WEEK_SYSTEM_EXPLANATION } from '../data/curriculum';
import { Sparkles, BookOpen, CheckCircle2, Target, ShieldCheck, AlertCircle } from 'lucide-react';

interface FiveWeekGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FiveWeekGuideModal: React.FC<FiveWeekGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg shadow-xs">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {FIVE_WEEK_SYSTEM_EXPLANATION.title}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                المرجعية البيداغوجية الرسمية — وزارة التربية التونسية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-xl text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Intro */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
          {FIVE_WEEK_SYSTEM_EXPLANATION.description}
        </div>

        {/* The 3 Phases */}
        <div className="space-y-4">
          {FIVE_WEEK_SYSTEM_EXPLANATION.weeks.map((phase, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${phase.color} space-y-2`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-white/80 border shadow-2xs">
                  {phase.weeks}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/90">
                  {phase.badge}
                </span>
              </div>
              <h3 className="font-black text-sm text-slate-900">
                {phase.label}
              </h3>
              <p className="text-xs leading-relaxed text-slate-800">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Inspector Tips */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>توجيهات التفقد البيداغوجي للمدرسين والمربين:</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span>
                <strong>الالتزام بالإيقاع:</strong> عدم تقديم دروس تعلم جديدة خلال أسبوعي الإدماج والتقييم، وتخصيصهما كلياً للأنشطة المركبة والدعم.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span>
                <strong>مشروع الوحدة:</strong> ينطلق العمل فيه منذ الأسبوع الأول ويتم تتويجه وعرضه خلال أسبوع الإدماج (الأسبوع 4).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span>
                <strong>بيداغوجيا الفوارق (Différenciation):</strong> استغلال حصص العلاج في الأسبوع 5 لتقسيم المتعلمين إلى مجموعات حاجة لمعالجة صعوبات دقيقة.
              </span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            فهمت، إغلاق الدليل
          </button>
        </div>

      </div>
    </div>
  );
};
