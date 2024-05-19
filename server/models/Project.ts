import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: String,
    startDate: Date,
    budget: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    street: String,
    description: String,
});

export default mongoose.model('Project', ProjectSchema);