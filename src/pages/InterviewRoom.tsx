
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Video, VideoOff, Mic, MicOff, Monitor, MessageSquare, Settings } from 'lucide-react';
import VideoPanel from '@/components/interview/VideoPanel';
import CodeEditor from '@/components/interview/CodeEditor';
import ProblemPanel from '@/components/interview/ProblemPanel';
import TestRunner from '@/components/interview/TestRunner';
import ChatPanel from '@/components/interview/ChatPanel';
import InterviewControls from '@/components/interview/InterviewControls';

const InterviewRoom = () => {
  const { interviewId } = useParams();
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [isRecording, setIsRecording] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [activePanel, setActivePanel] = useState('code');

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 600) return 'text-red-500'; // Last 10 minutes
    if (timeRemaining <= 1800) return 'text-yellow-500'; // Last 30 minutes
    return 'text-green-500';
  };

  return (
    <div className="h-screen bg-[#1E1E1E] flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="bg-[#2D2D30] border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-white text-lg font-semibold">Technical Interview - Senior Frontend Developer</h1>
          <Badge variant="secondary" className="bg-blue-600 text-white">
            John Doe (Candidate)
          </Badge>
        </div>

        <div className="flex items-center space-x-6">
          {/* Timer */}
          <div className="flex items-center space-x-2">
            <Timer className={`w-5 h-5 ${getTimerColor()}`} />
            <span className={`font-mono text-lg font-bold ${getTimerColor()}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'poor' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-white text-sm capitalize">{connectionStatus}</span>
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm">Recording</span>
            </div>
          )}

          {/* Support Chat */}
          <Button variant="outline" size="sm" className="text-white border-gray-600">
            <MessageSquare className="w-4 h-4 mr-1" />
            Support
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Video and Problem */}
        <div className="w-1/3 flex flex-col border-r border-gray-700">
          {/* Video Panel */}
          <div className="h-1/2 border-b border-gray-700">
            <VideoPanel />
          </div>
          
          {/* Problem Panel */}
          <div className="h-1/2 overflow-auto">
            <ProblemPanel />
          </div>
        </div>

        {/* Center Panel - Code Editor */}
        <div className="flex-1 flex flex-col">
          <CodeEditor />
        </div>

        {/* Right Panel - Test Runner and Chat */}
        <div className="w-1/3 flex flex-col border-l border-gray-700">
          {/* Panel Tabs */}
          <div className="bg-[#2D2D30] border-b border-gray-700 flex">
            <button
              onClick={() => setActivePanel('tests')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activePanel === 'tests' 
                  ? 'text-blue-400 border-blue-400' 
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Test Cases
            </button>
            <button
              onClick={() => setActivePanel('chat')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activePanel === 'chat' 
                  ? 'text-blue-400 border-blue-400' 
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActivePanel('analysis')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activePanel === 'analysis' 
                  ? 'text-blue-400 border-blue-400' 
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              AI Analysis
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-auto">
            {activePanel === 'tests' && <TestRunner />}
            {activePanel === 'chat' && <ChatPanel />}
            {activePanel === 'analysis' && (
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold mb-4">Code Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-[#2D2D30] p-3 rounded">
                    <div className="text-sm text-gray-300 mb-1">Time Complexity</div>
                    <div className="text-orange-400 font-mono">O(n)</div>
                  </div>
                  <div className="bg-[#2D2D30] p-3 rounded">
                    <div className="text-sm text-gray-300 mb-1">Code Quality</div>
                    <div className="text-green-400">85/100</div>
                  </div>
                  <div className="bg-[#2D2D30] p-3 rounded">
                    <div className="text-sm text-gray-300 mb-1">Suggestions</div>
                    <div className="text-sm text-gray-300">Consider using a Set for faster lookups</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <InterviewControls
        isRecording={isRecording}
        onToggleRecording={() => setIsRecording(!isRecording)}
      />
    </div>
  );
};

export default InterviewRoom;
