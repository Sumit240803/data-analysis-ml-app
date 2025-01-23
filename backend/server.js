const express = require("express")
const cors = require("cors")
const userRoutes = require("../backend/routes/userRoutes");
const app = express()

app.use(express.json());
app.use("api/user", userRoutes);


app.listen(3000,()=>{
    console.log("Server started")
})