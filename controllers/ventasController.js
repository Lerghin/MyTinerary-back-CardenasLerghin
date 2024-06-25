import mongoose from 'mongoose';  // Importa mongoose para usar sesiones y transacciones
import Venta from "../Models/Venta.js"; // Importa el modelo Venta
import User from "../Models/User.js";   // Importa el modelo User
import Product from "../Models/Products.js"; // Importa el modelo Product
import generarPDFVenta from "../Services/pdfService.js"; // Importa la función para generar PDF
import PDFDocument from 'pdfkit'; // Importa pdfkit (aunque esto probablemente no sea necesario aquí)
import productsController from './productsController.js';

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
    const session = await mongoose.startSession(); // Iniciamos una sesión de transacción
    session.startTransaction(); // Comenzamos la transacción

    try {
      console.log('Solicitud de creación de venta:', req.body);
      
      // Verificamos si userId es un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
        throw new Error("User ID is not valid");
      }

      // Buscamos el usuario por su `userId`
      const user = await User.findById(req.body.userId).session(session);
      if (!user) {
        throw new Error("User not found");
      }

      // Creamos la venta y preparamos la estructura para guardar en la base de datos
      const query = { ...req.body, user: user._id };

      // Validamos el stock antes de crear la venta
      const productUpdates = [];
      for (const product of req.body.productos) {
        // Accedemos directamente al modelo `Product` para usar la sesión de transacción
        const dbProduct = await Product.findById(product._id).session(session);
        if (!dbProduct) {
          throw new Error(`Product not found: ${product.nombre}`);
        }

        if (dbProduct.stock < product.cantidad) {
          throw new Error(`Insufficient stock for product: ${dbProduct.name}`);
        }

        // Preparamos la actualización del stock
        productUpdates.push({
          updateOne: {
            filter: { _id: dbProduct._id },
            update: { $inc: { stock: -product.cantidad } }, // Reducimos el stock por la cantidad comprada
          },
        });
      }

      // Crear la venta
      const venta = await Venta.create([query], { session });

      // Actualizar el stock de los productos
      await Product.bulkWrite(productUpdates, { session });

      // Generar y enviar el PDF
      const doc = await generarPDFVenta(req.body);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="venta.pdf"'
      );
      doc.pipe(res); // Transmite el PDF directamente a la respuesta
      doc.end(); // Finaliza la transmisión

      await session.commitTransaction(); // Confirmamos la transacción
      session.endSession(); // Cerramos la sesión de la transacción

    } catch (err) {
      await session.abortTransaction(); // Revertimos la transacción en caso de error
      session.endSession(); // Cerramos la sesión de la transacción
      console.error(err);
      next(err);
    }
  },
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
