import Product from "../Models/Products.js";

const productsController = {
  getAllProducts: async(req, res, next) => {
    try {
      const products = await Product.find();
      res.status(201).json({
        response: products
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getOneProduct: async(productId) => {
    let product;
    try {
      // Aquí asumimos que `productId` es un ObjectId válido
      product = await Product.findById(productId);
    } catch (err) {
      console.log(err);
      throw new Error('Product not found or another error occurred');
    }
    return product;
  },

  createOneProduct: async (req, res, next) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({
        response: product
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  updateOneProduct: async (req, res, next) => {
    const { id } = req.params;
    let product;
    let success = true;

    try {
      product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });

      res.json({
        response: product,
        success
      });
    } catch (err) {
      console.log(err);
      success = false;
      next(err);
    }
  },

  deleteOneProduct: async (req, res, next) => {
    const { id } = req.params;
    let product;
    let success = true;

    try {
      product = await Product.findOneAndDelete({ _id: id });

      res.json({
        response: product,
        success
      });
    } catch (err) {
      console.log(err);
      success = false;
      next(err);
    }
  },
};

export default productsController;