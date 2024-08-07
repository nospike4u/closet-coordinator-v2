import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FloatingBox.css";

const FloatingBox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Search for projects, names or skills",
      x: 700,
      y: 40,
    },

    {
      id: 2,
      text: "Filter tags are displayed under the search bar and can be removed by clicking on them",
      x: 800,
      y: 90,
    },

    { id: 3, text: "Click on the balls to do stuff", x: 700, y: 400 },

    {
      id: 4,
      text: "Click on a ball and explore properties of ball stuff in the context menu here",
      x: 100,
      y: 400,
    },

    {
      id: 5,
      text: "For more information check the help page",
      x: 0,
      y: 0,
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleClose = () => {
    setMessages((prevMessages) =>
      prevMessages.filter((_, index) => index !== currentIndex)
    );
    setCurrentIndex(-1);
  };

  const boxVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  if (
    messages.length === 0 ||
    currentIndex < 0 ||
    currentIndex >= messages.length
  ) {
    return null;
  }

  return (
    <div className="floating-boxes-container">
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div
            key={messages[currentIndex].id}
            className="floating-box"
            variants={boxVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: "absolute",
              left: messages[currentIndex].x,
              top: messages[currentIndex].y,
            }}>
            <p>{messages[currentIndex].text}</p>
            {currentIndex < messages.length - 1 && (
              <button onClick={handleNext}>Next</button>
            )}
            {currentIndex === messages.length - 1 && (
              <button onClick={handleClose}>Close</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingBox;