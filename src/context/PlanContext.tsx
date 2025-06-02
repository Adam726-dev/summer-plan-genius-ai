
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PlanChoices {
  dieta?: number;
  silownia?: number;
  imprezy?: number;
  wakacje?: number;
}

interface PlanContextType {
  choices: PlanChoices;
  updateChoice: (section: keyof PlanChoices, optionId: number) => void;
  clearChoices: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [choices, setChoices] = useState<PlanChoices>({});

  useEffect(() => {
    const savedChoices = localStorage.getItem('summer-plan-choices');
    if (savedChoices) {
      setChoices(JSON.parse(savedChoices));
    }
  }, []);

  const updateChoice = (section: keyof PlanChoices, optionId: number) => {
    const newChoices = { ...choices, [section]: optionId };
    setChoices(newChoices);
    localStorage.setItem('summer-plan-choices', JSON.stringify(newChoices));
  };

  const clearChoices = () => {
    setChoices({});
    localStorage.removeItem('summer-plan-choices');
  };

  return (
    <PlanContext.Provider value={{ choices, updateChoice, clearChoices }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};
