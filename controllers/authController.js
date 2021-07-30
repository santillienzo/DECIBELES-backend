const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


//signup
exports.signup = (req, res)=>{
    console.log('req.body: ', req.body);
    const user = new User(req.body);
    user.save((error, user)=>{
        if(error){
            return res.status(400).json({
                error: "Por favor revisa los campos, debe haber algún error..."
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({user})
    })
}

//login
exports.signin = (req, res) =>{
    const {email, password} = req.body;
    console.log(req.body)
    User.findOne({email}, (error, user)=>{
        if(error ||!user){
            return res.status(400).json({
                error: "No existe un usuario con ese email. Por favor registrate o ingresa uno nuevo"
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "El email y la contraseña no coinciden"
            })
        }

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
        res.cookie('t', token, {expire: new Date() + 9999});

        const {_id, name, lastname,email, role, shoopingCart, purchases} = user;
        return res.json({
            token,
            user: {
                _id, email, name, lastname, role
            }
        })
    })
}


exports.signout = (req, res) =>{
    res.clearCookies('t');
    res.json({
        message: "Se ha cerrado correctamente la sesión"
    })
}


exports.userById = (req,res,next,id)=>{
    User.findById(id).exec((err, user)=>{
        if(err||!user){
            return res.status(400).json({
                error: "El usuario no existe"
            })
        }

        req.profile = user;
        next()
    })
}