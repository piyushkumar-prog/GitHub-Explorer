import { useState } from 'react';

interface CheatSheetSection {
  title: string;
  commands: Array<{
    command: string;
    description: string;
  }>;
}

export default function GitCheatSheet() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const sections: CheatSheetSection[] = [
    {
      title: "Getting Started",
      commands: [
        { command: "git init", description: "Initialize a new Git repository" },
        { command: "git clone [url]", description: "Clone a repository from remote source" },
        { command: "git config --global user.name '[name]'", description: "Set your Git username" },
        { command: "git config --global user.email '[email]'", description: "Set your Git email" }
      ]
    },
    {
      title: "Basic Commands",
      commands: [
        { command: "git status", description: "Check status of working directory" },
        { command: "git add [file]", description: "Add file(s) to staging area" },
        { command: "git add .", description: "Add all changes to staging area" },
        { command: "git commit -m '[message]'", description: "Commit changes with a message" },
        { command: "git log", description: "View commit history" }
      ]
    },
    {
      title: "Branching & Merging",
      commands: [
        { command: "git branch", description: "List all local branches" },
        { command: "git branch [name]", description: "Create a new branch" },
        { command: "git checkout [branch]", description: "Switch to a branch" },
        { command: "git checkout -b [name]", description: "Create and switch to new branch" },
        { command: "git merge [branch]", description: "Merge branch into current branch" }
      ]
    },
    {
      title: "Remote Operations",
      commands: [
        { command: "git remote add origin [url]", description: "Add remote repository" },
        { command: "git push origin [branch]", description: "Push branch to remote" },
        { command: "git pull origin [branch]", description: "Pull changes from remote" },
        { command: "git fetch", description: "Download objects and refs from remote" }
      ]
    },
    {
      title: "Undoing Changes",
      commands: [
        { command: "git restore [file]", description: "Discard changes in working directory" },
        { command: "git reset [file]", description: "Unstage changes while keeping the changes" },
        { command: "git reset --hard HEAD", description: "Discard all local changes" },
        { command: "git revert [commit]", description: "Create new commit that undoes changes" }
      ]
    }
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    commands: section.commands.filter(cmd => 
      cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.commands.length > 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search commands..."
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-8">
        {filteredSections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="grid gap-4">
              {section.commands.map((cmd, cmdIndex) => (
                <div 
                  key={cmdIndex}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <code className="text-blue-600 dark:text-blue-400 font-mono">
                      {cmd.command}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(cmd.command)}
                      className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      title="Copy command"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                    {cmd.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 