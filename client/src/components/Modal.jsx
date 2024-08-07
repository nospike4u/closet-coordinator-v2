import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const Modal = ({
  isOpen,
  onClose,
  message,
  onConfirm,
  onCancel,
  confetti: showConfetti,
  showCancelButton = true,
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={300}
          recycle={false}
          gravity={0.3}
          run={isOpen}
          confettiSource={{
            x: 0,
            y: 100,
            w: dimensions.width,
            h: 0,
          }}
        />
      )}
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative"
          style={{ maxWidth: "90%", margin: "auto" }}>
          <p className="mb-6 text-center">{message}</p>
          <div className="flex justify-center space-x-4 mt-4">
            {showCancelButton && (
              <button
                onClick={onCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
                Cancel
              </button>
            )}
            <button
              onClick={onConfirm}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              OK
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Modal;
