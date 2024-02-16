import User from "../Models/User.js"



export const dniExists = async (req, res, next) => {

    const existe = await User.findOne({ dni: req.body.dni })
    if (!existe) {
        return next()
    }

    return res.status(400).json({
        success: false,
        message: 'Cedula ya existe',
        alert: "Cedula existe",
    })
}