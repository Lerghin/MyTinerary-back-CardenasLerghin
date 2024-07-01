import { Router } from "express";
import postulacionController from "./../controllers/postulacionController.js";

const postulacionRouters = Router();

const { getAllPostulaciones, getOnePostulacion, createOnePostulacion, updateOnePostulacion, deleteOnePostulacion, getPostulacionByUserId} = postulacionController;

postulacionRouters.get('/',postulacionController.getAllPostulaciones);
postulacionRouters.get('/usuario/:userId', postulacionController.getPostulacionByUserId );
postulacionRouters.post('/', postulacionController.createOnePostulacion);
postulacionRouters.get('/:id',postulacionController.getOnePostulacion);
postulacionRouters.put('/:id', postulacionController.updateOnePostulacion);
postulacionRouters.delete('/:id', postulacionController.deleteOnePostulacion);

export default postulacionRouters;
