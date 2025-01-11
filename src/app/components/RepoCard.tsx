import { useState } from 'react';
import { Repository } from '../page';
import RepoDetail from './RepoDetail';

interface RepoCardProps {
  repo: Repository;
  isFavorite: boolean;
  onToggleFavorite: (repo: Repository) => void;
}

// Language colors mapping for the dots
const languageColors: { [key: string]: string } = {
  JavaScript: 'bg-yellow-300',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-red-500',
  'C++': 'bg-pink-500',
  Ruby: 'bg-red-600',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  PHP: 'bg-purple-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-blue-400',
  Swift: 'bg-orange-500',
  Kotlin: 'bg-purple-600',
  // Add more languages as needed
  default: 'bg-gray-400'
};

export default function RepoCard({ repo, isFavorite, onToggleFavorite }: RepoCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const handleCardClick = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <>
      <div onClick={handleCardClick} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              className="w-12 h-12 rounded-full ring-2 ring-blue-500/20"
            />
            <div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {repo.owner.login}/{repo.name}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {repo.description || 'No description available'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onToggleFavorite(repo)}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>
    
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
          {/* Language indicator */}
          {repo.language && (
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <span className={`w-3 h-3 rounded-full ${languageColors[repo.language] || languageColors.default}`}></span>
              {repo.language}
            </span>
          )}
          
          {/* Stars count */}
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {repo.stargazers_count.toLocaleString()}
          </span>
    
          {/* Forks count */}
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 3.293a1 1 0 011.414 0L10 4.586l1.293-1.293a1 1 0 111.414 1.414L11.414 6l1.293 1.293a1 1 0 01-1.414 1.414L10 7.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 6 7.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {repo.forks_count.toLocaleString()}
          </span>
        </div>
      </div>
      {showDetail && <RepoDetail repo={repo} onClose={handleCloseDetail} />}
    </>
  );
}