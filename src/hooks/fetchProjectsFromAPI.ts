import axios from 'axios';

export const fetchProjectsFromAPI = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authorization token found');
    }

    try {
        const response = await axios.get('http://localhost:4000/api/projects', {
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