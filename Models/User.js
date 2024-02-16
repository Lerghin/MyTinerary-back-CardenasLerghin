import { Schema, model } from "mongoose";

const userSchema = Schema({

    name:{ type: String, required: true},
    lastName:{ type: String, required: true},
    dni:{type: Number, required: true,unique: true},
    email: { type: String, required: true,unique: true},
    password: { type: String, required: true},
    country:{ type: String, required: true},
    photo:{ type:String, default:'https://i.postimg.cc/G2Jy4YNm/smile.png'},
    phone:{ type: Number, required: true },
    verified:{ type: Boolean, default: false },

},
{

timestamps: true,

})

const User= model('user', userSchema)
export default User

