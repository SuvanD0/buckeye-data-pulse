
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import AuthCard from '@/components/auth/AuthCard';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in, redirect to admin page
  if (user) {
    navigate('/admin');
  }

  const handleSignInSuccess = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-28 pb-16 px-4">
        <AuthCard 
          signInForm={<SignInForm onSuccess={handleSignInSuccess} />}
          signUpForm={<SignUpForm />}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
