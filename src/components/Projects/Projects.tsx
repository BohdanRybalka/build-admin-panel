import React, {useEffect, useState} from 'react';
import {Heading, Box, Flex, Grid} from '@chakra-ui/react';
import ProjectTile from "./ProjectTile/ProjectTile";
import AddProjectModal from "./AddProjectModal/AddProjectModal";
import './Projects.css';
import SelectBtn from "../Buttons/SelectBtn/SelectBtn";
import AddBtn from "../Buttons/AddBtn/AddBtn";
import DeleteBtn from "../Buttons/DeleteBtn/DeleteBtn";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import axios from "axios";
import mongoose from "mongoose";

interface Project {
    _id: string;
    name: string;
    startDate: Date;
    budget: number;
    userId: string;
    street: string;
    description: string;
}

export default function Projects() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const authRedirect = useAuthRedirect();

    useEffect(() => {
        if (authRedirect) return;

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authorization token found');
            return;
        }

        axios.get('http://localhost:4000/api/projects', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching projects', error);
            });
    }, [authRedirect]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSelectProject = (index: number) => {
        if (selectedProjects.includes(index)) {
            setSelectedProjects(selectedProjects.filter(i => i !== index));
        } else {
            setSelectedProjects([...selectedProjects, index]);
        }
    };

    const handleSelectMode = () => {
        setIsSelecting(!isSelecting);
        if (isSelecting) {
            setSelectedProjects([]);
        }
    };

    const handleDeleteProjects = async () => {
        if (selectedProjects.length === 0) {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authorization token found');
            return;
        }
        
        const projectIds = selectedProjects.map(index => new mongoose.Types.ObjectId(projects[index]._id));

        try {
            await axios.delete('http://localhost:4000/api/projects/delete', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: projectIds
            });

            setProjects(prevProjects => prevProjects.filter((_, index) => !selectedProjects.includes(index)));
            setSelectedProjects([]);
        } catch (error) {
            console.error('Error deleting projects', error);
        }
    };


    return (
        <Box className="projects-box">
            <Flex justifyContent="space-between" alignItems="start">
                <Heading as="h2" size="lg" mb="12">Current Projects</Heading>
                <Box>
                    <AddBtn onClick={handleOpenModal}>Add Project</AddBtn>
                    <SelectBtn onClick={handleSelectMode}>Select</SelectBtn>
                    <DeleteBtn onClick={handleDeleteProjects}>Delete</DeleteBtn>
                </Box>
            </Flex>
            <Grid className="projects-grid">
                {projects.map((project, index) => (
                    <Box key={index}>
                        <ProjectTile
                            name={project.name}
                            startDate={project.startDate}
                            budget={project.budget}
                            isSelected={selectedProjects.includes(index)}
                            onSelectedChange={() => handleSelectProject(index)}
                            isSelecting={isSelecting}
                            street={project.street}
                            description={project.description}
                        />
                    </Box>
                ))}
            </Grid>
            <AddProjectModal isOpen={isModalOpen} onClose={handleCloseModal} setProjects={setProjects}/>
        </Box>
    );
}