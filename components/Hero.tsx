import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full h-[85vh] px-[5vw] py-[2vw]">
      <div className="w-full h-full flex bg-white rounded-lg p-4 flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-full flex justify-center items-start flex-col gap-[10px]">
          <p className="text-3xl font-display font-bold">
            Learn something new everyday
          </p>
          <p className="text-sm">
            See what people have to say on what they are curious or experts at
          </p>
          <Link
            className="px-4 py-2 rounded-lg bg-black text-white"
            href="/posts"
          >
            Start reading
          </Link>
        </div>
        <div className="w-full lg:w-1/2 h-full grid place-items-center">
          <Image
            className="w-4/5 object-cover"
            src="/images/hero-image.png"
            alt="hero image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
