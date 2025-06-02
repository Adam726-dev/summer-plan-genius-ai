
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Option } from '@/data/sections';

interface OptionCardProps {
  option: Option;
  isSelected: boolean;
  onSelect: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, isSelected, onSelect }) => {
  return (
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
          onClick={onSelect}
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
  );
};

export default OptionCard;
