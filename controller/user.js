const bcrypt = require("bcryptjs");
const {setUser} = require("../service");
const User = require('../models/user');

async function handleUserSignup(req,res) {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
     await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return res.json("/login"),
        { msg: "Signup success" };
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials" });

    const token = setUser(user);


    return res.json({
        msg: "Login success", userInfo: {
            token,
            email: user.email,
            name: user.name,
            role: user.role,
        }
    });
}

module.exports = {
     handleUserSignup,
     handleUserLogin,
};