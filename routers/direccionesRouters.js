import { Router } from "express";
import direccionController from "./../controllers/direccionController.js";

const direccionRouters = Router();

const { getAllDireccion, getOneDireccion, createOneDireccion, updateOneDireccion, deleteOneDireccion, getDireccionByUserId} = direccionController;

direccionRouters.get('/', direccionController.getAllDireccion);
direccionRouters.get('/usuario/:userId', direccionController.getDireccionByUserId );
direccionRouters.post('/', direccionController.createOneDireccion);
direccionRouters.get('/:id',direccionController.getOneDireccion);
direccionRouters.put('/:id', direccionController.updateOneDireccion);
direccionRouters.delete('/:id', direccionController.deleteOneDireccion);

export default direccionRouters;
