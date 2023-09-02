import {Router} from "express";

import itinerariesController from "../controllers/itinerariesController.js";

const itinerariesRouters = Router()
const {getAllItineraries, getOneItinerary, createOneItinerary, updateOneItinerary, deleteOneItinerary, getItineraryByCity}= itinerariesController


itinerariesRouters.get('/', itinerariesController.getAllItineraries)
itinerariesRouters.get('/:id', itinerariesController.getOneItinerary)
itinerariesRouters.get('/city/:name', itinerariesController.getItineraryByCity)
itinerariesRouters.post('/',itinerariesController.createOneItinerary)
itinerariesRouters.put('/:id', itinerariesController.updateOneItinerary)
itinerariesRouters.delete('/:id',itinerariesController.deleteOneItinerary)

export default itinerariesRouters