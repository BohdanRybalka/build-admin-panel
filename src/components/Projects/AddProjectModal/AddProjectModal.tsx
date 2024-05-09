import React, {useState, useRef, useEffect} from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage
} from "@chakra-ui/react";
import DatePicker from "react-datepicker"; // Import the DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for DatePicker
import './AddProjectModal.css'; // Import the CSS file

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({isOpen, onClose}) => {
    const [isValid, setIsValid] = useState(true);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const [startDate, setStartDate] = useState(new Date()); // Use state for the date

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

        if (!name || !startDate) {
            setIsValid(false);
            setAttemptedSubmit(true);
            return;
        }

        setIsValid(true);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader className="modal-header">Add new project</ModalHeader>
                <ModalCloseButton/>
                <ModalBody className="modal-body">
                    <FormControl isInvalid={!isValid && attemptedSubmit}>
                        <FormLabel className="form-label">Project Name</FormLabel>
                        <Input className="input-field" placeholder="Project Name" ref={nameRef} required
                               onChange={handleInputChange}/>
                        {!isValid && attemptedSubmit && <FormErrorMessage>Field is required</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={4} isInvalid={!isValid && attemptedSubmit}>
                        <FormLabel className="form-label">Building Start Date</FormLabel>
                        <DatePicker
                            className="datepicker"
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                        />
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

export default AddProjectModal;