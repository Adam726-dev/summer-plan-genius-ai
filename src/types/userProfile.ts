
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
  
  // Weekend Activity Optimizer data
  personalityType?: 'introvert' | 'extrovert' | 'ambivert';
  activityPreferences?: ('outdoor' | 'indoor' | 'cultural' | 'sports' | 'social' | 'relaxing')[];
  energyLevel?: 'low' | 'medium' | 'high';
  socialPreference?: 'alone' | 'small_group' | 'large_group' | 'any';
  
  // Travel Route Planner data
  travelBudget?: number;
  travelStyle?: 'luxury' | 'mid_range' | 'budget' | 'backpacker';
  accommodationPreference?: 'hotel' | 'airbnb' | 'hostel' | 'camping';
  transportPreference?: 'plane' | 'car' | 'train' | 'bus';
  destinationPreferences?: ('beach' | 'mountains' | 'cities' | 'countryside' | 'historical')[];
  travelCompanions?: 'solo' | 'partner' | 'friends' | 'family';
  
  // Mood & Energy Tracker data
  sleepHours?: number;
  stressLevel?: 'low' | 'medium' | 'high';
  workLifeBalance?: 'poor' | 'okay' | 'good' | 'excellent';
  currentMood?: 'energetic' | 'tired' | 'stressed' | 'happy' | 'neutral';
  restDaysPreference?: number;
  
  // Social Companion Matcher data
  lookingForCompanions?: boolean;
  companionPreferences?: ('workout_buddy' | 'party_partner' | 'travel_companion' | 'diet_accountability')[];
  teamChallengeInterest?: 'high' | 'medium' | 'low';
  socialGoals?: ('motivation' | 'accountability' | 'fun' | 'learning')[];
  communicationStyle?: 'direct' | 'encouraging' | 'competitive' | 'supportive';
  
  // Weather-Smart Planner data
  weatherSensitivity?: 'high' | 'medium' | 'low';
  indoorAlternatives?: ('gym' | 'yoga_studio' | 'mall_walking' | 'home_workout')[];
  outdoorPreferences?: ('running' | 'cycling' | 'hiking' | 'beach_sports' | 'park_activities')[];
  temperaturePreference?: 'hot' | 'mild' | 'cool' | 'any';
  
  // Progress Predictor data
  trackingGoals?: ('weight_loss' | 'muscle_gain' | 'endurance' | 'strength' | 'flexibility')[];
  commitmentLevel?: 'low' | 'medium' | 'high' | 'extreme';
  motivationType?: 'visual_progress' | 'data_driven' | 'social_validation' | 'personal_satisfaction';
  timelineGoals?: {
    oneMonth?: string;
    twoMonths?: string;
    summer?: string;
  };
}
