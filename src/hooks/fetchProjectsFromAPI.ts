import axios from 'axios';
import { getApiUrl } from '../config/api';

export const fetchProjectsFromAPI = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authorization token found');
    }

    try {
        const response = await axios.get(getApiUrl('projects'), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};