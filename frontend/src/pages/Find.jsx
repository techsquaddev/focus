"use client";
import { motion } from "framer-motion";
import { FindTimetable, Wrapper } from "@/components";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info, Calendar, Clock } from "lucide-react";

const Find = () => {
  const navigate = useNavigate();

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
    <Wrapper>
      <motion.div
        className="max-w-4xl mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Back Button */}
        <motion.div className="flex items-center mb-8" variants={itemVariants}>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft
              size={18}
              className="text-blue-600 group-hover:translate-x-[-3px] transition-transform"
            />
            <span className="text-gray-700 font-medium">Back</span>
          </motion.button>

          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent ml-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Find Your Timetable
          </motion.h1>
        </motion.div>

        {/* Search Form Container */}
        <motion.div className="mb-8" variants={itemVariants}>
          <FindTimetable />
        </motion.div>

        {/* Info Cards */}
        <div className="grid gap-6">
          <motion.div
            className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            }}
          >
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <Clock size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                One-time Setup
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              You only have to find your timetable once. Then every time you
              visit FOCUS, it will be directly displayed to you. We recommend
              adding FOCUS as an app shortcut for quick access.
            </p>
          </motion.div>

          {/* Registration Info Card */}
          <motion.div
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            }}
          >
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <Calendar size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Missing Timetables
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Some timetables may not be available in our system. If you cannot
              find your timetable, please register with the system and add your
              timetable. We encourage batch representatives to manage
              timetables.
            </p>
          </motion.div>
        </div>

        {/* Floating Help Button */}
        <motion.button
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Info size={24} />
        </motion.button>
      </motion.div>
    </Wrapper>
  );
};

export default Find;
