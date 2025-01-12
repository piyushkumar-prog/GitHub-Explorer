import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string, language: string) => void;
  onSort: (sort: string) => void;
}

const popularLanguages = [
  "All",
  "JavaScript",
  "Python",
  "Java",
  "TypeScript",
  "C++",
  "Ruby",
  "Go",
  "Rust",
  "PHP"
];

export default function SearchBar({ onSearch, onSort }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const handleSearch = () => {
    onSearch(query, selectedLanguage === 'All' ? '' : selectedLanguage);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedLanguage]);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-4 sm:p-8 rounded-2xl shadow-lg mb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-white">
          Explore GitHub Repositories
        </h2>
        
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search repositories..."
              className="w-full px-4 sm:px-6 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:border-white/40 transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <select
            onChange={(e) => onSort(e.target.value)}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white focus:outline-none focus:border-white/40 transition-all"
          >
            <option value="stars" className="text-gray-800">Most Stars</option>
            <option value="forks" className="text-gray-800">Most Forks</option>
            <option value="updated" className="text-gray-800">Recently Updated</option>
          </select>
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md"
          >
            Search
          </button>
        </div>

        {/* Language Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {popularLanguages.map((language) => (
            <button
              key={language}
              onClick={() => setSelectedLanguage(language)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedLanguage === language
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}