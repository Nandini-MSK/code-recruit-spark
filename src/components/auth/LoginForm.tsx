
import { useState } from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface LoginFormProps {
  onSuccess: () => void;
  onForgotPassword: (email: string) => void;
  onSwitchToRegister: () => void;
  selectedRole: 'recruiter' | 'candidate';
}

const LoginForm = ({ onSuccess, onForgotPassword, onSwitchToRegister, selectedRole }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate login API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Login successful!",
        description: `Welcome back, ${selectedRole}!`,
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'microsoft') => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Login successful!",
        description: `Signed in with ${provider}`,
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Login failed",
        description: `Failed to sign in with ${provider}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center text-gray-900">
          Welcome Back
        </DialogTitle>
        <p className="text-gray-600 text-center">
          Sign in to your {selectedRole} account
        </p>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="link"
            className="text-[#00EA64] hover:text-[#00EA64]/80 p-0 text-sm"
            onClick={() => onForgotPassword(email)}
          >
            Forgot password?
          </Button>
        </div>

        <Button 
          type="submit"
          className="w-full bg-[#00EA64] hover:bg-[#00EA64]/90 text-black font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-sm text-gray-500">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="border-gray-300"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-gray-300"
            onClick={() => handleSocialLogin('microsoft')}
            disabled={isLoading}
          >
            Microsoft
          </Button>
        </div>

        <div className="text-center">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <Button
            type="button"
            variant="link"
            className="text-[#00EA64] hover:text-[#00EA64]/80 p-0 text-sm"
            onClick={onSwitchToRegister}
          >
            Sign up
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
