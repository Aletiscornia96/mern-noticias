import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';



export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, 'Todos los campos son requeridos'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password : hashedPassword
    });

    try{
        await newUser.save();
        res.json( 'Registro exitoso' );
    }catch(err){
        next(err);
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'Todos los campos son requeridos'));
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser){
           return next(errorHandler(404, 'Usuario no encontrado'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
           return next(errorHandler(400, 'Contrasena invalida'));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_toklen', token, {httpOnly: true}).json(rest);
    } catch (error) {
        next(error)
    }
}