import { ImageType } from "@/app/page";
import { ImageModel } from "@/models/image.model";
import { dbConnect } from "@/service/dbConnect";

export async function getAllImages() {
  await dbConnect();

  const images = await ImageModel.find({});
  return JSON.parse(JSON.stringify(images)) as ImageType[];
}
