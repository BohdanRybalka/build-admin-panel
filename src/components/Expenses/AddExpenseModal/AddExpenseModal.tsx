import React, {useState, useEffect} from 'react';
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
import {createExpense} from "../../../hooks/createExpense";

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

interface Expense {
    _id: string;
    name: string;
    price: number;
    type: string;
    projectId: string;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({isOpen, onClose, projectId, setExpenses}) => {
    const [isValid, setIsValid] = useState(true);
    const [isPriceValid, setIsPriceValid] = useState(true); // New state for price validation
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [expenseType, setExpenseType] = useState('');
    const [name, setName] = useState(''); // Додано
    const [price, setPrice] = useState(''); // Додано

    useEffect(() => {
        if (isOpen) {
            setIsValid(true);
            setIsPriceValid(true); // Reset price validation state when modal opens
            setAttemptedSubmit(false);
            setExpenseType('');
        }
    }, [isOpen]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsValid(true);
        setIsPriceValid(true);
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'price') {
            setPrice(event.target.value);
        }
    };

    const handleSave = async () => {
        const isPriceNumber = !isNaN(parseFloat(price)) && isFinite(parseFloat(price));

        if (!name || !price || !expenseType) {
            setIsValid(false);
            setAttemptedSubmit(true);
            return;
        }

        if (!isPriceNumber) {
            setIsPriceValid(false);
            setAttemptedSubmit(true);
            return;
        }

        const expenseData = {
            name,
            price,
            type: expenseType,
            projectId, // you need to provide projectId
        };

        const newExpense = await createExpense(expenseData);

        if (newExpense) {
            setExpenses((prevExpenses: Expense[]) => [...prevExpenses, newExpense]);
            setIsValid(true);
            onClose();
        } else {
            setIsValid(false);
            setAttemptedSubmit(true);
        }
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
                        <Input className="input-field" placeholder="Expense Name" name="name" value={name} required
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
                        <Input className="input-field" placeholder="Price" name="price" value={price} required
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