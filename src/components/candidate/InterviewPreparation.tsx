
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Mic, 
  Wifi, 
  Monitor, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  Clock,
  User,
  Building,
  Video,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';

interface InterviewDetails {
  id: string;
  company: string;
  position: string;
  interviewer: {
    name: string;
    role: string;
    photo?: string;
  };
  scheduledAt: string;
  duration: number;
  type: string;
  skills: string[];
  meetingUrl?: string;
}

interface SystemCheck {
  camera: boolean;
  microphone: boolean;
  internet: boolean;
  browser: boolean;
}

export function InterviewPreparation() {
  const [systemCheck, setSystemCheck] = useState<SystemCheck>({
    camera: false,
    microphone: false,
    internet: false,
    browser: false
  });

  // Mock interview data
  const interview: InterviewDetails = {
    id: '1',
    company: 'TechCorp',
    position: 'Senior Frontend Developer',
    interviewer: {
      name: 'Sarah Johnson',
      role: 'Engineering Manager'
    },
    scheduledAt: '2024-01-15T14:00:00Z',
    duration: 60,
    type: 'Technical',
    skills: ['React', 'TypeScript', 'Node.js'],
    meetingUrl: 'https://meet.google.com/abc-defg-hij'
  };

  const runSystemCheck = async (type: keyof SystemCheck) => {
    // Simulate system check
    setTimeout(() => {
      setSystemCheck(prev => ({ ...prev, [type]: true }));
    }, 1000);
  };

  const allChecksComplete = Object.values(systemCheck).every(check => check);

  return (
    <div className="min-h-screen bg-[#0F1419] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Interview Preparation</h1>
          <p className="text-gray-400">Get ready for your upcoming interview</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interview Details */}
          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Interview Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {interview.company[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{interview.company}</h3>
                  <p className="text-gray-400">{interview.position}</p>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{interview.interviewer.name}</p>
                    <p className="text-sm text-gray-400">{interview.interviewer.role}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(interview.scheduledAt), 'EEEE, MMMM dd, yyyy')}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-4 w-4 mr-2" />
                    {format(new Date(interview.scheduledAt), 'HH:mm')} ({interview.duration} minutes)
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-white mb-2">Skills to be assessed:</p>
                  <div className="flex flex-wrap gap-2">
                    {interview.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-blue-500 text-blue-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-600">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Video className="h-4 w-4 mr-2" />
                    Join Interview
                  </Button>
                  {interview.meetingUrl && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2 border-gray-600 text-gray-300"
                      onClick={() => window.open(interview.meetingUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Browser
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Check */}
          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  System Check
                </span>
                {allChecksComplete && (
                  <Badge className="bg-green-600 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Ready
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Camera Check */}
              <div className="flex items-center justify-between p-3 bg-[#0F1419] rounded-lg border border-gray-600">
                <div className="flex items-center space-x-3">
                  <Camera className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-white">Camera</p>
                    <p className="text-sm text-gray-400">Video feed test</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {systemCheck.camera ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => runSystemCheck('camera')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Test
                    </Button>
                  )}
                </div>
              </div>

              {/* Microphone Check */}
              <div className="flex items-center justify-between p-3 bg-[#0F1419] rounded-lg border border-gray-600">
                <div className="flex items-center space-x-3">
                  <Mic className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-white">Microphone</p>
                    <p className="text-sm text-gray-400">Audio input test</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {systemCheck.microphone ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => runSystemCheck('microphone')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Test
                    </Button>
                  )}
                </div>
              </div>

              {/* Internet Check */}
              <div className="flex items-center justify-between p-3 bg-[#0F1419] rounded-lg border border-gray-600">
                <div className="flex items-center space-x-3">
                  <Wifi className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-white">Internet Speed</p>
                    <p className="text-sm text-gray-400">Bandwidth test</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {systemCheck.internet ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-green-400">45 Mbps</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => runSystemCheck('internet')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Test
                    </Button>
                  )}
                </div>
              </div>

              {/* Browser Check */}
              <div className="flex items-center justify-between p-3 bg-[#0F1419] rounded-lg border border-gray-600">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-white">Browser</p>
                    <p className="text-sm text-gray-400">Compatibility check</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {systemCheck.browser ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-green-400">Chrome 120</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => runSystemCheck('browser')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Check
                    </Button>
                  )}
                </div>
              </div>

              {!allChecksComplete && (
                <div className="mt-4 p-3 bg-orange-900/20 border border-orange-600 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-400" />
                    <p className="text-sm text-orange-400">
                      Complete all system checks before joining the interview
                    </p>
                  </div>
                </div>
              )}

              <Button 
                className="w-full mt-4" 
                onClick={() => Object.keys(systemCheck).forEach(key => runSystemCheck(key as keyof SystemCheck))}
                disabled={allChecksComplete}
              >
                Run All Checks
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preparation Checklist */}
        <Card className="bg-[#1B2631] border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white">Preparation Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-white">Review job description</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-white">Practice coding problems</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-white">Prepare questions for interviewer</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-white">Test system setup</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                  <span className="text-white">Review company information</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                  <span className="text-white">Prepare workspace</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Preparation Progress</span>
                <span className="text-sm text-gray-400">4/6 Complete</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
