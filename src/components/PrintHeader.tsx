import React from 'react';
import { GradeData, UnitData } from '../types';
import { TRIMESTER_INFO } from '../data/curriculum';

interface PrintHeaderProps {
  currentGrade: GradeData;
  currentUnit: UnitData;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({
  currentGrade,
  currentUnit,
}) => {
  const trimester = TRIMESTER_INFO[currentUnit.trimester];

  return (
    <div className="hidden print-header space-y-3">
      <div className="flex justify-between items-start text-xs border-b pb-2 border-slate-300">
        <div>
          <p className="font-bold text-slate-900">الجمهورية التونسية</p>
          <p className="font-bold text-slate-900">وزارة التربية</p>
          <p className="text-slate-600">المندوبية الجهوية للتربية: .....................</p>
          <p className="text-slate-600">المدرسة الابتدائية: .............................</p>
        </div>
        <div className="text-center">
          <h1 className="text-base font-black text-slate-900">
            مخطط الوحدة التعليمية ونظام الـ 5 أسابيع
          </h1>
          <p className="text-xs font-bold text-emerald-800">
            البرامج الرسمية لوزارة التربية التونسية
          </p>
          <p className="text-[11px] text-slate-500 font-mono mt-1">السنة الدراسية: 2024 - 2025</p>
        </div>
        <div className="text-left">
          <p className="font-bold text-slate-900">المستوى: {currentGrade.name}</p>
          <p className="text-slate-700">المربي(ة): ............................</p>
          <p className="text-slate-700">المتفقد(ة): ...........................</p>
          <p className="text-slate-700">التاريخ: ..... / ..... / 202...</p>
        </div>
      </div>

      <div className="bg-slate-100 p-2 rounded text-xs flex justify-between items-center border border-slate-300">
        <div>
          <span className="font-bold">الوحدة: </span>
          <span>{currentUnit.unitTitle} ({trimester.arabicName} - {trimester.period})</span>
        </div>
        <div>
          <span className="font-bold">المحور العام: </span>
          <span>{currentUnit.unitGeneralTheme}</span>
        </div>
        <div>
          <span className="font-bold">مشروع الوحدة: </span>
          <span>{currentUnit.unitProject}</span>
        </div>
      </div>
    </div>
  );
};
