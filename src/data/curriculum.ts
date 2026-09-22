import { GradeData, GradeId, SubjectId, TrimesterNumber, UnitNumber } from '../types';
import { grade1Data } from './grades/grade1';
import { grade2Data } from './grades/grade2';
import { grade3Data } from './grades/grade3';
import { grade4Data } from './grades/grade4';
import { grade5Data } from './grades/grade5';
import { grade6Data } from './grades/grade6';

export const ALL_GRADES: GradeData[] = [
  grade1Data,
  grade2Data,
  grade3Data,
  grade4Data,
  grade5Data,
  grade6Data,
];

export const GRADES_MAP: Record<GradeId, GradeData> = {
  grade1: grade1Data,
  grade2: grade2Data,
  grade3: grade3Data,
  grade4: grade4Data,
  grade5: grade5Data,
  grade6: grade6Data,
};

export const SUBJECT_INFO: Record<SubjectId, { name: string; icon: string; category: 'languages' | 'sciences' | 'social'; color: string; bgLight: string; border: string }> = {
  arabic: {
    name: 'اللغة العربية',
    icon: 'fa-book-open',
    category: 'languages',
    color: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  french: {
    name: 'اللغة الفرنسية (Français)',
    icon: 'fa-feather',
    category: 'languages',
    color: 'text-sky-700',
    bgLight: 'bg-sky-50',
    border: 'border-sky-200',
  },
  english: {
    name: 'اللغة الإنكليزية (English)',
    icon: 'fa-language',
    category: 'languages',
    color: 'text-indigo-700',
    bgLight: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  math: {
    name: 'الرياضيات',
    icon: 'fa-calculator',
    category: 'sciences',
    color: 'text-amber-700',
    bgLight: 'bg-amber-50',
    border: 'border-amber-200',
  },
  science: {
    name: 'الإيقاظ العلمي',
    icon: 'fa-flask',
    category: 'sciences',
    color: 'text-teal-700',
    bgLight: 'bg-teal-50',
    border: 'border-teal-200',
  },
  history: {
    name: 'التاريخ',
    icon: 'fa-landmark-dome',
    category: 'social',
    color: 'text-rose-700',
    bgLight: 'bg-rose-50',
    border: 'border-rose-200',
  },
  geography: {
    name: 'الجغرافيا',
    icon: 'fa-earth-africa',
    category: 'social',
    color: 'text-cyan-700',
    bgLight: 'bg-cyan-50',
    border: 'border-cyan-200',
  },
  islamic: {
    name: 'التربية الإسلامية',
    icon: 'fa-mosque',
    category: 'social',
    color: 'text-green-800',
    bgLight: 'bg-green-50',
    border: 'border-green-200',
  },
  civics: {
    name: 'التربية المدنية',
    icon: 'fa-scale-balanced',
    category: 'social',
    color: 'text-purple-700',
    bgLight: 'bg-purple-50',
    border: 'border-purple-200',
  },
};

export const TRIMESTER_INFO: Record<TrimesterNumber, { name: string; arabicName: string; units: UnitNumber[]; period: string }> = {
  1: {
    name: 'الثلاثي الأول (Trimestre 1)',
    arabicName: 'الثلاثي الأول',
    units: [1, 2],
    period: 'سبتمبر - ديسمبر',
  },
  2: {
    name: 'الثلاثي الثاني (Trimestre 2)',
    arabicName: 'الثلاثي الثاني',
    units: [3, 4],
    period: 'جانفي - مارس',
  },
  3: {
    name: 'الثلاثي الثالث (Trimestre 3)',
    arabicName: 'الثلاثي الثالث',
    units: [5, 6],
    period: 'أفريل - جوان',
  },
};

export const FIVE_WEEK_SYSTEM_EXPLANATION = {
  title: 'نظام الـ 5 أسابيع التونسي الرسمي (Système des 5 semaines)',
  description: 'يعتمد المنهاج الرسمي التونسي على تقسيم كل ثلاثي إلى وحدتين تعليميتين (6 وحدات في السنة)، وكل وحدة تتبع إيقاعاً بيداغوجياً دقيقاً مدته 5 أسابيع:',
  weeks: [
    {
      weeks: 'الأسابيع 1 و 2 و 3',
      label: 'أسابيع التعلم واكتساب المعارف (Semaines d\'apprentissage)',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      badge: 'تعلم وبناء',
      desc: 'بناء الكفايات الأساسية في القراءة، القواعد، الحساب، الإيقاظ العلمي والعلوم الاجتماعية من خلال وضعيات استكشافية وتدريبية متدرجة.',
    },
    {
      weeks: 'الأسبوع 4',
      label: 'أسبوع الإدماج (Semaine d\'intégration)',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      badge: 'إدماج مركب',
      desc: 'إدماج المكتسبات المعرفية والمنهجية في حل وضعيات مشكل معقدة وشاملة ومشروع الوحدة لتوظيف المهارات في سياق واقعي.',
    },
    {
      weeks: 'الأسبوع 5',
      label: 'أسبوع التقييم والدعم والعلاج (Semaine d\'évaluation et de remédiation)',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badge: 'تقييم وعلاج',
      desc: 'إنجاز الاختبارات التحصيلية المعيارية، رصد الثغرات التعليمية، وتطبيق خطط الدعم والإنقاذ البيداغوجي الفردي والجماعي.',
    },
  ],
};
