
import { useState } from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PasswordResetProps {
  email: string;
  onBack: () => void;
}

const PasswordReset = ({ email, onBack }: PasswordResetProps) => {
  const [step, setStep] = useState<'request' | 'success'>('request');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('success');
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Failed to send reset link",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Check Your Email
          </DialogTitle>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#00EA64]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-[#00EA64]" />
            </div>
            <p className="text-gray-600">
              We've sent password reset instructions to
            </p>
            <p className="font-semibold text-gray-900 mb-4">{email}</p>
            <p className="text-sm text-gray-500">
              Please check your email and follow the instructions to reset your password.
            </p>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <Button 
            variant="outline"
            className="w-full"
            onClick={onBack}
          >
            Back to Sign In
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-4 p-0 h-8 w-8"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <DialogTitle className="text-2xl font-bold text-center text-gray-900">
          Reset Password
        </DialogTitle>
        <div className="text-center">
          <div className="w-16 h-16 bg-[#00EA64]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-[#00EA64]" />
          </div>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
      </DialogHeader>

      <div className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="resetEmail" className="text-gray-700">Email Address</Label>
          <Input
            id="resetEmail"
            type="email"
            value={email}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <Button 
          className="w-full bg-[#00EA64] hover:bg-[#00EA64]/90 text-black font-semibold"
          onClick={handleReset}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>

        <div className="text-center">
          <Button
            variant="link"
            className="text-gray-600 hover:text-gray-800 p-0 text-sm"
            onClick={onBack}
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
