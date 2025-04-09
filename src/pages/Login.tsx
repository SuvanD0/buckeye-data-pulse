
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock authentication - in a real app this would connect to a backend service
const mockUsers = [
  { email: 'admin@bdaa.org', password: 'admin123' },
  { email: 'user@bdaa.org', password: 'user123' }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      const user = mockUsers.find(
        user => user.email === email && user.password === password
      );

      if (user) {
        // Store auth state in localStorage (in a real app, use a better auth solution)
        localStorage.setItem('user', JSON.stringify({ email: user.email, isAuthenticated: true }));
        toast({
          title: "Login successful",
          description: "Welcome back to BDAA resources.",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-28 pb-16 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin area
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90" 
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Sign in
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
