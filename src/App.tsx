import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Home from "./components/Home/Home";
import Expenses from "./components/Expenses/Expenses";
import Projects from "./components/Projects/Projects";
import SideBar from "./components/Navigation/SideBar";
import {ChakraProvider, Flex, Box} from "@chakra-ui/react";
import Header from "./components/Header/Header";
import theme from "./theme";
import AuthPage from "./components/AuthPage/AuthPage";
import {User, UserContext} from './UserContext';
import axios from "axios";
import Statistics from "./components/Statistics/Statistics";

function AppContent() {
    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();

    const API_URL = 'http://localhost:4000/api/user';

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user', error);
        }
    };

    useEffect(() => {
        if (location.pathname === '/') {
            fetchUser().catch(error => {
                console.error('Error in fetchUser:', error);
            });
        }
        if (location.pathname === '/expenses') {
            fetchUser().catch(error => {
                console.error('Error in fetchUser:', error);
            });
        }
        if (location.pathname === '/projects') {
            fetchUser().catch(error => {
                console.error('Error in fetchUser:', error);
            });
        }
    }, [location.pathname]);

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
        <UserContext.Provider value={user}>
            <Flex>
                {location.pathname !== '/auth' && <SideBar/>}
                <Box flexGrow={1}>
                    {location.pathname !== '/auth' && <Header title={getTitle()}/>} {/* видалено user={user} */}
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/expenses" element={<Expenses/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/statistics" element={<Statistics/>}/>
                        <Route path="/auth" element={<AuthPage/>}/>
                    </Routes>
                </Box>
            </Flex>
        </UserContext.Provider>
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