import { useEffect, useState } from "react";
// import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ClothesList from "./pages/ClothesList.jsx";
// import Navbar from "./components/Navbar.jsx";
import Update from "./pages/Update.jsx";
import Profile from "./pages/Profile.jsx";
// import ChatWindow from "./components/ChatWindow.jsx";

function App() {
  const [loginName, setLoginName] = useState(null);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* <Navbar className="sticky top-0" /> */}
      <div className="app-bg "></div>
      <div className="flex-grow relative">
        <Routes>
          <Route
            path="/"
            element={<Home loginName={loginName} setLoginName={setLoginName} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/clothes-list" element={<ClothesList />}></Route>
          {/* <Route path="/clothes-list" element={<ClothesListTwo />}></Route> */}
          <Route path="/update" element={<Update />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
