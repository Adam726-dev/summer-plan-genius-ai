
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calculator, Target, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BMRData {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  activityLevel: string;
  goal: string;
  targetWeight: number;
}

interface CalorieResult {
  bmr: number;
  dailyCalories: number;
  recommendedCatering: any;
  recommendedWorkout: any;
  weeklyWeightLoss: number;
  timeToGoal: number;
  dailyDeficit: number;
}

const BMRCalculator: React.FC = () => {
  const [formData, setFormData] = useState<BMRData>({
    age: 0,
    weight: 0,
    height: 0,
    gender: 'male',
    activityLevel: '',
    goal: '',
    targetWeight: 0
  });
  
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const cateringOptions = [
    { id: 1, name: 'BeachBody Catering', calories: 1800, price: 45, type: 'Aktywny' },
    { id: 2, name: 'Summer Fresh', calories: 1500, price: 38, type: 'Lekki' },
    { id: 3, name: 'FitMeals Pro', calories: 2200, price: 52, type: 'Sportowy' },
    { id: 4, name: 'Mediterranean Style', calories: 1900, price: 42, type: 'Zrównoważony' }
  ];

  const workoutOptions = [
    { id: 1, name: 'PowerZone Gym - Siła', caloriesBurn: 300, sessions: 4, type: 'Hardcore' },
    { id: 2, name: 'YogaFit Studio - Pilates', caloriesBurn: 200, sessions: 5, type: 'Spokojny' },
    { id: 3, name: 'GymMax Premium - Cardio', caloriesBurn: 400, sessions: 3, type: 'Intensywny' },
    { id: 4, name: 'AquaFit Center - Aqua', caloriesBurn: 250, sessions: 4, type: 'Wodny' }
  ];

  const calculateBMR = (data: BMRData): number => {
    // Wzór Mifflin-St Jeor
    if (data.gender === 'male') {
      return 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    } else {
      return 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
    }
  };

  const getActivityMultiplier = (level: string): number => {
    const multipliers: { [key: string]: number } = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };
    return multipliers[level] || 1.2;
  };

  const findBestCatering = (targetCalories: number) => {
    return cateringOptions.reduce((best, current) => {
      const bestDiff = Math.abs(best.calories - targetCalories);
      const currentDiff = Math.abs(current.calories - targetCalories);
      return currentDiff < bestDiff ? current : best;
    });
  };

  const findBestWorkout = (goal: string) => {
    if (goal === 'weight-loss') return workoutOptions[2]; // Cardio
    if (goal === 'muscle-gain') return workoutOptions[0]; // Siła
    if (goal === 'maintenance') return workoutOptions[1]; // Pilates
    return workoutOptions[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.age || !formData.weight || !formData.height || !formData.activityLevel || !formData.goal) {
      toast({
        title: "Błąd",
        description: "Proszę wypełnić wszystkie pola",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Symulacja obliczeń
    setTimeout(() => {
      const bmr = calculateBMR(formData);
      const activityMultiplier = getActivityMultiplier(formData.activityLevel);
      const dailyCalories = bmr * activityMultiplier;
      
      let targetCalories = dailyCalories;
      if (formData.goal === 'weight-loss') targetCalories -= 500; // Deficyt 500 kcal
      if (formData.goal === 'muscle-gain') targetCalories += 300; // Nadwyżka 300 kcal
      
      const recommendedCatering = findBestCatering(targetCalories);
      const recommendedWorkout = findBestWorkout(formData.goal);
      
      const weeklyCalorieBurn = recommendedWorkout.caloriesBurn * recommendedWorkout.sessions;
      const dailyDeficit = (dailyCalories - recommendedCatering.calories) + (weeklyCalorieBurn / 7);
      const weeklyWeightLoss = dailyDeficit * 7 / 7700; // 1kg = 7700 kcal
      
      const weightDifference = Math.abs(formData.weight - formData.targetWeight);
      const timeToGoal = weeklyWeightLoss > 0 ? weightDifference / weeklyWeightLoss : 0;

      const calculationResult: CalorieResult = {
        bmr,
        dailyCalories,
        recommendedCatering,
        recommendedWorkout,
        weeklyWeightLoss: Math.max(0, weeklyWeightLoss),
        timeToGoal: Math.max(0, timeToGoal),
        dailyDeficit
      };

      setResult(calculationResult);
      setIsLoading(false);
      
      toast({
        title: "Obliczenia gotowe! 🎯",
        description: "Twój spersonalizowany plan został wygenerowany"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powróć do strony głównej
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧮</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Kalkulator BMR & Plan Odchudzania
            </h1>
            <p className="text-xl text-gray-600">
              Oblicz swoje zapotrzebowanie kaloryczne i otrzymaj spersonalizowany plan
            </p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-6 w-6 mr-2" />
              Wprowadź swoje dane
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Wiek (lata)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                    placeholder="np. 25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Płeć</Label>
                  <Select value={formData.gender} onValueChange={(value: 'male' | 'female') => setFormData({...formData, gender: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz płeć" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Mężczyzna</SelectItem>
                      <SelectItem value="female">Kobieta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="weight">Aktualna waga (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value) || 0})}
                    placeholder="np. 70"
                  />
                </div>

                <div>
                  <Label htmlFor="height">Wzrost (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height || ''}
                    onChange={(e) => setFormData({...formData, height: parseInt(e.target.value) || 0})}
                    placeholder="np. 175"
                  />
                </div>

                <div>
                  <Label htmlFor="targetWeight">Docelowa waga (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    value={formData.targetWeight || ''}
                    onChange={(e) => setFormData({...formData, targetWeight: parseInt(e.target.value) || 0})}
                    placeholder="np. 65"
                  />
                </div>

                <div>
                  <Label htmlFor="activity">Poziom aktywności</Label>
                  <Select value={formData.activityLevel} onValueChange={(value) => setFormData({...formData, activityLevel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz poziom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Siedzący (brak ćwiczeń)</SelectItem>
                      <SelectItem value="light">Lekko aktywny (1-3 dni/tydzień)</SelectItem>
                      <SelectItem value="moderate">Umiarkowanie aktywny (3-5 dni/tydzień)</SelectItem>
                      <SelectItem value="active">Bardzo aktywny (6-7 dni/tydzień)</SelectItem>
                      <SelectItem value="very-active">Ekstremalnie aktywny (2x dziennie)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="goal">Cel</Label>
                <Select value={formData.goal} onValueChange={(value) => setFormData({...formData, goal: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz cel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Utrata wagi</SelectItem>
                    <SelectItem value="muscle-gain">Przyrost masy mięśniowej</SelectItem>
                    <SelectItem value="maintenance">Utrzymanie wagi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-summer-blue hover:bg-summer-blue/90 text-white"
              >
                {isLoading ? '🧮 Obliczam...' : '📊 Oblicz i dobierz plan'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            {/* Wyniki BMR */}
            <Card className="bg-gradient-to-r from-summer-blue/10 to-summer-mint/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-6 w-6 mr-2" />
                  Twoje wyniki metaboliczne
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-summer-blue">{Math.round(result.bmr)}</div>
                    <div className="text-sm text-gray-600">BMR (kcal/dzień)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-summer-coral">{Math.round(result.dailyCalories)}</div>
                    <div className="text-sm text-gray-600">Zapotrzebowanie (kcal/dzień)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-summer-mint">{Math.round(result.dailyDeficit)}</div>
                    <div className="text-sm text-gray-600">Deficyt (kcal/dzień)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rekomendowany catering */}
            <Card>
              <CardHeader>
                <CardTitle>🥗 Rekomendowany catering</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{result.recommendedCatering.name}</h3>
                    <p className="text-gray-600">{result.recommendedCatering.calories} kcal/dzień</p>
                    <Badge className="mt-2">{result.recommendedCatering.type}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-summer-blue">
                    {result.recommendedCatering.price} zł/dzień
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rekomendowany trening */}
            <Card>
              <CardHeader>
                <CardTitle>🏋️‍♀️ Rekomendowany trening</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{result.recommendedWorkout.name}</h3>
                    <p className="text-gray-600">
                      {result.recommendedWorkout.caloriesBurn} kcal/sesja × {result.recommendedWorkout.sessions} sesji/tydzień
                    </p>
                    <Badge className="mt-2">{result.recommendedWorkout.type}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-summer-coral">
                    {result.recommendedWorkout.caloriesBurn * result.recommendedWorkout.sessions} kcal/tydzień
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prognoza utraty wagi */}
            <Card className="bg-gradient-to-r from-summer-coral to-summer-yellow text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingDown className="h-6 w-6 mr-2" />
                  Prognoza utraty wagi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{result.weeklyWeightLoss.toFixed(1)} kg</div>
                    <div className="text-white/90">na tydzień</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">{Math.ceil(result.timeToGoal)}</div>
                    <div className="text-white/90">tygodni do celu</div>
                  </div>
                </div>
                <div className="mt-4 text-center text-white/90">
                  🎯 Osiągniesz wagę {formData.targetWeight} kg w około {Math.ceil(result.timeToGoal)} tygodni!
                </div>
              </CardContent>
            </Card>

            {/* Akcje */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/dieta">
                <Button className="w-full bg-summer-mint hover:bg-summer-mint/90 text-white">
                  🥗 Zamów catering
                </Button>
              </Link>
              <Link to="/silownia">
                <Button className="w-full bg-summer-coral hover:bg-summer-coral/90 text-white">
                  🏋️‍♀️ Wybierz siłownię
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BMRCalculator;
