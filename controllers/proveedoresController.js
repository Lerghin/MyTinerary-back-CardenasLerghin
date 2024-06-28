import Proveedores from "../Models/Proveedores.js";

const proveedoresController = {
  getAllProveedores: async(req, res, next) => {
    try {
      const proveedores = await Proveedores.find();
      res.status(201).json({
        response: proveedores
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getOneProveedores:  async(req, res, next) => {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    let proveedores;
    let error = null;
    let success = true;
    try {
        proveedores= await Proveedores.findById({_id:id});
    } catch (err) {
        console.log(err);
        success = false;
        error = err;
    }
   
    res.json({
        response: proveedores,
        success,
        error
    });
},

  createOneProveedores: async (req, res, next) => {
    try {
      const proveedor = await Proveedores.create(req.body);
      res.status(201).json({
        response: proveedor
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  updateOneProveedores: async (req, res, next) => {
    const { id } = req.params;
    let proveedor;
    let success = true;

    try {
      proveedor = await Proveedores.findOneAndUpdate({ _id: id }, req.body, { new: true });

      res.json({
        response: proveedor,
        success
      });
    } catch (err) {
      console.log(err);
      success = false;
      next(err);
    }
  },

  deleteOneProveedores: async (req, res, next) => {
    const { id } = req.params;
    let proveedor;
    let success = true;

    try {
      proveedor = await Proveedores.findOneAndDelete({ _id: id });

      res.json({
        response: proveedor,
        success
      });
    } catch (err) {
      console.log(err);
      success = false;
      next(err);
    }
  },
};

export default proveedoresController;