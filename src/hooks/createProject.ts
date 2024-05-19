import axios from 'axios';

interface ProjectData {
    name: string;
    startDate: Date;
    street: string;
    description: string;
}

export async function createProject(projectData: ProjectData) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post('http://localhost:4000/api/projects/create', projectData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating project', error);
    }
}