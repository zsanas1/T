import React from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import useAuthStore from '../stores/authStore';
import { Event } from '../types/event';

export default function Events() {
  const { user } = useAuthStore();
  const { data: events, isLoading } = useQuery<Event[]>('events', () =>
    api.get('/events').then((res) => res.data)
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
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        {user && (
          <Link
            to="/events/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          >
            Create Event
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events?.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={event.bannerUrl}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-sm ${
                  event.status === 'upcoming'
                    ? 'bg-green-100 text-green-800'
                    : event.status === 'ongoing'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(event.date + ' ' + event.time), 'PPp')}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {event.registeredCount} / {event.capacity} registered
                </div>
              </div>
              <Link
                to={`/events/${event.id}`}
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