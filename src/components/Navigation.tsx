
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">☀️</span>
            <span className="font-bold text-lg text-gray-900">Twój Plan na Lato</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Cześć, {user.name}!</span>
            
            {location.pathname !== '/' && (
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Strona główna
                </Button>
              </Link>
            )}
            
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Wyloguj
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
