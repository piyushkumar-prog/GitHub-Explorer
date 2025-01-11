'use client';
import { useState } from 'react';
import axios from 'axios';

interface ProfileData {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

interface ExtendedStats {
  totalCommits: number;
  totalForks: number;
  languages: { [key: string]: number };
}

export default function ProfileAnalyzer() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [extendedStats, setExtendedStats] = useState<ExtendedStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchExtendedStats = async (username: string) => {
    try {
      // Fetch repositories to get languages and forks
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
      const repos = reposResponse.data;

      // Calculate total forks
      const totalForks = repos.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);

      // Get languages
      const languages: { [key: string]: number } = {};
      for (const repo of repos) {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      }

      // For commits, we'll use the events API to get a rough estimate
      const eventsResponse = await axios.get(`https://api.github.com/users/${username}/events/public`);
      const pushEvents = eventsResponse.data.filter((event: any) => event.type === 'PushEvent');
      const totalCommits = pushEvents.reduce((acc: number, event: any) => 
        acc + (event.payload.commits?.length || 0), 0);

      setExtendedStats({
        totalCommits,
        totalForks,
        languages,
      });
    } catch (error) {
      console.error('Error fetching extended stats:', error);
      setExtendedStats({
        totalCommits: 0,
        totalForks: 0,
        languages: {},
      });
    }
  };

  const analyzeProfile = async () => {
    if (!username) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfileData(response.data);
      await fetchExtendedStats(username);
    } catch (error) {
      setError('Profile not found or error occurred');
      setProfileData(null);
      setExtendedStats(null);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          onClick={analyzeProfile}
          className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Analyze
        </button>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      {profileData && extendedStats && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
            <img
              src={profileData.avatar_url}
              alt={profileData.login}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{profileData.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">@{profileData.login}</p>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center sm:text-left">{profileData.bio}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 text-center mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{profileData.public_repos}</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Repositories</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{profileData.followers}</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{profileData.following}</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Following</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{extendedStats.totalCommits}</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Recent Commits</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{extendedStats.totalForks}</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Total Forks</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Languages</h4>
            <div className="space-y-2">
              {Object.entries(extendedStats.languages)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([language, count]) => (
                  <div key={language} className="flex justify-between items-center px-2">
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{language}</span>
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{count} repos</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 