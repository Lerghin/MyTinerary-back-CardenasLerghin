import { Schema, model } from "mongoose";

const direccionSchema = Schema({
    direccion: { type: String, required: true },
    municipio: { type: String, required: true },
    parroquia: { type: String, required: true },
    estado: { type: String, required: true }, 
    codigoPostal: { type: String, required: true },
   pais: { type: String, required: true },
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user', required:true
      }
},
{
    timestamps: true
});

const Direccion = model('direccion', direccionSchema);
export default Direccion;

