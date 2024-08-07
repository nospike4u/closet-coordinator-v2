// Registering a new user in the context of this application

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthContext } from "../contexts/authContext";

const Register = () => {
  const navigate = useNavigate();
  const { url } = useAuthContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        userName: name,
        email,
        password,
      };
      const { data } = await axios.post(`${url}/api/v1/register`, newUser);
      toast.success("Registered successfully!");
      handleReset();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error("Please fill all information in the form");
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="max-h-screen bg-cover bg-center flex items-center justify-center"
      style={{}}
    >
      <div
        className="text-white p-8 rounded shadow-md w-full max-w-md my-8"
        style={{
          background: "linear-gradient(to right, #60a5d6, #38b2ac)",
          WebkitBackdropFilter: "blur(5px)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(102,224,2,0.1)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-left text-sm">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
              placeholder="Name"
              required
              className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-left text-sm">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="Email"
              required
              className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-left text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              placeholder="Password"
              required
              className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-300 text-black p-2 rounded mt-4 font-bold hover:bg-orange-400"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-white mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#fff] hover:underline dec pl-2 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
