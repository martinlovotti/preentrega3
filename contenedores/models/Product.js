import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  code: {type: String, required: true},
  thumbnail: {type: String, required: true},
  price: {type: Number, required: true, default: 0},
  timestamp: {type: String, required: true},
  stock: {type: Number, required: true, default: 0}
});

export const Product = mongoose.model('products', productSchema);