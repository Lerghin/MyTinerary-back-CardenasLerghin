import City from "../Models/City.js"
import Itinerary from "../Models/Itinerary.js";
import cities from "../util/cities.js"

const citiesController ={ 
    getAllCities: async(req, res, next) => {
        let cities;
        let error = null;
        let success = true;
        try {
            cities = await City.find().populate({
                path: 'itinerary',
                select : 'itinerary description',
               
            });
            res.json({
                response: cities,
                success,
                error
            });
        } catch (err) {
            console.log(err);
            success = false;
            error = err;
            next(err);
        }
    },
    getOneCity: async(req, res, next) => {
        console.log(req.params);
        const { id } = req.params;
        const { name } = req.body;
        console.log(id);
        let cities;
        let error = null;
        let success = true;
        try {
            cities = await City.findById({_id:id});
        } catch (err) {
            console.log(err);
            success = false;
            error = err;
        }
       
        res.json({
            response: cities,
            success,
            error
        });
    },
    createOneCity: async (req, res, next) => {
        console.log(req.body);
        let city;
        let error = null;
        let success = true;
        try {
            const itinerary=   await Itinerary.findOne({id : req.body.id})
            const query = {...req.body} 
            query.itinerary= itinerary._id

            city = await City.create(query);
            console.log(city);
        } catch (err) {
            console.log(err);
            success = false;
            error = err;
        }

        res.json({
           response: city,
           success,
           error
        });
    },

    updateOneCity: async (req, res, next) => { 
        const {id}= req.params
        let city;
     
        let success = true;
       
        try {
            
            city = await City.findOneAndUpdate({_id:id},req.body, { new: true });
          
              res.json({
                response: city,
                success
              });
            } catch (err) {
              console.log(err);
              success = false;
              error = err;
              next(err);
            }
          },
       
     
       
    
    deleteOneCity: async (req, res, next) => {
        const {id}= req.params
        let city;
     
        let success = true;
       
        try {
            city = await City.findOneAndDelete({_id:id});
          
              res.json({
                response: city,
                success
              });
            } catch (err) {
              console.log(err);
              success = false;
              error = err;
              next(err);
            }
        }
}


export default citiesController
