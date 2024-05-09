import React from 'react';
import {Button} from "@chakra-ui/react";
import './SelectBtn.css';

interface SelectBtnProps {
    onClick: () => void;
    children: React.ReactNode;
}

const SelectBtn: React.FC<SelectBtnProps> = ({onClick, children}) => {
    return (
        <Button className="select-btn" ml={3} onClick={onClick}>
            {children}
        </Button>
    );
}

export default SelectBtn;