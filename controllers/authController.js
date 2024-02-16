import User from '../Models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authController={

    signUp: async (req, res, next) => {
        try {

            const passwordHash = bcrypt.hashSync(req.body.password, 10)
            console.log(passwordHash)

            let body = { ...req.body }
            body.password = passwordHash

            const newUser = await User.create(body)
            newUser.online=true

            /*  const esIgual = bcrypt.compareSync(req.body.password, passwordHash) */

            /*      console.log(esIgual); */
            const token = jwt.sign( { email : newUser.email, photo: newUser.photo }, process.env.SECRET_KEY, { expiresIn:'1h' } )
            return res.status(201).json({
                success: true,
                userData: newUser,
                token : token,
                status: 'online',
                message: 'Sign up successfully'
            })



        } catch (error) {
            console.log(error);
            next(error)
        }
    },
signIn : async (req, res, next) => {
    try {

        let { email:emailBody, password } = req.body

        const userInDB = await User.findOne( {email:emailBody} )

        if( !userInDB ){
            throw new Error( "No user exists with this email " )
        }

        let passwordValidated = bcrypt.compareSync( password, userInDB.password )

        if( !passwordValidated ){
            throw new Error( "The email/password is incorrect" )
        }

        let { _id,name, lastName, email, photo, birth_date } = userInDB
        const token = jwt.sign( { email, birth_date }, process.env.SECRET_KEY, { expiresIn:'2h' } )
        return res.status(200).json({
            success: true,
            userData: { _id,name, lastName, email, photo, birth_date },
            token: token,
            message: 'Sign in successfully'
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
},

loginWithToken : (req, res) => {
    const { email, photo, name} = req.user
    res.status(200).json({
        success: true,
        userData: { email, photo, name},
        message: 'Sign in successfully',
       
    })
},
logout: (req, res) => {
    

    return res.status(200).json({
      success: true,
      message: 'Logout successfully',
      status: 'offline' 
    });
  }





}

export default authController;