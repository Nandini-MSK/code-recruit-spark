
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Video, VideoOff, Mic, MicOff, Monitor, Settings, Maximize2 } from 'lucide-react';

const VideoPanel = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  return (
    <div className="bg-[#2D2D30] h-full flex flex-col">
      {/* Video Controls Header */}
      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
        <span className="text-white text-sm font-medium">Video Conference</span>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 p-4 space-y-4">
        {/* Interviewer Video */}
        <div className="relative bg-gray-800 rounded-lg aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">AM</span>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-xs">
            Alex Martinez (Interviewer)
          </div>
          <div className="absolute top-2 right-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>

        {/* Candidate Video (Picture-in-Picture) */}
        <div className="relative bg-gray-800 rounded-lg" style={{ aspectRatio: '16/9', height: '120px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
          </div>
          <div className="absolute bottom-1 left-1 bg-black bg-opacity-75 px-1 py-0.5 rounded text-white text-xs">
            You
          </div>
          <div className="absolute top-1 right-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="p-3 border-t border-gray-700 flex items-center justify-center space-x-2">
        <Button
          variant={isVideoOn ? "default" : "destructive"}
          size="sm"
          onClick={() => setIsVideoOn(!isVideoOn)}
          className="flex-1"
        >
          {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
        </Button>
        
        <Button
          variant={isAudioOn ? "default" : "destructive"}
          size="sm"
          onClick={() => setIsAudioOn(!isAudioOn)}
          className="flex-1"
        >
          {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        </Button>
        
        <Button
          variant={isScreenSharing ? "secondary" : "outline"}
          size="sm"
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className="flex-1"
        >
          <Monitor className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-gray-400">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default VideoPanel;
