import 'dotenv/config.js'
import express from "express";
import indexRouter from "./routers/indexRouter.js";
import cors from "cors";
import './config/database.js'
import errorHandler from './Middleware/errorHandlers.js';
import notFoundHandler from './Middleware/notFoundHandler.js';

const server = express();

server.use(express.json())

// Configurar CORS con opciones específicas para producción
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Ajusta esto a tu dominio en producción
  optionsSuccessStatus: 200
};
server.use(cors(corsOptions));

// Middleware de logging para peticiones a la API
server.use('/api', (req, res, next) => {
  console.log("Hiciste una petición a mi back", req.url, "a la hora", new Date().toLocaleString());
  next();
});

// Rutas de la API
server.use('/api', indexRouter);

// Ruta raíz para verificar que el servidor esté corriendo
server.get('/', (request, response) => {
  response.send('Bienvenido a mi Servidor /');
});

// Manejo de errores y rutas no encontradas
server.use(errorHandler);
server.use(notFoundHandler);

// Puerto dinámico para producción y fijo para desarrollo local
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
