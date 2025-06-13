
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Code, Settings, CheckCircle } from 'lucide-react';

interface CreateInterviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface InterviewData {
  positionTitle: string;
  interviewType: 'technical' | 'behavioral' | 'mixed';
  duration: number;
  selectedProblems: any[];
  candidateEmail: string;
  scheduledDate: string;
  scheduledTime: string;
  recordingEnabled: boolean;
  screenSharingEnabled: boolean;
  aiAssistanceLevel: 'none' | 'basic' | 'advanced';
}

export function CreateInterviewModal({ open, onOpenChange }: CreateInterviewModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [interviewData, setInterviewData] = useState<Partial<InterviewData>>({
    interviewType: 'technical',
    duration: 60,
    recordingEnabled: false,
    screenSharingEnabled: true,
    aiAssistanceLevel: 'basic'
  });

  const steps = [
    { number: 1, title: 'Interview Setup', icon: Settings },
    { number: 2, title: 'Problem Selection', icon: Code },
    { number: 3, title: 'Candidate Invitation', icon: User },
    { number: 4, title: 'Final Settings', icon: CheckCircle }
  ];

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'easy',
      tags: ['Array', 'Hash Table'],
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'
    },
    {
      id: 2,
      title: 'Valid Parentheses',
      difficulty: 'easy',
      tags: ['String', 'Stack'],
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.'
    },
    {
      id: 3,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'medium',
      tags: ['String', 'Sliding Window'],
      description: 'Given a string s, find the length of the longest substring without repeating characters.'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-[#00EA64] bg-[#00EA64]/10 border-[#00EA64]';
      case 'medium': return 'text-orange-500 bg-orange-500/10 border-orange-500';
      case 'hard': return 'text-red-500 bg-red-500/10 border-red-500';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500';
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const progress = (currentStep / 4) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Position Title
              </label>
              <input
                type="text"
                placeholder="e.g., Senior Frontend Developer"
                value={interviewData.positionTitle || ''}
                onChange={(e) => setInterviewData({...interviewData, positionTitle: e.target.value})}
                className="w-full p-3 bg-[#0F1419] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[#00EA64] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 block">
                Interview Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['technical', 'behavioral', 'mixed'].map((type) => (
                  <div
                    key={type}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      interviewData.interviewType === type
                        ? 'border-[#00EA64] bg-[#00EA64]/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setInterviewData({...interviewData, interviewType: type as any})}
                  >
                    <h4 className="font-medium text-white capitalize">{type}</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {type === 'technical' && 'Code-focused interview'}
                      {type === 'behavioral' && 'Culture & experience'}
                      {type === 'mixed' && 'Technical + behavioral'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 block">
                Duration: {interviewData.duration} minutes
              </label>
              <input
                type="range"
                min="30"
                max="180"
                step="15"
                value={interviewData.duration}
                onChange={(e) => setInterviewData({...interviewData, duration: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>30m</span>
                <span>180m</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select Problems</h3>
              <div className="space-y-3">
                {problems.map((problem) => (
                  <Card key={problem.id} className="bg-[#0F1419] border-gray-600 hover:border-gray-500 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-white">{problem.title}</h4>
                            <Badge className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{problem.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {problem.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <input 
                          type="checkbox" 
                          className="ml-4 h-4 w-4 text-[#00EA64] rounded border-gray-600 bg-[#0F1419]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Candidate Email
              </label>
              <input
                type="email"
                placeholder="candidate@email.com"
                value={interviewData.candidateEmail || ''}
                onChange={(e) => setInterviewData({...interviewData, candidateEmail: e.target.value})}
                className="w-full p-3 bg-[#0F1419] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[#00EA64] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Date
                </label>
                <input
                  type="date"
                  value={interviewData.scheduledDate || ''}
                  onChange={(e) => setInterviewData({...interviewData, scheduledDate: e.target.value})}
                  className="w-full p-3 bg-[#0F1419] border border-gray-600 rounded-lg text-white focus:border-[#00EA64] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Time
                </label>
                <input
                  type="time"
                  value={interviewData.scheduledTime || ''}
                  onChange={(e) => setInterviewData({...interviewData, scheduledTime: e.target.value})}
                  className="w-full p-3 bg-[#0F1419] border border-gray-600 rounded-lg text-white focus:border-[#00EA64] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 block">
                Email Template
              </label>
              <textarea
                rows={6}
                placeholder="Hello! You're invited to an interview..."
                className="w-full p-3 bg-[#0F1419] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[#00EA64] focus:outline-none resize-none"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#0F1419] rounded-lg">
                <span className="text-gray-300">Recording Enabled</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={interviewData.recordingEnabled}
                    onChange={(e) => setInterviewData({...interviewData, recordingEnabled: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00EA64]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#0F1419] rounded-lg">
                <span className="text-gray-300">Screen Sharing</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={interviewData.screenSharingEnabled}
                    onChange={(e) => setInterviewData({...interviewData, screenSharingEnabled: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00EA64]"></div>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 block">
                AI Assistance Level
              </label>
              <div className="space-y-2">
                {['none', 'basic', 'advanced'].map((level) => (
                  <div
                    key={level}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      interviewData.aiAssistanceLevel === level
                        ? 'border-[#00EA64] bg-[#00EA64]/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setInterviewData({...interviewData, aiAssistanceLevel: level as any})}
                  >
                    <span className="text-white capitalize">{level}</span>
                    <p className="text-sm text-gray-400 mt-1">
                      {level === 'none' && 'No AI assistance'}
                      {level === 'basic' && 'Basic hints and suggestions'}
                      {level === 'advanced' && 'Advanced analysis and insights'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1B2631] border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create New Interview</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="mb-6">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= step.number 
                      ? 'bg-[#00EA64] text-black' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs ${
                    currentStep >= step.number ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-gray-700">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            
            {currentStep < 4 ? (
              <Button 
                onClick={nextStep}
                className="bg-[#00EA64] text-black hover:bg-[#00EA64]/90"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  // Handle interview creation
                  onOpenChange(false);
                }}
                className="bg-[#00EA64] text-black hover:bg-[#00EA64]/90"
              >
                Create Interview
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
