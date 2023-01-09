import React, { useState, useEffect } from "react";
import { getFromStorage } from "../../utils";
import { useRouter } from "next/router";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import { auth } from "../../firebase.config";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const createPost = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ""
    );

    await supabase
      .from("posts")
      .insert({
        title,
        content,
        category,
        user: auth.currentUser?.displayName,
      })
      .then(() => {
        setTitle("");
        setContent("");
        setCategory("");
        router.push("/");
      });
  };

  useEffect(() => {
    const isAuth = getFromStorage("isAuth");
    if (!isAuth) router.push("/");
  }, []);
  return (
    <>
      <Head>
        <title>Swift | Write</title>
      </Head>
      <div className="w-full h-[85vh] grid place-items-center py-[2vw] px-[5vw] lg:px-0">
        <div className="w-full lg:w-1/2 h-full flex justify-between items-center flex-col gap-[10px]">
          <input
            className="w-full px-4 py-2 border-solid border-black border-[1px] rounded-lg outline-none"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="w-full px-4 py-2 border-solid border-black border-[1px] rounded-lg outline-none h-full resize-none"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
          <input
            className="w-full px-4 py-2 border-solid border-black border-[1px] rounded-lg outline-none"
            type="text"
            placeholder="Title"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <button
            className="w-full px-4 py-2 border-solid border-black border-[1px] rounded-lg outline-none bg-black text-white"
            disabled={
              title.replace(/\s/g, "").length === 0 ||
              content.replace(/\s/g, "").length === 0 ||
              category.replace(/\s/g, "").length === 0
            }
            onClick={createPost}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}
