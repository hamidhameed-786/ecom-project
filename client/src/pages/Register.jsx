import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/doregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.ok) {
        alert(data.message);

        setForm({
          username: "",
          email: "",
          password: "",
          phone: "",
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <section className="w-full max-w-sm mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register Form</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="px-4 py-2 border rounded-md"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="px-4 py-2 border rounded-md"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="px-4 py-2 border rounded-md"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="phone"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Phone No
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="px-4 py-2 border rounded-md"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div>
          <input
            type="submit"
            value="Register"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md cursor-pointer hover:bg-blue-700 transition"
          />
        </div>

        {/* New Login Button */}
        <div className="text-center">
          <button
            type="button"
            className="mt-3 w-full py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition font-medium"
          >
            <Link to={"/login"}>Already Registered? Login Now</Link>
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;
