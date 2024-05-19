import React, {useContext, useEffect, useState} from 'react';
import {Box, Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react';
import userIcon from '../../assets/userIcons/userIcon.png';
import './Header.css';
import {UserContext} from "../../UserContext";
import {useNavigate} from "react-router-dom";

type HeaderProps = {
    title: string;
}

export default function Header({title}: HeaderProps) {
    const user = useContext(UserContext);
    const [username, setUsername] = useState(user ? user.username : 'Guest');
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(user ? user.username : 'Guest');
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <header className="header">
            <h1 className="header-title">{title}</h1>
            <Box className="header-user">
                <img src={userIcon} alt="User Icon" className="header-user-icon"/>
                <Menu>
                    <MenuButton as={Button} variant="ghost" className="header-user-button">
                        {username}
                    </MenuButton>
                    <MenuList className="header-user-menu">
                        <MenuItem className="header-user-menu-option" onClick={handleLogout}>Exit</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </header>
    );
}