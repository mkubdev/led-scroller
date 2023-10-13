"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  const generateMessage = (message: string) => {
    // Generate an ID in backend /w expiration date
    // Return the ID
    // Use the ID to fetch the message in the frontend
    // Redirect to /ledboard/[id]
  };

  const MessageGenerator = () => {
    const router = useRouter();

    const handleRedirect = () => {
      // Redirect the user to the '/another-page' when the button is clicked.
      router.push("/ledboard/1");
    };

    return (
      <div className="flex flex-col py-12 border border-1">
        <div className="flex flex-col justify-center items-center">
          <label className="font-medium text-3xl">Add your message</label>
          <input type="text" name="name" />
        </div>
        <button onClick={handleRedirect}>Generate LED!</button>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Write your message below&nbsp;
          <code className="font-mono font-bold">because it&apos;s fun!</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By @mkubdev
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-7xl font-bold">Led Scroller 🧪</h1>
      </div>

      <MessageGenerator />
    </main>
  );
}
