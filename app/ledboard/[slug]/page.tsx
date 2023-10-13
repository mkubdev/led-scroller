"use client"

import Image from 'next/image'
import Marquee from "react-fast-marquee";
import useSWR from 'swr'
import { kv } from "@vercel/kv";
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then((res) => res.json())


export default function LedBoard({ params }: { params: { slug: string } }) {
  const key = decodeURIComponent(params.slug);
  const router = useRouter();

  // --- use SWR
  const { data, error } = useSWR("/api/message/" + key, fetcher)
  console.log("LedMessage data:", data)
  console.log("LedMessage error:", error)

  const LedMessage = ({ message }: { message: string }) => {

    // --- Render the message in a marquee
    return (
      <Marquee autoFill={true} pauseOnClick={true} className="font-medium text-7xl overflow-hidden h-96 hover:mouse-cursor">
        {message}
      </Marquee>
    )
  }

  // --- Display the message in a marquee
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex place-items-center justify-center flex-1 w-full">
        <LedMessage message={key} />
      </div>

      <button className="absolute top-0 left-0 m-4 p-2" onClick={() => router.back()}>
        Go Back
      </button>
    </main>
  )
}
