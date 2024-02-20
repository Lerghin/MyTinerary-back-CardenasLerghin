//import PDFDocument from 'pdfkit';

import PDFDocument from "pdfkit-table";
import User from "../Models/User.js"; // Importa el modelo de usuario (ajusta la ruta según sea necesario)
import { readFileSync } from "fs";

const generarPDFVenta = async (datosVenta) => {
  const {
    nombre,
    apellido,
    telefono,
    cedula,
    montoDepositado,
    referenciaPago,
    fechaPago,
    metodoPago,
    userId,
    cartData,
  } = datosVenta;

  // Crear un nuevo documento PDF
  const doc = new PDFDocument({ margin: 50 });

  // **Agregar logo de la empresa**
  const logo = await readFileSync("./assets/logo.jpeg"); // Ajusta la ruta a tu imagen
  doc.image(logo, { width: 100, align: "center", borderRadius: 10 });

  // Configurar el documento PDF
  doc.fontSize(12);
  doc.lineJoin("round");

  // **Encabezado con nombre de la empresa**
  doc
    .text("Barba Negra Restaurant", { align: "center", size: 16, bold: true })
    .moveDown();

  // **Título del documento**
  doc.text("Detalles de la Compra", { align: "center" }).moveDown();

  // Tabla para los detalles del carrito de compra
  const cartRows = [["Nombre", "Cantidad", "Precio $", " Subtotal $"]];
  let total = 0;
  cartData.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    cartRows.push([item.name, item.quantity, item.price, subtotal ]);
   
  });

  doc.table({
    headers: cartRows.shift(),
    rows: cartRows,
    width: 400,
    align: ["left", "left", "right", "right"],
    drawHorizontalLine: (rowIndex, rowCount) =>
      rowIndex === 0 || rowIndex === rowCount,
  });

  // Agregar el total al final del documento
  doc.moveDown().text(`Total de la compra: $${total.toFixed(2)}`, {
    align: "center",
  });

  // Crear una tabla para los detalles de la venta
  doc.table({
    headers: ["Datos de Compra", " "],
    rows: [
      ["Nombre", nombre],
      ["Apellido", apellido],
      ["Teléfono", telefono],
      ["Cédula", cedula],
      ["Monto Depositado", montoDepositado],
      ["Referencia de Pago", referenciaPago],
      ["Fecha de Pago", fechaPago],
      ["Método de Pago", metodoPago],
    ],
    width: 400,
    align: ["left", "left"],
    drawHorizontalLine: (rowIndex, rowCount) =>
      rowIndex === 0 || rowIndex === rowCount,
  });

  // **Información del usuario**
  try {
    const userData = await User.findById(userId);
    if (userData) {
      doc
        .moveDown()
        .text("Información del Usuario Registrado", { align: "center" })
        .moveDown();

      doc.table({
        headers: ["Campo", "Valor"],
        rows: [
          ["Nombre", userData.name],
          ["Apellido", userData.lastName],
          ["Documento", userData.dni],
          ["Email", userData.email],
          ["Teléfono", userData.phone],
        ],
        width: 400,
        align: ["left", "left"],
        drawHorizontalLine: (rowIndex, rowCount) =>
          rowIndex === 0 || rowIndex === rowCount,
      });
    } else {
      doc.moveDown().text("No se encontró información del usuario.");
    }
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);
    doc.moveDown().text("Error al obtener información del usuario.");
  }

  // Finalizar el documento y devolverlo como un buffer
  return doc;
};

export default generarPDFVenta;
