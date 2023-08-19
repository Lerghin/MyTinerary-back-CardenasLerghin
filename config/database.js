import mongoose from "mongoose";
mongoose.connect("mongodb+srv://lerghin:Alicia.1410@cluster0.txzitjw.mongodb.net/")
.then(()=>{


console.log("database connected")

}).catch(()=>{

    console.log("Database Connection failed")
})
