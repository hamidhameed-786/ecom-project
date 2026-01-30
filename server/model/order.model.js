import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    customer: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      postalCode: Number,
    },

    product: [
      {
        id: Number,
        title: String,
        price: Number,
        quantity: Number,
        Image: String,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    payment: {
      type: String,
      default: "Cash on Delivery",
    },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("orderModel", orderSchema, "orders");
export default orderModel;
