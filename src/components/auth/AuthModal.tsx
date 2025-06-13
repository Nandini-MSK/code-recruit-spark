
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RoleSelection from './RoleSelection';
import EmailVerification from './EmailVerification';
import PasswordReset from './PasswordReset';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'login' | 'register';
  onModeChange: (mode: 'login' | 'register') => void;
}

type AuthStep = 'role-selection' | 'login' | 'register' | 'email-verification' | 'password-reset';

const AuthModal = ({ open, onOpenChange, mode, onModeChange }: AuthModalProps) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('role-selection');
  const [selectedRole, setSelectedRole] = useState<'recruiter' | 'candidate'>('recruiter');
  const [userEmail, setUserEmail] = useState('');

  const handleRoleSelect = (role: 'recruiter' | 'candidate') => {
    setSelectedRole(role);
    setCurrentStep(mode);
  };

  const handleLoginSuccess = () => {
    onOpenChange(false);
    // Handle successful login
  };

  const handleRegisterSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentStep('email-verification');
  };

  const handleForgotPassword = (email: string) => {
    setUserEmail(email);
    setCurrentStep('password-reset');
  };

  const handleBackToAuth = () => {
    setCurrentStep(mode);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'role-selection':
        return (
          <RoleSelection 
            onRoleSelect={handleRoleSelect}
            selectedRole={selectedRole}
            onSelectedRoleChange={setSelectedRole}
          />
        );
      case 'login':
        return (
          <LoginForm 
            onSuccess={handleLoginSuccess}
            onForgotPassword={handleForgotPassword}
            onSwitchToRegister={() => {
              onModeChange('register');
              setCurrentStep('register');
            }}
            selectedRole={selectedRole}
          />
        );
      case 'register':
        return (
          <RegisterForm 
            onSuccess={handleRegisterSuccess}
            onSwitchToLogin={() => {
              onModeChange('login');
              setCurrentStep('login');
            }}
            selectedRole={selectedRole}
          />
        );
      case 'email-verification':
        return (
          <EmailVerification 
            email={userEmail}
            onSuccess={handleLoginSuccess}
            onBack={handleBackToAuth}
          />
        );
      case 'password-reset':
        return (
          <PasswordReset 
            email={userEmail}
            onBack={handleBackToAuth}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
