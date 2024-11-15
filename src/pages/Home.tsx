import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Users, Calendar, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Welcome to <span className="text-indigo-600">TECHNOVERSE</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Fostering innovation and collaboration in technology
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500"
          >
            Join Our Community
          </Link>
          <Link
            to="/projects"
            className="rounded-md border border-indigo-600 px-6 py-3 text-indigo-600 hover:bg-indigo-50"
          >
            View Projects
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Code2 className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Innovative Projects</h3>
          <p className="text-gray-600">
            Collaborate on cutting-edge technical projects with fellow enthusiasts
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Community</h3>
          <p className="text-gray-600">
            Join a vibrant community of tech-savvy individuals
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Events</h3>
          <p className="text-gray-600">
            Participate in workshops, hackathons, and tech talks
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Resources</h3>
          <p className="text-gray-600">
            Access learning materials and industry insights
          </p>
        </div>
      </div>

      {/* Latest Events */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Event cards will be dynamically populated */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
              alt="Hackathon"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Annual Hackathon 2024</h3>
              <p className="text-gray-600 mb-4">
                48 hours of coding, innovation, and amazing prizes!
              </p>
              <Link
                to="/events"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Join TECHNOVERSE?</h2>
        <p className="text-lg mb-8">
          Be part of an exciting journey in technology and innovation
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md hover:bg-indigo-50"
        >
          Get Started Today
        </Link>
      </div>
    </div>
  );
}