import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  port: 587,
  secure: false,
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});
