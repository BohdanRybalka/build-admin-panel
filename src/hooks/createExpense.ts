import axios from 'axios';

export async function createExpense(expenseData: any) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No authorization token found');
        return;
    }

    try {
        const response = await axios.post('http://localhost:4000/api/expenses/create', expenseData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating expense:', error);
    }
}