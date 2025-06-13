
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Square, Clock, HelpCircle, AlertTriangle } from 'lucide-react';

interface InterviewControlsProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

const InterviewControls = ({ isRecording, onToggleRecording }: InterviewControlsProps) => {
  return (
    <div className="bg-[#2D2D30] border-t border-gray-700 px-4 py-3 flex items-center justify-between">
      {/* Left Controls */}
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" className="text-white border-gray-600">
          <Pause className="w-4 h-4 mr-1" />
          Pause Interview
        </Button>
        
        <Button variant="outline" size="sm" className="text-white border-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          Extend Time
        </Button>
      </div>

      {/* Center Status */}
      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>All systems operational</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <HelpCircle className="w-4 h-4 mr-1" />
          Help
        </Button>
        
        <Button variant="outline" size="sm" className="text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-white">
          <AlertTriangle className="w-4 h-4 mr-1" />
          Report Issue
        </Button>
        
        <Button 
          variant={isRecording ? "destructive" : "outline"}
          size="sm"
          onClick={onToggleRecording}
          className={isRecording ? "" : "text-white border-gray-600"}
        >
          {isRecording ? (
            <>
              <Square className="w-4 h-4 mr-1" />
              Stop Recording
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-1" />
              Start Recording
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default InterviewControls;
