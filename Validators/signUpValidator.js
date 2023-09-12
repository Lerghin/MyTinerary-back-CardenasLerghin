import joi from "joi";
import joiPwd from "joi-password-complexity";
import { Schema } from "mongoose";

const complexityOptions = {
    min: 4,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
  };
  


export const signUpSchema=  joi.object({

    email:  joi.string().required().messages({
        "string.empty":"The email must not be empty,pay attention ",
        "any.required": "The email field is required, pay attention",
  

    }) , 
    password: joiPwd(complexityOptions) ,
    name:joi.string().min(3).max(20).required().messages({
        "string.min": "el minimo de caracteres son 3"
    }) ,
    lastName:joi.string().min(3).max(20).required().messages({
        "string.min": "el minimo de caracteres son 3"
    }) ,
    country:joi.string().min(3).max(20).required().messages({
        "string.min": "el minimo de caracteres son 3"
    }) ,
    photo: joi.string().uri(),
    birth_date: joi.date().max(Date.now()) ,
    age: joi.number().min(0).max(60) ,
    phone: joi.number(),
    verified: joi.boolean() ,
})

