
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="text-6xl mb-4">☀️</div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Twój Plan na Lato
            </CardTitle>
            <CardDescription className="text-lg">
              Zaloguj się i stwórz swój idealny plan wakacyjny!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Twoje imię"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Twój email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-summer-blue hover:bg-summer-blue/90 text-white"
                disabled={!name.trim() || !email.trim()}
              >
                Zacznij planować! 🚀
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
