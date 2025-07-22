import React from 'react';
import { Heart, User, Search, LogOut, Moon, Sun } from 'lucide-react';

export default function Header({ 
  currentView, 
  onViewChange, 
  searchTerm, 
  onSearchChange, 
  user, 
  onAuthClick, 
  onLogout,
  isDarkMode,
  onToggleDarkMode
}) {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-rose-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GiveWell
            </h1>
          </div>
          
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search charities..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => onViewChange('browse')}
              className={`font-medium transition-colors ${
                currentView === 'browse'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
              }`}
            >
              Browse
            </button>
            
            {user ? (
              <>
                <button
                  onClick={() => onViewChange('dashboard')}
                  className={`font-medium transition-colors ${
                    currentView === 'dashboard'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </button>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-black dark:from-gray-600 dark:to-gray-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.name.split(' ')[0]}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onAuthClick}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onAuthClick}
                  className="px-4 py-2 bg-gradient-to-r from-gray-800 to-black dark:from-gray-700 dark:to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-800 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  Get Started
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}