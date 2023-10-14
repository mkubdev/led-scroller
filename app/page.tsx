"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LightningBoltIcon,
  MagicWandIcon
} from "@radix-ui/react-icons";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  /**
   * =====================
   *   LedDisplayPreview
   * =====================
   */
  // type LedDisplayPreviewProps = {
  //   previewMessage: string;
  // }

  // const LedDisplayPreview = ({ previewMessage }: LedDisplayPreviewProps) => {
  //   return (
  //     <div className="border-2 rounded-md h-96">
  //       <Marquee
  //         autoFill={true}
  //         pauseOnClick={true}
  //         className="font-medium text-7xl overflow-hidden h-96 hover:mouse-cursor"
  //       >
  //         {previewMessage}
  //       </Marquee>
  //     </div>
  //   );
  // };

  /**
   * =====================
   *   MessageGenerator
   * =====================
   */
  const MessageGenerator = () => {
    const router = useRouter();
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handlePostRequest = async () => {
      try {
        const heartbeat = await fetch("/api/heartbeat");
        console.log("heartbeat:", heartbeat);

        // use axios and internal api route to store message
        const res = await axios.post(
          "/api/create/" + encodeURIComponent(message),
          message,
          {
            headers: {
              "Content-Type": "application/json", // specify content type as JSON
            },
          },
        );
        console.log("Response from server:", res.data.message);
        setLoading(false);
        return res.statusText;
      } catch (error) {
        console.error("An unexpected error happened occurred:", error);
      }
    };

    // IMPLEMENTED: When we redirect the user, the message is not yet stored in redis! Sometimes it works, sometimes it doesn't.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await handlePostRequest();
        if (response === "OK") {
          router.push(`/ledboard/${encodeURIComponent(message)}`);
        } else {
          // PROPOSAL: Add toaster here to notify user
        }
        console.log("Response from handleSubmit:", response);
      } catch (error) {
        console.error(
          "An unexpected error occurred on MessageGenerator handleSubmit():",
          error,
        );
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-8 gap-4 w-full lg:w-2/5"
      >
        <h2 className="text-xl lg:text-3xl font-bold text-center">
          Add your message <BlinkingCursor />
        </h2>
        <div className="flex flex-col justify-center items-center">
          <Input
            type="text"
            name="led input"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <Button
          className="gap-2 font-bold transition-all hover:bg-gradient-to-r hover:from-blue-300 hover:via-fuschia-600 hover:to-orange-500"
          type="submit"
        >
          {loading === false ? (
            <>
              Generate <MagicWandIcon className="h-4 w-4" />
            </>
          ) : (
            <>Creating your LED Board...</>
          )}
        </Button>
      </form>
    );
  };

  const BlinkingCursor = () => {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.2,
        }}
      >
        |
      </motion.span>
    );
  };

  const Title = () => {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
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
          },
        }}
      >
        <h1 className="flex items-center justify-center gap-2 text-3xl lg:text-7xl font-bold text-white">
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
    </main>
  );
}
