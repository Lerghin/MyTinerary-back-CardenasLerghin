import PDFDocument from "pdfkit-table";
import User from "../Models/User.js"; // Ajusta la ruta según sea necesario
import { readFileSync } from "fs";
import axios from "axios";

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
    montoEnBs,
    comprobante, // URL del comprobante de pago
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
      ["Total a Pagar (USD)", `$${total}`],
      ["Monto Depositado (USD)", `$${montoDepositado}`],
      ["Monto en Bs", `${montoEnBs} Bs`], // Mostrar el monto en Bs
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

  // Calcular el total de los productos en USD
  const totalProductosUSD = productos.reduce((sum, product) => sum + product.precio * product.cantidad, 0);

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
      // Agregar una fila para el total a pagar en USD
      ["", "", "Total a Pagar en USD:", `$${totalProductosUSD}`],
      // Agregar una fila para el total a pagar en Bs
      ["", "", "Total a Pagar en Bs:", `${montoEnBs} Bs`]
    ],
  };

  doc.table(productTable, { width: 400 });

  // **Información del usuario**
  try {
    const userData = await User.findById(userId);
    if (userData) {
      doc
        .moveDown()
        .text("Información del Usuario Registrado", { align: "center" })
        .moveDown();

      doc.table({
        headers: ["Datos del Usuario", ""],
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

  // **Agregar comprobante de pago**
  if (comprobante) {
    try {
      const response = await axios.get(comprobante, { responseType: 'arraybuffer' });
      const imgBuffer = Buffer.from(response.data, 'binary');

      // Obtener el tamaño de la imagen original
      const image = doc.openImage(imgBuffer);
      const imageWidth = image.width;
      const imageHeight = image.height;

      // Calcular el nuevo tamaño manteniendo la proporción
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

      let newWidth = imageWidth;
      let newHeight = imageHeight;

      if (imageWidth > pageWidth) {
        newWidth = pageWidth;
        newHeight = (pageWidth / imageWidth) * imageHeight;
      }

      if (newHeight > pageHeight) {
        newHeight = pageHeight;
        newWidth = (pageHeight / imageHeight) * imageWidth;
      }

      // Agregar la imagen al final de la página
      doc.addPage(); // Añadir una nueva página para la imagen
      doc.moveDown().text("Comprobante de Pago", { align: "center" }).moveDown();
      doc.image(imgBuffer, { fit: [newWidth, newHeight], align: "center" });
      
    } catch (error) {
      console.error("Error al descargar la imagen del comprobante:", error);
      doc.moveDown().text("No se pudo cargar la imagen del comprobante.");
    }
  }

  // Finalizar el documento y devolverlo como un buffer
  return doc;
};

export default generarPDFVenta;
