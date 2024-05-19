import React from 'react';
import useAuthRedirect from "../../hooks/useAuthRedirect";

export default function Statistics() {
    const authRedirect = useAuthRedirect();

    if (authRedirect) return authRedirect;
    
    return (
        <div>
            <h2>Statistics</h2>
            {/* Додайте вміст для сторінки "Statistics" */}
        </div>
    );
}