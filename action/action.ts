"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getBlurImage } from "@/lib/blur-image";
import { getErrorMessage } from "@/lib/errorMessageHandler";
import { ImageModel } from "@/models/image.model";
import { IUser, UserModel } from "@/models/user.model";
import { DeleteImage, UploadImage } from "@/service/cloudinary";
import { dbConnect } from "@/service/dbConnect";
import { transporter } from "@/service/nodemailer";

interface IMailOptions {
  from: {
    name: string;
    address: string;
  };
  to: string;
  subject: string;
  text: string;
  html: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

function generateSixDigitNumber(): string {
  const number = Math.floor(Math.random() * 1000000);
  return number.toString().padStart(6, "0");
}

export async function sendUserMail(
  formData: FormData
): Promise<{ ok: boolean; success: boolean; status: number; message: string }> {
  try {
    const studentName: string = formData.get("studentName") as string;
    const phoneNumber: string = formData.get("phoneNumber") as string;
    const email: string = formData.get("email") as string;
    const grade: string = formData.get("grade") as string;
    const message: string = formData.get("message") as string;

    const userMail = {
      from: {
        name: "Sciencekidz Inquiry User Mail",
        address: "lifeinfosandeep01@gmail.com",
      },
      to: `${email}`,
      subject: "Inquiry mail response",
      text: `Thank you for inquiry we will contact you soon.`,
      html: `<div>
              Thank you for inquiry we will contact you soon.
            </div>`,
    };

    await transporter.sendMail(userMail);

    const mailOptions: IMailOptions = {
      from: {
        name: "Sciencekidz Inquiry",
        address: "lifeinfosandeep01@gmail.com",
      },
      to: "man.parekh@gmail.com, manish@sciencekidz.in, info@sciencekidz.in",
      subject: "Inquiry mail",
      text: `New Mail from ${email}
            Student Details
            Name: ${studentName}
            Phone Number: ${phoneNumber}
            Grade: ${grade}
            Message: ${message}`,
      html: `<div>
              <h1>New Mail from ${email}</h1>
              <br />
              <h4>Student Details</h4>
              <p>Name: ${studentName}</p>
              <p>Phone Number: ${phoneNumber}</p>
              <p>Grade: ${grade}</p>
              <br />
              <div>Message: ${message}</div>
            </div>`,
    };

    const res = await transporter.sendMail(mailOptions);
    console.log("RES", res);
    return {
      ok: true,
      success: true,
      status: 200,
      message: "Mail sent successfully",
    };
  } catch (error: unknown) {
    return {
      ok: false,
      success: false,
      status: 500,
      message: getErrorMessage(error),
    };
  }
}

export async function CheckValidEmail(userEmail: string) {
  try {
    await dbConnect();
    console.log("[USER_INPUT_EMAIL]", userEmail);
    const user = await UserModel.findOne({ email: userEmail });
    console.log("[SERVER_FIND_USER]", user);
    if (!user)
      return { ok: false, success: false, message: "Email is invalid" };
    return { ok: true, success: true, message: "Email is valid" };
  } catch (error: unknown) {
    return { ok: false, success: false, message: getErrorMessage(error) };
  }
}

export async function sendOTPMail(userEmail: string) {
  try {
    const user: IUser | null = await UserModel.findOne({ email: userEmail });

    if (!user) throw new Error("User Not Found");

    const currentTime: Date = new Date();
    const resendOtpTime: Date = new Date(user.resendOtp);

    // Check if at least one minute has passed since the last OTP was sent
    if (currentTime.getTime() < resendOtpTime.getTime() - 120000) {
      const timeRemaining: number = Math.ceil(
        (resendOtpTime.getTime() - currentTime.getTime() - 60000) / 1000
      );
      throw new Error(
        `Please wait ${Math.floor(timeRemaining / 60)} minutes and ${
          timeRemaining % 60
        } seconds before requesting a new OTP.`
      );
    }

    const otp: string = generateSixDigitNumber();

    // Set resendOtp to 3 minutes in the future
    const newResendOtpTime = new Date(currentTime.getTime() + 3 * 60000);

    await UserModel.updateOne(
      { email: userEmail },
      { $set: { otp, resendOtp: newResendOtpTime } }
    );

    const mailOptions: IMailOptions = {
      from: {
        name: "ScienceKidz OTP",
        address: "info@sciencekidz.in",
      },
      to: "man.parekh@gmail.com, info@sciencekidz.in",
      subject: "OTP verification using Nodemailer | Testing ✔",
      text: `OTP ${otp}`,
      html: `<div>
                <h1>OTP: ${otp}</h1>
              </div>`,
    };

    await transporter.sendMail(mailOptions);

    return { ok: true, success: true, message: "Otp sent successfully" };
  } catch (error: unknown) {
    return { ok: false, success: false, message: getErrorMessage(error) };
  }
}

export async function UploadGalleryImage(
  formData: FormData
): Promise<UploadResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.email) throw new Error("Unauthorized User");

    const images: File[] = formData.getAll("files") as File[];

    if (images.length === 0) {
      throw new Error("Images aren't available");
    }

    await dbConnect();

    const mediaArr = images.map((file) => UploadImage(file, "GALLERY_IMAGES"));
    const mediaRes = (await Promise.all(mediaArr)) as Array<{
      asset_id: string;
      public_id: string;
      secure_url: string;
    }>;

    const blurUrlPromises = mediaRes.map(({ secure_url }) =>
      getBlurImage(secure_url)
    );
    const blurUrls = await Promise.all(blurUrlPromises);

    const media = mediaRes.map((item, index) => ({
      asset_id: item.asset_id,
      public_id: item.public_id,
      secure_url: item.secure_url,
      blur_url: blurUrls[index].base64,
    }));

    const imagesModelPromises = media.map((item) => ImageModel.create(item));
    const imagesModelResults = await Promise.all(imagesModelPromises);

    revalidatePath("/");

    if (imagesModelResults.length) {
      return { success: true, message: "Images uploaded successfully" };
    }

    return { success: false, message: "Unable to upload Images" };
  } catch (error: unknown) {
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function DeleteGalleryImage(
  public_ids: string[]
): Promise<DeleteResponse> {
  if (public_ids.length === 0) {
    return { success: false, message: "Files aren't available" };
  }

  try {
    await dbConnect();

    const deleteImagePromises = public_ids.map((id) => DeleteImage(id));
    const deleteModelPromises = public_ids.map((id) =>
      ImageModel.deleteMany({ public_id: id })
    );

    const deletedData = await Promise.all([
      ...deleteImagePromises,
      ...deleteModelPromises,
    ]);

    console.log("DELETED_IMAGES", deletedData);
    revalidatePath("/");

    if (deletedData.length) {
      return { success: true, message: "Images deleted successfully" };
    }

    return { success: false, message: "Unable to delete Images" };
  } catch (error: unknown) {
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function sendContactMail(formData: FormData): Promise<{
  ok: boolean;
  success: boolean;
  status: number;
  message: string;
}> {
  try {
    const firstName: string = formData.get("firstName") as string;
    const lastName: string = formData.get("lastName") as string;
    const phoneNumber: string = formData.get("phoneNumber") as string;
    const email: string = formData.get("email") as string;
    const course: string = formData.get("course") as string;
    const message: string = formData.get("message") as string;

    const mailOptions: IMailOptions = {
      from: {
        name: "Sciencekidz Inquiry",
        address: "lifeinfosandeep01@gmail.com",
      },
      to: "man.parekh@gmail.com, manish@sciencekidz.in, info@sciencekidz.in",
      subject: "Contact Mail",
      text: `New Mail from ${email} for ${course}
            Contact Us Details
            Name: ${firstName} ${lastName}
            Phone Number: ${phoneNumber}
            Message: ${message}`,
      html: `<div>
              <h1>New Mail from ${email} for ${course}</h1>
              <br />
              <h4>Student Details</h4>
              <p>Name: ${firstName} ${lastName}</p>
              <p>Phone Number: ${phoneNumber}</p>
              <br />
              <div>Message: ${message}</div>
            </div>`,
    };

    const res = await transporter.sendMail(mailOptions);
    console.log(res);
    return {
      ok: true,
      success: true,
      status: 200,
      message: "Mail sent successfully",
    };
  } catch (error: unknown) {
    return {
      ok: false,
      success: false,
      status: 500,
      message: getErrorMessage(error),
    };
  }
}
