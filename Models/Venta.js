import { Schema, model } from "mongoose";

const ventaSchema = Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true }, 
    cedula: { type: Number, required: true },
    montoDepositado: { type: Number, required: true },
    montoEnBs: { type: Number, required: true },
    comprobante:{ type:String, default:'No hay Foto'},
    referenciaPago:{ type: String, required: true, unique: true},
    fechaPago: { type: Date, required: true }, 
    metodoPago: { type: String, required: true },
    productos: [ {
     _id:{type: Schema.Types.ObjectId,
      ref: 'product', required:true},
      cantidad:{ type: Number, required: true},
      precio:{ type: Number, required: true},
      nombre:{ type: String, required: true},
    },
   
    ]
    ,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user', required:true
      }
},
{
    timestamps: true
});

const Venta = model('venta', ventaSchema);
export default Venta;

