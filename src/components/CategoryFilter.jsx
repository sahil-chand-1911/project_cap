import React from 'react';
import { GraduationCap, Heart, Leaf, Home, Dog, Shield } from 'lucide-react';

const iconMap = {
  GraduationCap,
  Heart,
  Leaf,
  Home,
  Dog,
  Shield,
};

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browse by Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <button
          onClick={() => onCategoryChange('all')}
          className={`p-4 rounded-lg text-center transition-all ${
            selectedCategory === 'all'
              ? 'bg-gray-800 dark:bg-gray-700 text-white shadow-lg transform scale-105'
              : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          <div className="text-2xl mb-2">🌟</div>
          <div className="text-sm font-medium">All Causes</div>
          <div className="text-xs mt-1 opacity-75">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </div>
        </button>
        
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon];
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`p-4 rounded-lg text-center transition-all ${
                selectedCategory === category.id
                  ? 'bg-gray-800 dark:bg-gray-700 text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <IconComponent className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">{category.name}</div>
              <div className="text-xs mt-1 opacity-75">{category.count}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}