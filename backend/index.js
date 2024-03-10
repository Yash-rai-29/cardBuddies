const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");
const axios = require("axios");
const bcrypt = require("bcrypt"); // Import bcrypt module

const serviceAccount = require("./etc/secrets/firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cardbuddies-c2a61-default-rtdb.firebaseio.com", // Replace with your Firebase project URL
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, age, phone, email, password } = req.body;
    console.log(req.body);
    // Input Validation
    const missingFields = [];
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!age) missingFields.push("age");
    if (!phone) missingFields.push("phone");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: "Missing required fields", missingFields });
    }
    // Create user account with password hashing

    const displayName = `${firstName} ${lastName}`;

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      phoneNumber: phone,
    });

    // Save additional user data to the database (if needed)
    await admin.database().ref(`users/${userRecord.uid}`).set({
      firstName,
      lastName,
      age,
      phone,
      password,
      email, // You can choose whether to store the email again
    });
    console.log(userRecord);
    // Send email verification link
    await admin.auth().generateEmailVerificationLink(email);

    res.status(201).json({
      message: "User signed up successfully.",
      userRecord: userRecord // Include userRecord in the response
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "auth/email-already-in-use") {
      return res.status(400).json({ message: "Email address already in use" });
    }
    res.status(500).json({ message: "Error creating user" });
  }
});
// Signin Route
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }
    // Sign in the user using Firebase Admin SDK
    const userRecord = await admin.auth().getUserByEmail(email);

    // Check if the user exists
    if (!userRecord) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(userRecord);
    // Compare the provided password with the stored hash
    const matches = await bcrypt.compare(password, userRecord.passwordHash);

    if (!matches) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If verification is successful, return success message
    res.status(200).json({ message: "User signed in successfully" });
  } catch (error) {
    console.error("Error signing in user:", error);
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: "Error signing in user" });
  }
});
// Verify User Route
app.post("/verify-user", async (req, res) => {
  try {
    const { accessToken } = req.body;

    // Verify the access token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    const uid = decodedToken.uid;
    console.log(uid);
    // Get user details from Firebase Authentication
    const userRecord = await admin.auth().getUser(uid);
    console.log(userRecord);
    // Return user details along with flags
    res.status(200).json({
      user: userRecord,
      isAuthenticated: true, // User is authenticated
      allowUser: true, // Allow user access
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(401).json({ message: "Invalid access token" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
