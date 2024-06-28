import { Router } from "express";
import ventasController from "./../controllers/ventasController.js";

const ventasRouters = Router();

const { getAllVentas, getOneVenta, createOneVenta, updateOneVenta, deleteOneVenta, getVentasByUserId } = ventasController;

ventasRouters.get('/', ventasController.getAllVentas);
ventasRouters.get('/usuario/:userId', ventasController.getVentasByUserId );
ventasRouters.post('/', ventasController.createOneVenta);
ventasRouters.get('/:id',ventasController.getOneVenta);
ventasRouters.put('/:id', ventasController.updateOneVenta);
ventasRouters.delete('/:id', ventasController.deleteOneVenta);

export default ventasRouters;
