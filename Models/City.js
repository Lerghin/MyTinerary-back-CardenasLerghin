import  {Schema, model} from "mongoose";


const citySchema= Schema({

          
          name: {type: String, required:true},
          image: {type: String, required:true} ,
          population: {type: String, required:true},
          currency: {type: String, required:true},
          slogan: {type: String, required:true},
          touristSites: {type: String, required:true},
          socialStruggles: {type: String, required:true},
          povertyLevel: {type: String, required:true},
          itinerary: {
            type: Schema.Types.ObjectId,
            ref: 'Itinerary', required:true
          },
},{

    timestamps: true
 

})
const City = model ('cities', citySchema)

export default City