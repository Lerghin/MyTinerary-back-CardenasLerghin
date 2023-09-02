import {Router} from "express";

import personsController from "../controllers/personsController.js";

const personsRouters = Router()
const {getAllPersons, getOnePerson, createOnePerson, updateOnePerson, deleteOnePerson}= personsController


personsRouters.get('/', personsController.getAllPersons)
personsRouters.post('/',personsController.createOnePerson)
personsRouters.get('/:id', personsController.getOnePerson)
personsRouters.put('/:id', personsController.updateOnePerson)
personsRouters.delete('/:id',personsController.deleteOnePerson)

export default personsRouters