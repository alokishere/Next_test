import { MapPin } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SignOut } from "./sign-out";

export async function OuterNavbar() {
  const session = await getServerSession(authOptions);
  return (
    <header className="text-xs md:text-sm xl:text-base md:h-[50px] xl:h-[70px] flex justify-center items-center border-b-[1px] font-semibold bg-gradient-to-br from-[#080b28] to-[#020b70]">
      <nav className="hidden md:flex md:flex-row grow justify-between mx-10">
        <Link
          href={"https://robocrate.in/"}
          className="flex items-center text-white hover:text-white text-xs md:text-sm xl:text-base"
        >
          <MapPin className="xl:h-5 xl:w-5 h-3 w-3 mx-2 font-bold text-white" />
          Robocrate Store
        </Link>
        <div className="flex gap-x-20 md:flex-row">
          <div className="flex items-center text-xs md:text-sm xl:text-base gap-x-3 lg:gap-x-10">
            {session?.user.email ? (
              <Link href={"/upload"} className="text-white hover:text-white">
                UPLOAD
              </Link>
            ) : (
              <Link
                href={"/admin-login"}
                className="text-white hover:text-white"
              >
                LOGIN
              </Link>
            )}
            <Link href={"/contact-us"} className="text-white hover:text-white">
              CONTACT US
            </Link>
            <Link href={"/about"} className="text-white hover:text-white">
              ABOUT
            </Link>
          </div>
          <div className="flex items-center gap-x-2">
            <p className="text-white hover:text-white">Global Presence:</p>
            <Image src={"/in.svg"} alt="India" width={20} height={15} />
            <Image src={"/dubai.jpg"} alt="Dubai" width={20} height={14} />
            <Image src={"/usa.jpg"} alt="USA" width={23} height={18} />
            <Image src={"/af.jpg"} alt="Africa" width={20} height={14} />
          </div>
          {session?.user.email && <SignOut />}
        </div>
      </nav>
    </header>
  );
}

export function InnerNavbar() {
  return (
    <div className="my-0 flex w-full justify-center py-5 md:items-center md:justify-between gap-28 px-10">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src="/science-kidz.png"
            alt="Science Kidz"
            sizes="100vw"
            className="w-[250px]"
            width={300}
            height={100}
          />
        </Link>
      </div>
      <div className="md:flex md:items-center hidden md:visible">
        <ul className="flex items-center justify-center md:gap-7 lg:gap-10 font-semibold text-slate-600 text-xs md:text-sm xl:text-base">
          <li>
            <Link href={"/"}>
              <div className="bg-gradient-to-br from-[#131631] to-[#000ead] rounded-[9px]">
                <div className="md:px-2 md:py-1 lg:px-3 lg:py-2 hover:text-white bg-white hover:bg-transparent">
                  HOME
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={"/#courses"}>
              <div className="bg-gradient-to-br from-[#131631] to-[#000ead] rounded-[9px]">
                <div className="md:px-2 md:py-1 lg:px-3 lg:py-2 hover:text-white bg-white hover:bg-transparent">
                  COURSES
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={"/#competitions"}>
              <div className="bg-gradient-to-br from-[#131631] to-[#000ead] rounded-[9px]">
                <div className="md:px-2 md:py-1 lg:px-3 lg:py-2 hover:text-white bg-white hover:bg-transparent">
                  COMPETITIONS
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href={"/#gallery"}>
              <div className="bg-gradient-to-br from-[#131631] to-[#000ead] rounded-[9px]">
                <div className="md:px-2 md:py-1 lg:px-3 lg:py-2 hover:text-white bg-white hover:bg-transparent">
                  GALLERY
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
