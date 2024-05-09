import React from 'react';
import {Button} from "@chakra-ui/react";
import './AddBtn.css';

interface ExpenseButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const AddBtn: React.FC<ExpenseButtonProps> = ({onClick, children}) => {
    return (
        <Button className="add-button" onClick={onClick}>
            {children}
        </Button>
    );
}

export default AddBtn;