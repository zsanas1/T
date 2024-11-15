import React from 'react';
import { useQuery } from 'react-query';
import { Calendar, Trophy, Users, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../lib/axios';
import { Competition } from '../types/competition';
import useAuthStore from '../stores/authStore';

export default function Competitions() {
  const { user } = useAuthStore();
  const { data: competitions, isLoading } = useQuery<Competition[]>(
    'competitions',
    () => api.get('/competitions').then((res) => res.data)
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
          <h1 className="text-3xl font-bold text-gray-900">Competitions</h1>
          <p className="mt-2 text-gray-600">Showcase your skills and win exciting prizes</p>
        </div>
        {user?.role === 'admin' && (
          <Link
            to="/competitions/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          >
            Create Competition
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {competitions?.map((competition) => (
          <div key={competition.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={competition.bannerUrl}
              alt={competition.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-sm ${
                  competition.status === 'upcoming'
                    ? 'bg-green-100 text-green-800'
                    : competition.status === 'ongoing'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                </span>
                <div className="flex items-center text-yellow-500">
                  <Trophy className="h-5 w-5 mr-1" />
                  {competition.prize}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{competition.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{competition.description}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Registration Deadline: {format(new Date(competition.registrationDeadline), 'PP')}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Team Size: Up to {competition.maxTeamSize} members
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {competition.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      <Code className="h-3 w-3 mr-1" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/competitions/${competition.id}`}
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}