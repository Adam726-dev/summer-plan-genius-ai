
import React from 'react';
import { Link } from 'react-router-dom';
import { usePlan } from '@/context/PlanContext';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { sectionsData } from '@/data/sections';
import { useToast } from '@/hooks/use-toast';

const Summary: React.FC = () => {
  const { choices } = usePlan();
  const { user } = useAuth();
  const { toast } = useToast();

  const selectedSections = Object.entries(choices).map(([sectionId, optionId]) => {
    const section = sectionsData.find(s => s.id === sectionId);
    const option = section?.options.find(o => o.id === optionId);
    return { section, option };
  }).filter(item => item.section && item.option);

  const totalCost = selectedSections.reduce((sum, { option }) => {
    if (!option) return sum;
    // Prosta kalkulacja - wyciągamy liczby z ciągu znaków ceny
    const price = parseInt(option.price.replace(/\D/g, '')) || 0;
    return sum + price;
  }, 0);

  const handleAddToCalendar = () => {
    // Symulacja dodawania do Google Calendar
    toast("Twój plan został dodany do Google Calendar");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mój Plan na Lato',
        text: `Sprawdź mój plan na lato: ${selectedSections.length} wybranych aktywności!`,
        url: window.location.href,
      });
    } else {
      // Fallback - kopiowanie do clipboard
      navigator.clipboard.writeText(window.location.href);
      toast("Możesz teraz udostępnić swój plan znajomym");
    }
  };

  if (selectedSections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-6">📋</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Twój plan jest pusty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Zacznij od wyboru opcji w dowolnej sekcji, aby zobaczyć swój plan!
            </p>
            <Link to="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
                🏠 Powróć do strony głównej
              </button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <button className="mb-4 flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powróć do strony głównej
            </button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Twój Plan na Lato ☀️
            </h1>
            <p className="text-xl text-gray-600">
              Cześć {user?.name}! Oto Twój spersonalizowany plan:
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="space-y-6 mb-8">
          {selectedSections.map(({ section, option }) => (
            <div key={section!.id} className="bg-white rounded-lg shadow-lg border border-gray-200 border-l-4" style={{borderLeftColor: '#3B82F6'}}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center">
                    <span className="text-2xl mr-3">{section!.icon}</span>
                    <span>{section!.name}</span>
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Wybrane
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-lg">{option!.name}</h4>
                    <p className="text-gray-600 text-sm">{option!.description}</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{option!.price}</div>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="ml-1 text-sm text-gray-600">{option!.rating}</span>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-1">
                      {option!.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Cost */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg mb-8">
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Szacunkowy koszt całego planu</h3>
            <div className="text-4xl font-bold">{totalCost} zł</div>
            <p className="text-white/90 mt-2">
              {selectedSections.length} {selectedSections.length === 1 ? 'wybrana aktywność' : 'wybrane aktywności'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button 
            onClick={handleAddToCalendar}
            className="bg-green-500 hover:bg-green-600 text-white p-6 text-lg rounded-md font-medium transition-colors flex items-center justify-center"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Dodaj do Google Calendar
          </button>
          
          <button 
            onClick={handleShare}
            className="border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 p-6 text-lg rounded-md font-medium transition-colors flex items-center justify-center"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Udostępnij plan
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">🚀 Następne kroki</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">📞</span>
                <div>
                  <h4 className="font-semibold">Skontaktuj się z dostawcami</h4>
                  <p className="text-gray-600">Zadzwoń lub napisz do wybranych firm, aby potwierdzić dostępność</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">💳</span>
                <div>
                  <h4 className="font-semibold">Zaplanuj budżet</h4>
                  <p className="text-gray-600">Rozłóż płatności w czasie i przygotuj się finansowo</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">📅</span>
                <div>
                  <h4 className="font-semibold">Ustal harmonogram</h4>
                  <p className="text-gray-600">Zaplanuj daty i godziny dla każdej aktywności</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Summary;
