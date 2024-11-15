export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  attempts: number;
  averageScore: number;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
}