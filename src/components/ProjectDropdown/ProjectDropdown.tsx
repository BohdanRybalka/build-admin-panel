import React, {useEffect, useState} from 'react';
import {Box, Select} from '@chakra-ui/react';
import axios from 'axios';
import './ProjectDropdown.css';

interface HouseDropdownProps {
    onHouseChange: (houseId: string) => void;
}

interface Project {
    _id: string;
    name: string;
}

const ProjectDropdown: React.FC<HouseDropdownProps> = ({onHouseChange}) => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/projects', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        };

        fetchProjects().then((result: Project[]) => {
            setProjects(result);
        }).catch(error => {
            console.error('Error fetching projects:', error);
        });
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onHouseChange(event.target.value);
    };

    return (
        <Box className="dropdown-wrap">
            <Select className="dropdown" placeholder="Select project" onChange={handleChange}>
                {projects.map((project, index) => (
                    <option key={index} value={project._id}>
                        {project.name}
                    </option>
                ))}
            </Select>
        </Box>
    );
};

export default ProjectDropdown;