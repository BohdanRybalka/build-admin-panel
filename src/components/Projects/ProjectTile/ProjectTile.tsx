import React from 'react';
import {Box, Heading, Text, Flex, Checkbox} from "@chakra-ui/react";
import './ProjectTile.css';
import houseIcon from '../../../assets/houseIcons/estateIcon.png';

interface ProjectTileProps {
    name: string;
    startDate: Date;
    budget: number;
    isSelected: boolean;
    onSelectedChange: (selected: boolean) => void;
    isSelecting: boolean;
    street: string;
    description: string;
}

const ProjectTile: React.FC<ProjectTileProps> = ({
                                                     name,
                                                     startDate,
                                                     budget,
                                                     isSelected,
                                                     onSelectedChange,
                                                     isSelecting,
                                                     street,
                                                     description
                                                 }) => {
    const defaultImageUrl = houseIcon;
    const date = new Date(startDate);

    return (
        <Box className="project-tile">
            <Flex direction="row">
                <Box className="project-image-container">
                    <img src={defaultImageUrl} alt={name} className="project-image"/>
                </Box>
                <Box className="project-info">
                    <Heading as="h3" size="md" className="project-title">{name}</Heading>
                    <Text className="date">Start Date: {date.toLocaleDateString()}</Text>
                    <Text className="street">Street: {street}</Text>
                    <Text className="budget">Budget: ${budget}</Text>
                    <Text className="description">Description: {description}</Text>
                </Box>
                {isSelecting && (
                    <Checkbox
                        className="project-checkbox"
                        isChecked={isSelected}
                        onChange={(e) => onSelectedChange(e.target.checked)}
                    />
                )}
            </Flex>
        </Box>
    );
}

export default ProjectTile;