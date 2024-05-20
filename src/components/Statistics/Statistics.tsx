import React, {useEffect, useState} from 'react';
import {Box, Heading} from "@chakra-ui/react";
import axios from 'axios';
import './Statistics.css';
import {Doughnut} from 'react-chartjs-2';
import {ChartData} from 'chart.js';
import {Chart, ArcElement, CategoryScale, DoughnutController} from 'chart.js';
import ProjectDropdown from "../ProjectDropdown/ProjectDropdown";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Legend} from 'chart.js';
import chroma from 'chroma-js';

Chart.register(Legend);
Chart.register(ArcElement, CategoryScale, DoughnutController, ChartDataLabels);

const baseColors = [
    chroma('rgb(255, 99, 132)'),
    chroma('rgb(54, 162, 235)'),
    chroma('rgb(255, 206, 86)')
];

const backgroundColors = baseColors.map(color => color.alpha(0.9).css());
const borderColors = baseColors.map(color => color.darken().css());
const hoverBorderColors = baseColors.map(color => color.darken(2).css());

interface Expense {
    _id: string;
    name: string;
    price: number;
    type: string;
    projectId: string;
}

export default function Statistics() {
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [chartData, setChartData] = useState<ChartData<"doughnut", number[], unknown>>({

        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 0,
            },
        ],
    });
    const [totalExpense, setTotalExpense] = useState<number>(0);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:4000/api/projects', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setSelectedProject(response.data[0]._id);
            })
            .catch(error => {
                console.error('Error fetching projects', error);
            });
    }, []);

    useEffect(() => {
        if (selectedProject) {
            const token = localStorage.getItem('token');

            axios.get(`http://localhost:4000/api/expenses/${selectedProject}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    const data = {
                        labels: ['Work', 'Materials', 'Other'],
                        datasets: [
                            {
                                label: 'Expenses',
                                data: [
                                    response.data.filter((expense: Expense) => expense.type === 'work').reduce((sum: number, current: Expense) => sum + current.price, 0),
                                    response.data.filter((expense: Expense) => expense.type === 'materials').reduce((sum: number, current: Expense) => sum + current.price, 0),
                                    response.data.filter((expense: Expense) => expense.type === 'other').reduce((sum: number, current: Expense) => sum + current.price, 0)
                                ],
                                backgroundColor: backgroundColors,
                                borderColor: borderColors,
                                hoverBorderColor: hoverBorderColors,
                                borderWidth: 3,
                                hoverOffset: 15, // Збільшуємо розмір сегмента при наведенні
                            },
                        ],
                    };
                    setChartData(data);
                    const total = response.data.reduce((sum: number, expense: Expense) => sum + expense.price, 0);
                    setTotalExpense(total);
                })
                .catch(error => {
                    console.error('Error fetching expenses', error);
                });
        }
    }, [selectedProject]);

    const options: any = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    useBorderRadius: true,
                    borderRadius: 80,
                    padding: 50
                }
            },
            datalabels: {
                display: 'true',
                color: 'black',
                clamp: true,

                font: {
                    weight: 'bold'
                },
                formatter: (value: number, context: any) => {
                    let sum = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                    let percentage = (value * 100 / sum).toFixed(2);
                    let expenseType = context.chart.data.labels[context.dataIndex];
                    return `${expenseType}: ${percentage}% (${value}$)`;
                },
            }
        }
    };

    const handleProjectChange = (selectedProjectId: string) => {
        setSelectedProject(selectedProjectId);
    };

    return (
        <Box className="statistics-box">
            <Heading as="h2" size="lg" mb="12">Statistics</Heading>
            <ProjectDropdown onHouseChange={handleProjectChange}/>
            <Box className="chart-box">
                <Heading as="h4" size="md" mt="5">Total Expense: {totalExpense}$</Heading>
                <Doughnut data={chartData} options={options}/>
            </Box>
        </Box>
    );
}