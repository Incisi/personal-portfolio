import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;