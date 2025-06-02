
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePlan } from '@/context/PlanContext';
import LoginForm from '@/components/LoginForm';
import Navigation from '@/components/Navigation';
import SectionCard from '@/components/SectionCard';
import AIHelper from '@/components/AIHelper';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { sectionsData } from '@/data/sections';

const Index = () => {
  const { isLoggedIn } = useAuth();
  const { choices } = usePlan();
  
  const hasAnyChoices = Object.keys(choices).length > 0;

  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Twój Plan na <span className="text-summer-blue">Lato</span> ☀️
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stwórz idealny plan na najbardziej gorące miesiące roku. Wybierz dietę, siłownię, 
            imprezy i wakacje dopasowane do Twoich potrzeb!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/kalkulator-bmr">
              <Button className="bg-summer-coral hover:bg-summer-coral/90 text-white text-lg px-8 py-3">
                🧮 Kalkulator BMR & Plan Odchudzania
              </Button>
            </Link>
            
            {hasAnyChoices && (
              <Link to="/podsumowanie">
                <Button variant="outline" className="text-lg px-8 py-3">
                  🧾 Zobacz swój plan
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sectionsData.map((section) => (
            <div key={section.id} className="animate-scale-in">
              <SectionCard section={section} />
            </div>
          ))}
        </div>

        {/* AI Helper */}
        <div className="mb-12 animate-fade-in">
          <AIHelper />
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-summer-blue to-summer-mint rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Gotowy na najlepsze lato w życiu? 🌊</h2>
          <p className="text-xl mb-6 text-white/90">
            Rozpocznij swój plan już dziś i ciesz się każdą chwilą lata!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dieta">
              <Button variant="secondary" className="px-8 py-3">
                🥗 Zacznij od diety
              </Button>
            </Link>
            <Link to="/silownia">
              <Button variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-summer-blue">
                🏋️‍♀️ Wybierz siłownię
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
