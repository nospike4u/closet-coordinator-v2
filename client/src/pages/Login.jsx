import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import logo from "../assets/logo.svg";
import { useAuthContext } from "../contexts/authContext";

const Login = () => {
  const { url } = useAuthContext();
  const { setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const {headers} =
      const response = await axios.post(`${url}/api/v1/login`, {
        name,
        email,
        password,
      });

      setUser(response.data.user.userDetails);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user.userDetails)
      );


      if (response.status === 200) {
        setMessage("Login successful");
        toast.success("Login successfully!");
        //With token coming from headers

        localStorage.setItem("token", response.authorization);

        localStorage.setItem("token", response.headers.authorization);

        localStorage.setItem("token", response.token);
        //Don't save the email in the localstorage
        localStorage.setItem("email", response.email);
        setError("");
        const token = response.data.token;
        Cookies.set("token", token), { expires: 1 };
        setIsAuthenticated(true);

        navigate("/");
      }
    } catch (error) {
      setError("Invalid credentials");
      toast.error(error.response.data.message);
      setMessage("");
    }
  };

  const handleLogout = async () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar sticky top-0 bg-white shadow-md z-50 flex items-center bg-gradient-to-r from-sky-600 to-teal-400 justify-between">
        <div className="flex items-center">
          <img
            src={logo}
            alt=""
            className="btn btn-ghost btn-circle h-[40px]"
          />
          <span className="closet-coordinator ml-2 text-white font-semibold line-height-2">
            Closet Coordinator
          </span>
        </div>
      </div>
      <div className="max-h-screen bg-cover bg-center justify-center items-center flex flex-col">
        <div
          className="text-white p-8 rounded shadow-md w-full max-w-md my-8"
          style={{
            background: "linear-gradient(to right, #60a5d6, #38b2ac)",
            WebkitBackdropFilter: "blur(5px)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(102,224,2,0.1)",
          }}
        >
          <h2 className=" text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-left text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black p-2 rounded mt-4 font-bold hover:bg-orange-400"
            >
              Login
            </button>
          </form>
          <p className="text-center text-white mt-4 text-sm">
            Do not have an account?{" "}
            <Link to="/register" className="text-[#fff] pl-2 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
