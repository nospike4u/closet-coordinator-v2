import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FloatingButton = ({ onClick, isMenuOpen }) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef(null);
  const startX = useRef(0);
  const startLeft = useRef(0);
  const mouseDownAt = useRef(null);

  const handleMouseDown = (event) => {
    mouseDownAt.current = event.clientX;
    startX.current = event.clientX;
    startLeft.current = buttonRef.current.getBoundingClientRect().left;
    setIsDragging(false);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    setIsDragging(true);
    const newLeft = startLeft.current + (event.clientX - startX.current);
    setPosition(Math.max(0, Math.min(window.innerWidth - 50, newLeft)));
  };

  const handleMouseUp = (event) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    const mouseMoved = Math.abs(event.clientX - mouseDownAt.current) > 10;

    if (!isDragging && !mouseMoved) {
      onClick();
    }

    setIsDragging(false);
  };

  useEffect(() => {
    const updatePosition = () => {
      setPosition(Math.max(0, Math.min(window.innerWidth - 50, position)));
    };

    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [position]);

  return (
    <div
      ref={buttonRef}
      className="fixed bottom-5 p-3 rounded-full shadow-lg cursor-pointer transition-colors duration-300 ease-in-out z-50"
      style={{
        left: `${position}px`,
        background: isMenuOpen
          ? "linear-gradient(135deg, #FF4500, #FF6347)"
          : "linear-gradient(135deg, #1E90FF, #00BFFF)",
      }}
      onMouseDown={handleMouseDown}>
      {isMenuOpen ? <FaMinus size={24} /> : <FaPlus size={24} />}
    </div>
  );
};

export default FloatingButton;
