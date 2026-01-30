import cartModel from "../model/cart.model.js";
import orderModel from "../model/order.model.js";

export const cart = async (req, res) => {
  try {
    const { id, title, price, Image } = req.body;

    const existingItem = await cartModel.findOne({ id: id });
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.save();
      return res
        .status(200)
        .json({ ok: true, message: "Product Added to Cart" });
    }

    await cartModel.create({
      id,
      title,
      price,
      Image,
    });

    res.status(201).json({
      ok: true,
      message: "Product Added to Cart",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cartItems = await cartModel.find();
    return res.status(200).json({ ok: true, cartItems });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const increaseQty = async (req, res) => {
  try {
    const existingItem = await cartModel.findById(req.params.id);
    existingItem.quantity += 1;
    existingItem.save();
    return res.status(200).json({ ok: true, message: "Quantity Updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const decreaseQty = async (req, res) => {
  try {
    const existingItem = await cartModel.findById(req.params.id);
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      existingItem.save();
      return res.status(200).json({ ok: true, message: "Quantity Updated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const removeItem = async (req, res) => {
  try {
    await cartModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ ok: true, message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
export const placeOrder = async (req, res) => {
  try {
    const cartItems = await cartModel.find();

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    
    const { customer } = req.body;
    await orderModel.create({
      customer: customer,
      product: cartItems,
      totalAmount,
    });

    return res
      .status(201)
      .json({ ok: true, message: "Order Placed Successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
