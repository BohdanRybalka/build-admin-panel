import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    name: String,
    price: Number,
    type: String,
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
});

export default mongoose.model('Expense', ExpenseSchema);