"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { getErrorMessage } from "@/lib/errorMessageHandler";
import { sendContactMail } from "@/action/action";
import { useState } from "react";

export const ContactFormSchema = z.object({
  firstName: z.string().min(3, { message: "Student name is too short" }),
  lastName: z.string().min(3, { message: "Student name is too short" }),
  phoneNumber: z.string().min(10).max(12),
  email: z.string().email({ message: "Invalid Email" }),
  grade: z.string(),
  message: z
    .string()
    .min(5, { message: "Message is too short to mail an email" }),
});

export type MailFormType = z.infer<typeof ContactFormSchema>;

export function ContactForm() {
  const [selectCourse, setSelectCourse] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MailFormType>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      grade: "",
      message: "",
    },
  });

  const ContactFormSubmit: SubmitHandler<MailFormType> = async (data) => {
    try {
      const formData = new FormData();
      formData.set("firstName", data.firstName);
      formData.set("lastName", data.lastName);
      formData.set("phoneNumber", data.phoneNumber);
      formData.set("email", data.email);
      formData.set("grade", data.grade);
      formData.set("course", selectCourse);
      formData.set("message", data.message);

      const res = await sendContactMail(formData);
      if (res.ok) {
        reset();
      } else {
        toast(`Error: ${res.message}`);
      }
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      reset();
    }
  };

  return (
    <form
      className="flex flex-col gap-3 p-4 sm:p-5 md:p-7 lg:m-2"
      onSubmit={handleSubmit(ContactFormSubmit)}
    >
      <h3 className="self-start pb-2 text-sm sm:text-base md:text-xl lg:text-2xl text-white">
        Contact Us
      </h3>

      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="text-white">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("firstName")}
          id="firstName"
          className="h-8 sm:h-9 md:h-10 rounded-md bg-white p-3 md:p-4"
          placeholder="First name"
          autoComplete="off"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="lastName" className="text-white">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("lastName")}
          id="lastName"
          className="h-8 sm:h-9 md:h-10 rounded-md bg-white p-3 md:p-4"
          placeholder="Last name"
          autoComplete="off"
          required
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-10 justify-center items-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="text-white">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register("phoneNumber")}
            id="phoneNumber"
            className="h-8 sm:h-9 md:h-10 rounded-md bg-white p-3 md:p-4"
            placeholder="Phone no"
            autoComplete="off"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className="h-8 sm:h-9 md:h-10 rounded-md bg-white p-3 md:p-4"
            placeholder="Email"
            autoComplete="off"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="course" className="text-white">
          Course <span className="text-red-500">*</span>
        </label>
        <select
          name="course"
          id="course"
          className="h-8 sm:h-9 md:h-10 rounded-md bg-white px-3"
          onChange={(e) => setSelectCourse(e.target.value)}
        >
          <option value=""></option>
          <option value="Builder">Builder</option>
          <option value="Tinkerer">Tinkerer</option>
          <option value="Jr_Techie">Jr.Techie</option>
          <option value="Tech_Explorer">Tech Explorer</option>
          <option value="Tech_Maker">Tech Maker</option>
          <option value="Pi_Champ">Pi Champ</option>
          <option value="Computing_with_Arduino">Computing with arduino</option>
          <option value="Block_coding_with_Scratch">
            Block Coding with Scratch
          </option>
          <option value="Python_Coding">Python Coding</option>
          <option value="Mobile_app_Design">Mobile App Design</option>
          <option value="Java_Fundamentals">Java Fundamentals</option>
          <option value="Python_AI_with_Computer_Vision">
            Python AI with Computer Vision
          </option>
          <option value="Robotics_Maker">Robotics Maker</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-white">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message")}
          id="message"
          className="h-28 sm:h-32 md:h-40 rounded-md bg-white p-3 md:p-4"
          placeholder="Message"
          autoComplete="off"
        />
      </div>

      <button
        className={`sbmt-btn ${
          isSubmitting ? "inline-block" : "flex justify-center items-center"
        } mt-4 sm:mt-5 md:mt-6`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoaderCircle className="animate-spin" size={24} />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
