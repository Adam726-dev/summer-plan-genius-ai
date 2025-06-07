
export interface UserProfile {
  // Personal Trainer data
  currentWeight?: number;
  targetWeight?: number;
  height?: number;
  age?: number;
  gender?: 'male' | 'female';
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  fitnessGoals?: ('weight_loss' | 'muscle_gain' | 'endurance' | 'strength')[];
  injuries?: string[];
  trainingDays?: number;
  
  // Meal Planner data
  allergies?: string[];
  dietPreferences?: ('vegetarian' | 'vegan' | 'keto' | 'paleo' | 'mediterranean')[];
  dailyCalories?: number;
  mealsPerDay?: number;
  dislikedIngredients?: string[];
  cookingTime?: 'quick' | 'medium' | 'elaborate';
}
