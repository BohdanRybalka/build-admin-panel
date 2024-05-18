import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt) as string;
        } else {
            throw new Error('Password is undefined');
        }
    }
    next();
});

export default mongoose.model('User', UserSchema);