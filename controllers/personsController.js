
import Person from "../Models/Person.js";

const personsController ={ 
    getAllPersons: async(req, res, next) => {
        try {
            const person = await Person.find()
            res.status(201).json({
              response: person
             })
          } catch (error) {
              res.status(500).json({error})
          }
    },
    getOnePerson: async(req, res, next) => {
       
    },
    createOnePerson: async (req, res, next) => {
        try {
          const person = await Person.create(req.body)
          res.status(201).json({
           response: person
          })
        } catch (error) {
            res.status(500).json({error})
        }
    },

    updateOnePerson: async (req, res, next) => { 
      
          },
       
     
       
    
    deleteOnePerson: async (req, res, next) => {
    
        
    },
}


export default personsController
