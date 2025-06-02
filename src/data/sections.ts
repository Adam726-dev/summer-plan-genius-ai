
export interface Option {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  features: string[];
}

export interface Section {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  options: Option[];
}

export const sectionsData: Section[] = [
  {
    id: 'dieta',
    name: 'Dieta',
    icon: '🥗',
    color: 'bg-summer-mint',
    description: 'Zdrowe i smaczne posiłki na całe lato',
    options: [
      {
        id: 1,
        name: 'BeachBody Catering',
        description: 'Dieta dopasowana do aktywnego trybu życia',
        price: '45 zł/dzień',
        rating: 4.8,
        image: '🌿',
        features: ['1800 kcal/dzień', 'Dostawa codziennie', '3 posiłki + przekąski', 'Bez glutenu']
      },
      {
        id: 2,
        name: 'Summer Fresh',
        description: 'Lekkie posiłki pełne świeżych składników',
        price: '38 zł/dzień',
        rating: 4.6,
        image: '🥒',
        features: ['1500 kcal/dzień', 'Dużo warzyw', 'Wegańskie opcje', 'Lokalnie sourced']
      },
      {
        id: 3,
        name: 'FitMeals Pro',
        description: 'Sportowa dieta dla maksymalnych rezultatów',
        price: '52 zł/dzień',
        rating: 4.9,
        image: '💪',
        features: ['2200 kcal/dzień', 'Wysoki protein', 'Suplementy', '5 posiłków']
      },
      {
        id: 4,
        name: 'Mediterranean Style',
        description: 'Klasyczna dieta śródziemnomorska',
        price: '42 zł/dzień',
        rating: 4.7,
        image: '🫒',
        features: ['1900 kcal/dzień', 'Zdrowe tłuszcze', 'Ryby 3x w tygodniu', 'Oliwa z oliwek']
      }
    ]
  },
  {
    id: 'silownia',
    name: 'Siłownia',
    icon: '🏋️‍♀️',
    color: 'bg-summer-coral',
    description: 'Najlepsze kluby fitness w Twojej okolicy',
    options: [
      {
        id: 1,
        name: 'GymMax Premium',
        description: 'Największa sieć fitness z pełnym wyposażeniem',
        price: '159 zł/miesiąc',
        rating: 4.5,
        image: '🏢',
        features: ['24/7 dostęp', 'Trener personalny', 'Basen', 'Sauna', 'Zajęcia grupowe']
      },
      {
        id: 2,
        name: 'PowerZone Gym',
        description: 'Siłownia dla prawdziwych twardzieli',
        price: '89 zł/miesiąc',
        rating: 4.8,
        image: '⚡',
        features: ['Free weights', 'CrossFit box', 'Bez tłoku', 'Atmosfera hardcore']
      },
      {
        id: 3,
        name: 'YogaFit Studio',
        description: 'Połączenie jogi, pilates i fitness',
        price: '129 zł/miesiąc',
        rating: 4.7,
        image: '🧘‍♀️',
        features: ['Joga codziennie', 'Pilates', 'Medytacja', 'Małe grupy', 'Przyjazna atmosfera']
      },
      {
        id: 4,
        name: 'AquaFit Center',
        description: 'Trening w wodzie i nie tylko',
        price: '149 zł/miesiąc',
        rating: 4.6,
        image: '🏊‍♀️',
        features: ['Aqua aerobik', 'Pływalnia', 'Jacuzzi', 'Zajęcia w wodzie', 'Rehabilitacja']
      }
    ]
  },
  {
    id: 'imprezy',
    name: 'Imprezy',
    icon: '🎉',
    color: 'bg-summer-purple',
    description: 'Najgorętsze eventy tego lata',
    options: [
      {
        id: 1,
        name: 'Open Fest Music',
        description: 'Trzydniowy festival muzyczny pod gwiazdami',
        price: '299 zł/bilet',
        rating: 4.9,
        image: '🎪',
        features: ['20+ artystów', 'Camping', 'Food trucki', '3 dni muzyki', 'Strefa chillout']
      },
      {
        id: 2,
        name: 'Beach Party Series',
        description: 'Cotygodniowe imprezy na plaży',
        price: '45 zł/wydarzenie',
        rating: 4.7,
        image: '🏖️',
        features: ['DJ sets', 'Koktajle', 'Zachód słońca', 'Dancing on sand', 'Bonfire']
      },
      {
        id: 3,
        name: 'Rooftop Nights',
        description: 'Ekskluzywne imprezy na dachach miasta',
        price: '89 zł/wieczór',
        rating: 4.8,
        image: '🌃',
        features: ['Premium drinki', 'View na miasto', 'Dress code', 'Live DJ', 'VIP area']
      },
      {
        id: 4,
        name: 'Festival Smaków',
        description: 'Kulinarny festiwal z muzyką na żywo',
        price: '65 zł/dzień',
        rating: 4.6,
        image: '🍽️',
        features: ['Local food', 'Wine tasting', 'Warsztaty gotowania', 'Acoustic stage', 'Family friendly']
      }
    ]
  },
  {
    id: 'wakacje',
    name: 'Wakacje',
    icon: '✈️',
    color: 'bg-summer-yellow',
    description: 'Niezapomniane podróże i wypady',
    options: [
      {
        id: 1,
        name: 'Greckie Wyspy',
        description: 'Magiczna Santorini i Mykonos w jednej podróży',
        price: '2599 zł/osoba',
        rating: 4.9,
        image: '🇬🇷',
        features: ['7 dni', 'All inclusive', 'Loty w cenie', 'Hotel 4*', 'Zwiedzanie']
      },
      {
        id: 2,
        name: 'Bałtycki Roadtrip',
        description: 'Odkryj piękno polskiego wybrzeża',
        price: '899 zł/osoba',
        rating: 4.5,
        image: '🚗',
        features: ['5 dni', 'Gdańsk-Sopot-Hel', 'Nocleg w pensjonatach', 'Przewodnik', 'Transport']
      },
      {
        id: 3,
        name: 'Tatrzańska Przygoda',
        description: 'Górskie szlaki i relaks w spa',
        price: '1299 zł/osoba',
        rating: 4.7,
        image: '⛰️',
        features: ['4 dni', 'Hotel górski', 'Przewodnik górski', 'SPA included', 'Wyżywienie']
      },
      {
        id: 4,
        name: 'Włoskie Wybrzeże',
        description: 'Amalfi Coast - raj na ziemi',
        price: '3299 zł/osoba',
        rating: 4.8,
        image: '🇮🇹',
        features: ['8 dni', 'Boutique hotel', 'Loty', 'Transfery', 'Degustacje win']
      }
    ]
  }
];
