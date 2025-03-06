const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./v1/config/dbConnect"); // imported dbConnect function from dbConnect.js file.
const authRoutes = require("./v1/routes/authRoutes"); // imported authRoutes from routes folder.
const cors = require("cors"); // imported cors from cors package.

dotenv.config();
dbConnect(); // calling dbConnect function to connect to database.

const app = express();

//cors 
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes); // using authRoutes from routes folder.

//Start the Server
const PORT = process.env.PORT || 8002;
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
});
