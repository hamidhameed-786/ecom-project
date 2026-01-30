import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    await fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.cartItems);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = 250;
  const total = subtotal + shipping;

  const updateQty = async (type, id) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${type}/${id}`, {
        method: "PUT",
      });
      const data = await response.json();
      if (data.ok) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    fetchCart();
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.ok) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    fetchCart();
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Cart Items</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              className="flex items-center bg-white p-4 rounded-lg shadow mb-4"
              key={item._id}
            >
              <img
                src={item.Image}
                className="w-24 h-24 rounded object-cover"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-500">{item.price * item.quantity}</p>

                <div className="flex items-center mt-2">
                  <button
                    className="px-3 py-1 border rounded-l hover:bg-gray-200"
                    onClick={() => updateQty("decrease", item._id)}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b">
                    {item.quantity}
                  </span>
                  <button
                    className="px-3 py-1 border rounded-r hover:bg-gray-200"
                    onClick={() => updateQty("increase", item._id)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="text-red-500 hover:text-red-700 font-medium"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow h-75 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rs {subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Rs {shipping}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rs {total}</span>
          </div>

          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
