'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RepoCard from './components/RepoCard';
import ProfileReadmeGenerator from './components/ProfileReadmeGenerator';
import GitCheatSheet from './components/GitCheatSheet';
import ProfileAnalyzer from './components/ProfileAnalyzer';

// Define interface for Repository
export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  updated_at: string;
}

export default function Home() {
  // Update state definitions with proper typing
  const [repos, setRepos] = useState<Repository[]>([]);
  const [favorites, setFavorites] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('stars');
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [showReadmeGenerator, setShowReadmeGenerator] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showProfileAnalyzer, setShowProfileAnalyzer] = useState(false);
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const searchRepositories = async (query: string, language: string = '') => {
    if (!query) return;
    
    setLoading(true);
    setCurrentQuery(query);
    
    try {
      const searchQuery = language 
        ? `${query} language:${language}`
        : query;
        
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchQuery}&sort=${sort}&order=desc`
      );
      setRepos(response.data.items);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
    setLoading(false);
  };

  const handleSort = (sortBy: string) => {
    setSort(sortBy);
    if (currentQuery) {
      searchRepositories(currentQuery);
    }
  };

  const toggleFavorite = (repo: Repository) => {
    const newFavorites = favorites.find(f => f.id === repo.id)
      ? favorites.filter(f => f.id !== repo.id)
      : [...favorites, repo];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          GitHub Explorer
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setShowFavorites(false);
              setShowReadmeGenerator(false);
              setShowCheatSheet(false);
              setShowProfileAnalyzer(false);
            }}
            className={`px-6 py-2 rounded-lg ${
              !showFavorites && !showReadmeGenerator && !showCheatSheet && !showProfileAnalyzer
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Search
          </button>
          <button
            onClick={() => {
              setShowFavorites(true);
              setShowReadmeGenerator(false);
              setShowCheatSheet(false);
              setShowProfileAnalyzer(false);
            }}
            className={`px-6 py-2 rounded-lg ${
              showFavorites 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => {
              setShowFavorites(false);
              setShowReadmeGenerator(true);
              setShowCheatSheet(false);
              setShowProfileAnalyzer(false);
            }}
            className={`px-6 py-2 rounded-lg ${
              showReadmeGenerator 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            README Generator
          </button>
          <button
            onClick={() => {
              setShowFavorites(false);
              setShowReadmeGenerator(false);
              setShowCheatSheet(!showCheatSheet);
              setShowProfileAnalyzer(false);
            }}
            className={`px-6 py-2 rounded-lg ${
              showCheatSheet 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Git Cheat Sheet
          </button>
          <button
            onClick={() => {
              setShowFavorites(false);
              setShowReadmeGenerator(false);
              setShowCheatSheet(false);
              setShowProfileAnalyzer(!showProfileAnalyzer);
            }}
            className={`px-6 py-2 rounded-lg ${
              showProfileAnalyzer 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Profile Analyzer
          </button>
        </div>
        
        {!showReadmeGenerator && !showCheatSheet && !showProfileAnalyzer ? (
          <>
            {!showFavorites && (
              <>
                <SearchBar onSearch={searchRepositories} onSort={handleSort} />
                
                {loading && (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
                
                {repos.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Search Results
                    </h2>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {repos.map((repo) => (
                        <RepoCard
                          key={repo.id}
                          repo={repo}
                          isFavorite={favorites.some(f => f.id === repo.id)}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {showFavorites && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Favorite Repositories
                </h2>
                {favorites.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((repo) => (
                      <RepoCard
                        key={repo.id}
                        repo={repo}
                        isFavorite={true}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    No favorite repositories yet
                  </p>
                )}
              </div>
            )}
          </>
        ) : showReadmeGenerator ? (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              GitHub Profile README Generator
            </h2>
            <ProfileReadmeGenerator />
          </div>
        ) : showCheatSheet ? (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Git Cheat Sheet
            </h2>
            <GitCheatSheet />
          </div>
        ) : showProfileAnalyzer ? (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              GitHub Profile Analyzer
            </h2>
            <ProfileAnalyzer />
          </div>
        ) : null}
      </div>
    </main>
  );
}