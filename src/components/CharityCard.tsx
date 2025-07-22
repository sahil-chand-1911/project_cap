import React from 'react';
import { MapPin, Star, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { Charity } from '../types';

interface CharityCardProps {
  charity: Charity;
  onDonate: (charity: Charity) => void;
  onViewDetails: (charity: Charity) => void;
}

export default function CharityCard({ charity, onDonate, onViewDetails }: CharityCardProps) {
  const progressPercentage = (charity.raised / charity.goal) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={charity.image}
          alt={charity.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          {charity.verified ? (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              <span>Verified</span>
            </div>
          ) : (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-medium">
              <AlertTriangle className="w-3 h-3" />
              <span>Pending</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">{charity.name}</h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{charity.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{charity.description}</p>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{charity.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{charity.donorCount} donors</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium">
              ${charity.raised.toLocaleString()} / ${charity.goal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-gray-700 to-black dark:from-gray-600 dark:to-gray-800 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {progressPercentage.toFixed(1)}% of goal reached
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => onViewDetails(charity)}
            className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Learn More
          </button>
          <button
            onClick={() => onDonate(charity)}
            className="flex-1 py-2 px-4 bg-gradient-to-r from-gray-800 to-black dark:from-gray-700 dark:to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-800 transition-all font-medium shadow-md hover:shadow-lg"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}