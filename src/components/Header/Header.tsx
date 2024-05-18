import React, {useContext} from 'react';
import {Box, Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react';
import userIcon from '../../assets/userIcons/userIcon.png';
import './Header.css';
import {UserContext} from "../../UserContext";

type HeaderProps = {
    title: string;
}

export default function Header({title}: HeaderProps) {
    const user = useContext(UserContext);

    return (
        <header className="header">
            <h1 className="header-title">{title}</h1>
            <Box className="header-user">
                <img src={userIcon} alt="User Icon" className="header-user-icon"/>
                <Menu>
                    <MenuButton as={Button} variant="ghost" className="header-user-button">
                        {user ? user.username : 'Guest'}
                    </MenuButton>
                    <MenuList className="header-user-menu">
                        <MenuItem>Exit</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </header>
    );
}