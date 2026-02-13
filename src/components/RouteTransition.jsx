import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 18,
    scale: 0.994,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.996,
    filter: "blur(4px)",
    transition: {
      duration: 0.24,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function RouteTransition({ children }) {
  return (
    <motion.div
      className="route-transition-shell"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="route-transition-glow"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.6, 0],
          x: ["-12%", "5%", "20%"],
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <div className="route-transition-content">{children}</div>
    </motion.div>
  );
}
