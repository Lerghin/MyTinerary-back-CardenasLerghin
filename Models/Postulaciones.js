import { Schema, model } from "mongoose";

const postulacionSchema = Schema({
    nombre: { type: String, required: true },
   apellido: { type: String, required: true },
   cedula: { type: String, required: true },
    cv: { type: String, required: true }, 
    profesion: { type: String, required: true },
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user', required:true
      }
},
{
    timestamps: true
});

const Postulacion = model('postulacion', postulacionSchema);
export default Postulacion;

