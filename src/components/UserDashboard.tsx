// import React, { useState } from 'react';
// import { Calendar, Download, Share2, Trophy, TrendingUp, Heart, Target, Award } from 'lucide-react';
// import { User, Donation, Achievement } from '../types';

// interface UserDashboardProps {
//   user: User;
//   donations: Donation[];
//   onShare: (achievement: Achievement) => void;
// }

// export default function UserDashboard({ user, donations, onShare }: UserDashboardProps) {
//   const [activeTab, setActiveTab] = useState('overview');

//   const monthlyDonations = donations.filter(d => d.recurring && d.frequency === 'monthly');
//   const totalMonthlyCommitment = monthlyDonations.reduce((sum, d) => sum + d.amount, 0);
//   const completedDonations = donations.filter(d => d.status === 'completed');
//   const earnedAchievements = user.achievements.filter(a => a.earned);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Dashboard Header */}
//       <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white mb-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
//             <p className="text-blue-100">Thank you for making a difference in the world</p>
//           </div>
//           <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4 text-center">
//             <div className="bg-white bg-opacity-20 rounded-lg p-4">
//               <div className="text-2xl font-bold">${user.totalDonated}</div>
//               <div className="text-sm text-blue-100">Total Donated</div>
//             </div>
//             <div className="bg-white bg-opacity-20 rounded-lg p-4">
//               <div className="text-2xl font-bold">{user.charityCount}</div>
//               <div className="text-sm text-blue-100">Charities Supported</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-sm mb-8">
//         <div className="border-b">
//           <nav className="flex space-x-8 px-6">
//             {[
//               { id: 'overview', name: 'Overview', icon: TrendingUp },
//               { id: 'donations', name: 'Donation History', icon: Heart },
//               { id: 'achievements', name: 'Achievements', icon: Trophy },
//             ].map((tab) => {
//               const IconComponent = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
//                     activeTab === tab.id
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <IconComponent className="w-4 h-4" />
//                   <span>{tab.name}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         <div className="p-6">
//           {activeTab === 'overview' && (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <Target className="w-8 h-8 text-emerald-600" />
//                   <span className="text-2xl font-bold text-emerald-700">
//                     ${totalMonthlyCommitment}
//                   </span>
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-1">Monthly Commitment</h3>
//                 <p className="text-sm text-gray-600">Recurring donations per month</p>
//               </div>

//               <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <Calendar className="w-8 h-8 text-indigo-600" />
//                   <span className="text-2xl font-bold text-indigo-700">
//                     {completedDonations.length}
//                   </span>
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-1">Donations Made</h3>
//                 <p className="text-sm text-gray-600">Total completed donations</p>
//               </div>

//               <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <Award className="w-8 h-8 text-violet-600" />
//                   <span className="text-2xl font-bold text-violet-700">
//                     {earnedAchievements.length}
//                   </span>
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-1">Achievements</h3>
//                 <p className="text-sm text-gray-600">Milestones unlocked</p>
//               </div>
//             </div>
//           )}

//           {activeTab === 'donations' && (
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-semibold text-gray-900">Donation History</h2>
//                 <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                   <Download className="w-4 h-4" />
//                   <span>Export</span>
//                 </button>
//               </div>
              
//               {donations.map((donation) => (
//                 <div key={donation.id} className="border rounded-lg p-4 hover:bg-gray-50">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-900 mb-1">
//                         {donation.charityName}
//                       </h3>
//                       <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
//                         <span>${donation.amount}</span>
//                         <span>{new Date(donation.date).toLocaleDateString()}</span>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           donation.status === 'completed' 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {donation.status}
//                         </span>
//                         {donation.recurring && (
//                           <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
//                             Recurring ({donation.frequency})
//                           </span>
//                         )}
//                       </div>
//                       {donation.taxDeductible && (
//                         <p className="text-xs text-gray-500">Tax-deductible donation</p>
//                       )}
//                     </div>
//                     <div className="flex space-x-2">
//                       <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
//                         Receipt
//                       </button>
//                       <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
//                         <Share2 className="w-3 h-3" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeTab === 'achievements' && (
//             <div className="space-y-6">
//               <h2 className="text-xl font-semibold text-gray-900">Your Achievements</h2>
              
//               <div className="grid md:grid-cols-2 gap-6">
//                 {user.achievements.map((achievement) => (
//                   <div
//                     key={achievement.id}
//                     className={`border rounded-lg p-6 ${
//                       achievement.earned 
//                         ? 'bg-gradient-to-br from-yellow-50 to-amber-100 border-amber-200' 
//                         : 'bg-gray-50 border-gray-200 opacity-60'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                         achievement.earned 
//                           ? 'bg-amber-200 text-amber-800' 
//                           : 'bg-gray-200 text-gray-400'
//                       }`}>
//                         <Trophy className="w-6 h-6" />
//                       </div>
//                       {achievement.earned && (
//                         <button
//                           onClick={() => onShare(achievement)}
//                           className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
//                         >
//                           <Share2 className="w-3 h-3" />
//                           <span>Share</span>
//                         </button>
//                       )}
//                     </div>
                    
//                     <h3 className={`font-semibold mb-2 ${
//                       achievement.earned ? 'text-gray-900' : 'text-gray-500'
//                     }`}>
//                       {achievement.title}
//                     </h3>
                    
//                     <p className={`text-sm ${
//                       achievement.earned ? 'text-gray-700' : 'text-gray-500'
//                     }`}>
//                       {achievement.description}
//                     </p>
                    
//                     {achievement.earned && achievement.earnedDate && (
//                       <p className="text-xs text-amber-700 mt-2">
//                         Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }