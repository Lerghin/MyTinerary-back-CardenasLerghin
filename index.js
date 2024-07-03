
import 'dotenv/config.js';
import express from "express";
import indexRouter from "./routers/indexRouter.js";
import cors from "cors";
import './config/database.js';
import errorHandler from './Middleware/errorHandlers.js';
import notFoundHandler from './Middleware/notFoundHandler.js';

const server = express();

server.use(express.json());

// Configurar CORS con opciones específicas para producción
const corsOptions = {
     origin: process.env.CORS_ORIGIN || 'https://front-ecom-ebenezer-u788.vercel.app', 
   
  
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
const PORT = process.env.PORT || 5000; // Cambié el puerto a 5000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
/*

import 'dotenv/config.js'
import express from "express";
import indexRouter from "./routers/indexRouter.js";
import cors from "cors";
import './config/database.js'
import errorHandler from './Middleware/errorHandlers.js';
import notFoundHandler from './Middleware/notFoundHandler.js';

const server = express();
//var corsOptions={
 // origin: 'http://localhost:5173',
//}

server.use(express.json())
server.use(cors())
server.use ('/api', (req, res, next)=>{
console.log("hiciste una peticion a mi back", req.url,"a la hora", new Date().toLocaleString())
next()
},indexRouter, errorHandler)
server.get('/', (request, response, next) => {
  response.send('Bienvenido a mi Servidor /');
});

server.use(errorHandler)
server.use(notFoundHandler)

server.listen(4000, () => {
  console.log('Servidor corriendo en puerto 4000 ');
});

*/