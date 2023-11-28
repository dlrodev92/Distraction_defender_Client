import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';

export function RequireAuth({ children }) {
  const auth = useAuthContext(); // Move the hook call inside the component
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export function PrivateRoute({ children }) {
  const auth = useAuthContext(); // Retrieve authentication status inside the component
  const authed = auth.isAuthenticated;

  return authed ? children : <Navigate to="/" />;
}