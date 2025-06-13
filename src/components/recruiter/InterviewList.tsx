import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Edit, RotateCcw, X, User } from 'lucide-react';
import { format } from 'date-fns';
import type { Database } from '@/integrations/supabase/types';

interface InterviewListProps {
  filters: {
    status: string;
    dateRange: string;
    search: string;
    type: string;
  };
}

type InterviewStatus = Database['public']['Enums']['interview_status'];
type InterviewType = Database['public']['Enums']['interview_type'];

interface Interview {
  id: string;
  position_title: string;
  interview_type: InterviewType;
  status: InterviewStatus;
  scheduled_at: string;
  duration_minutes: number;
  candidates: {
    first_name: string;
    last_name: string;
    email: string;
    skills: string[];
    avatar_url?: string;
  };
}

export function InterviewList({ filters }: InterviewListProps) {
  const { data: interviews, isLoading } = useQuery({
    queryKey: ['interviews', filters],
    queryFn: async (): Promise<Interview[]> => {
      let query = supabase
        .from('interviews')
        .select(`
          id,
          position_title,
          interview_type,
          status,
          scheduled_at,
          duration_minutes,
          candidates (
            first_name,
            last_name,
            email,
            skills,
            avatar_url
          )
        `)
        .order('scheduled_at', { ascending: false });

      if (filters.status) {
        query = query.eq('status', filters.status as InterviewStatus);
      }

      if (filters.type) {
        query = query.eq('interview_type', filters.type.toLowerCase() as InterviewType);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    }
  });

  const getStatusColor = (status: InterviewStatus) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'active': return 'bg-[#00EA64]';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: InterviewStatus) => {
    switch (status) {
      case 'active': return 'text-black';
      default: return 'text-white';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-[#1B2631] border-gray-700">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-600 rounded w-1/3"></div>
                <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                <div className="h-4 bg-gray-600 rounded w-1/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const filteredInterviews = interviews?.filter(interview => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const candidateName = `${interview.candidates.first_name} ${interview.candidates.last_name}`.toLowerCase();
      const candidateEmail = interview.candidates.email.toLowerCase();
      return candidateName.includes(searchTerm) || candidateEmail.includes(searchTerm);
    }
    return true;
  }) || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {filteredInterviews.length} Interview{filteredInterviews.length !== 1 ? 's' : ''}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Show:</span>
          <select className="bg-[#0F1419] border border-gray-600 rounded px-2 py-1 text-white">
            <option>10 per page</option>
            <option>25 per page</option>
            <option>50 per page</option>
          </select>
        </div>
      </div>

      {filteredInterviews.map((interview) => (
        <Card key={interview.id} className="bg-[#1B2631] border-gray-700 hover:border-gray-600 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                {/* Candidate Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                  {interview.candidates.avatar_url ? (
                    <img 
                      src={interview.candidates.avatar_url} 
                      alt="Avatar" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>

                <div className="flex-1">
                  {/* Candidate Info */}
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">
                      {interview.candidates.first_name} {interview.candidates.last_name}
                    </h4>
                    <Badge 
                      className={`${getStatusColor(interview.status)} ${getStatusTextColor(interview.status)} border-0`}
                    >
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </Badge>
                  </div>

                  <p className="text-gray-400 text-sm mb-2">{interview.candidates.email}</p>

                  {/* Position and Type */}
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-white font-medium">{interview.position_title}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400 capitalize">{interview.interview_type}</span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {interview.candidates.skills?.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {interview.candidates.skills?.length > 4 && (
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        +{interview.candidates.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Schedule Info */}
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(interview.scheduled_at), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {format(new Date(interview.scheduled_at), 'HH:mm')} ({interview.duration_minutes}m)
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {interview.status === 'scheduled' && (
                  <Button 
                    size="sm" 
                    className="bg-[#00EA64] text-black hover:bg-[#00EA64]/90"
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Join Interview
                  </Button>
                )}
                
                {interview.status === 'active' && (
                  <Button 
                    size="sm" 
                    className="bg-[#00EA64] text-black hover:bg-[#00EA64]/90 animate-pulse"
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Join Now
                  </Button>
                )}

                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>

                {interview.status === 'scheduled' && (
                  <>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredInterviews.length === 0 && (
        <Card className="bg-[#1B2631] border-gray-700">
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-500" />
            <h3 className="text-lg font-semibold text-white mb-2">No interviews found</h3>
            <p className="text-gray-400">Try adjusting your filters or create a new interview.</p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {filteredInterviews.length > 0 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-400">
            Showing 1-{filteredInterviews.length} of {filteredInterviews.length} interviews
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled className="border-gray-600 text-gray-500">
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled className="border-gray-600 text-gray-500">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
