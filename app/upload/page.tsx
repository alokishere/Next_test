import { UploadFile } from "@/components/upload-file";
import { getAllImages } from "@/lib/data";
import { revalidatePath } from "next/cache";

export default async function Page() {
  revalidatePath("/");
  const images = await getAllImages();

  return (
    <div className="flex justify-center items-center min-h-[69vh]">
      <UploadFile existingGalleryImages={images} />
    </div>
  );
}
