import Venta from "../Models/Venta.js";
import User from "../Models/User.js";
import generarPDFVenta from "../Services/pdfService.js";
import PDFDocument from 'pdfkit';

const ventasController = {
  getAllVentas: async (req, res, next) => {
    let ventas;
    let error = null;
    let success = true;
    try {
      ventas = await Venta.find().populate({
        path: "userId",
        select: "user name user lastName user email",
      });
      res.json({
        response: ventas,
        success,
        error,
      });
    } catch (err) {
      console.log(err);
      success = false;
      error = err;
      next(err);
    }
  },

  getOneVenta: async (req, res, next) => {
    console.log(req.params);
    const { id } = req.params;
    const { name } = req.body;
    console.log(id);
    let ventas;
    let error = null;
    let success = true;
    try {
      ventas = await Venta.findById({ _id: id });
    } catch (err) {
      console.log(err);
      success = false;
      error = err;
    }
    res.json({
      response: ventas,
      success,
      error,
    });
  },
  createOneVenta: async (req, res, next) => {
    console.log(req.body);
    try {
      const user = await User.findOne({ id: req.body.id });
      const query = { ...req.body };
      query.user = user._id;
      const venta = await Venta.create(query);
  
      // Generar y enviar el PDF
      const doc = await generarPDFVenta(req.body);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="venta.pdf"');
      doc.pipe(res); // Transmite el PDF directamente a la respuesta
      doc.end(); // Finaliza la transmisión
  
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
,

  updateOneVenta: async (req, res, next) => {
    const { id } = req.params;
    let venta;
    let success = true;
    try {
      venta = await Venta.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      res.json({
        response: venta,
        success,
      });
    } catch (err) {
      console.log(err);
      success = false;
      error = err;
      next(err);
    }
  },

  deleteOneVenta: async (req, res, next) => {
    const { id } = req.params;
    let venta;
    let success = true;

    try {
      venta = await Venta.findOneAndDelete({ _id: id });
      res.json({
        response: venta,
        success,
      });
    } catch (err) {
      console.log(err);
      success = false;
      error = err;
      next(err);
    }
  },
};

export default ventasController;
