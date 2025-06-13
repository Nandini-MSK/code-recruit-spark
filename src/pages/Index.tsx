
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Code, Users, Video, ArrowRight, CheckCircle, Star, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0F1419]">
      {/* Header */}
      <header className="bg-[#1B2631] border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">CodeRecruit</h1>
              <Badge className="bg-green-600 text-white">Beta</Badge>
            </div>
            <div className="flex space-x-4">
              <Link to="/candidate">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Candidate Dashboard
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Recruiter Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            The Future of Technical Interviews
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Streamline your hiring process with AI-powered interview management, 
            real-time coding assessments, and comprehensive candidate evaluation.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Start Recruiting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/candidate">
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Practice Interviews
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-[#1B2631]">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need for Successful Interviews
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-[#0F1419] border-gray-700">
              <CardHeader>
                <Calendar className="h-8 w-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">Smart Scheduling</CardTitle>
                <CardDescription className="text-gray-400">
                  Automated interview scheduling with calendar integration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#0F1419] border-gray-700">
              <CardHeader>
                <Code className="h-8 w-8 text-green-400 mb-2" />
                <CardTitle className="text-white">Live Coding</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time code collaboration with syntax highlighting
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#0F1419] border-gray-700">
              <CardHeader>
                <Video className="h-8 w-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">Video Interviews</CardTitle>
                <CardDescription className="text-gray-400">
                  HD video calls with screen sharing capabilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#0F1419] border-gray-700">
              <CardHeader>
                <Users className="h-8 w-8 text-orange-400 mb-2" />
                <CardTitle className="text-white">Team Collaboration</CardTitle>
                <CardDescription className="text-gray-400">
                  Multi-interviewer support with shared notes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* For Recruiters */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">For Recruiters</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Comprehensive Dashboard</h4>
                    <p className="text-gray-400">Track all interviews, candidates, and performance metrics in one place</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">AI-Powered Insights</h4>
                    <p className="text-gray-400">Get intelligent recommendations for candidate evaluation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Custom Problem Sets</h4>
                    <p className="text-gray-400">Create and manage coding problems tailored to your needs</p>
                  </div>
                </div>
              </div>
              <Link to="/dashboard">
                <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white">
                  Explore Recruiter Features
                </Button>
              </Link>
            </div>
            <div className="bg-[#1B2631] rounded-lg p-8 border border-gray-700">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Active Interviews</span>
                  <Badge className="bg-green-600 text-white">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">This Week</span>
                  <Badge className="bg-blue-600 text-white">8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Success Rate</span>
                  <Badge className="bg-yellow-600 text-white">85%</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Candidates */}
      <section className="py-16 px-6 bg-[#1B2631]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-[#0F1419] rounded-lg p-8 border border-gray-700">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium">Overall Score</span>
                  </div>
                  <span className="text-green-400 font-bold">88%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-400" />
                    <span className="text-white font-medium">Problems Solved</span>
                  </div>
                  <span className="text-blue-400 font-bold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-white font-medium">Success Rate</span>
                  </div>
                  <span className="text-green-400 font-bold">92%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">For Candidates</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Practice Environment</h4>
                    <p className="text-gray-400">Hone your skills with HackerRank-style coding challenges</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Performance Tracking</h4>
                    <p className="text-gray-400">Monitor your progress and identify areas for improvement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Interview Preparation</h4>
                    <p className="text-gray-400">System checks and preparation tools for optimal performance</p>
                  </div>
                </div>
              </div>
              <Link to="/candidate">
                <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                  Start Practicing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1419] border-t border-gray-700 py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 CodeRecruit. Revolutionizing technical interviews with AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
