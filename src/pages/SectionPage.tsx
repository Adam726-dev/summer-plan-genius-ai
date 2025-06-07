
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlan } from '@/context/PlanContext';
import { useUserProfile } from '@/context/UserProfileContext';
import Navigation from '@/components/Navigation';
import FitnessProfileForm from '@/components/FitnessProfileForm';
import NutritionProfileForm from '@/components/NutritionProfileForm';
import ActivityProfileForm from '@/components/ActivityProfileForm';
import TravelProfileForm from '@/components/TravelProfileForm';
import MoodEnergyProfileForm from '@/components/MoodEnergyProfileForm';
import SocialCompanionForm from '@/components/SocialCompanionForm';
import WeatherSmartForm from '@/components/WeatherSmartForm';
import ProgressPredictorForm from '@/components/ProgressPredictorForm';
import { ArrowLeft, Check } from 'lucide-react';
import { sectionsData } from '@/data/sections';
import { toast } from 'sonner';

const SectionPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { choices, updateChoice } = usePlan();
  const { isProfileComplete } = useUserProfile();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [showSocialForm, setShowSocialForm] = useState(false);
  const [showWeatherForm, setShowWeatherForm] = useState(false);
  const [showProgressForm, setShowProgressForm] = useState(false);
  
  const section = sectionsData.find(s => s.id === sectionId);
  
  if (!section) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Sekcja nie znaleziona</h1>
          <Link to="/">
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Powróć do strony głównej
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedOptionId = choices[section.id as keyof typeof choices];

  // Sprawdź czy potrzebny jest profil użytkownika dla tej sekcji
  const needsProfile = ['silownia', 'dieta', 'imprezy', 'wakacje'].includes(section.id);
  const profileType = section.id === 'silownia' ? 'fitness' : 
                     section.id === 'dieta' ? 'nutrition' :
                     section.id === 'imprezy' ? 'activity' : 'travel';
  const hasRequiredProfile = needsProfile ? isProfileComplete(profileType) : true;

  // Sprawdź dodatkowe profile AI
  const hasSocialProfile = isProfileComplete('social');
  const hasWeatherProfile = isProfileComplete('weather');
  const hasProgressProfile = isProfileComplete('progress');

  const handleSelectOption = (optionId: number) => {
    updateChoice(section.id as keyof typeof choices, optionId);
    toast("Świetny wybór! 🎉", {
      description: `Dodano ${section.name.toLowerCase()} do Twojego planu`,
    });
  };

  const handleProfileComplete = () => {
    setShowProfileForm(false);
    setShowMoodTracker(false);
    setShowSocialForm(false);
    setShowWeatherForm(false);
    setShowProgressForm(false);
    toast("Profil uzupełniony! 🎯", {
      description: "Teraz możesz zobaczyć spersonalizowane opcje",
    });
  };

  // Show AI enhancement forms
  if (showSocialForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link to="/">
              <button className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Powróć do strony głównej
              </button>
            </Link>
          </div>
          <SocialCompanionForm onComplete={handleProfileComplete} />
        </main>
      </div>
    );
  }

  if (showWeatherForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link to="/">
              <button className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Powróć do strony głównej
              </button>
            </Link>
          </div>
          <WeatherSmartForm onComplete={handleProfileComplete} />
        </main>
      </div>
    );
  }

  if (showProgressForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link to="/">
              <button className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Powróć do strony głównej
              </button>
            </Link>
          </div>
          <ProgressPredictorForm onComplete={handleProfileComplete} />
        </main>
      </div>
    );
  }

  // Pokaż Mood & Energy Tracker dla wszystkich sekcji z profilem (oprócz początkowego formularza)
  if (needsProfile && hasRequiredProfile && showMoodTracker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link to="/">
              <button className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Powróć do strony głównej
              </button>
            </Link>
          </div>

          <MoodEnergyProfileForm onComplete={handleProfileComplete} />
        </main>
      </div>
    );
  }

  // Pokaż formularz profilu jeśli potrzebny i nie został uzupełniony
  if (needsProfile && (!hasRequiredProfile || showProfileForm)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link to="/">
              <button className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Powróć do strony głównej
              </button>
            </Link>
          </div>

          {section.id === 'silownia' && (
            <FitnessProfileForm onComplete={handleProfileComplete} />
          )}
          
          {section.id === 'dieta' && (
            <NutritionProfileForm onComplete={handleProfileComplete} />
          )}

          {section.id === 'imprezy' && (
            <ActivityProfileForm onComplete={handleProfileComplete} />
          )}

          {section.id === 'wakacje' && (
            <TravelProfileForm onComplete={handleProfileComplete} />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <button className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powróć do strony głównej
            </button>
          </Link>
          
          <div className="text-center">
            <div className="text-6xl mb-4">{section.icon}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{section.name}</h1>
            <p className="text-xl text-gray-600">{section.description}</p>
            
            {needsProfile && hasRequiredProfile && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setShowProfileForm(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  ⚙️ Edytuj profil {
                    section.id === 'silownia' ? 'fitness' : 
                    section.id === 'dieta' ? 'żywieniowy' :
                    section.id === 'imprezy' ? 'aktywności' : 'podróży'
                  }
                </button>
                <button
                  onClick={() => setShowMoodTracker(true)}
                  className="text-sm text-green-600 hover:text-green-800 underline"
                >
                  📊 Aktualizuj nastrój i energię
                </button>
                <button
                  onClick={() => setShowSocialForm(true)}
                  className="text-sm text-purple-600 hover:text-purple-800 underline"
                >
                  🤝 {hasSocialProfile ? 'Edytuj' : 'Skonfiguruj'} Social Companion
                </button>
                <button
                  onClick={() => setShowWeatherForm(true)}
                  className="text-sm text-orange-600 hover:text-orange-800 underline"
                >
                  🌤️ {hasWeatherProfile ? 'Edytuj' : 'Skonfiguruj'} Weather Planner
                </button>
                <button
                  onClick={() => setShowProgressForm(true)}
                  className="text-sm text-red-600 hover:text-red-800 underline"
                >
                  📈 {hasProgressProfile ? 'Edytuj' : 'Skonfiguruj'} Progress Predictor
                </button>
              </div>
            )}
          </div>
        </div>

        {/* AI Enhancement Notice */}
        {needsProfile && hasRequiredProfile && (
          <div className="mb-8 bg-gradient-to-r from-blue-100 to-green-100 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2 text-blue-700">
              🤖 AI dostosowało opcje do Twojego profilu!
            </h3>
            <p className="text-gray-700 mb-3">
              {section.id === 'silownia' 
                ? 'Personal Trainer AI przeanalizował Twoje cele i kondycję, aby pokazać najlepsze opcje treningowe.'
                : section.id === 'dieta'
                ? 'Smart Meal Planner AI uwzględnił Twoje preferencje żywieniowe i cele kaloryczne.'
                : section.id === 'imprezy'
                ? 'Weekend Activity Optimizer AI dobrał imprezy idealne dla Twojego typu osobowości i poziomu energii.'
                : 'Travel Route Planner AI zaplanował opcje wakacyjne dopasowane do Twojego budżetu i stylu podróżowania.'
              }
            </p>
            
            {/* Additional AI features info */}
            <div className="flex flex-wrap gap-2 text-sm">
              {hasSocialProfile && (
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  🤝 Social Companion aktywny
                </span>
              )}
              {hasWeatherProfile && (
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                  🌤️ Weather Planner aktywny
                </span>
              )}
              {hasProgressProfile && (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                  📈 Progress Predictor aktywny
                </span>
              )}
            </div>
          </div>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {section.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            
            return (
              <div key={option.id} className="animate-fade-in">
                <div className={`border-2 transition-all duration-300 rounded-lg bg-white shadow-sm ${
                  isSelected 
                    ? 'border-summer-blue bg-summer-blue/5 shadow-lg' 
                    : 'border-gray-200 hover:border-summer-blue/50'
                }`}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-3xl">{option.image}</div>
                      {isSelected && (
                        <span className="inline-flex items-center rounded-full bg-summer-blue px-2.5 py-0.5 text-xs font-semibold text-white">
                          <Check className="h-3 w-3 mr-1" />
                          Wybrane
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-gray-600 mb-3">{option.description}</p>
                    
                    {/* AI Enhancement Badge */}
                    {needsProfile && hasRequiredProfile && (
                      <div className="mb-3 bg-blue-50 border border-blue-200 rounded-md p-2">
                        <div className="flex items-center text-xs text-blue-700">
                          <span className="mr-1">🎯</span>
                          {section.id === 'silownia' 
                            ? 'Dopasowane do Twojego poziomu i celów'
                            : section.id === 'dieta'
                            ? 'Uwzględnia Twoje preferencje żywieniowe'
                            : section.id === 'imprezy'
                            ? 'Dobrane pod Twoją osobowość i energię'
                            : 'Zaplanowane pod Twój budżet i styl'
                          }
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-summer-blue">{option.price}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-1 text-sm text-gray-600">{option.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                        isSelected 
                          ? 'bg-summer-blue hover:bg-summer-blue/90 text-white' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      {isSelected ? 'Wybrane!' : 'Wybierz tę opcję'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {selectedOptionId && (
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ✅ Świetnie! Wybrano opcję dla {section.name.toLowerCase()}
            </h3>
            <p className="text-gray-600 mb-6">
              Możesz teraz przejść do kolejnej sekcji lub zobaczyć swój pełny plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md font-medium transition-colors">
                  🏠 Strona główna
                </button>
              </Link>
              <Link to="/podsumowanie">
                <button className="bg-summer-blue hover:bg-summer-blue/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  📋 Zobacz pełny plan
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SectionPage;
