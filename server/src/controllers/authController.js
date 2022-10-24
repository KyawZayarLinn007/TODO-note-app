require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

const createToken = (id, email) => {
    let payload = {
        id, email
    }

    let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});
    return token;
}

module.exports.register_post = async (req, res) => {
    const { email, password, confirm_password } = req.body;

    try {
        let email_user = await Users.findOne({email});
        if(email_user){
            throw new Error("Email already registered!");
        }else if(password !== confirm_password){
            throw new Error("Password and confirm Password must be the same!")
        }else{
            //bcrypt hashed
            let salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
            let hashedPassword = await bcrypt.hash(password, salt);

            let user = await Users.create({email, password: hashedPassword});

            let token = createToken(user._id, user.email);
            res.cookie("token", token, {maxAge: 24 * 60 * 60 * 1000})

            res.json({
                error: null,
                data: {
                    id: user._id,
                    email: user.email
                }
            })
        }
    } catch (error) {
        res.json({
            error: error.message,
            data: null
        })
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await Users.findOne({email});
        if(!user){
            throw new Error("Email not registered");
        }

        let isPassword = await bcrypt.compare(password, user.password);
        if(isPassword){
            let token = createToken(user._id, user.email);
            res.cookie("token", token, {maxAge: 24 * 60 * 60 * 1000})

            res.json({
                error: null,
                data: "login success"
            })
        }else{
            throw new Error("Incorrect Password");
        }
    } catch (error) {
        res.json({
            error: error.message,
            data: null
        })
    }
}

module.exports.logout_post = (req, res) => {
    res.clearCookie("token");
    res.json({
        error: null,
        data: "token deleted"
    })
}