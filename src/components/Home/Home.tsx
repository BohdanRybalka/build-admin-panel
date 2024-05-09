import React from 'react';
import {Box, Heading, Text} from "@chakra-ui/react";
import './Home.css';

export default function Home() {
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