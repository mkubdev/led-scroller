"use client";

import MessageGenerator from "@/components/custom/MessageGenerator";
import { flashingFadeInOutVariants } from "@/lib/const";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const Title = () => {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={flashingFadeInOutVariants}
      >
        <h1 className="flex items-center justify-center gap-2 text-3xl lg:text-7xl font-bold">
          Led Scroller
          <motion.span
            style={{
              display: "inline-block",
              transformOrigin: "50% 50%",
            }}
            animate={{
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.9, // Alter title <> logo flashing tiiime
            }}
          >
            {/* Repeat this for each letter in "Led Scroller" */}
            <LightningBoltIcon className="h-8 w-8 lg:h-16 lg:w-16" />
          </motion.span>
        </h1>
        <p>
          Share your message to people you love, everywhere across internet!
          It&lsquo;s free!
        </p>
      </motion.div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-0 lg:p-12">
      <Title />
      <MessageGenerator />
      <Toaster />
    </main>
  );
}
