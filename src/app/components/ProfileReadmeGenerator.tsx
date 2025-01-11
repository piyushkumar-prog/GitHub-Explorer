import { useState } from 'react';

interface ProfileData {
  name: string;
  title: string;
  about: string;
  skills: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  showStats: boolean;
  showLanguages: boolean;
}

export default function ProfileReadmeGenerator() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    title: '',
    about: '',
    skills: [],
    socialLinks: {},
    showStats: true,
    showLanguages: true,
  });

  const generateReadme = () => {
    const readme = `
# 👋 Hi, I'm ${profileData.name}

${profileData.title ? `## ${profileData.title}\n` : ''}

${profileData.about ? `### About Me\n${profileData.about}\n` : ''}

${profileData.skills.length > 0 ? `
### 🛠 Skills
${profileData.skills.join(' • ')}
` : ''}

${Object.keys(profileData.socialLinks).length > 0 ? `
### 🔗 Connect with me
${Object.entries(profileData.socialLinks)
  .filter(([_, value]) => value)
  .map(([key, value]) => `[${key}](${value})`)
  .join(' | ')}
` : ''}

${profileData.showStats ? `
### 📊 GitHub Stats
![${profileData.name}'s GitHub stats](https://github-readme-stats.vercel.app/api?username=${profileData.socialLinks.github?.split('/').pop()}&show_icons=true&theme=radical)
` : ''}

${profileData.showLanguages ? `
### 💻 Most Used Languages
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${profileData.socialLinks.github?.split('/').pop()}&layout=compact&theme=radical)
` : ''}
`;

    return readme.trim();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Your Title"
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={profileData.title}
            onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
          />
        </div>

        {/* About Me */}
        <textarea
          placeholder="About Me"
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32"
          value={profileData.about}
          onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
        />

        {/* Skills */}
        <input
          type="text"
          placeholder="Skills (comma-separated)"
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={profileData.skills.join(', ')}
          onChange={(e) => setProfileData({ ...profileData, skills: e.target.value.split(',').map(s => s.trim()) })}
        />

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="GitHub Profile URL"
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={profileData.socialLinks.github || ''}
            onChange={(e) => setProfileData({
              ...profileData,
              socialLinks: { ...profileData.socialLinks, github: e.target.value }
            })}
          />
          <input
            type="text"
            placeholder="LinkedIn Profile URL"
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={profileData.socialLinks.linkedin || ''}
            onChange={(e) => setProfileData({
              ...profileData,
              socialLinks: { ...profileData.socialLinks, linkedin: e.target.value }
            })}
          />
        </div>

        {/* Options */}
        <div className="flex gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={profileData.showStats}
              onChange={(e) => setProfileData({ ...profileData, showStats: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-gray-700 dark:text-gray-300">Show GitHub Stats</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={profileData.showLanguages}
              onChange={(e) => setProfileData({ ...profileData, showLanguages: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-gray-700 dark:text-gray-300">Show Languages</span>
          </label>
        </div>

        {/* Generated README Preview */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
              {generateReadme()}
            </pre>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(generateReadme())}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
} 