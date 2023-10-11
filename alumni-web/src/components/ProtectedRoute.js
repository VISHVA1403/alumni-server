import React from 'react';
import { useAuth } from './useAuth';

const ProtectedRoute = () => {
    // Use the useAuth hook to check for authentication.
    useAuth();

    return <div>This is a protected route.</div>;
};

export default ProtectedRoute;
