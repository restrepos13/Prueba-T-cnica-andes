import jwt from "jsonwebtoken";
import { response } from "../helpers/response";
import { userModel } from "../models/userModel";

export const authUser = async (req,res, next) =>{
    let token = null;

    if(req.headers.authorization && req.headers.authorization.starsWith("Bearer")){
        token = req.headers.authorization.split("")[1];

        try {const payload = jwt.verify(token, "12345");

            const user = await userModel.findById({ _id: payload.user });
            if (!user) {
            return response(res, 401, false, "", "no está autorizado");
            }
    
            req.userId = payload.user;
            next();
            
        } catch (err) {
            return response(res, 401, false, "", "no está autorizado");
        }
    }
    if (!token) {
        return response(res, 401, false, "", "no está autorizado");
    }
};