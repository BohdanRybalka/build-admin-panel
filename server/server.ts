import express, {Request, Response, NextFunction} from 'express';
import User from './models/User';
import connectDB from './db';
import cors from 'cors';
import jwt, {JwtPayload} from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import {VerifyErrors} from 'jsonwebtoken';

dotenv.config();

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

app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});
    if (!user) {
        return res.status(400).send({message: 'Invalid username or password'});
    }

    if (!user.password) {
        return res.status(400).send({message: 'Invalid username or password'});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send({message: 'Invalid username or password'});
    }

    if (!process.env.JWT_SECRET_KEY) {
        return res.status(500).send({message: 'JWT secret key is not set'});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

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

        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).send({message: 'JWT secret key is not set'});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

        res.send({token, message: 'User registered successfully'});
    } catch (error) {
        console.error('An error occurred while registering the user', error);
        res.status(500).send({message: 'An error occurred while registering the user'});
    }
});

app.get('/api/user', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!process.env.JWT_SECRET_KEY) {
            return res.sendStatus(500);
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY as any, async (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                res.sendStatus(403);
                return;
            }
            if (!decoded) {
                res.sendStatus(403);
                return;
            }
            const user = decoded as JwtPayload;
            if ('id' in user) {
                try {
                    const userDocument = await User.findById(user.id).select('-password');
                    if (!userDocument) {
                        res.status(404).send({message: 'No user found.'});
                        return;
                    }
                    res.status(200).send(userDocument);
                } catch (error) {
                    res.status(500).send({message: 'There was a problem finding the user.'});
                }
            } else {
                res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(401);
    }
});

app.use((req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!process.env.JWT_SECRET_KEY) {
            return res.sendStatus(500);
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
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