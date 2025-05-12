import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
    isAuthenticated: boolean;
    redirectPath?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ isAuthenticated, redirectPath = '/dashboard' }) => {
    if (isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default PublicRoute;
