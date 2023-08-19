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