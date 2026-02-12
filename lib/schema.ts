import { z } from "zod";

export const ContactUsForm = z.object({
  studentName: z.string(),
  email: z.string().email(),
  message: z.string(),
  phone: z.number().max(10).min(10),
  grade: z.string(),
});

export type ContactUsFormType = z.infer<typeof ContactUsForm>;

export const UploadFile = z.object({
  files: z.array(z.instanceof(File)),
});

export type UploadFileType = z.infer<typeof UploadFile>;

