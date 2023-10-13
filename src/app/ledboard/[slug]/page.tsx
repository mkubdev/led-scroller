import Image from 'next/image'
import Marquee from "react-fast-marquee";
import useSWR from 'swr'
import { kv } from "@vercel/kv";

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(args[0], args[1]).then(res => res.json())

export default function LedBoard({ params }: { params: { slug: string } }) {

	const LedMessage = async () => {
		const data = "Hellowww @darkterminal!"
		// --- use KV storage
		// const KVdata = await kv.get<{ id: string }>(params.id);
		// console.log(KVdata)


		// --- Render the message in a marquee
		return (
			<Marquee autoFill={true} pauseOnClick={true} className="font-medium text-7xl overflow-hidden h-96 hover:mouse-cursor">
				{data}
			</Marquee>
		)
	}

	// --- Display the message in a marquee
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<div className="flex place-items-center justify-center flex-1 w-full">
				<LedMessage />
			</div>
		</main>
	)
}
