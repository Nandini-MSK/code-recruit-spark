
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronRight, Lightbulb, Clock } from 'lucide-react';

const ProblemPanel = () => {
  const [showHints, setShowHints] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    examples: true,
    constraints: false,
    hints: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-[#2D2D30] h-full overflow-auto">
      <div className="p-4 space-y-4">
        {/* Problem Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-lg font-semibold">Two Sum</h2>
            <Badge className="bg-green-600 text-white">Easy</Badge>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>45 min</span>
            </div>
            <span>•</span>
            <span>Array, Hash Table</span>
          </div>
        </div>

        {/* Problem Description */}
        <Card className="bg-[#1E1E1E] border-gray-700">
          <div 
            className="p-3 cursor-pointer flex items-center justify-between"
            onClick={() => toggleSection('description')}
          >
            <h3 className="text-white font-medium">Problem Description</h3>
            {expandedSections.description ? 
              <ChevronDown className="w-4 h-4 text-gray-400" /> : 
              <ChevronRight className="w-4 h-4 text-gray-400" />
            }
          </div>
          
          {expandedSections.description && (
            <div className="px-3 pb-3 text-gray-300 text-sm leading-relaxed">
              <p>
                Given an array of integers <code className="bg-gray-800 px-1 rounded">nums</code> and an integer <code className="bg-gray-800 px-1 rounded">target</code>, 
                return <em>indices</em> of the two numbers such that they add up to <code className="bg-gray-800 px-1 rounded">target</code>.
              </p>
              <br />
              <p>
                You may assume that each input would have <strong>exactly one solution</strong>, and you 
                may not use the same element twice.
              </p>
              <br />
              <p>You can return the answer in any order.</p>
            </div>
          )}
        </Card>

        {/* Examples */}
        <Card className="bg-[#1E1E1E] border-gray-700">
          <div 
            className="p-3 cursor-pointer flex items-center justify-between"
            onClick={() => toggleSection('examples')}
          >
            <h3 className="text-white font-medium">Examples</h3>
            {expandedSections.examples ? 
              <ChevronDown className="w-4 h-4 text-gray-400" /> : 
              <ChevronRight className="w-4 h-4 text-gray-400" />
            }
          </div>
          
          {expandedSections.examples && (
            <div className="px-3 pb-3 space-y-4">
              <div className="bg-[#2D2D30] p-3 rounded">
                <div className="text-white font-medium text-sm mb-2">Example 1:</div>
                <div className="font-mono text-sm text-gray-300 space-y-1">
                  <div><span className="text-blue-400">Input:</span> nums = [2,7,11,15], target = 9</div>
                  <div><span className="text-green-400">Output:</span> [0,1]</div>
                  <div><span className="text-yellow-400">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                </div>
              </div>
              
              <div className="bg-[#2D2D30] p-3 rounded">
                <div className="text-white font-medium text-sm mb-2">Example 2:</div>
                <div className="font-mono text-sm text-gray-300 space-y-1">
                  <div><span className="text-blue-400">Input:</span> nums = [3,2,4], target = 6</div>
                  <div><span className="text-green-400">Output:</span> [1,2]</div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Constraints */}
        <Card className="bg-[#1E1E1E] border-gray-700">
          <div 
            className="p-3 cursor-pointer flex items-center justify-between"
            onClick={() => toggleSection('constraints')}
          >
            <h3 className="text-white font-medium">Constraints</h3>
            {expandedSections.constraints ? 
              <ChevronDown className="w-4 h-4 text-gray-400" /> : 
              <ChevronRight className="w-4 h-4 text-gray-400" />
            }
          </div>
          
          {expandedSections.constraints && (
            <div className="px-3 pb-3">
              <ul className="text-gray-300 text-sm space-y-1 font-mono">
                <li>• 2 ≤ nums.length ≤ 10⁴</li>
                <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                <li>• -10⁹ ≤ target ≤ 10⁹</li>
                <li>• Only one valid answer exists.</li>
              </ul>
            </div>
          )}
        </Card>

        {/* Hints */}
        <Card className="bg-[#1E1E1E] border-gray-700">
          <div 
            className="p-3 cursor-pointer flex items-center justify-between"
            onClick={() => toggleSection('hints')}
          >
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <h3 className="text-white font-medium">Hints</h3>
            </div>
            {expandedSections.hints ? 
              <ChevronDown className="w-4 h-4 text-gray-400" /> : 
              <ChevronRight className="w-4 h-4 text-gray-400" />
            }
          </div>
          
          {expandedSections.hints && (
            <div className="px-3 pb-3 space-y-2">
              <div className="text-gray-300 text-sm">
                1. A really brute force way would be to search for all possible pairs of numbers but that would be too slow.
              </div>
              <div className="text-gray-300 text-sm">
                2. So we need to find a more efficient way. Can we use additional data structure to speed up the search?
              </div>
            </div>
          )}
        </Card>

        {/* Follow-up */}
        <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded p-3">
          <div className="text-blue-300 text-sm font-medium mb-1">Follow-up:</div>
          <div className="text-blue-200 text-sm">
            Can you come up with an algorithm that is less than O(n²) time complexity?
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPanel;
