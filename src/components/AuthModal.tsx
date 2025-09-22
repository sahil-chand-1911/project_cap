// import React, { useState } from 'react';
// import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   mode: 'login' | 'signup';
//   onModeChange: (mode: 'login' | 'signup') => void;
//   onAuth: (user: { name: string; email: string }) => void;
// }

// export default function AuthModal({ isOpen, onClose, mode, onModeChange, onAuth }: AuthModalProps) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   if (!isOpen) return null;

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (mode === 'signup') {
//       if (!formData.name) {
//         newErrors.name = 'Name is required';
//       }
//       if (!formData.confirmPassword) {
//         newErrors.confirmPassword = 'Please confirm your password';
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = 'Passwords do not match';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       // Simulate authentication
//       onAuth({
//         name: formData.name || formData.email.split('@')[0],
//         email: formData.email,
//       });
//       onClose();
//       setFormData({ name: '', email: '', password: '', confirmPassword: '' });
//       setErrors({});
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full transition-colors">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//               {mode === 'login' ? 'Welcome Back' : 'Create Account'}
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {mode === 'signup' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => handleInputChange('name', e.target.value)}
//                     className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                       errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
//                   placeholder="Enter your email"
//                 />
//               </div>
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={(e) => handleInputChange('password', e.target.value)}
//                   className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//             </div>

//             {mode === 'signup' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={formData.confirmPassword}
//                     onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                     className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                       errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
//                     placeholder="Confirm your password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full py-3 bg-gradient-to-r from-gray-800 to-black dark:from-gray-700 dark:to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-800 transition-all font-semibold shadow-md hover:shadow-lg"
//             >
//               {mode === 'login' ? 'Sign In' : 'Create Account'}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600 dark:text-gray-400">
//               {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
//               <button
//                 onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
//                 className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
//               >
//                 {mode === 'login' ? 'Sign up' : 'Sign in'}
//               </button>
//             </p>
//           </div>

//           {mode === 'signup' && (
//             <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
//               By creating an account, you agree to our Terms of Service and Privacy Policy
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }