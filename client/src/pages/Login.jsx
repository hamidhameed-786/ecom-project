import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/dologin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.ok) {
        console.log(data.message);

        navigate(`/profile/${data.userEmail.sessionId}`);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Login Form
          </h2>

          {/* FORM ADDED HERE */}
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition-all cursor-pointer"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?
              <Link
                to={"/register"}
                className="ml-1 text-green-600 font-semibold hover:text-green-700 hover:underline transition-all"
              >
                Register
              </Link>
            </p>
          </form>
          {/* FORM ENDS */}
        </div>
      </section>
    </>
  );
}

export default Login;
