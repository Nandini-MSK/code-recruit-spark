
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, CheckCircle, XCircle, Clock, Zap, Plus } from 'lucide-react';

const TestRunner = () => {
  const [activeTab, setActiveTab] = useState('sample');
  const [customInput, setCustomInput] = useState('');
  const [testResults, setTestResults] = useState([
    { id: 1, input: '[2,7,11,15], 9', output: '[0,1]', expected: '[0,1]', status: 'passed', time: '1ms', memory: '8.2MB' },
    { id: 2, input: '[3,2,4], 6', output: '[1,2]', expected: '[1,2]', status: 'passed', time: '2ms', memory: '8.1MB' },
    { id: 3, input: '[3,3], 6', output: '[0,1]', expected: '[0,1]', status: 'passed', time: '1ms', memory: '8.0MB' }
  ]);

  const runTests = () => {
    // Simulate test execution
    console.log('Running tests...');
  };

  return (
    <div className="bg-[#2D2D30] h-full flex flex-col">
      {/* Test Runner Header */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Test Cases</h3>
          <Button onClick={runTests} size="sm" className="bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
        </div>

        {/* Test Tabs */}
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('sample')}
            className={`px-3 py-1 text-xs rounded ${
              activeTab === 'sample' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Sample Tests
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-3 py-1 text-xs rounded ${
              activeTab === 'custom' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Custom Input
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-3 py-1 text-xs rounded ${
              activeTab === 'results' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Results
          </button>
        </div>
      </div>

      {/* Test Content */}
      <div className="flex-1 overflow-auto p-3">
        {activeTab === 'sample' && (
          <div className="space-y-3">
            <div className="text-gray-300 text-sm mb-3">
              Sample test cases will be run automatically when you submit your solution.
            </div>
            
            {[1, 2, 3].map((testNum) => (
              <Card key={testNum} className="bg-[#1E1E1E] border-gray-700 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">Test Case {testNum}</span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Sample
                  </Badge>
                </div>
                
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-blue-400">Input:</span>
                    <div className="bg-gray-800 p-2 rounded mt-1 text-gray-300">
                      nums = [2,7,11,15], target = 9
                    </div>
                  </div>
                  <div>
                    <span className="text-green-400">Expected Output:</span>
                    <div className="bg-gray-800 p-2 rounded mt-1 text-gray-300">
                      [0,1]
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-3">
            <div className="text-gray-300 text-sm">
              Test your solution with custom input:
            </div>
            
            <div>
              <label className="text-white text-sm mb-2 block">Custom Input:</label>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="nums = [2,7,11,15]&#10;target = 9"
                className="w-full h-24 bg-[#1E1E1E] border border-gray-700 rounded p-2 text-gray-300 font-mono text-sm resize-none"
              />
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-1" />
              Add Test Case
            </Button>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">Test Results</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">3/3 Passed</span>
              </div>
            </div>

            {testResults.map((result) => (
              <Card key={result.id} className="bg-[#1E1E1E] border-gray-700 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">Test Case {result.id}</span>
                  <div className="flex items-center space-x-1">
                    {result.status === 'passed' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-xs ${
                      result.status === 'passed' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-blue-400">Input:</span>
                    <div className="bg-gray-800 p-2 rounded mt-1 text-gray-300">
                      {result.input}
                    </div>
                  </div>
                  <div>
                    <span className="text-green-400">Expected:</span>
                    <div className="bg-gray-800 p-2 rounded mt-1 text-gray-300">
                      {result.expected}
                    </div>
                  </div>
                  <div>
                    <span className="text-yellow-400">Your Output:</span>
                    <div className="bg-gray-800 p-2 rounded mt-1 text-gray-300">
                      {result.output}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-700">
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{result.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>{result.memory}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestRunner;
