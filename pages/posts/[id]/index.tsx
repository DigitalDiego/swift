import React from "react";
import { supabase } from "../../../utils";
import moment from "moment";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";

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

export default function Post({ data }: IProps) {
  return (
    <>
      <Head>
        <title>Swift | {data[0]?.title}</title>
      </Head>
      <div className="w-full lg:w-4/5 mx-auto px-[5vw] lg:px-0">
        <div className="w-full min-h-[15vh] grid place-items-center">
          <p className="text-center font-bold text-4xl">{data[0]?.title}</p>
        </div>
        <div className="w-full flex justify-center lg:justify-between items-start lg:items-center h-[20vh] lg:h-[8vh] flex-col lg:flex-row">
          <p>By: {data[0]?.user}</p>
          <p>Category: {data[0]?.category}</p>
          <p>Posted: {moment(data[0]?.created_at).fromNow()}</p>
        </div>
        <div className="w-full flex justify-start items-start">
          <p>{data[0]?.content}</p>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;

  const { data, error } = await supabase.from("posts").select("*").eq("id", id);

  return {
    props: {
      data,
    },
  };
};
