import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase.config";
import Link from "next/link";
import { getFromStorage, saveToStorage, removefromStorage } from "../utils";
import { signOut, signInWithPopup } from "firebase/auth";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";

export default function Navbar() {
  const [navBtn, setNavBtn] = useState(false);
  const isAuth = getFromStorage("isAuth");
  const login = () => {
    signInWithPopup(auth, provider).then((result) => {
      saveToStorage("isAuth", true);
      window.location.reload();
    });
  };
  const logout = () => {
    signOut(auth).then(() => {
      removefromStorage();
      window.location.reload();
    });
  };
  const handleNavBtn = () => {
    setNavBtn(!navBtn);
  };
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <div className="w-full h-[15vh] flex justify-between items-center bg-black px-[5vw] sticky top-0 right-0 z-[4000] text-white">
      <Link className="font-display text-4xl font-bold" href="/">
        Swift
      </Link>
      <nav className="hidden lg:flex items-center gap-[2em]">
        <Link href="/posts">View Posts</Link>
        <Link href="/write">Write</Link>
        {isAuth ? (
          <button
            className="px-4 py-2 bg-white rounded-lg text-black"
            onClick={logout}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-white rounded-lg text-black"
            onClick={login}
          >
            Sign In
          </button>
        )}
      </nav>
      <div
        className={cn(
          "fixed top-[15vh] right-0 bg-black px-[5vw] flex justify-start items-start flex-col w-full h-[85vh] duration-[.8s] lg:hidden",
          navBtn ? "translate-x-0" : "translate-x-[100%]"
        )}
      >
        <Link
          className="w-full h-[10vh] flex justify-start items-center border-b-solid border-b-[1px] border-b-white text-lg"
          href="/"
          onClick={handleNavBtn}
        >
          Home
        </Link>
        <Link
          className="w-full h-[10vh] flex justify-start items-center border-b-solid border-b-[1px] border-b-white text-lg"
          href="/posts"
          onClick={handleNavBtn}
        >
          View Posts
        </Link>
        <Link
          className="w-full h-[10vh] flex justify-start items-center border-b-solid border-b-[1px] border-b-white text-lg"
          href="/write"
          onClick={handleNavBtn}
        >
          Write
        </Link>
        {isAuth ? (
          <button
            className="w-full h-[10vh] flex justify-start items-center border-b-solid border-b-[1px] border-b-white text-lg"
            onClick={logout}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="w-full h-[10vh] flex justify-start items-center border-b-solid border-b-[1px] border-b-white text-lg"
            onClick={login}
          >
            Sign In
          </button>
        )}
      </div>
      <button className="text-2xl lg:hidden" onClick={handleNavBtn}>
        {navBtn ? <AiOutlinePlus className="rotate-45" /> : <AiOutlineMenu />}
      </button>
    </div>
  );
}
