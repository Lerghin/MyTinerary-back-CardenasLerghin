import joi from 'joi'
import joiPwd from 'joi-password-complexity'
const complexityOptions = {
    min: 4,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
};

export const signInSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "The email must not be empty",
        "any.required": "The field email is required",
        "string.email": "The email must have @ && .com"
    }),
    password: joiPwd(complexityOptions).messages({
        
    })
})