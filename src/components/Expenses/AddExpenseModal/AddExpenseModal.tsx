import React, {useState, useRef, useEffect} from 'react';
import {
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
    FormErrorMessage, Select
} from "@chakra-ui/react";
import './AddExpenseModal.css';
import SaveBtn from "../../Buttons/SaveBtn/SaveBtn";
import CancelBtn from "../../Buttons/CancelBtn/CancelBtn";

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({isOpen, onClose}) => {
    const [isValid, setIsValid] = useState(true);
    const [isPriceValid, setIsPriceValid] = useState(true); // New state for price validation
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [expenseType, setExpenseType] = useState('');
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setIsValid(true);
            setIsPriceValid(true); // Reset price validation state when modal opens
            setAttemptedSubmit(false);
            setExpenseType('');
        }
    }, [isOpen]);

    const handleInputChange = () => {
        setIsValid(true);
        setIsPriceValid(true); // Reset price validation state when input changes
        setAttemptedSubmit(false);
    };

    const handleSave = () => {
        const name = nameRef.current?.value;
        const price = priceRef.current?.value || '';

        const isPriceNumber = !isNaN(parseFloat(price)) && isFinite(parseFloat(price));

        if (!name || !price || !expenseType) {
            setIsValid(false);
            setAttemptedSubmit(true);
            return;
        }

        if (!isPriceNumber) {
            setIsPriceValid(false); // Set price validation state to false if price is not a number
            setAttemptedSubmit(true);
            return;
        }

        setIsValid(true);
        setIsPriceValid(true); // Set price validation state to true if price is a number
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent className="modal-content">
                <ModalHeader className="modal-header">Add new expense</ModalHeader>
                <ModalCloseButton/>
                <ModalBody className="modal-body">
                    <FormControl isInvalid={!isValid && attemptedSubmit}>
                        <FormLabel className="form-label">Expense Name</FormLabel>
                        <Input className="input-field" placeholder="Expense Name" ref={nameRef} required
                               onChange={handleInputChange}/>
                        {!isValid && attemptedSubmit && <FormErrorMessage>Field is required</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={10} isInvalid={!isValid && attemptedSubmit}>
                        <FormLabel className="form-label">Expense Type</FormLabel>
                        <Select className="input-field" placeholder="Select expense type"
                                onChange={(e) => setExpenseType(e.target.value)} required>
                            <option value="materials">Materials</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                        </Select>
                        {!isValid && attemptedSubmit && <FormErrorMessage>Field is required</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={10} isInvalid={!isPriceValid && attemptedSubmit}>
                        <FormLabel className="form-label">Price</FormLabel>
                        <Input className="input-field" placeholder="Price" ref={priceRef} required
                               onChange={handleInputChange}/>
                        {!isPriceValid && attemptedSubmit && <FormErrorMessage>Price must be a number</FormErrorMessage>}
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <SaveBtn onClick={handleSave}/>
                    <CancelBtn onClick={onClose}/>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddExpenseModal;