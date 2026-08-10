"use client";

import { motion } from "framer-motion";
const WelcomeText = ({ name }: { name: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-2xl font-bold tracking-tight text-white">
        Welcome back, {name}
      </h1>

      <p className="mt-1 text-sm text-slate-400">
        Here&apos;s what&apos;s happening with your portfolio.
      </p>
    </motion.div>
  );
};

export default WelcomeText;
