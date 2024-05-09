import React from 'react';
import {Box, Heading, Text, Flex, Checkbox} from "@chakra-ui/react";
import './ProjectTile.css';

interface ProjectTileProps {
    name: string;
    startDate: Date;
    budget: number;
    imageUrl: string;
    isSelected: boolean;
    onSelectedChange: (selected: boolean) => void;
    isSelecting: boolean; // Add this line
}

const ProjectTile: React.FC<ProjectTileProps> = ({
                                                     name,
                                                     startDate,
                                                     budget,
                                                     imageUrl,
                                                     isSelected,
                                                     onSelectedChange,
                                                     isSelecting
                                                 }) => {
    return (
        <Box className="project-tile">
            <Flex direction="row">
                <Box className="project-image-container">
                    <img src={imageUrl} alt={name} className="project-image"/>
                </Box>
                <Box className="project-info">
                    <Heading as="h3" size="md">{name}</Heading>
                    <Text>Start Date: {startDate.toLocaleDateString()}</Text>
                    <Text>Budget: ${budget}</Text>
                    {isSelecting && (
                        <Checkbox
                            className="project-checkbox"
                            isChecked={isSelected}
                            onChange={(e) => onSelectedChange(e.target.checked)}
                        />
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

export default ProjectTile;