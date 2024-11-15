import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Menu, X, Bell, Trophy, Brain } from 'lucide-react';
import useAuthStore from '../stores/authStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Code2 className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">TECHNOVERSE</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/events" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                Events
              </Link>
              <Link to="/competitions" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                Competitions
              </Link>
              <Link to="/quizzes" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md flex items-center">
                <Brain className="h-4 w-4 mr-1" />
                Quizzes
              </Link>
              <Link to="/projects" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                Projects
              </Link>
              <Link to="/blog" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                Blog
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                    Dashboard
                  </Link>
                  <button className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button
                    onClick={logout}
                    className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/events"
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md"
            >
              Events
            </Link>
            <Link
              to="/competitions"
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md"
            >
              Competitions
            </Link>
            <Link
              to="/quizzes"
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md"
            >
              Quizzes
            </Link>
            <Link
              to="/projects"
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md"
            >
              Projects
            </Link>
            <Link
              to="/blog"
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md"
            >
              Blog
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-white hover:bg-indigo-500 block w-full text-left px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}