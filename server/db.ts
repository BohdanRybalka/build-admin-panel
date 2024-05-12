import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ConstructionExpenseManagement');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
};

export default connectDB;