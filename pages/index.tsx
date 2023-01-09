import React from "react";
import Head from "next/head";
import { Hero, Post } from "../components";
import { createClient } from "@supabase/supabase-js";

interface IData {
  id: number;
  title: string;
  content: string;
  category: string;
  user: string;
  created_at: string;
}

interface IProps {
  data: IData[];
}

export default function Home({ data }: IProps) {
  return (
    <>
      <Head>
        <title>Swift</title>
      </Head>
      <Hero />
      <div className="w-full min-h-[85vh] p-[5vw] flex justify-start items-start flex-col gap-[10px]">
        <p className="text-xl font-bold">Top Posts</p>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-[10px] place-items-start">
          {data?.slice(0, 6)?.map((post: IData) => (
            <Post {...post} key={post?.id} />
          ))}
        </div>
      </div>
      <div className="w-full p-[5vw] flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-1/2 flex justify-start items-start flex-col gap-[10px]">
          <p className="text-xl font-bold">Recent Posts</p>
          {data?.map((post: IData) => (
            <Post {...post} key={post?.id} />
          ))}
        </div>
        <div className="w-full lg:w-1/2 p-[.5em] flex justify-start items-start gap-[10px] flex-wrap">
          <div className="flex justify-center items-center gap-[10px] flex-wrap">
            {[
              "Technology",
              "History",
              "News",
              "Politics",
              "Food",
              "Cars",
              "Cooking",
              "Crypto",
            ].map((item) => (
              <p
                className="px-4 py-2 rounded-lg bg-black text-white"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data, error } = await supabase.from("posts").select("*");

  return {
    props: {
      data,
    },
  };
};
