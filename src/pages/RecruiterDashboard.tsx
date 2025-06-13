
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, CheckCircle, Users, Plus, BarChart3, FileText, Bell, Settings, Search } from 'lucide-react';
import { CreateInterviewModal } from '@/components/recruiter/CreateInterviewModal';
import { InterviewList } from '@/components/recruiter/InterviewList';
import { InterviewFilters } from '@/components/recruiter/InterviewFilters';

interface DashboardStats {
  activeInterviews: number;
  scheduledThisWeek: number;
  completedThisMonth: number;
  averageDuration: number;
}

export default function RecruiterDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    search: '',
    type: ''
  });

  // Fetch dashboard statistics
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const now = new Date();
      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const { data: activeInterviews } = await supabase
        .from('interviews')
        .select('id')
        .eq('status', 'active');

      const { data: scheduledThisWeek } = await supabase
        .from('interviews')
        .select('id')
        .eq('status', 'scheduled')
        .gte('scheduled_at', weekStart.toISOString());

      const { data: completedThisMonth } = await supabase
        .from('interviews')
        .select('duration_minutes')
        .eq('status', 'completed')
        .gte('created_at', monthStart.toISOString());

      const averageDuration = completedThisMonth?.length 
        ? completedThisMonth.reduce((acc, interview) => acc + interview.duration_minutes, 0) / completedThisMonth.length
        : 0;

      return {
        activeInterviews: activeInterviews?.length || 0,
        scheduledThisWeek: scheduledThisWeek?.length || 0,
        completedThisMonth: completedThisMonth?.length || 0,
        averageDuration: Math.round(averageDuration)
      };
    }
  });

  return (
    <div className="min-h-screen bg-[#0F1419]">
      {/* Header */}
      <header className="bg-[#1B2631] border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white">
              <span className="text-[#00EA64]">Hire</span>Rank
            </div>
            <div className="text-gray-400 text-sm">/ Dashboard</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-[#00EA64] text-black">3</Badge>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
              R
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Good morning, Recruiter! 👋
          </h1>
          <p className="text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Interviews</CardTitle>
              <div className="relative">
                <Users className="h-4 w-4 text-[#00EA64]" />
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-[#00EA64] rounded-full animate-pulse"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.activeInterviews || 0}</div>
              <p className="text-xs text-gray-400">Currently in progress</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Scheduled This Week</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.scheduledThisWeek || 0}</div>
              <p className="text-xs text-gray-400">Upcoming interviews</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Completed This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.completedThisMonth || 0}</div>
              <p className="text-xs text-gray-400">Finished interviews</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Average Duration</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.averageDuration || 0}m</div>
              <p className="text-xs text-gray-400">Per interview</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-[#00EA64] text-black hover:bg-[#00EA64]/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Interview
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Users className="h-4 w-4 mr-2" />
            Invite Candidates
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <FileText className="h-4 w-4 mr-2" />
            AI Reports
          </Button>
        </div>

        {/* Interview Management */}
        <Card className="bg-[#1B2631] border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Interview Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#0F1419]">
                <TabsTrigger value="list" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#1B2631]">
                  Interview List
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#1B2631]">
                  Analytics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-6">
                <div className="flex gap-6">
                  <div className="w-80">
                    <InterviewFilters filters={filters} onFiltersChange={setFilters} />
                  </div>
                  <div className="flex-1">
                    <InterviewList filters={filters} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-6">
                <div className="text-center py-12 text-gray-400">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics dashboard coming soon...</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <CreateInterviewModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
    </div>
  );
}
