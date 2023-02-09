import mongoose, { Schema } from "mongoose";

const Notes = new Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   tag: {
      type: String,
      default: "General"
   },
   date: {
      type: Date,
      default: Date.now
   },
   name: {
      type: String,
      required: true
   },
})

export default mongoose.model('Notes', Notes)