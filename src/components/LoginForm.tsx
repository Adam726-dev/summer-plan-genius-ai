
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const LoginForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      login(name.trim(), email.trim());
    }
  };

  return (
    <div className="min-h-screen summer-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-lg shadow-2xl border-0">
          <div className="text-center p-6 pb-6">
            <div className="text-6xl mb-4">☀️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Twój Plan na Lato
            </h1>
            <p className="text-lg text-gray-600">
              Zaloguj się i stwórz swój idealny plan wakacyjny!
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Twoje imię"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Twój email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md font-medium transition-colors"
                disabled={!name.trim() || !email.trim()}
              >
                Zacznij planować! 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
