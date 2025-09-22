// import React, { useState } from 'react';
// import { X, CreditCard, Heart, Calendar, DollarSign } from 'lucide-react';
// import { Charity, Donation } from '../types';

// interface DonationModalProps {
//   charity: Charity;
//   isOpen: boolean;
//   onClose: () => void;
//   onDonate: (donation: Omit<Donation, 'id' | 'date' | 'status' | 'receiptUrl'>) => void;
// }

// export default function DonationModal({ charity, isOpen, onClose, onDonate }: DonationModalProps) {
//   const [amount, setAmount] = useState(50);
//   const [customAmount, setCustomAmount] = useState('');
//   const [isRecurring, setIsRecurring] = useState(false);
//   const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

//   if (!isOpen) return null;

//   const handleDonate = () => {
//     const donationAmount = customAmount ? parseInt(customAmount) : amount;
    
//     onDonate({
//       charityId: charity.id,
//       charityName: charity.name,
//       amount: donationAmount,
//       recurring: isRecurring,
//       frequency: isRecurring ? frequency : undefined,
//       taxDeductible: true,
//     });
    
//     onClose();
//   };

//   const presetAmounts = [25, 50, 100, 250, 500];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">Make a Donation</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="mb-6">
//             <div className="flex items-center space-x-3 mb-4">
//               <img
//                 src={charity.image}
//                 alt={charity.name}
//                 className="w-16 h-16 object-cover rounded-lg"
//               />
//               <div>
//                 <h3 className="font-semibold text-gray-900">{charity.name}</h3>
//                 <p className="text-sm text-gray-600">{charity.location}</p>
//               </div>
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Donation Amount
//             </label>
//             <div className="grid grid-cols-3 gap-3 mb-4">
//               {presetAmounts.map((preset) => (
//                 <button
//                   key={preset}
//                   onClick={() => {
//                     setAmount(preset);
//                     setCustomAmount('');
//                   }}
//                   className={`p-3 rounded-lg border text-center font-medium transition-all ${
//                     amount === preset && !customAmount
//                       ? 'border-blue-500 bg-blue-50 text-blue-700'
//                       : 'border-gray-300 hover:border-gray-400'
//                   }`}
//                 >
//                   ${preset}
//                 </button>
//               ))}
//             </div>
//             <div className="relative">
//               <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="number"
//                 placeholder="Custom amount"
//                 value={customAmount}
//                 onChange={(e) => setCustomAmount(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 checked={isRecurring}
//                 onChange={(e) => setIsRecurring(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <span className="text-sm font-medium text-gray-700">Make this a recurring donation</span>
//             </label>
            
//             {isRecurring && (
//               <div className="mt-3">
//                 <select
//                   value={frequency}
//                   onChange={(e) => setFrequency(e.target.value as 'monthly' | 'quarterly' | 'yearly')}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="monthly">Monthly</option>
//                   <option value="quarterly">Quarterly</option>
//                   <option value="yearly">Yearly</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-50 rounded-lg p-4 mb-6">
//             <div className="flex items-center justify-between text-sm mb-2">
//               <span>Donation Amount:</span>
//               <span className="font-semibold">
//                 ${(customAmount ? parseInt(customAmount) : amount).toLocaleString()}
//               </span>
//             </div>
//             <div className="flex items-center justify-between text-sm mb-2">
//               <span>Processing Fee:</span>
//               <span className="font-semibold">$0.00</span>
//             </div>
//             <div className="border-t pt-2 flex items-center justify-between font-semibold">
//               <span>Total:</span>
//               <span>${(customAmount ? parseInt(customAmount) : amount).toLocaleString()}</span>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">
//               This donation is tax-deductible. You'll receive a receipt via email.
//             </p>
//           </div>

//           <button
//             onClick={handleDonate}
//             className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
//           >
//             <Heart className="w-5 h-5" />
//             <span>Complete Donation</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }