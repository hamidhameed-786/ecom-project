import express from "express";
const router = express.Router();
import {
  dologin,
  doregister,
  Logout,
  Profile,
} from "../controller/userdata.controller.js";
import {
  cart,
  decreaseQty,
  getCart,
  increaseQty,
  removeItem,
  placeOrder,
} from "../controller/cart.controller.js";
router.post("/doregister", doregister);
router.post("/dologin", dologin);
router.get("/profile/:sessionId", Profile);
router.get("/logout/:sessionId", Logout);
// cart route
router.post("/cart", cart);
router.get("/cart", getCart);
router.put("/cart/increase/:id", increaseQty);
router.put("/cart/decrease/:id", decreaseQty);
router.delete("/cart/:id", removeItem);
router.post("/checkout", placeOrder);
export default router;
