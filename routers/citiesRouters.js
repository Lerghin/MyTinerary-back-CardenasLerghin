import {Router} from "express";

import citiesController from "../controllers/citiesController.js";

const citiesRouters = Router()
const {getAllCities, getOneCity, createOneCity, updateOneCity, deleteOneCity}=citiesController


citiesRouters.get('/',citiesController.getAllCities)
citiesRouters.post('/',citiesController.createOneCity)
citiesRouters.get('/:id',citiesController.getOneCity)
citiesRouters.put('/:id',citiesController.updateOneCity)
citiesRouters.delete('/:id',citiesController.deleteOneCity)

export default citiesRouters