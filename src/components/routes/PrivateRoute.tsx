import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, redirectPath = '/login' }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;
