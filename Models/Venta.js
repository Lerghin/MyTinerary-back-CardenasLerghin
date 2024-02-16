import { Schema, model } from "mongoose";

const ventaSchema = Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true }, 
    cedula: { type: Number, required: true },
    referenciaPago:{ type: String, required: true },
    fechaPago: { type: Date, required: true }, 
    metodoPago: { type: String, required: true },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user', required:true
      },
   
},
{
    timestamps: true
});

const Venta = model('venta', ventaSchema);
export default Venta;

