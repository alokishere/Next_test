import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#080b28] to-[#020b70] mt-20 w-full text-white text-sm md:text-sm xl:text-base flex flex-col-reverse md:flex-row justify-center items-center gap-1 md:gap-28 md:p-2 p-3">
      <p className="text-center">
        Copyright © 2024 ScienceKidz, All Rights Reserved
      </p>
      <ul className="flex justify-center items-center md:gap-5 gap-1 flex-col md:flex-row">
        <Link href={"https://robocrate.in/"}>
          <li className="md:hidden gap-2 justify-center items-center flex">
            <MapPinIcon />
            Robocrate - Online store
          </li>
        </Link>
        <li className="flex gap-2 justify-center items-center">
          <Image
            src={"/email-svgrepo-com.svg"}
            alt="Email"
            width={25}
            height={25}
          />{" "}
          info@sciencekidz.in
        </li>
        <li className="flex justify-center items-center">
          <Image
            src={"/call-svgrepo-com.svg"}
            alt="Call"
            width={30}
            height={30}
          />
          +91 77770 81677
        </li>
      </ul>
      <ul className="flex justify-center items-center gap-5 md:pb-0 pb-2">
        <li>
          <Link target="_blank" href={"https://www.youtube.com/@ScienceKidz"}>
            <Image
              src={"/youtube-168-svgrepo-com.svg"}
              alt=""
              width={30}
              height={30}
              aria-label="Youtube"
            />
          </Link>
        </li>
        <li>
          <Link target="_blank" href={"https://wa.me/+917777081677"}>
            <Image
              src={"/whatsapp-svgrepo-com.svg"}
              alt=""
              width={30}
              height={30}
              aria-label="Whatsapp"
            />
          </Link>
        </li>
        <li>
          <Link target="_blank" href={"https://www.instagram.com/science.kidz"}>
            <Image
              src={"/instagram-svgrepo-com.svg"}
              alt=""
              width={30}
              height={30}
              aria-label="Instagram"
            />
          </Link>
        </li>
        <li>
          <Link target="_blank" href={"https://www.facebook.com/scikidz"}>
            <Image
              src={"/facebook-svgrepo-com.svg"}
              alt=""
              width={30}
              height={30}
              aria-label="Facebook"
            />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
