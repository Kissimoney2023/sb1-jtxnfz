import React from 'react';
import { Globe, ChevronRight, Search } from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';

const regions = [
  { id: 'all', name: 'All Recipes', icon: '🌎' },
  { id: 'italian', name: 'Italian', icon: '🇮🇹' },
  { id: 'japanese', name: 'Japanese', icon: '🇯🇵' },
  { id: 'mexican', name: 'Mexican', icon: '🇲🇽' },
  { id: 'indian', name: 'Indian', icon: '🇮🇳' },
  { id: 'french', name: 'French', icon: '🇫🇷' },
  { id: 'chinese', name: 'Chinese', icon: '🇨🇳' },
  { id: 'thai', name: 'Thai', icon: '🇹🇭' },
  { id: 'mediterranean', name: 'Mediterranean', icon: '🌊' },
  { id: 'korean', name: 'Korean', icon: '🇰🇷' },
  { id: 'vietnamese', name: 'Vietnamese', icon: '🇻🇳' },
  { id: 'spanish', name: 'Spanish', icon: '🇪🇸' },
  { id: 'greek', name: 'Greek', icon: '🇬🇷' },
  { id: 'middle-eastern', name: 'Middle Eastern', icon: '🥙' },
];

export function Sidebar() {
  const { selectedRegion, setSelectedRegion, searchRecipes } = useRecipeStore();
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchRecipes(value);
  };

  return (
    <div 
      className={`bg-white shadow-md transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      } flex flex-col h-[calc(100vh-64px)] sticky top-16 z-40`}
    >
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Globe className="w-6 h-6" />
          {isExpanded && <span className="font-medium">Cuisines</span>}
          <ChevronRight className={`w-4 h-4 transition-transform ${
            isExpanded ? 'rotate-90' : ''
          }`} />
        </button>
      </div>

      {isExpanded && (
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search cuisines..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      <nav className="p-2 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => setSelectedRegion(region.name)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              selectedRegion === region.name
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            } ${!isExpanded ? 'justify-center' : ''}`}
          >
            <span className="text-xl">{region.icon}</span>
            {isExpanded && <span>{region.name}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          {isExpanded ? 'Click the arrow to collapse' : 'Expand'}
        </div>
      </div>
    </div>
  );
}