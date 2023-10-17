"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagicWandIcon } from "@radix-ui/react-icons";

/**
 * =====================
 *   MessageGenerator
 * =====================
 */
const MessageGenerator = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
        }
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

    if (message === "") {
      console.log("Message is empty");
      return;
    }

    try {
      const response = await handlePostRequest();
      console.log("Response from handleSubmit:", response);

      // FIXME: in production the response is blank
      // if (response === "OK") {
      //   console.log("Redirecting");
      //   router.push(`/ledboard/${encodeURIComponent(message)}`);
      // } else {
      //   console.log("No redirecting");
      //   // PROPOSAL: Add toaster here to notify user
      // }

      router.push(`/ledboard/${encodeURIComponent(message)}`);
    } catch (error) {
      console.error(
        "An unexpected error occurred on MessageGenerator handleSubmit():",
        error
      );
    }
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

export default MessageGenerator;
