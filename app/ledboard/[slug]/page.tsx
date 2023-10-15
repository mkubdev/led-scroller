"use client";

import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import useSWR from "swr";
import { motion } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LedBoard({ params }: { params: { slug: string } }) {
  const key = decodeURIComponent(params.slug);
  const router = useRouter();

  // --- test SWR
  const { data, error } = useSWR("/api/message/" + key, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div className="flex items-center justify-center text-center mx-auto h-screen">
        loading...
      </div>
    );

  const LedMessage = ({ message }: { message: string }) => {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        className="overflow-hidden h-screen hover:mouse-cursor"
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
        <Marquee
          autoFill={true}
          className="font-medium overflow-hidden h-screen text-[15rem] lg:text-[18rem]"
        >
          <p>~ {message} ~</p>
        </Marquee>
      </motion.div>

    );
  };

  const NoData = () => {
    return (
      <Marquee
        autoFill={true}
        className="font-medium text-[18rem] overflow-hidden h-scren hover:mouse-cursor"
      >
        Oops, no data from redis
      </Marquee>
    );
  };

  const HeadLedBoard = () => {
    return (
      <div className="z-10 text-muted-foreground">
        <button
          className="absolute top-0 left-0 m-4 p-2 flex gap-1 items-center "
          onClick={() => router.push("/")}
        >
          <DoubleArrowLeftIcon className="w-4 h-4" />
          Go back
        </button>

        <span className="absolute top-0 right-0 m-4 p-2">
          Something built by{" "}
          <a className="underline" href="https://github.com/mkubdev">
            @mk
          </a>{" "}
          /{" "}
          <a className="underline" href="https://github.com/darkterminal">
            @dk
          </a>
        </span>
      </div>
    );
  };

  // --- Display the message in a marquee
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-sm">
      <HeadLedBoard />
      <div className="flex place-items-center justify-center flex-1 w-full">
        {data ? <LedMessage message={data} /> : <NoData />}
      </div>
    </main>
  );
}
