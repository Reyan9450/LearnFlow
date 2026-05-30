"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import { HeroTile } from "./HeroTile";
import { CourseCard } from "./CourseCard";
import { ActivityTile } from "./ActivityTile";
import { StatsTile } from "./StatsTile";

interface BentoGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },
};

export function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 md:p-6"
    >
      <motion.div variants={tileVariants} className="md:col-span-2 xl:col-span-2">
        <HeroTile />
      </motion.div>

      <motion.div variants={tileVariants} className="md:col-span-1">
        <StatsTile coursesCount={courses.length} />
      </motion.div>

      {courses.map((course, index) => (
        <motion.div key={course.id} variants={tileVariants}>
          <CourseCard course={course} index={index} />
        </motion.div>
      ))}

      <motion.div
        variants={tileVariants}
        className={
          courses.length % 3 === 0
            ? "md:col-span-2 xl:col-span-3"
            : "md:col-span-2 xl:col-span-2"
        }
      >
        <ActivityTile />
      </motion.div>
    </motion.div>
  );
}
