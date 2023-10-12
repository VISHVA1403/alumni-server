import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check for the presence of the token or authentication information.
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        if (!token || new Date(tokenExpiration) < new Date()) {
            // Token is missing or expired, navigate to the login page.
            navigate('/login');
        }
    }, [navigate]);
}
