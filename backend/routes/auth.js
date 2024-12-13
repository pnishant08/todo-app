const router = require("express").Router();
const User = require("../models/user");
const bcrypt =require("bcrypt");


//SIGN UP

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        // Validate required fields
        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const saltRounds=10;
        const hashpassword=await bcrypt.hashSync(password,saltRounds);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Create a new user
        const user = new User({ email, username, password:hashpassword });
        await user.save();

        res.status(200).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

//LOG IN 

router

module.exports = router;
