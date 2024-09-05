import jwt from "jsonwebtoken";

export const generateToken = (payload)=>{
    try {
        const token = jwt.sign(payload,"abc123");
        return token
    } catch (error) {
        console.log("error en generar el token", error.message)
    }
};
export default generateToken;