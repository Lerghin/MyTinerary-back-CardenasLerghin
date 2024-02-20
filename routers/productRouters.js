import { Router } from "express";
import productsController from "./../controllers/productsController.js";

const productsRouters = Router();

const { getAllProducts, getOneProduct, createOneProduct, updateOneProduct, deleteOneProduct } = productsController;

productsRouters.get('/', productsController.getAllProducts);
productsRouters.post('/', productsController.createOneProduct);
productsRouters.get('/:id',productsController.getOneProduct);
productsRouters.put('/:id', productsController.updateOneProduct);
productsRouters.delete('/:id', productsController.deleteOneProduct);

export default productsRouters;
