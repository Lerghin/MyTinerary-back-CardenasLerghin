import Postulacion from "../Models/Postulaciones.js";



const postulacionController = {
  getAllPostulaciones: async(req, res, next) => {
    try {
      const postulaciones = await Postulacion.find();
      res.status(201).json({
        response: postulaciones
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getOnePostulacion:  async(req, res, next) => {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    let postulacion;
    let error = null;
    let success = true;
    try {
      postulacion = await Postulacion.findById({_id:id});
    } catch (err) {
        console.log(err);
        success = false;
        error = err;
    }
   
    res.json({
        response: postulacion,
        success,
        error
    });
},

  createOnePostulacion: async (req, res, next) => {
    try {
      const postulacion = await Postulacion.create(req.body);
      res.status(201).json({
        response: postulacion
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  updateOnePostulacion: async (req, res, next) => {
    const { id } = req.params;
    let postulacion;
    let success = true;

    try {
     postulacion = await Postulacion.findOneAndUpdate({ _id: id }, req.body, { new: true });

      res.json({
        response: postulacion,
        success
      });
    } catch (err) {
      console.log(err);
      success = false;
      next(err);
    }
  },

  deleteOnePostulacion: async (req, res, next) => {
    const { id } = req.params;
    let postulacion;
    let success = true;

    try {
      postulacion = await Postulacion.findOneAndDelete({ _id: id });

      res.json({
        response: postulacion,
        success
      });
    } catch (err) {
      console.log(err);
      success = false;
      next(err);
    }
  },

getPostulacionByUserId: async (req, res) => {
    const userId = req.params.userId; 
    console.log("eeste es el usuario", userId)
  
    try {
      // Buscar todas las ventas del usuario por userId
      const postulaciones = await Postulacion.find({userId}).populate("userId");
      console.log(postulaciones)
      if (postulaciones.length === 0) {
        return res.json({ message: 'No se encontraron postulacion para este usuario' });
      }
  
      // Respuesta con las ventas encontradas
      return res.status(200).json({ response: postulaciones });
    } catch (error) {
      // Manejo de errores
      console.error('Error al buscar  postulacion por userId:', error);
      return res.status(500).json({ message: 'Error al buscar postulacion', error });
    }
  },
}
export default postulacionController;