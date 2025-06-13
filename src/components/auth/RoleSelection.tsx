
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: 'recruiter' | 'candidate') => void;
  selectedRole: 'recruiter' | 'candidate';
  onSelectedRoleChange: (role: 'recruiter' | 'candidate') => void;
}

const RoleSelection = ({ onRoleSelect, selectedRole, onSelectedRoleChange }: RoleSelectionProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center text-gray-900">
          Choose Your Role
        </DialogTitle>
        <p className="text-gray-600 text-center">
          Select how you'll be using CodeRecruit
        </p>
      </DialogHeader>

      <div className="space-y-4 mt-6">
        <Card 
          className={`cursor-pointer transition-all border-2 ${
            selectedRole === 'recruiter' 
              ? 'border-[#00EA64] bg-[#00EA64]/5' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onSelectedRoleChange('recruiter')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedRole === 'recruiter' ? 'bg-[#00EA64]' : 'bg-gray-100'
              }`}>
                <Briefcase className={`h-6 w-6 ${
                  selectedRole === 'recruiter' ? 'text-black' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">I'm a Recruiter</h3>
                <p className="text-sm text-gray-600">
                  Find and assess technical talent
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all border-2 ${
            selectedRole === 'candidate' 
              ? 'border-[#00EA64] bg-[#00EA64]/5' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onSelectedRoleChange('candidate')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedRole === 'candidate' ? 'bg-[#00EA64]' : 'bg-gray-100'
              }`}>
                <Users className={`h-6 w-6 ${
                  selectedRole === 'candidate' ? 'text-black' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">I'm a Candidate</h3>
                <p className="text-sm text-gray-600">
                  Showcase my technical skills
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          className="w-full bg-[#00EA64] hover:bg-[#00EA64]/90 text-black font-semibold mt-6"
          onClick={() => onRoleSelect(selectedRole)}
        >
          Continue as {selectedRole === 'recruiter' ? 'Recruiter' : 'Candidate'}
        </Button>
      </div>
    </>
  );
};

export default RoleSelection;
