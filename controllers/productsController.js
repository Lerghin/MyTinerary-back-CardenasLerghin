import Product from "../Models/Products.js";

const productsController={

    getAllProducts: async(req, res, next) => {
        try {
            const products = await Product.find()
            res.status(201).json({
              response: products
             })
          } catch (error) {
              res.status(500).json({error})
          }
    },
    getOneProduct: async(req, res, next) => {
        console.log(req.params);
        const { id } = req.params;
        console.log(id);
        let products;
        let error = null;
        let success = true;
        try {
            products = await Product.findById({_id:id});
        } catch (err) {
            console.log(err);
            success = false;
            error = err;
        }
       
        res.json({
            response: products,
            success,
            error
        });
    },

    createOneProduct: async (req, res, next) => {

        try {

           
          const product = await Product.create(req.body)
          res.status(201).json({
           response: product
          })
        } catch (error) {
            res.status(500).json({error})
        }
    },
    updateOneProduct: async (req, res, next) => { 
        const {id}= req.params
        let product;
     
        let success = true;
       
        try {
            product = await Product.findOneAndUpdate({_id:id},req.body, { new: true });
          
              res.json({
                response: product,
                success
              });
            } catch (err) {
              console.log(err);
              success = false;
              error = err;
              next(err);
            }
          },
          deleteOneProduct: async (req, res, next) => {
            const {id}= req.params
            let product;
         
            let success = true;
           
            try {
                product = await Product.findOneAndDelete({_id:id});
              
                  res.json({
                    response: product,
                    success
                  });
                } catch (err) {
                  console.log(err);
                  success = false;
                  error = err;
                  next(err);
                }
            },

}

export default productsController