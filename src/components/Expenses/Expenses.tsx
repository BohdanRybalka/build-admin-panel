import React, {useState} from 'react';
import {Text, Box, Heading, Flex, Table, Thead, Tbody, Tr, Th, Td, Checkbox} from "@chakra-ui/react";
import AddExpenseModal from './AddExpenseModal/AddExpenseModal'; // Import the AddExpenseModal component
import './Expenses.css';
import AddBtn from "../Buttons/AddBtn/AddBtn";
import DeleteBtn from "../Buttons/DeleteBtn/DeleteBtn"; // Import the CSS file

export default function Expenses() {
    const buildingName = "Building 1";
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedExpenses, setSelectedExpenses] = useState<Array<number>>([]); // Add this line

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSelectExpense = (index: number) => { // Add this function
        if (selectedExpenses.includes(index)) {
            setSelectedExpenses(selectedExpenses.filter(i => i !== index));
        } else {
            setSelectedExpenses([...selectedExpenses, index]);
        }
    };

    const handleDeleteExpenses = () => { // Add this function
        // Delete the selected expenses
    };

    const expenses = [
        {name: "Wood", price: "$100"},
        {name: "Nails", price: "$200"},
        {name: "Bricks", price: "$300"},
        {name: "Cement", price: "$400"},
        {name: "Steel", price: "$500"},
        {name: "Glass", price: "$600"},
        {name: "Insulation", price: "$700"},
        {name: "Paint", price: "$800"},
        {name: "Tiles", price: "$900"},
        {name: "Pipes", price: "$1000"},
        {name: "Wiring", price: "$1100"},
        {name: "Plaster", price: "$1200"},
        {name: "Roofing", price: "$1300"},
        {name: "Steel", price: "$500"},
        {name: "Glass", price: "$600"},
        {name: "Insulation", price: "$700"},
        {name: "Paint", price: "$800"},
        {name: "Tiles", price: "$900"},
        {name: "Pipes", price: "$1000"},
        {name: "Wiring", price: "$1100"},
        {name: "Plaster", price: "$1200"},
        {name: "Roofing", price: "$1300"},
        {name: "Steel", price: "$500"},
        {name: "Glass", price: "$600"},
        {name: "Insulation", price: "$700"},
        {name: "Paint", price: "$800"},
        {name: "Tiles", price: "$900"},
        {name: "Pipes", price: "$1000"},
        {name: "Wiring", price: "$1100"},
        {name: "Plaster", price: "$1200"},
        {name: "Roofing", price: "$1300"}
    ];

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
                            <Td>{expense.name}</Td>
                            <Td>{expense.price}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <AddExpenseModal isOpen={isModalOpen} onClose={handleCloseModal}/>
        </Box>
    );
}