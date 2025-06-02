
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';
import { sectionsData } from '@/data/sections';

interface SectionCardProps {
  section: {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
  };
}

const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
  const { choices } = usePlan();
  const hasChoice = choices[section.id as keyof typeof choices];
  
  const sectionData = sectionsData.find(s => s.id === section.id);
  const selectedOption = hasChoice && sectionData 
    ? sectionData.options.find(opt => opt.id === hasChoice)
    : null;

  return (
    <Link to={`/${section.id}`}>
      <Card className={`${section.color} border-0 shadow-lg card-hover cursor-pointer relative overflow-hidden`}>
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">{section.icon}</div>
          <h3 className="text-xl font-bold text-white mb-2">{section.name}</h3>
          <p className="text-white/90 text-sm mb-4">{section.description}</p>
          
          {hasChoice && selectedOption ? (
            <Badge variant="secondary" className="mb-3">
              ✓ {selectedOption.name}
            </Badge>
          ) : (
            <Badge variant="outline" className="mb-3 bg-white/20 text-white border-white/30">
              Nie wybrano
            </Badge>
          )}
          
          <div className="flex items-center justify-center text-white/80">
            <span className="text-sm">Wybierz opcję</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SectionCard;
