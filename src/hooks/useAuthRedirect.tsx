import {useEffect, useState} from "react";
import {useLocation, Navigate} from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from '../config/api';

export default function useAuthRedirect() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        axios.get(getApiUrl('user'), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, [location]);

    if (isAuthenticated === null) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace/>;
    }

    return null;
}