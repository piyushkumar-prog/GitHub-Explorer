import React from 'react';

interface RepoDetailProps {
  repo: {
    name: string;
    description: string;
    owner: {
      login: string;
      avatar_url: string;
    };
    language?: string;
    license?: {
      name: string;
    };
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
  };
  onClose: () => void;
}

const RepoDetail: React.FC<RepoDetailProps> = ({ repo, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full relative mx-4 sm:mx-0">
        <button onClick={onClose} className="text-gray-500 font-bold p-2 hover:text-gray-700 absolute top-2 right-2">
          Close
        </button>
        <h2 className="text-2xl font-bold mt-4">{repo.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{repo.description || 'No description available'}</p>
        <div className="mt-4">
          <p><strong>Owner:</strong> {repo.owner.login}</p>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} className="w-10 h-10 rounded-full" />
          <p><strong>Language:</strong> {repo.language || 'N/A'}</p>
          <p><strong>License:</strong> {repo.license?.name || 'N/A'}</p>
          <p><strong>Stars:</strong> {repo.stargazers_count.toLocaleString()}</p>
          <p><strong>Forks:</strong> {repo.forks_count.toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(repo.updated_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default RepoDetail; 