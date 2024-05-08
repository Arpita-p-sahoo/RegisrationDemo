const express = require("express");

const app = express();

const port = 8000;

const connectDb = require("./db/db");

//Middleware for parsing JSON

app.use(express.json());

//registration

const User = require('./db/user'); // Assuming you have a User model defined

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password }); // Use a different variable name here
        await newUser.save(); 
        res.status(201).json({ message: 'Registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

//Login

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({message: 'User not found'});
        }
        if (user.password !== password) {
            return res.status(401).json({message: 'Invalid password'});
        }
        res.status(200).json({message: 'Login successful'});
    } catch (error) {
        res.status(500).json({message: 'Login failed', error: error.message});
    }
})


connectDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})