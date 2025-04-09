
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    if (!user) return false;
    
    try {
      const parsedUser = JSON.parse(user);
      return parsedUser.isAuthenticated === true;
    } catch (error) {
      return false;
    }
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
