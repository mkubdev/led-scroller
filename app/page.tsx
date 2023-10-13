"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { kv } from '@vercel/kv'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Marquee from "react-fast-marquee";
import axios from "axios"

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
    const router = useRouter()
    const [message, setMessage] = useState<string>("")

    const handlePostRequest = async () => {
      try {
        const heartbeat = await fetch("/api/heartbeat");
        console.log("heartbeat:", heartbeat)

        // use axios and internal api route to store message
        const res = await axios.post("/api/create/" + encodeURIComponent(message), message, {
          headers: {
            'Content-Type': 'application/json', // specify content type as JSON
          },
        });
        console.log("Response from server:", res.data.message)

      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
      }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>,) => {
      e.preventDefault();

      handlePostRequest();

      // use KV storage?
      router.push(`/ledboard/${encodeURIComponent(message)}`)
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col p-8 gap-4 ">
        <h2 className="text-3xl font-bold">Add your message:</h2>
        <div className="flex flex-col justify-center items-center">
          <Input type="text" name="led input" value={message} onChange={(e) => { setMessage(e.target.value); }} />
        </div>
        <Button type="submit">Generate LED!</Button>
      </form>
    )
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-7xl font-bold">Led Scroller 🧪</h1>
      <MessageGenerator />
    </main>
  )
}
