import React from 'react';
import {Button} from "@chakra-ui/react";
import './SaveBtn.css';

interface SaveBtnProps {
    onClick: () => void;
}

const SaveBtn: React.FC<SaveBtnProps> = ({onClick}) => {
    return (
        <Button className="save-button" colorScheme="blue" mr={3} onClick={onClick}>
            Save
        </Button>
    );
}

export default SaveBtn;