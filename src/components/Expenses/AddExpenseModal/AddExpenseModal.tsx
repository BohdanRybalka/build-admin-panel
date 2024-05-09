import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import './AddExpenseModal.css'; // Import the CSS file

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose }) => {
    const [isValid, setIsValid] = useState(true);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setIsValid(true);
            setAttemptedSubmit(false);
        }
    }, [isOpen]);

    const handleInputChange = () => {
        setIsValid(true);
        setAttemptedSubmit(false);
    };

    const handleSave = () => {
        const name = nameRef.current?.value;
        const price = priceRef.current?.value;

        if (!name || !price) {
            setIsValid(false);
            setAttemptedSubmit(true);
            return;
        }

        setIsValid(true);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="modal-header">Add new expense</ModalHeader>
                <ModalCloseButton />
                <ModalBody className="modal-body">
                    <FormControl isInvalid={!isValid && attemptedSubmit}>
                        <FormLabel className="form-label">Expense Name</FormLabel>
                        <Input className="input-field" placeholder="Expense Name" ref={nameRef} required onChange={handleInputChange} />
                        {!isValid && attemptedSubmit && <FormErrorMessage>Field is required</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={4} isInvalid={!isValid && attemptedSubmit}>
                        <FormLabel className="form-label">Price</FormLabel>
                        <Input className="input-field" placeholder="Price" ref={priceRef} required onChange={handleInputChange} />
                        {!isValid && attemptedSubmit && <FormErrorMessage>Field is required</FormErrorMessage>}
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button className="save-button" colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button className="cancel-button" variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddExpenseModal;