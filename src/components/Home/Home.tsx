import React from 'react';
import {Box, Heading, Text} from "@chakra-ui/react";
import './Home.css';
import useAuthRedirect from '../../hooks/useAuthRedirect';

export default function Home() {
    const authRedirect = useAuthRedirect();

    if (authRedirect) return authRedirect;

    return (
        <Box className="home-box">
            <Heading fontSize="24px" fontWeight="bold" color="#333" mb="20px">
                Welcome to our construction expense tracker!
            </Heading>
            <Text className="home-content">
                This is the home page of our application. Here you can manage your construction projects and track
                expenses.
            </Text>
        </Box>
    );
}