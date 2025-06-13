
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bell, HelpCircle, Calendar, Clock, Video, CheckCircle, Trophy, Code, BookOpen, Target } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import type { Database } from '@/integrations/supabase/types';

type InterviewStatus = Database['public']['Enums']['interview_status'];
type InterviewType = Database['public']['Enums']['interview_type'];

interface Interview {
  id: string;
  position_title: string;
  interview_type: InterviewType;
  status: InterviewStatus;
  scheduled_at: string;
  duration_minutes: number;
  meeting_url?: string;
}

export default function CandidateDashboard() {
  const { data: upcomingInterviews, isLoading: interviewsLoading } = useQuery({
    queryKey: ['candidate-interviews'],
    queryFn: async (): Promise<Interview[]> => {
      const { data, error } = await supabase
        .from('interviews')
        .select('id, position_title, interview_type, status, scheduled_at, duration_minutes, meeting_url')
        .in('status', ['scheduled', 'active'])
        .order('scheduled_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: recentInterviews } = useQuery({
    queryKey: ['recent-interviews'],
    queryFn: async (): Promise<Interview[]> => {
      const { data, error } = await supabase
        .from('interviews')
        .select('id, position_title, interview_type, status, scheduled_at, duration_minutes')
        .eq('status', 'completed')
        .order('scheduled_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    }
  });

  const getStatusColor = (status: InterviewStatus) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPerformanceScore = () => Math.floor(Math.random() * 40) + 60; // Mock score 60-100

  return (
    <div className="min-h-screen bg-[#0F1419]">
      {/* Header */}
      <header className="bg-[#1B2631] border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">CodeRecruit</h1>
            <div className="text-sm text-gray-400">Dashboard</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, John!</h2>
          <p className="text-gray-400">Ready to ace your next interview? Let's prepare together.</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                Next Interview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingInterviews && upcomingInterviews.length > 0 ? (
                <div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {formatDistanceToNow(new Date(upcomingInterviews[0].scheduled_at), { addSuffix: true })}
                  </p>
                  <p className="text-sm text-gray-400">{upcomingInterviews[0].position_title}</p>
                </div>
              ) : (
                <p className="text-gray-400">No upcoming interviews</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white mb-1">85%</p>
              <p className="text-sm text-gray-400">Based on 12 interviews</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-400" />
                Skill Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white mb-1">Advanced</p>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Interviews */}
          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Upcoming Interviews</span>
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  {upcomingInterviews?.length || 0} scheduled
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {interviewsLoading ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-600 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : upcomingInterviews && upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="bg-[#0F1419] rounded-lg p-4 border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{interview.position_title}</h4>
                        <Badge className={`${getStatusColor(interview.status)} text-white border-0`}>
                          {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(interview.scheduled_at), 'MMM dd, yyyy')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {format(new Date(interview.scheduled_at), 'HH:mm')}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Video className="h-4 w-4 mr-1" />
                          Prepare
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">No upcoming interviews</p>
                  <p className="text-sm text-gray-500 mt-2">Your scheduled interviews will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Performance */}
          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {recentInterviews && recentInterviews.length > 0 ? (
                <div className="space-y-4">
                  {recentInterviews.map((interview) => {
                    const score = getPerformanceScore();
                    const scoreColor = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-blue-400' : 'text-orange-400';
                    
                    return (
                      <div key={interview.id} className="bg-[#0F1419] rounded-lg p-4 border border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{interview.position_title}</h4>
                          <span className={`font-bold ${scoreColor}`}>{score}%</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                          <span>{format(new Date(interview.scheduled_at), 'MMM dd')}</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {interview.interview_type}
                          </Badge>
                        </div>
                        <Progress value={score} className="h-2" />
                        <p className="text-xs text-gray-500 mt-2">
                          {score >= 80 ? 'Excellent performance!' : score >= 60 ? 'Good job, room for improvement' : 'Keep practicing!'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">No interview history</p>
                  <p className="text-sm text-gray-500 mt-2">Complete interviews to see your performance</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white h-16 text-lg">
              <Code className="h-6 w-6 mr-2" />
              Practice Coding
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 h-16 text-lg">
              <BookOpen className="h-6 w-6 mr-2" />
              Study Materials
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 h-16 text-lg">
              <CheckCircle className="h-6 w-6 mr-2" />
              System Check
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
