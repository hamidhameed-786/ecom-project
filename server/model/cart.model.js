import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  Image: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartModel = mongoose.model("cartModel", cartSchema, "cart");
export default cartModel;
