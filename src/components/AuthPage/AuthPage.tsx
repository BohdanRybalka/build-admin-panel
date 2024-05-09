import React, {useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading, Flex, FormErrorMessage
} from "@chakra-ui/react";
import logo from '../../assets/companyLogo/companyLogo.png';
import './AuthPage.css';
import {CSSTransition, SwitchTransition} from 'react-transition-group';

export default function AuthPage() {
    const [authMode, setAuthMode] = useState('login');
    const [activeButton, setActiveButton] = useState(localStorage.getItem('activeButton') || '');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleButtonClick = (mode: string) => {
        setAuthMode(mode);
        setActiveButton(mode);
        localStorage.setItem('activeButton', mode);
    };

    const validateForm = () => {
        let isValid = true;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email.trim() === '') {
            setEmailError('Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (authMode === 'register' && password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Submit form
        }
    };

    return (
        <Box className="auth-page">
            <Box>
                <img src={logo} alt="Company Logo" className="auth-logo"/>
            </Box>
            <Box className="auth-form">
                <Flex mt={0} className="auth-buttons">
                    <Button
                        className={`auth-mode-button left ${activeButton === 'login' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('login')}>
                        Login
                    </Button>
                    <Button
                        className={`auth-mode-button right ${activeButton === 'register' ? 'active' : ''}`} // Додаємо клас active, якщо кнопка активна
                        onClick={() => handleButtonClick('register')}>
                        Register
                    </Button>
                </Flex>
                <Box className="auth-form-content">
                    <Heading size="lg" className="auth-heading"
                             mb={45} mt={45}>{authMode === 'login' ? 'Login' : 'Register'}</Heading>
                    <FormControl isInvalid={!!emailError}>
                        <FormLabel>Email</FormLabel>
                        <Input className="input-field" type="email" placeholder="Enter your email" value={email}
                               onChange={(e) => setEmail(e.target.value)} onInput={() => setEmailError('')}/>
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                    </FormControl>
                    <FormControl mt={4} isInvalid={!!passwordError}>
                        <FormLabel>Password</FormLabel>
                        <Input className="input-field" type="password" placeholder="Enter your password" value={password}
                               onChange={(e) => setPassword(e.target.value)} onInput={() => setPasswordError('')}/>
                        <FormErrorMessage>{passwordError}</FormErrorMessage>
                    </FormControl>
                    <SwitchTransition>
                        <CSSTransition
                            key={authMode}
                            addEndListener={(node: HTMLElement, done: () => void) => {
                                node.addEventListener("transitionend", done, false);
                            }}
                            classNames='fade'
                        >
                            {authMode === 'register' ? (
                                <FormControl mt={4} isInvalid={!!confirmPasswordError}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input className="input-field" type="password" placeholder="Confirm your password"
                                           value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                           onInput={() => setConfirmPasswordError('')}/>
                                    <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
                                </FormControl>
                            ) : (
                                <></> // Return an empty React.Fragment when authMode is not 'register'
                            )}
                        </CSSTransition>
                    </SwitchTransition>
                    <Button className="auth-button" onClick={handleSubmit}>
                        {authMode === 'login' ? 'Login' : 'Register'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}