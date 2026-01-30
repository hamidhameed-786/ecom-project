import { useEffect } from "react";
import { useState } from "react";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) =>
        console.error("Error while fetching data from API: " + err),
      );
  }, []);
  return (
    <>
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
                <b>{product.price}</b>
              </p>

              <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Shop;
