
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Award, 
  BarChart3, 
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

interface PerformanceData {
  overallScore: number;
  improvementRate: number;
  skillLevels: {
    [key: string]: number;
  };
  recentInterviews: {
    id: string;
    company: string;
    position: string;
    date: string;
    score: number;
    feedback: string;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    earnedAt: string;
    icon: string;
  }[];
}

export function PerformanceTracking() {
  // Mock performance data
  const performanceData: PerformanceData = {
    overallScore: 85,
    improvementRate: 12,
    skillLevels: {
      'JavaScript': 88,
      'React': 92,
      'Algorithms': 75,
      'System Design': 68,
      'Communication': 90
    },
    recentInterviews: [
      {
        id: '1',
        company: 'TechCorp',
        position: 'Senior Frontend Developer',
        date: '2024-01-10',
        score: 88,
        feedback: 'Strong technical skills, excellent problem-solving approach'
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Full Stack Engineer',
        date: '2024-01-05',
        score: 82,
        feedback: 'Good coding skills, could improve on system design questions'
      },
      {
        id: '3',
        company: 'BigTech Inc',
        position: 'Frontend Engineer',
        date: '2023-12-28',
        score: 78,
        feedback: 'Solid foundation, needs more practice with complex algorithms'
      }
    ],
    achievements: [
      {
        id: '1',
        title: 'Problem Solver',
        description: 'Solved 50+ coding problems',
        earnedAt: '2024-01-08',
        icon: 'trophy'
      },
      {
        id: '2',
        title: 'Consistent Performer',
        description: 'Maintained 80+ score for 5 consecutive interviews',
        earnedAt: '2024-01-03',
        icon: 'star'
      },
      {
        id: '3',
        title: 'Fast Learner',
        description: 'Improved overall score by 20% in one month',
        earnedAt: '2023-12-25',
        icon: 'trending-up'
      }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-600';
    if (score >= 70) return 'bg-blue-600';
    if (score >= 60) return 'bg-orange-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-[#0F1419] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Performance Tracking</h1>
          <p className="text-gray-400">Monitor your interview performance and skill development</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1B2631] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Overall Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(performanceData.overallScore)}`}>
                    {performanceData.overallScore}%
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1B2631] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Improvement</p>
                  <p className="text-3xl font-bold text-green-400">+{performanceData.improvementRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1B2631] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Interviews</p>
                  <p className="text-3xl font-bold text-white">{performanceData.recentInterviews.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1B2631] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Achievements</p>
                  <p className="text-3xl font-bold text-white">{performanceData.achievements.length}</p>
                </div>
                <Award className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skill Levels */}
          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Skill Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(performanceData.skillLevels).map(([skill, level]) => (
                <div key={skill}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{skill}</span>
                    <span className={`font-bold ${getScoreColor(level)}`}>{level}%</span>
                  </div>
                  <Progress value={level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Interviews */}
          <Card className="bg-[#1B2631] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recent Interviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceData.recentInterviews.map((interview) => (
                <div key={interview.id} className="bg-[#0F1419] rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{interview.company}</h4>
                      <p className="text-sm text-gray-400">{interview.position}</p>
                    </div>
                    <Badge className={`${getScoreBg(interview.score)} text-white border-0`}>
                      {interview.score}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{interview.feedback}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(interview.date), 'MMM dd, yyyy')}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="bg-[#1B2631] border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Achievements & Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {performanceData.achievements.map((achievement) => (
                <div key={achievement.id} className="bg-[#0F1419] rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                      {achievement.icon === 'trophy' && <Trophy className="h-5 w-5 text-white" />}
                      {achievement.icon === 'star' && <Star className="h-5 w-5 text-white" />}
                      {achievement.icon === 'trending-up' && <TrendingUp className="h-5 w-5 text-white" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{achievement.title}</h4>
                      <p className="text-xs text-gray-500">
                        {format(new Date(achievement.earnedAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-[#1B2631] border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white">Improvement Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-blue-400" />
                  <h4 className="font-medium text-blue-400">Focus Area: System Design</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Your system design score is below your other skills. Consider practicing 
                  scalability concepts and architectural patterns.
                </p>
              </div>
              
              <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <h4 className="font-medium text-green-400">Strength: Communication</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Excellent communication skills! Continue leveraging this strength to 
                  explain your thought process clearly during interviews.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
