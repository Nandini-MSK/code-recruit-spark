
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, BarChart3, Users, ChevronRight, Star, Check } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  const features = [
    {
      icon: Code2,
      title: "Smart Code Editor",
      description: "Monaco-powered editor with real-time collaboration and AI-assisted debugging",
      preview: "Monaco Editor with syntax highlighting"
    },
    {
      icon: BarChart3,
      title: "AI-Driven Analytics",
      description: "Comprehensive performance insights and candidate assessment metrics",
      preview: "Interactive dashboard with charts"
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Seamless video integration with live code sharing and instant feedback",
      preview: "Video call interface preview"
    }
  ];

  const companies = [
    "Google", "Microsoft", "Meta", "Amazon", "Netflix", "Uber"
  ];

  const testimonials = [
    {
      quote: "This platform revolutionized our technical hiring process. The AI insights are incredibly accurate.",
      author: "Sarah Chen",
      role: "Engineering Manager at TechCorp",
      rating: 5
    },
    {
      quote: "The real-time collaboration features make remote interviews feel natural and engaging.",
      author: "Michael Rodriguez",
      role: "Senior Recruiter at StartupXYZ",
      rating: 5
    }
  ];

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1B2631] to-[#0F1419]">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-[#0F1419]/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-[#00EA64]" />
              <span className="text-xl font-bold text-white">CodeRecruit</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-[#00EA64] transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-[#00EA64] transition-colors">Pricing</a>
              <a href="#docs" className="text-gray-300 hover:text-[#00EA64] transition-colors">Documentation</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => handleAuthClick('login')}
              >
                Sign In
              </Button>
              <Button 
                className="bg-[#00EA64] hover:bg-[#00EA64]/90 text-black font-semibold"
                onClick={() => handleAuthClick('register')}
              >
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-[#00EA64]/10 text-[#00EA64] border-[#00EA64]/20">
              ✨ Now with AI-powered insights
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI-Powered Technical
              <span className="block text-[#00EA64]">Interviews That Scale</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Real-time Collaboration • AI Code Analysis • Instant Insights
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-[#00EA64] hover:bg-[#00EA64]/90 text-black font-semibold px-8 py-4 text-lg"
                onClick={() => handleAuthClick('register')}
              >
                Start Free Trial
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
              >
                Watch Demo
              </Button>
            </div>

            {/* Floating Code Animation */}
            <div className="relative">
              <div className="bg-[#1B2631] rounded-lg p-6 shadow-2xl max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-[#00EA64] rounded-full"></div>
                </div>
                <pre className="text-left text-sm text-gray-300">
                  <code>
{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for technical hiring
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your recruitment process with AI-powered tools that help you identify top talent faster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#00EA64] rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
                    {feature.preview}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-8">Trusted by leading companies worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {companies.map((company, index) => (
                <div key={index} className="text-2xl font-bold text-gray-400">
                  {company}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0F1419]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your hiring process?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of companies using CodeRecruit to find exceptional talent.
          </p>
          <Button 
            size="lg" 
            className="bg-[#00EA64] hover:bg-[#00EA64]/90 text-black font-semibold px-8 py-4 text-lg"
            onClick={() => handleAuthClick('register')}
          >
            Start Your Free Trial
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B2631] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code2 className="h-6 w-6 text-[#00EA64]" />
                <span className="text-lg font-bold text-white">CodeRecruit</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered technical interviews that help you find the best talent.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#00EA64]">Features</a></li>
                <li><a href="#" className="hover:text-[#00EA64]">Pricing</a></li>
                <li><a href="#" className="hover:text-[#00EA64]">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#00EA64]">About</a></li>
                <li><a href="#" className="hover:text-[#00EA64]">Careers</a></li>
                <li><a href="#" className="hover:text-[#00EA64]">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#00EA64]">Documentation</a></li>
                <li><a href="#" className="hover:text-[#00EA64]">Help Center</a></li>
                <li><a href="#" className="hover:text-[#00EA64]">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 CodeRecruit. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default Index;
