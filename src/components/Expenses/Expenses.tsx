import React, {useEffect, useState} from 'react';
import {Text, Box, Heading, Flex, Table, Thead, Tbody, Tr, Th, Td, Checkbox} from "@chakra-ui/react";
import AddExpenseModal from './AddExpenseModal/AddExpenseModal';
import './Expenses.css';
import AddBtn from "../Buttons/AddBtn/AddBtn";
import DeleteBtn from "../Buttons/DeleteBtn/DeleteBtn";
import workIcon from "../../assets/expenseTypes/work.png";
import materialsIcon from "../../assets/expenseTypes/materials.png";
import other from "../../assets/expenseTypes/other.png";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import axios from "axios";
import ProjectDropdown from "../ProjectDropdown/ProjectDropdown";
import {fetchProjectsFromAPI} from "../../hooks/fetchProjectsFromAPI";

interface Expense {
    _id: string;
    name: string;
    price: number;
    type: string;
    projectId: string;
}

interface Project {
    _id: string;
    name: string;
    startDate: Date;
    budget: number;
    userId: string;
    street: string;
    description: string;
}


export default function Expenses() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedExpenses, setSelectedExpenses] = useState<Array<number>>([]);
    const authRedirect = useAuthRedirect();
    const [selectedProject, setSelectedProject] = useState<{ id: string, name: string }>({
        id: '',
        name: "Currently you have no projects! Navigate to Projects tab to add project"
    });
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (!authRedirect) {
            const fetchExpenses = async () => {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:4000/api/expenses/projectId=${selectedProject}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setExpenses(response.data);
            };

            if (selectedProject) {
                fetchExpenses()
                    .then(() => {
                        console.log('Expenses fetched successfully');
                    })
                    .catch((error) => {
                        console.error('Error fetching expenses:', error);
                    });
            }
            fetchProjectsFromAPI().then(setProjects);
        }
    }, [selectedProject, authRedirect]);

    const handleProjectChange = (selectedProjectId: string) => {
        const token = localStorage.getItem('token');

        axios.get(`http://localhost:4000/api/expenses/${selectedProjectId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // handle the response
            })
            .catch(error => {
                console.error('Error fetching expenses:', error);
            });
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSelectExpense = (index: number) => {
        if (selectedExpenses.includes(index)) {
            setSelectedExpenses(selectedExpenses.filter(i => i !== index));
        } else {
            setSelectedExpenses([...selectedExpenses, index]);
        }
    };

    const handleDeleteExpenses = async () => {
        const token = localStorage.getItem('token');
        const expenseIds = selectedExpenses.map(index => expenses[index]._id);
        await axios.delete('http://localhost:4000/api/expenses/delete', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: expenseIds
        });
        setExpenses(prevExpenses => prevExpenses.filter((_, index) => !selectedExpenses.includes(index)));
        setSelectedExpenses([]);
    };

    const getIconByType = (type: string) => {
        switch (type) {
            case 'materials':
                return materialsIcon;
            case 'work':
                return workIcon;
            case 'other':
                return other;
            default:
                return null;
        }
    };

    return (
        <Box className="expenses-box">
            <Flex justifyContent="space-between" alignItems="start">
                <Heading as="h2" size="lg" mb="12">Buildings</Heading>
                <Box>
                    <AddBtn onClick={handleOpenModal}>Add Expense</AddBtn>
                    <DeleteBtn onClick={handleDeleteExpenses}>Delete</DeleteBtn>
                </Box>
            </Flex>
            <Heading as="h1" size="lg">{selectedProject.name}</Heading>
            <Text className="expenses-content">This is the expenses page of our application. Here you can track your
                construction expenses for {selectedProject.name}.</Text>
            <ProjectDropdown onHouseChange={handleProjectChange}/>
            <Table className="expenses-table" variant="simple" mt="12" size='lg'>
                <Thead className="table-content">
                    <Tr>
                        <Th className="select-column table-header">Select</Th>
                        <Th className="table-header">Expense Name</Th>
                        <Th className="table-header">Expense Type</Th>
                        <Th className="table-header">Price</Th>
                    </Tr>
                </Thead>
                <Tbody className="table-content">
                    {expenses.map((expense, index) => (
                        <Tr key={index}>
                            <Td>
                                <Checkbox
                                    size="lg"
                                    className="checkbox"
                                    isChecked={selectedExpenses.includes(index)}
                                    onChange={() => handleSelectExpense(index)}
                                />
                            </Td>
                            <Td>
                                <Flex alignItems="center">
                                    <img className="expense-icon" src={getIconByType(expense.type)} alt="Expense"/>
                                    <Text className="expense-name" ml={2}>{expense.name}</Text>
                                </Flex>
                            </Td>
                            <Td>{expense.type}</Td>
                            <Td>{expense.price}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <AddExpenseModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                projectId={selectedProject.id}
                setExpenses={setExpenses}
            />
        </Box>
    );
}