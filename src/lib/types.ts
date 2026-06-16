export interface Question {
  id: number;
  question: string;
  answer: string;
}

export interface Session {
  id: string;
  name: string;
  created_at: number;
  last_used_at: number;
}

export interface QuestionWeight {
  session_id: string;
  question_id: number;
  weight: number;
}

export interface AnswerRecord {
  id: string;
  session_id: string;
  question_id: number;
  user_answer: string;
  score: number;
  feedback: string;
  answered_at: number;
}

export interface EvaluateResult {
  score: number;
  feedback: string;
}

export interface Stats {
  total_answers: number;
  average_score: number;
  coverage: number;
  total_questions: number;
  lowest_scores: { question_id: number; question: string; avg_score: number }[];
  histogram: Record<number, number>;
  question_scores: { question_id: number; last_score: number | null }[];
}
