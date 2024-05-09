import React from 'react';
import {Button} from "@chakra-ui/react";
import './CancelBtn.css';

interface CancelBtnProps {
    onClick: () => void;
}

const CancelBtn: React.FC<CancelBtnProps> = ({onClick}) => {
    return (
        <Button className="cancel-button" variant="ghost" onClick={onClick}>
            Cancel
        </Button>
    );
}

export default CancelBtn;