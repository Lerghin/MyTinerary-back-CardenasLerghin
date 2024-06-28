import {Router} from "express";

import ventasRouters from "./ventasRouters.js"
import authRouter from "./authRouter.js";
import productsRouters from "./productRouters.js";
import proveedoresRouters from "./proveedoresRouter.js";

const indexRouter = Router()


indexRouter.get('/', (request, response, next) => {

    response.send('Welcome to  mi server /api' );
  });



  indexRouter.use('/ventas', ventasRouters)
  indexRouter.use('/products', productsRouters)
  indexRouter.use('/auth', authRouter)
  indexRouter.use('/proveedores', proveedoresRouters)



  export default indexRouter