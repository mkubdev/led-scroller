import Image from "next/image";
import Marquee from "react-fast-marquee";
import useSWR from "swr";
import { kv } from "@vercel/kv";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(args[0], args[1]).then((res) => res.json());

export default function LedBoard({ params }: { params: { id: string } }) {
  const LedMessage = async () => {
    // --- use KV storage
    const message: string | null = await kv.hget(
      decodeURIComponent(params.id),
      "text"
    );

    // --- fetch the message from the backend corresponding to the ID
    // const { data, error, isLoading } = useSWR(`/api/retrieveMessage/${params.id}`, fetcher)

    // if (error) return <div>loading fail</div>
    // if (isLoading) return <div>loading...</div>

    // --- Render the message in a marquee
    return (
      <Marquee
        autoFill={true}
        pauseOnHover={true}
        className="font-medium text-7xl overflow-hidden h-96"
      >
        {message}
      </Marquee>
    );
  };

  // --- Display the message in a marquee
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex place-items-center justify-center flex-1 w-full">
        <LedMessage />
      </div>
    </main>
  );
}
