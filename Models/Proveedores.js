import  {Schema, model} from "mongoose";


const proveSchema= Schema({

          
          name: {type: String, required:true},
          lastName: {type: String, required:true},
          company: {type: String, required:true},
          address: {type: String, required:true},
          phone: {type: String, required:true},
          productos: {type: String, required:true},
          
},{

    timestamps: true
 

})
const Proveedores = model ('proveedores', proveSchema)

export default Proveedores