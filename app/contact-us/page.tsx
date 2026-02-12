import { ContactForm } from "@/components/contact-form";

export default function Page() {
  return (
    <div className="lg:p-8 min-h-[69vh] flex justify-center items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[500px] lg:w-[800px]">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-full rounded-[30px] border-white bg-gradient-to-br from-[#080b28] to-[#232fb6] text-black z-20 mb-10 p-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
