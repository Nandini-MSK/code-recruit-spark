
import { useState } from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface EmailVerificationProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

const EmailVerification = ({ email, onSuccess, onBack }: EmailVerificationProps) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Email verified!",
        description: "Your account has been successfully verified.",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Invalid code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Failed to resend",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

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
          Verify Your Email
        </DialogTitle>
        <div className="text-center">
          <div className="w-16 h-16 bg-[#00EA64]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-[#00EA64]" />
          </div>
          <p className="text-gray-600">
            We've sent a 6-digit code to
          </p>
          <p className="font-semibold text-gray-900">{email}</p>
        </div>
      </DialogHeader>

      <div className="space-y-6 mt-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Button 
          className="w-full bg-[#00EA64] hover:bg-[#00EA64]/90 text-black font-semibold"
          onClick={handleVerify}
          disabled={code.length !== 6 || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          <Button
            variant="link"
            className="text-[#00EA64] hover:text-[#00EA64]/80 p-0 text-sm"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? 'Resending...' : 'Resend code'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
