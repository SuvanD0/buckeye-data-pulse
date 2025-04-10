
import { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthCardProps {
  signInForm: ReactNode;
  signUpForm: ReactNode;
}

const AuthCard = ({ signInForm, signUpForm }: AuthCardProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Account Access</CardTitle>
        <CardDescription className="text-center">
          Sign in or create an account to access the admin area
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          {signInForm}
        </TabsContent>
        
        <TabsContent value="signup">
          {signUpForm}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthCard;
