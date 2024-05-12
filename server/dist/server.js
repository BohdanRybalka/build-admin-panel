var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import User from './models/User';
import connectDB from './db'; // Імпортуємо функцію підключення до бази даних
const app = express();
const port = process.env.PORT || 3000;
connectDB().then(() => {
    console.log('Database connection established');
}).catch((error) => {
    console.error('Error establishing database connection', error);
});
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.send({ status: 'success', message: 'Logged in successfully' });
    }
    else {
        res.send({ status: 'error', message: 'Invalid username or password' });
    }
});
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username is already taken' });
        }
        const user = new User({ username, password }); // В реальному додатку ви б хотіли хешувати пароль перед зберіганням
        yield user.save();
        res.send({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).send({ message: 'An error occurred while registering the user' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
