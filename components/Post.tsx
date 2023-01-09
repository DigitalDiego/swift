import React from "react";
import Link from "next/link";
import moment from "moment";

interface IProps {
  id: number;
  title: string;
  content: string;
  category: string;
  user: string;
  created_at: string;
}

export default function Post(props: IProps) {
  return (
    <Link
      className="w-full h-[120px] p-2 bg-black rounded-lg text-white"
      href={`/posts/${props?.id}`}
    >
      <div className="w-full h-1/2 flex justify-start items-start text-xl">
        <p>{props?.title}</p>
      </div>
      <div className="w-full h-1/2 flex justify-between items-end text-sm">
        <p>{props?.user}</p>
        <p>{moment(props?.created_at).fromNow()}</p>
      </div>
    </Link>
  );
}
