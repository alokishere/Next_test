"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const contentList = [
  // {
  //   label: "Science Kidz",
  //   img: "/science-kidz.png",
  //   description: "Building a brighter future, one robot at a time!",
  //   link: "https://www.sciencekidz.in",
  // },
  {
    label: "First Robotics Competition",
    img: "/wewtrw.png",
    description:
      "FIRST ® Robotics Competition Combining the excitement of sport with the rigors of science and technology",
    link: "https://www.firstinspires.org/robotics/frc",
  },
  {
    label: "IIT TechFest",
    img: "/tfest.png",
    description:
      "IIT Bombay's Annual Science and Technology Festival organized by the student community of IIT Bombay. ",
    link: "https://techfest.org/",
  },
  {
    label: "WSRO",
    img: "/wsro.png",
    description:
      "WSRO is a company that organizes robotics and STEM competitions for students aged 4 to 20 yearsFIRST ® Robotics Competition Combining the excitement of sport with the rigors of science and technology",
    link: "https://techfest.org/",
  },
  {
    label: "Robotex",
    img: "/robotex.png",
    description:
      "Robotex India is a non-profit organization that hosts regional and national robotics championships and exhibitions in India and abroad.",
    link: "https://techfest.org/",
  },
  {
    label: "Codeavour",
    img: "/codeavour.png",
    description:
      "Codeavour 5.0 International is the biggest coding competition for students to foster creativity, innovation, and entrepreneurial skills among students aged 7 to 18 years, with ...",
    link: "https://techfest.org/",
  },
  {
    label: "World Robots",
    img: "/world_robots.png",
    description:
      "World of Robots is the tactical online shooter game about walking war robots. Join epic PvP online battles against rivals from all over the world!",
    link: "https://techfest.org/",
  },
  {
    label: "Vex",
    img: "/vex.png",
    description:
      "VEX Robotics offers a range of robotics solutions for different levels of STEM education, from Pre-K to college.",
    link: "https://techfest.org/",
  },
  {
    label: "Make X",
    img: "/make_x.png",
    description:
      "As the core activity of MWRC MakeX, the namesake MWRC MakeX Robotics Competition provides exciting, challenging and high-level competitions in the spirit of creativity, …",
    link: "https://techfest.org/",
  },
];

const competitionsData = [
  { img: "/wewtrw.png" },
  { img: "/tfest.png" },
  { img: "/wsro.png" },
  { img: "/robotex.png" },
  { img: "/codeavour.png" },
  { img: "/world_robots.png" },
  { img: "/vex.png" },
  { img: "/make_x.png" },
];

export function Competitions() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [flipped, setFlipped] = useState(false);

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (rect.width) {
      setFlipped(true);
      setTimeout(() => {
        setActiveIndex(index);
        setFlipped(false);
      }, 300);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-md mb-10">
        <iframe
          src="https://www.youtube.com/embed/6e-5Uo1dRic?rel=0&autoplay=0&mute=1"
          className="w-full h-full rounded-md"
          loading="lazy"
          allowFullScreen={false}
        ></iframe>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-10 my-0 md:my-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 mx-auto">
          {competitionsData.map((e, index) => (
            <div
              key={index}
              className={`w-36 md:w-auto xl:w-auto h-16 md:h-auto xl:h-28 rounded-2xl cursor-pointer md:px-5 md:py-2 flex justify-center items-center hover:shadow-lg hover:bg-white duration-200 hover:scale-110 ${
                activeIndex === index
                  ? "grayscale-0 bg-white shadow-lg border border-blue-900"
                  : "grayscale"
              }`}
              onMouseEnter={(e) => handleMouseEnter(index, e)}
            >
              <Image
                src={e.img}
                alt="MindFac"
                height={100}
                width={120}
                objectFit="center"
                objectPosition="center"
                sizes="100vw"
                className={`h-[100px] py-4 md:py-0 object-contain object-center md:w-44 hover:scale-110 duration-200 rounded-xl`}
              />
            </div>
          ))}
        </div>
        <div className="max-w-full md:max-w-[400px] w-full mx-auto h-[400px]">
          <div
            className={`scene ${
              flipped ? "flipped" : ""
            } flex justify-center items-center`}
          >
            <div className="card relative">
              <div className="card__face card__face--back absolute left-0 top-0">
                <div className="min-h-40 md:min-h-[410px] w-full rounded-2xl text-xs md:text-sm xl:text-base bg-white shadow-md border-[0.2px] border-blue-800 p-4 md:p-10 flex justify-center items-center flex-col gap-4">
                  <h3 className="text-lg md:text-2xl font-medium">
                    {activeIndex === -1
                      ? "Science Kidz"
                      : contentList[activeIndex]?.label}
                  </h3>
                  {activeIndex === -1 ? (
                    <Image
                      src={"/science-kidz.png"}
                      alt="MindFac"
                      height={100}
                      width={120}
                      sizes="100vw"
                      className="hover:grayscale-0 object-contain object-center h-[100px] md:w-44 grayscale-0 duration-200"
                    />
                  ) : (
                    <Image
                      src={contentList[activeIndex]?.img}
                      alt="MindFac"
                      height={100}
                      width={120}
                      sizes="100vw"
                      className="hover:grayscale-0 object-contain object-center h-[100px] md:w-44 grayscale-0 duration-200"
                    />
                  )}
                  <div className="text-justify">
                    {activeIndex === -1
                      ? "Building a brighter future, one robot at a time!"
                      : contentList[activeIndex]?.description}
                  </div>
                  <Link
                    target="_blank"
                    href={
                      activeIndex === -1
                        ? "https://www.sciencekidz.in"
                        : contentList[activeIndex]?.link
                    }
                  >
                    <button className="btn mt-2 md:mt-4">See More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarqueeEffect({ from, to }: { from: string; to: string }) {
  return (
    <motion.div
      initial={{ x: `${from}` }}
      animate={{ x: `${to}` }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="flex flex-shrink-0"
    >
      {competitionsData.map((e, index) => (
        <div
          key={index}
          className={`w-36 md:w-auto xl:w-auto h-16 md:h-auto xl:h-28 rounded-[45px] cursor-pointer md:px-5 md:py-2 flex justify-center items-center`}
        >
          <Image
            alt=""
            src={e.img}
            key={index}
            height={100}
            width={120}
            sizes="100vw"
            className="hover:grayscale-0 w-24 md:w-44 grayscale hover:scale-110 duration-200"
          />
        </div>
      ))}
    </motion.div>
  );
}
