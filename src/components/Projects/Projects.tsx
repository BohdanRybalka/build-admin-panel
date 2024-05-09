import React, {useState, useEffect} from 'react';
import {Heading, Box, Flex, Grid} from '@chakra-ui/react';
import ProjectTile from "./ProjectTile/ProjectTile";
import AddProjectModal from "./AddProjectModal/AddProjectModal";
import './Projects.css';
import houseIcon from '../../assets/houseIcons/houseIcon.png'
import SelectBtn from "../Buttons/SelectBtn/SelectBtn";
import AddBtn from "../Buttons/AddBtn/AddBtn";
import DeleteBtn from "../Buttons/DeleteBtn/DeleteBtn";

interface Project {
    name: string;
    startDate: Date;
    budget: number;
    imageUrl: string;
}

export default function Projects() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);

    useEffect(() => {
        const initialProjects: Project[] = [
            {name: 'Project 1', startDate: new Date(), budget: 10000, imageUrl: houseIcon},
            {name: 'Project 2', startDate: new Date(), budget: 40000, imageUrl: houseIcon},
            {name: 'Project 3', startDate: new Date(), budget: 20000, imageUrl: houseIcon},
            {name: 'Project 4', startDate: new Date(), budget: 30000, imageUrl: houseIcon},
            {name: 'Project 5', startDate: new Date(), budget: 50000, imageUrl: houseIcon},
            {name: 'Project 1', startDate: new Date(), budget: 10000, imageUrl: houseIcon},
            {name: 'Project 2', startDate: new Date(), budget: 40000, imageUrl: houseIcon},
            {name: 'Project 3', startDate: new Date(), budget: 20000, imageUrl: houseIcon},
            {name: 'Project 4', startDate: new Date(), budget: 30000, imageUrl: houseIcon},
            {name: 'Project 5', startDate: new Date(), budget: 50000, imageUrl: houseIcon},
        ];
        setProjects(initialProjects);
    }, []);

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
            setSelectedProjects([]); // Reset selected projects when exiting select mode
        }
    };

    const handleDeleteProjects = () => {
        // Додайте логіку видалення проєктів тут
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
                            imageUrl={project.imageUrl}
                            isSelected={selectedProjects.includes(index)}
                            onSelectedChange={() => handleSelectProject(index)}
                            isSelecting={isSelecting}
                        />
                    </Box>
                ))}
            </Grid>
            <AddProjectModal isOpen={isModalOpen} onClose={handleCloseModal}/>
        </Box>
    );
}