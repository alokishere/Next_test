import Image from "next/image";

import { Competitions } from "@/components/competitions";
import { CourseCard } from "@/components/course-card";
import { MailForm } from "@/components/mail-form";
import { TypeAnimationComponent } from "@/components/type-animation";
import { getAllImages } from "@/lib/data";

export type ImageType = {
  _id: string;
  secure_url: string;
  blur_url: string;
  asset_id: string;
  public_id: string;
};

const COURSES_DATA = [
  {
    img: "/Builder.png",
    title: "Builder",
    description:
      "An individual with interests in science, coding, creative thinking, logic building, and structure building.",
  },
  {
    img: "/Tinkerer.png",
    title: "Tinkerer",
    description:
      "Dive into technology experiments, master coding animations and games, develop algorithmic thinking, and explore the fascinating world of simple machines",
  },
  {
    img: "/Jr-Techie.png",
    title: "Jr. Techie",
    description:
      "Explore S.T.E.A.M activities, master sequential and conditional coding, discover automation hacks, and build sensor-based robots.",
  },
  {
    img: "/Tech-Explorer.png",
    title: "Tech Explorer",
    description:
      "Explore electronics, master coding with physical computing, and dive into the exciting world of robotics.",
  },
  {
    img: "/Tech-Maker.png",
    title: "Tech Maker",
    description:
      "Explore automation with sensors, master wireless technologies, and dive into app designing.",
  },
  {
    img: "/Tech-Wizard.png",
    title: "Tech Wizard",
    description:
      "Explore GUI design, master mobile monitoring systems, delve into the Internet of Things (IoT), and create AI smart systems.",
  },
  {
    img: "/Pi-Champ.png",
    title: "Pi Champ",
    description:
      "Explore Python coding, master AI with Python, dive into Raspberry Pi projects, and delve into the exciting world of computer vision.",
  },
  {
    img: "/Computing-With-Arduino.png",
    title: "Computing with Arduino",
    description:
      "Explore microcontrollers, master C/C++ syntax, delve into digital and analog sensor interfaces, and work on exciting applications projects.",
  },
  {
    img: "/Block-Coding-With-Scratch.png",
    title: "Block Coding with Scratch",

    description:
      "Explore the fundamentals of coding, create captivating animations, understand events and control statements, design 2D games, and much more.",
  },
  {
    img: "/Python-Coding.png",
    title: "Python Coding",

    description:
      "Dive into application-based coding projects, create a password checker app, build a temperature converter app, and explore grade sorting algorithms.",
  },
  {
    img: "/Mobile-App-Design.png",
    title: "Mobile App Design",

    description:
      "Explore GUI design, master text and speech control, delve into web connectivity, enhance app security, and create seamless user interactions.",
  },
  {
    img: "/Java-Fundamentals.png",
    title: "Java Fundamentals",

    description:
      "Explore architecture, data types, user interactive projects, conditional statements, and interactive constructs.",
  },
  {
    img: "/Python-AI-With-Computer-Vision.png",
    title: "Python AI with Computer Vision",
    description:
      "Explore fundamentals, turtle graphics, OpenCV, color detection, and face detection.",
  },
  {
    img: "/Robotics-Maker.png",
    title: "Robotics Maker",
    description:
      "Explore Automation with advanced sensors, applications of analog sensors, display devices and app designing.",
  },
];

const Gallery = ({ images }: { images: ImageType[] }) => {
  return (
    <section
      className="h-auto w-full flex flex-col justify-center items-center mt-10 mb-20"
      id="gallery"
    >
      <h1 className="text-transparent bg-clip-text font-extrabold text-lg md:text-3xl bg-gradient-to-br from-[#080b28] to-[#232fb6] px-3 py-2 rounded-2xl mb-5">
        GALLERY
      </h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-evenly">
        {images.length > 0 &&
          images.map((image, index) => (
            <div
              className="aspect-square bg-white border-black rounded-xl hover:scale-125 duration-150 grayscale hover:grayscale-0 hover:z-10 cursor-pointer"
              key={index}
            >
              <Image
                src={image.secure_url}
                alt="Gallery Image"
                width={200}
                height={200}
                loading="lazy"
                blurDataURL={image.blur_url}
                sizes="100vw"
                className="w-full h-full object-center object-cover rounded-xl"
              />
            </div>
          ))}
      </div>
    </section>
  );
};

