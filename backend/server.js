const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

const app = express();
const CLIENT_URL = "http://localhost:5173";
const client = new OAuth2Client(process.env.CLIENT_ID);

// Middleware
app.use(express.json());
app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true, 
    })
  );
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Google Authentication using Token Verification
app.post("/auth/google", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    req.session.user = payload; // Store user in session

    res.json({ user: payload });
  } catch (error) {
    console.error("Google authentication error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

// Get Logged-in User
app.get("/auth/user", (req, res) => {
  res.json(req.session.user || null);
});

// Logout
app.get("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect(CLIENT_URL);
    if(err){
      return res.status(500).send({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid");
    res.send({ message: "Logged out successfully" });
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
