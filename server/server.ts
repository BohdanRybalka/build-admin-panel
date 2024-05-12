import express, {Request, Response, NextFunction} from 'express';
import User from './models/User';
import connectDB from './db';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

const port = process.env.PORT || 4000;

connectDB().then(() => {
    console.log('Database connection established');
}).catch((error) => {
    console.error('Error establishing database connection', error);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (username === 'admin' && password === 'password') {
        res.send({status: 'success', message: 'Logged in successfully'});
    } else {
        res.send({status: 'error', message: 'Invalid username or password'});
    }
});

app.post('/register', async (req, res) => {
    const {username, password} = req.body;

    try {
        const existingUser = await User.findOne({username});

        if (existingUser) {
            return res.status(400).send({message: 'Username is already taken'});
        }

        const user = new User({username, password});

        await user.save();

        res.send({message: 'User registered successfully'});
    } catch (error) {
        console.error('An error occurred while registering the user', error);
        res.status(500).send({message: 'An error occurred while registering the user'});
    }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});