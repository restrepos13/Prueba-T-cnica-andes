import mongoose from "mongoose";
import bcrypt from "bcrypt";

const {Schema, model} = mongoose;

const userSchema = new Schema(
    {
        username: {type: String,require:true, unique:true},
        email:{type:String,require:true,unique:true},
        password:{type:String,require:true},
        name:{type:String,require:true}
    },
{
    timestamps:true
});

userSchema.methods.matchpassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export const userModel = model("user", userSchema);
