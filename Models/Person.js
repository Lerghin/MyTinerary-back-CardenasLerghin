import  {Schema, model} from "mongoose";


const personSchema= Schema({

          
          name: {type: String, required:true},
          image: {type: String, required:true} ,
        
},{

    timestamps: true
 

})
const Person = model ('Person', personSchema)

export default Person