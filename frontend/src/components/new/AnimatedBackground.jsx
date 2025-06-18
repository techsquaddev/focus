import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 z-0" />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl z-0"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl z-0"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 z-0"
          style={{
            width: element.size / 10,
            height: element.size / 10,
          }}
          animate={{
            x: [element.initialX, element.initialX + 200, element.initialX],
            y: [element.initialY, element.initialY - 100, element.initialY],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
