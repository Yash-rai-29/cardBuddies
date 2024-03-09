const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');

const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


// Root Route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { name, age, email, password } = req.body;
        if (!name || !age || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        // Set user metadata
        await admin.auth().updateUser(userRecord.uid, {
            metadata: {
                age: age
            }
        });

        // Send email verification
        await admin.auth().sendEmailVerification(userRecord.uid);
        
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});


// Signin Route
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }
        const userRecord = await admin.auth().getUserByEmail(email);
        // Perform password-based signin
        await admin.auth().signInWithEmailAndPassword(email, password);
        // Here you can generate a token and send it back to the client if needed
        res.status(200).json({ message: 'User signed in successfully' });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ message: 'Error signing in user' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
