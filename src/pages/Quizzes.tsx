import React from 'react';
import { useQuery } from 'react-query';
import { Brain, Clock, Award, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import { Quiz } from '../types/quiz';
import useAuthStore from '../stores/authStore';

export default function Quizzes() {
  const { user } = useAuthStore();
  const { data: quizzes, isLoading } = useQuery<Quiz[]>(
    'quizzes',
    () => api.get('/quizzes').then((res) => res.data)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Technical Quizzes</h1>
          <p className="mt-2 text-gray-600">Test your knowledge and track your progress</p>
        </div>
        {user?.role === 'admin' && (
          <Link
            to="/quizzes/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          >
            Create Quiz
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes?.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-sm ${
                  quiz.difficulty === 'beginner'
                    ? 'bg-green-100 text-green-800'
                    : quiz.difficulty === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                </span>
                <span className="text-sm text-gray-500">{quiz.category}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {quiz.duration} minutes
                </div>
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-2" />
                  {quiz.totalQuestions} questions
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  {quiz.attempts} attempts
                </div>
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  {quiz.averageScore}% avg. score
                </div>
              </div>
              <Link
                to={`/quizzes/${quiz.id}`}
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Start Quiz →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}