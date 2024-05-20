import React from 'react';
import useAuthRedirect from "../../hooks/useAuthRedirect";
import {Box, Heading} from "@chakra-ui/react";
import './Statistics.css';

export default function Statistics() {
    const authRedirect = useAuthRedirect();

    if (authRedirect) return authRedirect;

    return (
        <Box className="statistics-box">
            <Heading as="h2" size="lg" mb="12">Statistics</Heading>
        </Box>
    );
}