require("dotenv").config();
const jwt = require("json-web-token");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

module.exports.register_post = async (req, res) => {
    const { email, password } = req.body;

    //bcrypt hashed
    let salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    let hashedPassword = await bcrypt.hash(password, salt);

    try {
        let user = await Users.create({email, password: hashedPassword});
        res.json({
            error: null,
            data: {
                id: user._id,
                email: user.email
            }
        })
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
        let isPassword = await bcrypt.compare(password, user.password);
        if(isPassword){
            res.json({
                error: null,
                data: "login success"
            })
        }else{
            res.json({
                error: "Incorrect Password!",
                data: null
            })
        }
    } catch (error) {
        res.json({
            error: "Email not registered!",
            data: null
        })
    }
}