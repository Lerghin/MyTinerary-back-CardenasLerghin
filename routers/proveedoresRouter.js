import { Router } from "express";
import proveedoresController from "./../controllers/proveedoresController.js";

const proveedoresRouters = Router();

const {getAllProveedores,  getOneProveedores,  createOneProveedores, updateOneProveedores, deleteOneProveedores } = proveedoresController;

proveedoresRouters.get('/', proveedoresController.getAllProveedores);
proveedoresRouters.post('/',proveedoresController.createOneProveedores);
proveedoresRouters.get('/:id',proveedoresController.getOneProveedores);
proveedoresRouters.put('/:id',proveedoresController.updateOneProveedores);
proveedoresRouters.delete('/:id', proveedoresController.deleteOneProveedores);

export default proveedoresRouters;
