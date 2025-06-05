
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
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
      toast("Proszę wypełnić wszystkie pola");
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
      
      toast("Twój spersonalizowany plan został wygenerowany");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/">
            <button className="mb-4 flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powróć do strony głównej
            </button>
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

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center">
              <Calculator className="h-6 w-6 mr-2" />
              Wprowadź swoje dane
            </h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Wiek (lata)</label>
                  <input
                    id="age"
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                    placeholder="np. 25"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Płeć</label>
                  <select 
                    value={formData.gender} 
                    onChange={(e) => setFormData({...formData, gender: e.target.value as 'male' | 'female'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">Mężczyzna</option>
                    <option value="female">Kobieta</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Aktualna waga (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value) || 0})}
                    placeholder="np. 70"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Wzrost (cm)</label>
                  <input
                    id="height"
                    type="number"
                    value={formData.height || ''}
                    onChange={(e) => setFormData({...formData, height: parseInt(e.target.value) || 0})}
                    placeholder="np. 175"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="targetWeight" className="block text-sm font-medium text-gray-700 mb-1">Docelowa waga (kg)</label>
                  <input
                    id="targetWeight"
                    type="number"
                    value={formData.targetWeight || ''}
                    onChange={(e) => setFormData({...formData, targetWeight: parseInt(e.target.value) || 0})}
                    placeholder="np. 65"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">Poziom aktywności</label>
                  <select 
                    value={formData.activityLevel} 
                    onChange={(e) => setFormData({...formData, activityLevel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Wybierz poziom</option>
                    <option value="sedentary">Siedzący (brak ćwiczeń)</option>
                    <option value="light">Lekko aktywny (1-3 dni/tydzień)</option>
                    <option value="moderate">Umiarkowanie aktywny (3-5 dni/tydzień)</option>
                    <option value="active">Bardzo aktywny (6-7 dni/tydzień)</option>
                    <option value="very-active">Ekstremalnie aktywny (2x dziennie)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">Cel</label>
                <select 
                  value={formData.goal} 
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Wybierz cel</option>
                  <option value="weight-loss">Utrata wagi</option>
                  <option value="muscle-gain">Przyrost masy mięśniowej</option>
                  <option value="maintenance">Utrzymanie wagi</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                {isLoading ? '🧮 Obliczam...' : '📊 Oblicz i dobierz plan'}
              </button>
            </form>
          </div>
        </div>

        {result && (
          <div className="space-y-6">
            {/* Wyniki BMR */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
              <div className="p-6 border-b border-blue-200">
                <h2 className="text-xl font-semibold flex items-center">
                  <Target className="h-6 w-6 mr-2" />
                  Twoje wyniki metaboliczne
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{Math.round(result.bmr)}</div>
                    <div className="text-sm text-gray-600">BMR (kcal/dzień)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{Math.round(result.dailyCalories)}</div>
                    <div className="text-sm text-gray-600">Zapotrzebowanie (kcal/dzień)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{Math.round(result.dailyDeficit)}</div>
                    <div className="text-sm text-gray-600">Deficyt (kcal/dzień)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rekomendowany catering */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">🥗 Rekomendowany catering</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{result.recommendedCatering.name}</h3>
                    <p className="text-gray-600">{result.recommendedCatering.calories} kcal/dzień</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                      {result.recommendedCatering.type}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {result.recommendedCatering.price} zł/dzień
                  </div>
                </div>
              </div>
            </div>

            {/* Rekomendowany trening */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">🏋️‍♀️ Rekomendowany trening</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{result.recommendedWorkout.name}</h3>
                    <p className="text-gray-600">
                      {result.recommendedWorkout.caloriesBurn} kcal/sesja × {result.recommendedWorkout.sessions} sesji/tydzień
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mt-2">
                      {result.recommendedWorkout.type}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {result.recommendedWorkout.caloriesBurn * result.recommendedWorkout.sessions} kcal/tydzień
                  </div>
                </div>
              </div>
            </div>

            {/* Prognoza utraty wagi */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg">
              <div className="p-6 border-b border-white/20">
                <h2 className="text-xl font-semibold flex items-center text-white">
                  <TrendingDown className="h-6 w-6 mr-2" />
                  Prognoza utraty wagi
                </h2>
              </div>
              <div className="p-6">
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
              </div>
            </div>

            {/* Akcje */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/dieta">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors">
                  🥗 Zamów catering
                </button>
              </Link>
              <Link to="/silownia">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-md font-medium transition-colors">
                  🏋️‍♀️ Wybierz siłownię
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BMRCalculator;
