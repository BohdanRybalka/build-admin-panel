import express, {Request, Response, NextFunction} from 'express';
import User from './models/User';
import connectDB from './db';
import cors from 'cors';
import jwt from 'jsonwebtoken';

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

app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    // Перевірте, чи користувач існує і чи пароль вірний
    const user = await User.findOne({username});
    if (!user || user.password !== password) {
        return res.status(400).send({message: 'Invalid username or password'});
    }

    // Створіть токен
    const token = jwt.sign({id: user._id}, 'your-secret-key', {expiresIn: '1h'});

    // Відправте токен клієнту
    res.send({token});
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

// Middleware для перевірки токену
app.use((req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'your-secret-key', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            res.locals.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});