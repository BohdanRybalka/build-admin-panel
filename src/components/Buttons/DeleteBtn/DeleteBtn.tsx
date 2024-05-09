import React from 'react';
import {Button} from "@chakra-ui/react";
import './DeleteBtn.css';

interface DeleteButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const DeleteBtn: React.FC<DeleteButtonProps> = ({onClick, children}) => {
    return (
        <Button className="delete-btn" onClick={onClick}>
            {children}
        </Button>
    );
}

export default DeleteBtn;