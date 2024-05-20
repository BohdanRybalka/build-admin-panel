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
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPriceValid, setIsPriceValid] = useState(true);
    const [isExpenseTypeValid, setIsExpenseTypeValid] = useState(true);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [expenseType, setExpenseType] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (isOpen) {
            setIsNameValid(true);
            setIsPriceValid(true);
            setIsExpenseTypeValid(true);
            setAttemptedSubmit(false);
            setExpenseType('');
            setName('');
            setPrice('');
        }
    }, [isOpen]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
            setIsNameValid(!!event.target.value);
        } else if (event.target.name === 'price') {
            setPrice(event.target.value);
            setIsPriceValid(!isNaN(parseFloat(event.target.value)) && isFinite(parseFloat(event.target.value)));
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExpenseType(event.target.value);
        setIsExpenseTypeValid(!!event.target.value);
    };

    const handleSave = async () => {
        setAttemptedSubmit(true);

        if (!isNameValid || !isPriceValid || !isExpenseTypeValid || !projectId) {
            return;
        }

        const expenseData = {
            name,
            price: parseFloat(price),
            type: expenseType,
            projectId,
        };

        const newExpense = await createExpense(expenseData);

        if (newExpense) {
            setExpenses((prevExpenses: Expense[]) => [...prevExpenses, newExpense]);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent className="modal-content">
                <ModalHeader className="modal-header">Add new expense</ModalHeader>
                <ModalCloseButton/>
                <ModalBody className="modal-body">
                    <FormControl isInvalid={!isNameValid && attemptedSubmit}>
                        <FormLabel className="form-label">Expense Name</FormLabel>
                        <Input className="input-field" placeholder="Expense Name" name="name" value={name} required
                               onChange={handleInputChange}/>
                        {!isNameValid && attemptedSubmit && <FormErrorMessage>Field is required</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={10} isInvalid={!isExpenseTypeValid && attemptedSubmit}>
                        <FormLabel className="form-label">Expense Type</FormLabel>
                        <Select className="input-field" placeholder="Select expense type"
                                onChange={handleSelectChange} required>
                            <option value="materials">Materials</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                        </Select>
                        {!isExpenseTypeValid && attemptedSubmit && <FormErrorMessage>Field is required</FormErrorMessage>}
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