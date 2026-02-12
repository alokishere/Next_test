"use client";

import { CircleX, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const { data: session } = useSession();

  return (
    <div className="top-0 left-0 z-50 w-full fixed">
      <div className="flex items-center justify-between p-4 bg-transparent md:hidden">
        <div
          className="h-10 w-10 absolute top-4 left-4 rounded-full bg-white flex justify-center items-center"
          onClick={handleToggle}
        >
          {isOpen ? (
            <CircleX className="text-black cursor-pointer" />
          ) : (
            <Menu className="text-black cursor-pointer" />
          )}
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleToggle}
      ></div>
      <div
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-4">
          <div className="text-white flex gap-1 flex-col">
            <Image
              src={"/science-kidz.png"}
              width={200}
              height={200}
              alt="Science Kidz"
              className="self-center mb-10"
            />
            <Link href={"/"} onClick={handleToggle}>
              <div className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                HOME
              </div>
            </Link>
            <Link href={"/#courses"} onClick={handleToggle}>
              <div className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                COURSES
              </div>
            </Link>
            <Link href={"/#competitions"} onClick={handleToggle}>
              <div className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                COMPETITIONS
              </div>
            </Link>
            <Link href={"#gallery"} onClick={handleToggle}>
              <div className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                GALLERY
              </div>
            </Link>
            <Link
              href={session?.user.email ? "/upload" : "/admin-login"}
              onClick={handleToggle}
            >
              <div className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                {session?.user.email ? "UPLOAD" : "LOGIN"}
              </div>
            </Link>
            <Link href={"contact-us"} onClick={handleToggle}>
              <div className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                CONTACT US
              </div>
            </Link>
            <Link href={"about"} onClick={handleToggle}>
              <div className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                ABOUT
              </div>
            </Link>
            {session?.user.email && (
              <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                SIGN OUT
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
