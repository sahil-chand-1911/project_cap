import React, { useState } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import CategoryFilter from './components/CategoryFilter';
import CharityCard from './components/CharityCard';
import DonationModal from './components/DonationModal';
import CharityDetails from './components/CharityDetails';
import UserDashboard from './components/UserDashboard';
import { categories, charities, userDonations } from './data/mockData';
import { Charity, Donation, Achievement } from './types';

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentView, setCurrentView] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [donations, setDonations] = useState(userDonations);

  // Filter charities based on category and search
  const filteredCharities = charities.filter((charity) => {
    const matchesCategory = selectedCategory === 'all' || charity.category === selectedCategory;
    const matchesSearch = charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         charity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDonate = (charity: Charity) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedCharity(charity);
    setIsDonationModalOpen(true);
  };

  const handleViewDetails = (charity: Charity) => {
    setSelectedCharity(charity);
    setIsDetailsModalOpen(true);
  };

  const handleAuth = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('browse');
  };

  const handleAuthClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleCompleteDonation = (newDonation: Omit<Donation, 'id' | 'date' | 'status' | 'receiptUrl'>) => {
    const donation: Donation = {
      ...newDonation,
      id: `d${donations.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      receiptUrl: '#',
    };
    
    setDonations([...donations, donation]);
    setIsDonationModalOpen(false);
    
    // Show success message (in a real app, this would be a toast notification)
    alert(`Thank you for your ${donation.recurring ? 'recurring ' : ''}donation of $${donation.amount} to ${donation.charityName}!`);
  };

  const handleShareAchievement = (achievement: Achievement) => {
    if (navigator.share) {
      navigator.share({
        title: `I earned the "${achievement.title}" achievement!`,
        text: `I just unlocked a new achievement on GiveWell: ${achievement.description}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers without Web Share API
      const text = `I just unlocked a new achievement on GiveWell: ${achievement.title} - ${achievement.description}`;
      navigator.clipboard.writeText(text);
      alert('Achievement copied to clipboard! You can now paste it to share.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        user={user}
        onAuthClick={handleAuthClick}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onAuth={handleAuth}
      />

      {currentView === 'browse' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedCategory === 'all' 
                ? 'All Charities' 
                : `${categories.find(c => c.id === selectedCategory)?.name} Charities`}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredCharities.length} organization{filteredCharities.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCharities.map((charity) => (
              <CharityCard
                key={charity.id}
                charity={charity}
                onDonate={handleDonate}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {filteredCharities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No charities found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="mt-4 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {currentView === 'dashboard' && (
        user ? (
        <UserDashboard
          user={{
            id: 'u1',
            name: user.name,
            email: user.email,
            totalDonated: donations.reduce((sum, d) => sum + d.amount, 0),
            charityCount: new Set(donations.map(d => d.charityId)).size,
            joinDate: '2024-01-01',
            achievements: [],
          }}
          donations={donations}
          onShare={handleShareAchievement}
        />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please sign in to view your dashboard</h2>
            <button
              onClick={handleAuthClick}
              className="px-6 py-3 bg-gradient-to-r from-gray-800 to-black dark:from-gray-700 dark:to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-800 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </div>
        )
      )}

      {selectedCharity && (
        <>
          <DonationModal
            charity={selectedCharity}
            isOpen={isDonationModalOpen}
            onClose={() => setIsDonationModalOpen(false)}
            onDonate={handleCompleteDonation}
          />
          
          <CharityDetails
            charity={selectedCharity}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            onDonate={handleDonate}
          />
        </>
      )}
    </div>
  );
}

export default App;