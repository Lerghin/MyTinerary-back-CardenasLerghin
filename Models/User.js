import { Schema, model } from "mongoose";

const userSchema = Schema({

    name:{ type: String},
    lastName:{ type: String},
   // dni:{type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    
    country:{ type: String},
    photo:{ type:String, default:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F96%2F344%2Fpng-clipart-user-profile-instagram-computer-icons-insta-head-silhouette.png&tbnid=_SwuLlc6rEQpfM&vet=12ahUKEwjt1MSYoJSBAxUvYzABHZIfCXEQMygAegQIARBS..i&imgrefurl=https%3A%2F%2Fwww.pngegg.com%2Fes%2Fpng-nsizj&docid=GfUmvCB48JnuqM&w=900&h=900&q=usuario%20blanco&hl=es-419&ved=2ahUKEwjt1MSYoJSBAxUvYzABHZIfCXEQMygAegQIARBS'},
    birth_date:{ type: Date},
    age:{ type: Number},
    phone:{ type: Number },
    verified:{ type: Boolean, default: false },

},
{

timestamps: true,

})

const User= model('user', userSchema)
export default User

