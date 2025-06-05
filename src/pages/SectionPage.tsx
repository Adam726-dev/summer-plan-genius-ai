
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlan } from '@/context/PlanContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check } from 'lucide-react';
import { sectionsData } from '@/data/sections';
import { useToast } from '@/hooks/use-toast';

const SectionPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { choices, updateChoice } = usePlan();
  const { toast } = useToast();
  
  const section = sectionsData.find(s => s.id === sectionId);
  
  if (!section) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Sekcja nie znaleziona</h1>
          <Link to="/">
            <Button className="mt-4">Powróć do strony głównej</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedOptionId = choices[section.id as keyof typeof choices];

  const handleSelectOption = (optionId: number) => {
    updateChoice(section.id as keyof typeof choices, optionId);
    toast({
      title: "Świetny wybór! 🎉",
      description: `Dodano ${section.name.toLowerCase()} do Twojego planu`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powróć do strony głównej
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="text-6xl mb-4">{section.icon}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{section.name}</h1>
            <p className="text-xl text-gray-600">{section.description}</p>
          </div>
        </div>

        {/* Options Grid - OptionCard functionality embedded */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {section.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            
            return (
              <div key={option.id} className="animate-fade-in">
                <Card className={`border-2 transition-all duration-300 ${
                  isSelected 
                    ? 'border-summer-blue bg-summer-blue/5 shadow-lg' 
                    : 'border-gray-200 hover:border-summer-blue/50'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-3xl">{option.image}</div>
                      {isSelected && (
                        <Badge className="bg-summer-blue text-white">
                          <Check className="h-3 w-3 mr-1" />
                          Wybrane
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-gray-600 mb-3">{option.description}</p>
                    
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
                    
                    <Button 
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full ${
                        isSelected 
                          ? 'bg-summer-blue hover:bg-summer-blue/90' 
                          : 'bg-gray-900 hover:bg-gray-800'
                      } text-white`}
                    >
                      {isSelected ? 'Wybrane!' : 'Wybierz tę opcję'}
                    </Button>
                  </CardContent>
                </Card>
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
                <Button variant="outline" className="px-6 py-3">
                  🏠 Strona główna
                </Button>
              </Link>
              <Link to="/podsumowanie">
                <Button className="bg-summer-blue hover:bg-summer-blue/90 text-white px-6 py-3">
                  📋 Zobacz pełny plan
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SectionPage;
