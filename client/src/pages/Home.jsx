import "./Home.css";
import Wardrobe from "../components/Wardrobe";
import WeatherComponent from "../components/WeatherComponent";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Home = ({
  setLoginName,
  loginName,
  location,
  weather,
  setWeather,
  setLocation,
}) => {
  return (
    <div>
      <Navbar />
      <div className="home-pattern bg-repeat bg-cover bg-center">
        <div className="cont">
          <motion.div
            // className="relative bg-base-100 shadow-xl rounded-md border-4 border-white overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-around mx-4 align-items">
              <WeatherComponent
                location={location}
                weather={weather}
                setWeather={setWeather}
                setLocation={setLocation}
                setLoginName={setLoginName}
                loginName={loginName}
                className="hi-weather"
              />
            </div>
          </motion.div>
        </div>
        <Wardrobe />
        <Footer className="sticky bottom-0" />
      </div>
    </div>
  );
};

export default Home;
