import { Schema, model } from "mongoose";
const productSchema = Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number , required: true }, 
    stock: { type: Number, required: true },
    thumbnail:{ type: String, required: true },
    category:{ type: String, required: true },
},
{
    timestamps: true
});

const Product = model('product', productSchema);
export default Product;