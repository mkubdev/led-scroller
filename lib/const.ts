import { Variants } from "framer-motion";

export const flashingFadeInOutVariants: Variants = {
  hidden: {
    opacity: 0.5,
  },
  visible: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.8,
    },
  }
}