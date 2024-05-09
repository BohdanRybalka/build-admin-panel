import React from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Home from "./components/Home/Home";
import Expenses from "./components/Expenses/Expenses";
import Projects from "./components/Projects/Projects";
import SideBar from "./components/Navigation/SideBar";
import {ChakraProvider, Flex, Box} from "@chakra-ui/react";
import Header from "./components/Header/Header";
import theme from "./theme";
import AuthPage from "./components/AuthPage/AuthPage";

function AppContent() {
    const user = "Bohdan Rybalka";
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Home';
            case '/expenses':
                return 'Expenses';
            case '/projects':
                return 'Projects';
            case '/statistics':
                return 'Statistics';
            case '/auth':
                return 'Auth';
            default:
                return 'Welcome to Our Construction Expense Tracker';
        }
    }

    return (
        <Flex>
            {location.pathname !== '/auth' && <SideBar/>}
            <Box flexGrow={1}>
                {location.pathname !== '/auth' && <Header title={getTitle()} user={user}/>}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/expenses" element={<Expenses/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                    <Route path="/auth" element={<AuthPage/>}/>
                </Routes>
            </Box>
        </Flex>
    );
}

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <AppContent/>
            </Router>
        </ChakraProvider>
    );
}