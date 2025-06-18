import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}
      className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
