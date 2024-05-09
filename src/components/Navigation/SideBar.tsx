import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, VStack, HStack, Heading, Link as ChakraLink, Image, Icon, IconButton} from '@chakra-ui/react';
import {FaHome, FaMoneyBillWave, FaChartLine, FaProjectDiagram} from 'react-icons/fa';
import logo from '../../assets/companyLogo/companyLogo.png';
import './Sidebar.css';

export default function Sidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isArrowRight, setArrowRight] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
        setArrowRight(!isArrowRight);
    };

    return (
        <Box className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
            <IconButton
                aria-label="Toggle sidebar"
                onClick={handleSidebarToggle}
                className="toggle-button"
                style={{right: isArrowRight ? '-11%' : '-84%'}}
            />
            <VStack align="start" spacing={0} alignItems="center">
                {isSidebarOpen && (
                    <HStack spacing={3} mt={5} mb={30} ml={5} alignItems="flex-start" flexDirection="column">
                        <Image src={logo} alt="Company Logo" className="logo"/>
                        <Heading as="h1" size="lg" className="heading">Build Smart</Heading>
                    </HStack>
                )}
                <VStack w="100%" mt={10}>
                    <ChakraLink as={Link} to="/" className="link" fontFamily="body">
                        <Icon as={FaHome} className="icon-margin"/>
                        {isSidebarOpen && 'Home'}
                    </ChakraLink>
                    <ChakraLink as={Link} to="/expenses" className="link" fontFamily="body">
                        <Icon as={FaMoneyBillWave} className="icon-margin"/>
                        {isSidebarOpen && 'Expenses'}
                    </ChakraLink>
                    <ChakraLink as={Link} to="/projects" className="link" fontFamily="body">
                        <Icon as={FaProjectDiagram} className="icon-margin"/>
                        {isSidebarOpen && 'Projects'}
                    </ChakraLink>
                    <ChakraLink as={Link} to="/statistics" className="link" fontFamily="body">
                        <Icon as={FaChartLine} className="icon-margin"/>
                        {isSidebarOpen && 'Statistics'}
                    </ChakraLink>
                </VStack>
            </VStack>
        </Box>
    );
}