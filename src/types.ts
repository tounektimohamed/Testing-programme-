/**
 * Tunisian Primary Curriculum Planner - Types
 * البرامج الرسمية لوزارة التربية التونسية
 */

export type GradeId = 'grade1' | 'grade2' | 'grade3' | 'grade4' | 'grade5' | 'grade6';

export type TrimesterId = 1 | 2 | 3;
export type TrimesterNumber = TrimesterId;

export type UnitId = 1 | 2 | 3 | 4 | 5 | 6;
export type UnitNumber = UnitId;

export type SubjectId =
  | 'arabic'
  | 'french'
  | 'english'
  | 'math'
  | 'science'
  | 'history'
  | 'geography'
  | 'islamic'
  | 'civics';

export interface WeekPlan {
  weekNumber: 1 | 2 | 3 | 4 | 5;
  title: string;
  type: 'learning' | 'integration' | 'evaluation';
  content: string[];
  subCompetencies?: string[];
  activities?: string;
  evaluationCriteria?: string[];
}

export interface SubjectUnitPlan {
  subjectId: SubjectId;
  subjectName: string;
  category: 'languages' | 'sciences' | 'social' | 'arts_skills';
  unitTheme: string;
  targetedCompetency: string;
  weeks: {
    week1: WeekPlan;
    week2: WeekPlan;
    week3: WeekPlan;
    week4: WeekPlan; // Integration
    week5: WeekPlan; // Evaluation & Remediation
  };
  projectSuggestion?: string;
}

export interface UnitData {
  unitNumber: UnitNumber;
  trimester: TrimesterNumber;
  unitTitle: string;
  unitGeneralTheme: string;
  unitProject: string;
  subjects: Record<string, SubjectUnitPlan>;
}

export interface GradeData {
  id: GradeId;
  name: string;
  subtitle: string;
  cycle: string;
  availableSubjects: { id: SubjectId; name: string; icon: string; category: string }[];
  units: Record<UnitNumber, UnitData>;
}


export interface FilterState {
  grade: GradeId;
  trimester: TrimesterId | 'all';
  unit: UnitId | 'all';
  subject: string | 'all';
  weekType: 'all' | 'learning' | 'integration' | 'evaluation';
  searchQuery: string;
}
