"use client"

import Marquee from "react-fast-marquee";
import useSWR from 'swr'
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, DoubleArrowLeftIcon, ThickArrowLeftIcon } from '@radix-ui/react-icons';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function LedBoard({ params }: { params: { slug: string } }) {
  const key = decodeURIComponent(params.slug);
  const router = useRouter();

  // --- test SWR
  const { data, error } = useSWR("/api/message/" + key, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div className="flex items-center justify-center text-center mx-auto h-screen">loading...</div>

  const LedMessage = ({ message }: { message: string }) => {
    return (
      <Marquee autoFill={true} className="font-medium text-[18rem] overflow-hidden h-96 hover:mouse-cursor">
        {message}
      </Marquee>
    )
  }

  const NoData = () => {
    return (
      <Marquee autoFill={true} className="font-medium text-[18rem] overflow-hidden h-96 hover:mouse-cursor">
        Oops, no data from redis
      </Marquee>
    )
  }

  // --- Display the message in a marquee
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-sm">
      <div className="flex place-items-center justify-center flex-1 w-full">
        {data ? (
          <LedMessage message={data} />
        ) : (
          <NoData />
        )}
      </div>

      <button className="absolute top-0 left-0 m-4 p-2 flex gap-1 items-center " onClick={() => router.back()}>
        <DoubleArrowLeftIcon className="w-4 h-4" />
        Go back
      </button>

      <span className="absolute top-0 right-0 m-4 p-2 text-muted-foreground">
        Something built by <a className="underline" href="https://github.com/mkubdev">@mk</a> /{' '}
        <a className="underline" href="https://github.com/darkterminal">@dk</a>
      </span>
    </main>
  )
}
