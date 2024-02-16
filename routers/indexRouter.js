import {Router} from "express";
import citiesRouters from "./citiesRouters.js";
import itinerariesRouters from "./itinerariesRouters.js"
import ventasRouters from "./ventasRouters.js"
import authRouter from "./authRouter.js";
const indexRouter = Router()


indexRouter.get('/', (request, response, next) => {

    response.send('Welcome to  mi server /api' );
  });

  indexRouter.use('/cities', citiesRouters)
  indexRouter.use('/itineraries', itinerariesRouters)
  indexRouter.use('/ventas', ventasRouters)
  indexRouter.use('/auth', authRouter)



  export default indexRouter