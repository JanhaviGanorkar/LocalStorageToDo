import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from './data/Aut';
import { Button } from './ui/button';
function SignUp() {
  // Initialize useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    // Check if the user already exists
    const userExists = auth.some(
      (user) => user.Email === data.email
    );

    if (userExists) {
      alert("User with this email already exists.");
    } else {
      // Add the new user to the auth array
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
          <input
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="text-red-600">{errors.name.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <span className="text-red-600">{errors.password.message}</span>}
        </div>
{/* w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors */}
        <Button
          type="submit" className="w-full"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
