import { Schema, model } from "mongoose";

const itinerarySchema = new Schema({
  name: { type: String, required: true },
  price1: { type: Number, required: true },
  price2: { type: Number, required: true },
  price3: { type: Number, required: true },
  price4: { type: Number, required: true },
  price5: { type: Number, required: true },
  duration:{ type: Number, required: true },
  likes: { type: Number, default: 0 },
  description: { type: String, required: true },
  comments: { type: String },
  hashtags: [String],
  personName: {type:String, required:true},
  personImage: {type:String, required:true}

}, { timestamps: true });

const Itinerary = model('Itinerary', itinerarySchema);

export default Itinerary;