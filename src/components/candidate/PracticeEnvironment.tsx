
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Code, 
  Play, 
  Clock, 
  MemoryStick, 
  CheckCircle, 
  Search, 
  Filter,
  ChevronRight,
  Star,
  Target
} from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  solved: boolean;
  rating: number;
  attempts: number;
}

export function PracticeEnvironment() {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('// Write your solution here\nfunction solution() {\n    \n}');
  const [language, setLanguage] = useState('javascript');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // Mock problems data
  const problems: Problem[] = [
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'easy',
      tags: ['Array', 'Hash Table'],
      solved: true,
      rating: 4.5,
      attempts: 2
    },
    {
      id: '2',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'medium',
      tags: ['String', 'Sliding Window'],
      solved: false,
      rating: 4.2,
      attempts: 0
    },
    {
      id: '3',
      title: 'Median of Two Sorted Arrays',
      difficulty: 'hard',
      tags: ['Array', 'Binary Search'],
      solved: false,
      rating: 4.8,
      attempts: 1
    },
    {
      id: '4',
      title: 'Valid Parentheses',
      difficulty: 'easy',
      tags: ['String', 'Stack'],
      solved: true,
      rating: 4.3,
      attempts: 1
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600';
      case 'medium': return 'bg-orange-600';
      case 'hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const runCode = () => {
    // Simulate code execution
    console.log('Running code:', code);
  };

  return (
    <div className="min-h-screen bg-[#0F1419]">
      <div className="flex h-screen">
        {/* Problem Browser Sidebar */}
        <div className="w-1/3 bg-[#1B2631] border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Practice Problems</h2>
            
            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#0F1419] border-gray-600 text-white"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={filterDifficulty === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterDifficulty('all')}
                  className="text-xs"
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={filterDifficulty === 'easy' ? 'default' : 'outline'}
                  onClick={() => setFilterDifficulty('easy')}
                  className="text-xs bg-green-600 hover:bg-green-700"
                >
                  Easy
                </Button>
                <Button
                  size="sm"
                  variant={filterDifficulty === 'medium' ? 'default' : 'outline'}
                  onClick={() => setFilterDifficulty('medium')}
                  className="text-xs bg-orange-600 hover:bg-orange-700"
                >
                  Medium
                </Button>
                <Button
                  size="sm"
                  variant={filterDifficulty === 'hard' ? 'default' : 'outline'}
                  onClick={() => setFilterDifficulty('hard')}
                  className="text-xs bg-red-600 hover:bg-red-700"
                >
                  Hard
                </Button>
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {filteredProblems.map((problem) => (
                <Card
                  key={problem.id}
                  className={`cursor-pointer transition-colors border ${
                    selectedProblem?.id === problem.id
                      ? 'bg-[#2A3F50] border-blue-500'
                      : 'bg-[#0F1419] border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedProblem(problem)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white text-sm">{problem.title}</h3>
                      {problem.solved && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={`${getDifficultyColor(problem.difficulty)} text-white text-xs`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-gray-400">{problem.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {problem.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                      {problem.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          +{problem.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{problem.attempts} attempts</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 flex flex-col">
          {selectedProblem ? (
            <>
              {/* Problem Description */}
              <div className="h-1/3 bg-[#1B2631] border-b border-gray-700 p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-white">{selectedProblem.title}</h1>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getDifficultyColor(selectedProblem.difficulty)} text-white`}>
                      {selectedProblem.difficulty.charAt(0).toUpperCase() + selectedProblem.difficulty.slice(1)}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white">{selectedProblem.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 mb-4">
                    Given an array of integers <code className="bg-gray-700 px-1 rounded">nums</code> and an integer <code className="bg-gray-700 px-1 rounded">target</code>, 
                    return indices of the two numbers such that they add up to <code className="bg-gray-700 px-1 rounded">target</code>.
                  </p>
                  
                  <h4 className="text-white font-semibold mb-2">Example:</h4>
                  <div className="bg-[#0F1419] p-3 rounded border border-gray-600">
                    <pre className="text-green-400 text-sm">
                      <span className="text-gray-400">Input:</span> nums = [2,7,11,15], target = 9{'\n'}
                      <span className="text-gray-400">Output:</span> [0,1]
                    </pre>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedProblem.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-blue-500 text-blue-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 flex flex-col">
                <div className="bg-[#1B2631] border-b border-gray-700 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-[#0F1419] border border-gray-600 rounded px-3 py-1 text-white text-sm"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={runCode}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run Code
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Submit
                    </Button>
                  </div>
                </div>

                <div className="flex-1 bg-[#0F1419]">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full bg-transparent text-white p-4 font-mono text-sm resize-none focus:outline-none"
                    style={{ fontFamily: 'Monaco, Consolas, monospace' }}
                  />
                </div>

                {/* Results Panel */}
                <div className="h-32 bg-[#1B2631] border-t border-gray-700 p-4">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="font-semibold text-white">Test Results</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Runtime: 72ms
                      </div>
                      <div className="flex items-center">
                        <MemoryStick className="h-3 w-3 mr-1" />
                        Memory: 44.2MB
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-green-400">Test case 1 passed</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-green-400">Test case 2 passed</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* No Problem Selected */
            <div className="flex-1 flex items-center justify-center bg-[#0F1419]">
              <div className="text-center">
                <Target className="h-16 w-16 mx-auto mb-4 text-gray-500" />
                <h2 className="text-xl font-semibold text-white mb-2">Select a Problem</h2>
                <p className="text-gray-400">Choose a problem from the left panel to start practicing</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
