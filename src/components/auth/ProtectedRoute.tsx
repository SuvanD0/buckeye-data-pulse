
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, isLoading, isAdmin } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If route requires admin and user is not admin, redirect to home
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
