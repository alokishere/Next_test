"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

import { sendUserMail } from "@/action/action";
import { getErrorMessage } from "@/lib/errorMessageHandler";

export const MailFormSchema = z.object({
  studentName: z.string().min(3, { message: "Student name is too short" }),
  phoneNumber: z.string().min(10).max(12),
  email: z.string().email({ message: "Invalid Email" }),
  grade: z.string(),
  message: z
    .string()
    .min(5, { message: "Message is too short to mail an email" }),
});
export type MailFormType = z.infer<typeof MailFormSchema>;

export function MailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MailFormType>({
    resolver: zodResolver(MailFormSchema),
    defaultValues: {
      studentName: "",
      email: "",
      grade: "",
      message: "",
    },
  });

  const MailSubmit: SubmitHandler<MailFormType> = async (data) => {
    try {
      const formData = new FormData();
      formData.set("studentName", data.studentName);
      formData.set("phoneNumber", data.phoneNumber);
      formData.set("email", data.email);
      formData.set("grade", data.grade);
      formData.set("message", data.message);

      const res = await sendUserMail(formData);
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
      className="flex flex-col gap-3 m-7 lg:m-10"
      onSubmit={handleSubmit(MailSubmit)}
    >
      <h3 className="self-center pb-4 text-base md:text-xl lg:text-2xl text-white">
        Inquire Now
      </h3>
      <input
        type="text"
        {...register("studentName")}
        id="studentName"
        className="h-5 md:h-10 rounded-md bg-white p-4"
        placeholder="Student name"
        autoComplete="off"
        required
      />
      <input
        type="tel"
        {...register("phoneNumber")}
        id="phoneNumber"
        className="h-5 md:h-10 rounded-md bg-white p-4"
        placeholder="Phone no"
        autoComplete="off"
        required
      />
      <input
        type="email"
        {...register("email")}
        id="email"
        className="h-5 md:h-10 rounded-md bg-white p-4"
        placeholder="Email"
        autoComplete="off"
        required
      />
      <input
        type="text"
        {...register("grade")}
        id="grade"
        className="h-5 md:h-10 rounded-md bg-white p-4"
        placeholder="Student Grade"
        autoComplete="off"
        required
      />
      <textarea
        {...register("message")}
        id="message"
        className="h-[128px] rounded-md bg-white p-4"
        placeholder="Message"
        autoComplete="off"
      />
      <button
        className={`sbmt-btn ${isSubmitting ? "inline-block" : "flex justify-center items-center"}`}
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