const SectionHeader = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => (
  <h1
    className="text-transparent text-lg md:text-4xl bg-clip-text font-extrabold bg-gradient-to-br from-[#080b28] to-[#232fb6] px-3 py-2 rounded-2xl mb-5"
    id={id}
  >
    {children}
  </h1>
);

export default async function Home() {
  const images = (await getAllImages()) as ImageType[];

  return (
    <div className="w-full text-xs md:text-lg xl:text-base px-5 md:px-16 lg:px-36 overflow-hidden">
      <div className="w-full flex justify-start items-center mt-10">
        <TypeAnimationComponent />
      </div>

      <section className="h-auto w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-20">
        <div className="w-full flex justify-center items-center">
          <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]">
            <div className="absolute h-full w-full left-0 top-0 z-0">
              <Image
                src="/bulb.png"
                alt="bulb"
                sizes="100vw"
                height={50}
                width={50}
                className="absolute bg-transparent md:left-[70%] md:bottom-12 lg:left-[71%] lg:bottom-14 lg:w-9 md:w-7 sm:w-7 w-5 sm:bottom-9 sm:right-24 right-[68px] bottom-6 z-30"
              />
              <div
                className="absolute md:left-[70%] md:bottom-16 lg:left-[71%] lg:bottom-[78px] lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-7 sm:h-7 w-5 h-5 rounded-full sm:bottom-14 sm:right-24 right-[68px] bottom-9 animate-blinking-light z-30"
                style={{ background: "radial-gradient(#fff41f, transparent)" }}
              />
              <Image
                src="/gear.png"
                alt="gear"
                sizes="100vw"
                height={100}
                width={100}
                className="absolute h-14 w-14 md:h-[100px] md:w-[100px] -left-10 top-20 animate-slow-spin z-10"
              />
              <Image
                src="/gear.png"
                alt="gear"
                sizes="100vw"
                height={80}
                width={80}
                className="absolute -left-5 bottom-24 md:-left-10 h-8 w-8 md:h-[70px] md:w-[70px] md:bottom-48 animate-reverse-slow-spin z-10"
              />
              <Image
                src="/gear.png"
                alt="gear"
                sizes="100vw"
                height={80}
                width={80}
                className="absolute left-[50%] h-[40px] w-[40px] md:h-[90px] bottom-16 md:w-[90px] md:bottom-20 animate-reverse-slow-spin z-10"
              />
              <Image
                src="/gear.png"
                alt="gear"
                sizes="100vw"
                height={30}
                width={30}
                className="absolute left-[40%] top-[50%] animate-spin z-10"
              />
              <Image
                src="/gear.png"
                alt="gear"
                sizes="100vw"
                height={70}
                width={70}
                className="absolute right-[10px] h-[40px] w-[40px] bottom-14 md:right-[40px] md:h-[70px] md:w-[70px] md:bottom-[130px] animate-slow-spin z-10"
              />
              <Image
                src="/gear.png"
                alt="gear"
                sizes="100vw"
                height={100}
                width={100}
                className="absolute h-14 w-14 md:h-[100px] md:w-[100px] -right-10 top-36 animate-slow-spin z-10"
              />
            </div>
            <Image
              src="/characters.png"
              alt="characters"
              sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
              className="absolute object-contain z-20"
              height={200}
              width={700}
              objectFit="center"
              objectPosition="center"
            />
          </div>
        </div>
        <div className="md:min-w-96 w-[300px] rounded-[30px] border-white bg-gradient-to-br from-[#080b28] to-[#232fb6] text-black bg-blue-600 z-20 mb-10 shadow-xl">
          <MailForm />
        </div>
      </section>

      <section
        className="h-auto w-full flex flex-col justify-center items-center mt-10"
        id="courses"
      >
        <SectionHeader id="courses">COURSES</SectionHeader>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 rounded-md">
          {COURSES_DATA.map((e, index) => (
            <div
              key={e.title}
              className="flex w-full h-full justify-center items-center lg:mb-20 md:mb-14 mb-5"
            >
              <CourseCard
                img={e.img}
                title={e.title}
                description={e.description}
              />
            </div>
          ))}
        </div>
      </section>

      <section
        className="h-auto w-full flex flex-col justify-center items-center mt-10"
        id="competitions"
      >
        <SectionHeader id="competitions">COMPETITIONS</SectionHeader>
        <Competitions />
      </section>

      {images.length > 0 && <Gallery images={images} />}
    </div>
  );
}
