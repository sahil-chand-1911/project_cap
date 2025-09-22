// import React from 'react';
// import { X, MapPin, Star, Users, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
// import { Charity } from '../types';

// interface CharityDetailsProps {
//   charity: Charity;
//   isOpen: boolean;
//   onClose: () => void;
//   onDonate: (charity: Charity) => void;
// }

// export default function CharityDetails({ charity, isOpen, onClose, onDonate }: CharityDetailsProps) {
//   if (!isOpen) return null;

//   const progressPercentage = (charity.raised / charity.goal) * 100;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="relative">
//           <img
//             src={charity.image}
//             alt={charity.name}
//             className="w-full h-64 object-cover"
//           />
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-600 hover:text-gray-800 p-2 rounded-full transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//           <div className="absolute bottom-4 left-4">
//             {charity.verified ? (
//               <div className="bg-green-500 text-white px-3 py-2 rounded-full flex items-center space-x-2 font-medium">
//                 <CheckCircle className="w-4 h-4" />
//                 <span>Verified Organization</span>
//               </div>
//             ) : (
//               <div className="bg-yellow-500 text-white px-3 py-2 rounded-full flex items-center space-x-2 font-medium">
//                 <AlertTriangle className="w-4 h-4" />
//                 <span>Verification Pending</span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="p-8">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="md:col-span-2">
//               <h1 className="text-3xl font-bold text-gray-900 mb-4">{charity.name}</h1>
              
//               <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
//                 <div className="flex items-center space-x-2">
//                   <MapPin className="w-4 h-4" />
//                   <span>{charity.location}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                   <span>{charity.rating} rating</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Users className="w-4 h-4" />
//                   <span>{charity.donorCount} donors</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Globe className="w-4 h-4" />
//                   <a href={charity.website} className="text-blue-600 hover:underline">
//                     Visit Website
//                   </a>
//                 </div>
//               </div>

//               <p className="text-gray-700 mb-6 leading-relaxed">{charity.description}</p>

//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Focus Areas</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {charity.causes.map((cause, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
//                     >
//                       {cause}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="md:col-span-1">
//               <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
//                 <div className="mb-6">
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="text-gray-600">Raised so far</span>
//                     <span className="font-medium">
//                       ${charity.raised.toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
//                     <div
//                       className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
//                       style={{ width: `${Math.min(progressPercentage, 100)}%` }}
//                     />
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>{progressPercentage.toFixed(1)}% complete</span>
//                     <span>Goal: ${charity.goal.toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => onDonate(charity)}
//                   className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold shadow-md hover:shadow-lg mb-4"
//                 >
//                   Donate Now
//                 </button>

//                 <div className="text-center">
//                   <p className="text-xs text-gray-500">
//                     Tax-deductible • Secure payment • Instant receipt
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }