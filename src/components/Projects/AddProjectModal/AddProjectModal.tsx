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
    FormErrorMessage,
    Select
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddProjectModal.css';
import {createProject} from "../../../hooks/createProject";

interface Project {
    _id: string;
    name: string;
    startDate: Date;
    budget?: number;
    userId: string;
    street: string;
    description: string;
    deadline?: Date;
    client?: string;
    status: string;
    tags?: string[];
}

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const AddProjectModal: React.FC<AddProjectModalProps> = (props) => {
    const [isValid, setIsValid] = useState(true);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        street: '',
        budget: '',
        client: ''
    });
    const nameRef = useRef<HTMLInputElement>(null);
    const [startDate, setStartDate] = useState(new Date());
    const streetRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [budget, setBudget] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [client, setClient] = useState('');
    const [status, setStatus] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (props.isOpen) {
            setIsValid(true);
            setAttemptedSubmit(false);
            setErrors({
                name: '',
                street: '',
                budget: '',
                client: ''
            });
            setBudget('');
            setDeadline(null);
            setClient('');
            setStatus('');
            setTags('');
        }
    }, [props.isOpen]);

    const handleInputChange = () => {
        setIsValid(true);
        setAttemptedSubmit(false);
        setErrors({
            name: '',
            street: '',
            budget: '',
            client: ''
        });
    };

    const handleSave = async () => {
        const name = nameRef.current?.value;
        const street = streetRef.current?.value;
        const description = descriptionRef.current?.value || '';

        const newErrors = {
            name: '',
            street: '',
            budget: '',
            client: ''
        };

        let hasErrors = false;

        // Validate required fields
        if (!name || name.trim() === '') {
            newErrors.name = 'Project name is required';
            hasErrors = true;
        }

        if (!street || street.trim() === '') {
            newErrors.street = 'Street is required';
            hasErrors = true;
        }

        // Validate budget (no negative values)
        if (budget && parseFloat(budget) < 0) {
            newErrors.budget = 'Budget cannot be negative';
            hasErrors = true;
        }

        // Validate client length (max 200 chars)
        if (client && client.length > 200) {
            newErrors.client = 'Client name must be 200 characters or less';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            setIsValid(false);
            setAttemptedSubmit(true);
            return;
        }

        const projectData: any = {
            name,
            startDate,
            street,
            description,
        };

        if (budget) {
            projectData.budget = parseFloat(budget);
        }
        if (deadline) {
            projectData.deadline = deadline;
        }
        if (client) {
            projectData.client = client;
        }
        if (status) {
            projectData.status = status;
        }
        if (tags) {
            projectData.tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        }

        const newProject = await createProject(projectData);

        if (newProject) {
            props.setProjects((prevProjects: Project[]) => [...prevProjects, newProject]);
            setIsValid(true);
            props.onClose();
        } else {
            setIsValid(false);
            setAttemptedSubmit(true);
        }
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader className="modal-header">Add new project</ModalHeader>
                <ModalCloseButton/>
                <ModalBody className="modal-body">
                    <FormControl isInvalid={attemptedSubmit && errors.name !== ''}>
                        <FormLabel className="form-label">Project Name</FormLabel>
                        <Input className="input-field" placeholder="Project Name" ref={nameRef} required
                               onChange={handleInputChange}/>
                        {attemptedSubmit && errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={4} isInvalid={attemptedSubmit && errors.street !== ''}>
                        <FormLabel className="form-label">Street</FormLabel>
                        <Input className="input-field" placeholder="Street" ref={streetRef} required
                               onChange={handleInputChange}/>
                        {attemptedSubmit && errors.street && <FormErrorMessage>{errors.street}</FormErrorMessage>}
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
                    <FormControl mt={4} isInvalid={!isValid && attemptedSubmit}>
                        <FormLabel className="form-label">Description</FormLabel>
                        <Input className="input-field" placeholder="Description" ref={descriptionRef} required
                               onChange={handleInputChange}/>
                        {!isValid && attemptedSubmit && <FormErrorMessage>Field is required</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={4} isInvalid={attemptedSubmit && errors.budget !== ''}>
                        <FormLabel className="form-label">Budget</FormLabel>
                        <Input className="input-field" placeholder="Budget" type="number" value={budget}
                               onChange={(e) => setBudget(e.target.value)} min="0" step="0.01"/>
                        {attemptedSubmit && errors.budget && <FormErrorMessage>{errors.budget}</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel className="form-label">Deadline</FormLabel>
                        <DatePicker
                            className="datepicker"
                            selected={deadline}
                            onChange={(date: Date | null) => setDeadline(date)}
                            placeholderText="Select deadline"
                        />
                    </FormControl>
                    <FormControl mt={4} isInvalid={attemptedSubmit && errors.client !== ''}>
                        <FormLabel className="form-label">Client</FormLabel>
                        <Input className="input-field" placeholder="Client" value={client}
                               onChange={(e) => setClient(e.target.value)} maxLength={200}/>
                        {attemptedSubmit && errors.client && <FormErrorMessage>{errors.client}</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel className="form-label">Status</FormLabel>
                        <Select className="input-field" placeholder="Select status" value={status}
                                onChange={(e) => setStatus(e.target.value)}>
                            <option value="Planning">Planning</option>
                            <option value="Active">Active</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Completed">Completed</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel className="form-label">Tags</FormLabel>
                        <Input className="input-field" placeholder="Tags (comma-separated)" value={tags}
                               onChange={(e) => setTags(e.target.value)}/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button className="save-button" colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button className="cancel-button" variant="ghost" onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddProjectModal;