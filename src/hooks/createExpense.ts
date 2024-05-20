export const createExpense = async (expenseData: { name: string; price: number; type: string; projectId: string; }) => {
    try {
        const response = await fetch('http://localhost:4000/api/expenses/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(expenseData)
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error creating expense');
            return null;
        }
    } catch (error) {
        console.error('Error creating expense', error);
        return null;
    }
};