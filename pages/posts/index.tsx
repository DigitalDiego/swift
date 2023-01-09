import React, { useState, useEffect } from "react";
import Head from "next/head";
import { supabase } from "../../utils";
import { Post } from "../../components";

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

export default function Posts({ data }: IProps) {
  return (
    <>
      <Head>
        <title>Swift | Posts</title>
      </Head>
      <div className="w-full px-[5vw] py-[2vw] grid grid-cols-1 lg:grid-cols-3 place-items-center gap-[10px]">
        {data?.map((post) => (
          <Post {...post} key={post?.id} />
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const { data, error } = await supabase.from("posts").select("*");

  return {
    props: {
      data,
    },
  };
};
