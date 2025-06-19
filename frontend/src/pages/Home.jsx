"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wrapper } from "../components";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Wrapper>
        <motion.div
          className="relative z-10 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
                className="inline-block text-3xl md:text-4xl"
              >
                🗓️
              </motion.div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Welcome to FOCUS!
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 mt-2 px-4"
            >
              Faculty of Computing Unified Scheduler
            </motion.p>
          </motion.div>

          <div className="px-4 md:px-10 flex-1 flex flex-col justify-center">
            {/* Main CTA Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-center mb-4"
                >
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Find your timetable once and it will automatically save to
                    your browser!
                    <br />
                    <span className="text-blue-600 font-semibold">
                      Smart, Simple, Seamless.
                    </span>
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center"
                >
                  <Link to="/timetables/find" className="w-full max-w-md">
                    <motion.button
                      className="w-full px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Find My Timetable
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          ➡️
                        </motion.span>
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg"
            >
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { number: "1000+", label: "Students" },
                  { number: "50+", label: "Modules" },
                  { number: "24/7", label: "Access" },
                  { number: "99%", label: "Uptime" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, type: "spring" }}
                    className="p-2"
                  >
                    <div className="text-lg md:text-xl font-bold text-blue-600 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Wrapper>
    </div>
  );
};

export default Home;
