import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from './data/Aut'; // Path agar upar-neeche ho toh check kar lena
import { Button } from './ui/button';

function SignUp() {
  // React Hook Form ko initialize kiya
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Form submit hone par kya hoga
  const onSubmit = (data) => {
    const userExists = auth.some(
      (user) => user.Email === data.email
    );

    if (userExists) {
      alert("User with this email already exists.");
    } else {
      auth.push({
        Username: data.name,
        Email: data.email,
        Password: data.password
      });
      console.log('New User Added:', data);
      alert("Sign Up Successful!");
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500 opacity-30 blur-[100px] animate-[bounce_6s_infinite_alternate] z-0 pointer-events-none"></div>

      {/* 📦 Sign Up ka main box—z-10 se ye hamesha upar rahega aur center me fit rahega */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-lg p-8 border border-white/20 rounded-2xl shadow-xl bg-white/80 backdrop-blur-md z-10"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>

        {/* Name Field */}
        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-600 pl-1">Name</label>
          <input
            id="name"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-base bg-white/90"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="text-red-500 text-xs pl-1 mt-1">{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-600 pl-1">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-base bg-white/90"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span className="text-red-500 text-xs pl-1 mt-1">{errors.email.message}</span>}
        </div>

        {/* Password Field */}
        <div className="mb-6 flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-600 pl-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a strong password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-base bg-white/90"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <span className="text-red-500 text-xs pl-1 mt-1">{errors.password.message}</span>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit" 
          className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold text-lg rounded-xl transition-colors mt-2 shadow-sm"
        >
          Submit
        </Button>
      </form>

    </div>
  );
}

export default SignUp;