import { motion } from "framer-motion";

export default function Background() {
  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2, // 2-6px
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 15, // 15-35 seconds
    delay: Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Original gradient background - unchanged */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: `
            radial-gradient(at 27% 37%, hsla(200, 80%, 70%, 1) 0px, transparent 50%),
            radial-gradient(at 97% 21%, hsla(0, 0%, 80%, 1) 0px, transparent 50%),
            radial-gradient(at 52% 99%, hsla(210, 80%, 70%, 1) 0px, transparent 50%),
            radial-gradient(at 10% 29%, hsla(0, 0%, 60%, 1) 0px, transparent 50%),
            radial-gradient(at 97% 96%, hsla(190, 80%, 70%, 1) 0px, transparent 50%),
            radial-gradient(at 33% 50%, hsla(0, 0%, 70%, 1) 0px, transparent 50%),
            radial-gradient(at 79% 53%, hsla(220, 80%, 75%, 1) 0px, transparent 50%)
          `,
          filter: "blur(100px) saturate(150%)",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/50"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 300 - 150, 0],
            y: [0, Math.random() * 200 - 100, Math.random() * 300 - 150, 0],
            opacity: [0, 0.6, 0.3, 0.8, 0],
            scale: [0.5, 1, 0.8, 1.2, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle drifting specs */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={`spec-${i}`}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 40 + 25,
            delay: Math.random() * 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
