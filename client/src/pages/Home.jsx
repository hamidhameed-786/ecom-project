import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Api is fatching from server: " + err));
  }, []);
  const addToCart = async (product) => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (data.ok) {
        console.log(data.message);
        navigate("/cart");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  return (
    <>
      {/* Hero */}
      <section className="w-full h-full flex justify-center items-center flex-col bg-amber-300 py-16 px-5">
        <h2 className="text-3xl font-semibold mb-4">Cloth price</h2>
        <p className="text-center text-lg mb-6 w-3/4">
          This page tell you about the product price and this price is less than
          according the market price if you have any problem than let us? <br />
          <b>
            And simply you want to shop any product simply click on show Now
            button
          </b>
        </p>
        <button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          <Link to="/shop">Shop Now</Link>
        </button>
      </section>
      <div className="w-full px-6 py-10 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Products
        </h2>

        {/* FLEX CONTAINER */}
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-64 bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={product.Image}
                alt={product.title}
                className="w-full h-full object-cover rounded-md mb-4"
              />

              <h2 className="text-lg font-semibold mb-2 text-center">
                {product.title}
              </h2>

              <p className="text-gray-700 mb-3">
                <b>Rs {product.price}</b>
              </p>

              <button
                onClick={() => addToCart(product)}
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Home;
