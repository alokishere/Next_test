import Image from "next/image";
import Link from "next/link";

export function CourseCard({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) {
  return (
    <div className=" relative md:h-[550px] md:w-[400px] bg-white border-zinc-300 border md:border-zinc-300 rounded-2xl text-xs md:text-sm xl:text-base p-10 z-10 shadow-2xl">
      <div className="h-auto w-full cursor-pointer z-10 flex justify-center items-center">
        <Image
          src={img}
          alt={title}
          sizes="100vw"
          width={300}
          height={250}
          className="h-full w-[90%] object-cover object-center rounded-2xl transform hover:scale-110 duration-500 z-0 drop-shadow-lg"
        />
      </div>
      <div className="py-5 divide-y-2 divide-transparent flex flex-col">
        <h3 className="md:text-base xl:text-[25px] text-red-500 text-xl font-semibold self-center text-center z-20">
          {title}
        </h3>
        <p className="md:block mt-3 text-black text-center sm:text-center">
          {description}
        </p>
      </div>
      <div className="w-full absolute bottom-10 left-0 flex justify-center items-center">
        <button className="sbmt-btn">
          <Link href={"/contact-us"}>Book Demo</Link>
        </button>
      </div>
    </div>
  );
}
