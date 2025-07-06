import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MouseTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Add new position to trail
      setTrail((prev) => {
        const newTrail = [...prev, { ...newPosition, id: Date.now() }];
        // Keep only last 8 positions for subtle effect
        return newTrail.slice(-8);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const trailVariants = {
    initial: {
      scale: 0,
      opacity: 0.6,
    },
    animate: {
      scale: [0, 1, 0],
      opacity: [0.6, 0.3, 0],
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Elegant main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-4 h-4 bg-gray-800 rounded-full border-2 border-white shadow-lg" />
        <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1" />
      </motion.div>

      {/* Subtle trail effect */}
      {trail.map((pos) => (
        <motion.div
          key={pos.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: pos.x - 3,
            top: pos.y - 3,
          }}
          variants={trailVariants}
          initial="initial"
          animate="animate"
          onAnimationComplete={() => {
            setTrail((prev) => prev.filter((item) => item.id !== pos.id));
          }}
        >
          <div className="w-2 h-2 bg-gray-400 rounded-full opacity-40" />
        </motion.div>
      ))}

      {/* Elegant ring around cursor */}
      <motion.div
        className="fixed pointer-events-none z-30"
        style={{
          left: mousePosition.x - 15,
          top: mousePosition.y - 15,
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-8 h-8 border border-gray-300 rounded-full" />
      </motion.div>

      {/* Subtle highlight effect */}
      <motion.div
        className="fixed pointer-events-none z-20"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
        }}
        animate={{
          scale: [0.5, 1, 0.5],
          opacity: [0.1, 0.05, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
      </motion.div>
    </>
  );
};

export default MouseTrail;
