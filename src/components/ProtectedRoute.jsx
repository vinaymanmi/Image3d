import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = UserAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-black"><span className="text-[var(--color-neon)]">Loading...</span></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
