import PDFDocument from "pdfkit-table";
import User from "../Models/User.js"; // Ajusta la ruta según sea necesario
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
    productos, 
    total,
  } = datosVenta;

  // Crear un nuevo documento PDF
  const doc = new PDFDocument({ margin: 50 });

  // **Agregar logo de la empresa**
  const logo = await readFileSync("./assets/logo.png"); // Ajusta la ruta a tu imagen
  doc.image(logo, { width: 100, align: "center" });

  // Configurar el documento PDF
  doc.fontSize(12);
  doc.lineJoin("round");

  // **Encabezado con nombre de la empresa**
  doc
    .text("Repuestos Ebenezer C.A.", { align: "center", size: 16, bold: true })
    .moveDown();

  // **Título del documento**
  doc.text("Detalles de la Compra", { align: "center" }).moveDown();

  // **Detalles de la compra**
  doc.table({
    headers: ["Datos de Compra", " "],
    rows: [
      ["Nombre", nombre],
      ["Apellido", apellido],
      ["Teléfono", telefono],
      ["Cédula", cedula],
      ["Total a Pagar", `$${total}`],
      ["Monto Depositado", `$${montoDepositado}`], // Mostrar monto en USD
      ["Referencia de Pago", referenciaPago],
      ["Fecha de Pago", fechaPago],
      ["Método de Pago", metodoPago],
    ],
    width: 400,
    align: ["left", "left"],
    drawHorizontalLine: (rowIndex, rowCount) =>
      rowIndex === 0 || rowIndex === rowCount,
  });

  // **Tabla de Productos Comprados**
  doc.moveDown().text("Productos Comprados", { align: "center" }).moveDown();

  // Calcular el total de los productos
  const totalProductos = productos.reduce((sum, product) => sum + product.precio * product.cantidad, 0);

  // Crear la tabla de productos
  const productTable = {
    headers: ["Producto", "Cantidad", "Precio Unitario (USD)", "Total (USD)"],
    rows: [
      ...productos.map(product => [
        product.nombre,
        product.cantidad,
        `$${product.precio}`,
        `$${product.precio * product.cantidad}`
      ]),
      // Agregar una fila para el total a pagar
      ["", "", "Total a Pagar:", `$${totalProductos}`]
    ],
  };

  doc.table(productTable, { width: 400 });

  // **Información del usuario**
  try {
    const userData = await User.findById(datosVenta.userId);
    if (userData) {
      doc
        .moveDown()
        .text("Información del Usuario Registrado", { align: "center" })
        .moveDown();

      doc.table({
        headers: ["Datos del Usuario ", ""],
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
