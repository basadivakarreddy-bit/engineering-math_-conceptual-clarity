
export interface MathConcept {
  id: string;
  title: string;
  category: 'Calculus' | 'Linear Algebra' | 'Differential Equations' | 'Statistics' | 'Algebra' | 'Vectors';
  description: string;
  application: string;
  image: string;
}

export interface ProofStep {
  title: string;
  content: string;
  formula: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FormulaVariable {
  name: string;
  label: string;
  default: number;
  min: number;
  max: number;
  step: number;
}

export interface FormulaStep {
  component: string;
  meaning: string;
}

export interface FormulaData {
  id: string;
  name: string;
  interactiveFormula: string;
  formulaBreakdown: FormulaStep[];
  variables: FormulaVariable[];
  calculate: (values: Record<string, number>) => string;
}

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  formulas: FormulaData[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
