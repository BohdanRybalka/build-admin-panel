import React from 'react';

export type User = {
    username: string;
};

export const UserContext = React.createContext<User | null>(null);