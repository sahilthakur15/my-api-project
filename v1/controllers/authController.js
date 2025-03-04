const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  
const user = require("../models/userModel"); // importing user model from models folder 
const register = async(req, res) =>{
    try{
    const {username, email, password, role} = req.body; // destructuring the request body
    const hashedPass = await bcrypt.hash(password, 16); // hashing the password

    const newUser = new User({username, email, password:hashedPass, role}); // creating a new user
    await newUser.save(); // saving the user to the database
    res
    .status(201)
    .json({message:"User registered successfully"});
}
    catch(err){
        res.status(500).json({message:"Error registering user"});
    }
};

const login = async(req, res) =>{
    const {username, password} = req.body; // destructuring the request body

    try{
        const user = await User.findOne({username}); // finding the user in the database
        if(!user){
            return res.status(404).json({message:"User not found"});
        };
        const isMatch = await bcrypt.compare(password, user.password); // comparing the password
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"});
        };
        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn:"6h"}); // generating a token
        res.status(200).json({message:"User logged in successfully", token});

    }    catch(err){
        res.status(500).json({message:"Error logging in user"});
    }
};

module.exports = {register, login, };