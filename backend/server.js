const express = require("express")
const cors = require("cors")
const userRoutes = require("../backend/routes/userRoutes");
const GoogleStrategy  = require('passport-google-oauth20').Strategy
const  session  = require("express-session");
const passport = require("passport");
require("dotenv").config()

const app = express()
const Google_Client_Id = process.env.CLIENT_ID
const Google_Client_Secret = process.env.CLIENT_SECRET
app.use(express.json());
app.use("api/user", userRoutes);

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true
}))
app.use(passport.initialize())
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID : Google_Client_Id,
    clientSecret : Google_Client_Secret,
    callbackURL : "http://localhost:5000/auth/google/callback"
},(accessToken,refreshToken,profile,done)=>{
    return done(null,profile);
}));

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
  });

app.get("/auth/google",passport.authenticate('google',{
    scope : ['https://www.googleapis.com/auth/plus.login']
}))
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('http://localhost:5173/dashboard');
    });
app.listen(3000,()=>{
    console.log("Server started")
})