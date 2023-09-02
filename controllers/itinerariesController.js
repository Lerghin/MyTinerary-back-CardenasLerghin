
import Itinerary from "../Models/Itinerary.js";


const itinerariesController ={ 
    getAllItineraries: async(req, res, next) => {
        try {
            const itinerary = await Itinerary.find()
            res.status(201).json({
              response: itinerary
             })
          } catch (error) {
              res.status(500).json({error})
          }
    },
    getOneItinerary: async(req, res, next) => {
        console.log(req.params);
        const { id } = req.params;
        console.log(id);
        let itineraries;
        let error = null;
        let success = true;
        try {
            itineraries = await Itinerary.findById({_id:id});
        } catch (err) {
            console.log(err);
            success = false;
            error = err;
        }
       
        res.json({
            response: itineraries,
            success,
            error
        });
    },
    getItineraryByCity: async (req, res, next) => {
        const { name } = req.params;
      
        let itineraries;
        let error = null;
        let success = true;
        try {
        
          const cityName = name.trim().toLowerCase();
     
          const regex = new RegExp(`^${cityName}`, 'i');
          itineraries = await Itinerary.find({ name: regex });
        } catch (err) {
          console.log(err);
          success = false;
          error = err;
        }
      
        res.json({
          response: itineraries,
          success,
          error
        });
      },



    createOneItinerary: async (req, res, next) => {

        try {

           
          const itinerary = await Itinerary.create(req.body)
          res.status(201).json({
           response: itinerary
          })
        } catch (error) {
            res.status(500).json({error})
        }
    },

    updateOneItinerary: async (req, res, next) => { 
        const {id}= req.params
        let itinerary;
     
        let success = true;
       
        try {
            itinerary = await Itinerary.findOneAndUpdate({_id:id},req.body, { new: true });
          
              res.json({
                response: itinerary,
                success
              });
            } catch (err) {
              console.log(err);
              success = false;
              error = err;
              next(err);
            }
          },
       
     
       
    
    deleteOneItinerary: async (req, res, next) => {
        const {id}= req.params
        let itinerary;
     
        let success = true;
       
        try {
            itinerary = await Itinerary.findOneAndDelete({_id:id});
          
              res.json({
                response: itinerary,
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


export default itinerariesController
