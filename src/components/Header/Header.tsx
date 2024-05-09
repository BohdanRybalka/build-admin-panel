import React from 'react';
import {Box, Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react';
import userIcon from '../../assets/userIcons/userIcon.png';
import './Header.css';

type HeaderProps = {
    title: string;
    user: string;
}

export default function Header({title, user}: HeaderProps) {
    return (
        <header className="header">
            <h1 className="header-title">{title}</h1>
            <Box className="header-user">
                <img src={userIcon} alt="User Icon" className="header-user-icon"/>
                <Menu>
                    <MenuButton as={Button} variant="ghost" mr={3} pl={2}>
                        {user}
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Exit</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </header>
    );
}