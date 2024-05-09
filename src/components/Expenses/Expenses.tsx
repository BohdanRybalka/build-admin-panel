import React, {useState} from 'react';
import {Text, Box, Heading, Flex, Table, Thead, Tbody, Tr, Th, Td, Checkbox} from "@chakra-ui/react";
import AddExpenseModal from './AddExpenseModal/AddExpenseModal';
import './Expenses.css';
import AddBtn from "../Buttons/AddBtn/AddBtn";
import DeleteBtn from "../Buttons/DeleteBtn/DeleteBtn";
import workIcon from "../../assets/expenseTypes/work.png";
import materialsIcon from "../../assets/expenseTypes/materials.png";
import other from "../../assets/expenseTypes/other.png";

export default function Expenses() {
    const buildingName = "Building 1";
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedExpenses, setSelectedExpenses] = useState<Array<number>>([]);

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

    const handleDeleteExpenses = () => {
        // Delete the selected expenses
    };

    const expenses = [
        {name: "Wood", price: "$100", type: "materials"},
        {name: "Nails", price: "$200", type: "materials"},
        {name: "Bricks", price: "$300", type: "materials"},
        {name: "Cement", price: "$400", type: "materials"},
        {name: "Steel", price: "$500", type: "materials"},
        {name: "Glass", price: "$600", type: "materials"},
        {name: "Insulation", price: "$700", type: "materials"},
        {name: "Paint", price: "$800", type: "materials"},
        {name: "Tiles", price: "$900", type: "materials"},
        {name: "Pipes", price: "$1000", type: "materials"},
        {name: "Wiring", price: "$1100", type: "materials"},
        {name: "Plaster", price: "$1200", type: "materials"},
        {name: "Roofing", price: "$1300", type: "materials"},
        {name: "Steel", price: "$500", type: "work"},
        {name: "Glass", price: "$600", type: "work"},
        {name: "Insulation", price: "$700", type: "work"},
        {name: "Paint", price: "$800", type: "work"},
        {name: "Tiles", price: "$900", type: "work"},
        {name: "Pipes", price: "$1000", type: "work"},
        {name: "Wiring", price: "$1100", type: "work"},
        {name: "Plaster", price: "$1200", type: "work"},
        {name: "Roofing", price: "$1300", type: "work"},
        {name: "Steel", price: "$500", type: "other"},
        {name: "Glass", price: "$600", type: "other"},
        {name: "Insulation", price: "$700", type: "other"},
        {name: "Paint", price: "$800", type: "other"},
        {name: "Tiles", price: "$900", type: "other"},
        {name: "Pipes", price: "$1000", type: "other"},
        {name: "Wiring", price: "$1100", type: "other"},
        {name: "Plaster", price: "$1200", type: "other"},
        {name: "Roofing", price: "$1300", type: "other"}
    ];

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
            <Heading as="h1" size="lg">{buildingName}</Heading>
            <Text className="expenses-content">This is the expenses page of our application. Here you can track your
                construction expenses for {buildingName}.</Text>
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
            <AddExpenseModal isOpen={isModalOpen} onClose={handleCloseModal}/>
        </Box>
    );
}