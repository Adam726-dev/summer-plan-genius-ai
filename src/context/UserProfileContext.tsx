
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types/userProfile';

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  isProfileComplete: (section: 'fitness' | 'nutrition' | 'activity' | 'travel') => boolean;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>({});

  useEffect(() => {
    const savedProfile = localStorage.getItem('user-profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const updateProfile = (data: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...data };
    setProfile(newProfile);
    localStorage.setItem('user-profile', JSON.stringify(newProfile));
  };

  const isProfileComplete = (section: 'fitness' | 'nutrition' | 'activity' | 'travel') => {
    if (section === 'fitness') {
      return !!(profile.currentWeight && profile.height && profile.age && 
               profile.gender && profile.fitnessLevel && profile.fitnessGoals?.length);
    }
    if (section === 'nutrition') {
      return !!(profile.dailyCalories && profile.mealsPerDay);
    }
    if (section === 'activity') {
      return !!(profile.personalityType && profile.activityPreferences?.length && 
               profile.energyLevel && profile.socialPreference);
    }
    if (section === 'travel') {
      return !!(profile.travelBudget && profile.travelStyle && 
               profile.accommodationPreference && profile.transportPreference && 
               profile.destinationPreferences?.length && profile.travelCompanions);
    }
    return false;
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, isProfileComplete }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
