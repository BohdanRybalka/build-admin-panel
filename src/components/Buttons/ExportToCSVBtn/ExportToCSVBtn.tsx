import React from 'react';
import {CSVLink} from 'react-csv';
import {Button} from "@chakra-ui/react";
import './ExportToCSVBtn.css';

interface ExportToCsvBtnProps {
    expenses: Array<{
        _id: string;
        name: string;
        price: number;
        type: string;
        projectId: string;
    }>;
}

const ExportToCSVBtn: React.FC<ExportToCsvBtnProps> = ({expenses}) => {
    const headers = [
        {label: 'Name', key: 'name'},
        {label: 'Price', key: 'price'},
        {label: 'Type', key: 'type'},
    ];

    return (
        <CSVLink data={expenses} headers={headers} filename={"expenses.csv"}>
            <Button className="export-to-csv-btn">Export to CSV</Button>
        </CSVLink>
    );
}

export default ExportToCSVBtn;