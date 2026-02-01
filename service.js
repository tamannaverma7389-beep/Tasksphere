const jwt = require("jsonwebtoken");

function setUser (user) {
     return jwt.sign(
        {
            _id: user.id,
            email:user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
     )
}

module.exports = {
    setUser,
}