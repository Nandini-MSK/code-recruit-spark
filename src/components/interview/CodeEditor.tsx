
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Save, RotateCcw, Settings, FileText } from 'lucide-react';

const CodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(`def solution(nums, target):
    """
    Given an array of integers nums and an integer target,
    return indices of the two numbers such that they add up to target.
    """
    # Write your solution here
    pass`);

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' }
  ];

  return (
    <div className="bg-[#1E1E1E] h-full flex flex-col">
      {/* Editor Header */}
      <div className="bg-[#2D2D30] border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-white text-sm">solution.py</span>
          </div>
          
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-32 bg-[#1E1E1E] border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2D2D30] border-gray-600">
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="text-white hover:bg-[#1E1E1E]">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Save className="w-4 h-4 mr-1" />
            Auto-saved 2s ago
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-[#1E1E1E] text-[#D4D4D4] font-mono text-sm p-4 resize-none border-none outline-none"
          style={{
            lineHeight: '1.5',
            tabSize: 4,
          }}
          placeholder="Start coding here..."
        />
        
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 bg-[#1E1E1E] border-r border-gray-700 p-4 text-gray-500 font-mono text-sm pointer-events-none">
          {code.split('\n').map((_, index) => (
            <div key={index} className="h-6 flex items-center justify-end pr-2 min-w-[40px]">
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Editor Footer */}
      <div className="bg-[#2D2D30] border-t border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>Ln 5, Col 8</span>
          <span>•</span>
          <span>UTF-8</span>
          <span>•</span>
          <span>{selectedLanguage}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-green-600 border-green-600 text-white hover:bg-green-700">
            <Play className="w-4 h-4 mr-1" />
            Run Code
          </Button>
          
          <Button variant="outline" size="sm" className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
