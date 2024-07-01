import Direccion from "../Models/Direcciones.js";


const direccionController = {
  getAllDireccion: async(req, res, next) => {
    try {
      const direcciones = await Direccion.find();
      res.status(201).json({
        response: direcciones
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getOneDireccion:  async(req, res, next) => {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    let direccion;
    let error = null;
    let success = true;
    try {
       direccion = await Direccion.findById({_id:id});
    } catch (err) {
        console.log(err);
        success = false;
        error = err;
    }
   
    res.json({
        response: direccion,
        success,
        error
    });
},

  createOneDireccion: async (req, res, next) => {
    try {
      const direccion = await Direccion.create(req.body);
      console.log(req.body),
      res.status(201).json({
       
        response: direccion
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  updateOneDireccion: async (req, res, next) => {
    const { id } = req.params;
    let direccion;
    let success = true;

    try {
     direccion = await Direccion.findOneAndUpdate({ _id: id }, req.body, { new: true });

      res.json({
        response: direccion,
        success
      });
    } catch (err) {
      console.log(err);
      success = false;
      next(err);
    }
  },

  deleteOneDireccion: async (req, res, next) => {
    const { id } = req.params;
    let direccion;
    let success = true;

    try {
      direccion = await Direccion.findOneAndDelete({ _id: id });

      res.json({
        response: direccion,
        success
      });
    } catch (err) {
      console.log(err);
      success = false;
      next(err);
    }
  },

getDireccionByUserId: async (req, res) => {
    const userId = req.params.userId; 
    console.log("eeste es el usuario", userId)
  
    try {
      // Buscar todas las ventas del usuario por userId
      const direcciones = await Direccion.find({userId}).populate("userId");
      console.log(direcciones)
      if (direcciones.length === 0) {
        return res.json({ message: 'No se encontraron direcciones para este usuario' });
      }
  
      // Respuesta con las ventas encontradas
      return res.status(200).json({ response: direcciones });
    } catch (error) {
      // Manejo de errores
      console.error('Error al buscar direcciones por userId:', error);
      return res.status(500).json({ message: 'Error al buscar direcciones', error });
    }
  },
}
export default direccionController;