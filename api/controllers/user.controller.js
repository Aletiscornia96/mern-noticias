import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'No tienen permisos para editar este usuario'));
    }
    if(req.body.password){
        if(req.body.password < 6){
            return next(errorHandler(400, 'La contraseña debe tener al menos 6 caracteres'));
        }
        req.body.password = bcrypjs.hashSync(req.body.password, 10);
    }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(400, 'El nombre de usuario debe contener entre 7 y 20 caracteres'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'El nombre de usuario no puede contener espacios'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'El nombre de usuario no debe contener mayusculas'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'El nombre de usuario debe contener solo letras o numeros'));
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            }, { new: true });
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error)
        }
    }

};

export const deleteUser = async (req, res, next) => {
    if(req.user.id === req.params.userId){
        return next(errorHandler(403, 'No tienes permisos para elimidar esta cuenta'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId),
        res.status(200).json('Cuenta eliminada con exito!'); 
    } catch (error) {
        next(error);
        
    }
};

export const signOut = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('Sesion cerrada')
    } catch (error) {
        next(error);
    }
};