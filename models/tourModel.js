import mongoose from "mongoose"

const tourSchema = new mongoose.Schema({
  name: { type: String, required: false },
  duration: { type: Number, required: false },
  maxGroupSize: { type: Number, required: false },
  difficulty: { type: String, required: false },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  price: { type: Number, required: false },
  summary: { type: String, trim: true, required: false },
  description: { type: String, trim: false },
  imageCover: { type: String, required: false },
  images: [String],
  startDates: [String]
});

const TourModel = mongoose.model('Tour', tourSchema);

export default TourModel;