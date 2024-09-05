import { encryptPassword } from "../helpers/encriptpassword.js";
import { generateToken } from "../helpers/generateToken.js";
import { response } from "../helpers/response.js";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

const userCtrl ={}

userCtrl.registrer = async(req,res)=>{
    try {
        const {username,password,email,name} = req.body;
        const user = await userModel.findOne({email})
        if(user){
            return response (res,400,false,"","el correo ya existe en otro registro, intenta cambiarlo")
        };
        const passwordencript = encryptPassword(password);

        const newUser = new userModel({username,password:passwordencript,email,name});
        await newUser.save();
        const token = generateToken({user:newUser._id})

        return response(res,200,true,{...newUser._doc,password:null,token},"usuario creado")
    } catch (error) {
        return response(res,500,false,"",error.message)
    }
};

userCtrl.login = async(req,res)=>{
    try {
        const {email,password} =req.body;
        const loggin = await userModel.findOne({email:email});
        if(loggin && bcrypt.compareSync(password,loggin.password)){
            const token = generateToken({loggin:loggin._id});
            return response(res,200,true,{...loggin.toJSON(),password:null,token},"bienvenido")
        };
        return response(res,400,false,"","email o password incorrectos")
    } catch (error) {
        return response(res,500,false,"",error.message)
    }
};



// userCtrl.getUser = async (req, res) => {
//     try {
//         const { email} = req.params;
//         if (!email) {
//             return response(res, 400, false, "", "no se encontró el usuario");
//         }
//         return response(res, 200, true, user, "Lista de usuarios con el nombre completo y su correo");
//     } catch (error) {
//         return response(res, 500, false, "", error.message);
//     }
// };

userCtrl.getUser = async(req,res)=>{
    try {
        const user = await userModel.find({}).select(`name email`)
        return response(res,200,true,user,"lista de usuarios por correo y nombre")
    } catch (error) {
        return response(res, 500, false, "", error.message);
    }
}

userCtrl.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return response(res, 200, true, users, "Lista de todos los usuarios");
    } catch (error) {
        return response(res, 500, false, "", error.message);
    }
};

userCtrl.updateUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const updateUser = await userModel.findById({_id:id});
        if(!updateUser){
            return response(res,400,false,"","usuario no encontrado")
        }
        await updateUser.updateOne(req.body);
        return response(res,200,true,"","usuario actualizado con exito")
    } catch (error) {
        return response(res,500,false,"",error.message)
    }
};

userCtrl.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById({ _id:id });
        if (!user) {
            return response(res,400,false,"","usuario no encontrado")
        }
        await user.deleteOne();
        return response(res,200,true,"","usuario actualizado con exito")
    } catch (error) {
        return response(res,500,false,"",error.message)
    }
};

export default userCtrl;
