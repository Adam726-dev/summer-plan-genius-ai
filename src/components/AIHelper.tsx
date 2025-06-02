
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AIHelper: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState('');
  const [goal, setGoal] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget || !goal || !lifestyle) {
      toast({
        title: "Błąd",
        description: "Proszę wypełnić wszystkie pola",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Symulacja zapytania do AI (w prawdziwej aplikacji tutaj byłby fetch do OpenAI)
    setTimeout(() => {
      const mockRecommendation = `🤖 Na podstawie Twojego budżetu ${budget} zł i celu "${goal}":

🥗 **Dieta**: Polecam BeachBody Catering - idealnie wpasowuje się w Twój budżet i aktywny styl życia.

🏋️ **Siłownia**: PowerZone Gym będzie perfekcyjny dla Ciebie - dostaniesz prawdziwy hardcore trening.

🎉 **Imprezy**: Beach Party Series - świetna relacja jakości do ceny, idealne na relaks po treningach.

✈️ **Wakacje**: Bałtycki Roadtrip - pozwoli Ci odkryć piękno Polski w ramach budżetu.

💡 **Dodatkowe wskazówki**: 
- Zaplanuj treningi na 3-4 dni w tygodniu
- Wybieraj imprezy w weekendy dla lepszego work-life balance
- Wakacje zaplanuj na koniec lata jako nagrodę za wysiłek!`;

      setRecommendation(mockRecommendation);
      setIsLoading(false);
      
      toast({
        title: "Gotowe! 🎉",
        description: "AI przygotowało Twoje spersonalizowane rekomendacje"
      });
    }, 2000);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="text-2xl mr-3">🤖</span>
          AI Asystent Planowania
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budżet na cały plan (zł)</Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="np. 2000"
              />
            </div>
            
            <div>
              <Label htmlFor="goal">Główny cel na lato</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz cel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schudnac">Schudnąć</SelectItem>
                  <SelectItem value="nabudowac-mase">Nabudować masę</SelectItem>
                  <SelectItem value="byc-fit">Być fit i zdrowym</SelectItem>
                  <SelectItem value="relaks">Maksymalny relaks</SelectItem>
                  <SelectItem value="przygoda">Przygoda i nowe doświadczenia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="lifestyle">Opisz swój styl życia</Label>
            <Textarea
              id="lifestyle"
              value={lifestyle}
              onChange={(e) => setLifestyle(e.target.value)}
              placeholder="np. Pracuję zdalnie, mam dużo czasu, lubię aktywny wypoczynek..."
              rows={3}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-summer-blue hover:bg-summer-blue/90 text-white"
          >
            {isLoading ? '🤔 AI myśli...' : '✨ Wygeneruj plan z AI'}
          </Button>
        </form>
        
        {recommendation && (
          <Card className="bg-gradient-to-r from-summer-blue/10 to-summer-mint/10 border-summer-blue/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 text-summer-blue">
                🎯 Twoje spersonalizowane rekomendacje:
              </h3>
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {recommendation}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default AIHelper;
