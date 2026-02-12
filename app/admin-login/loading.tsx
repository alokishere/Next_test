import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-[400px] w-full bg-transparent flex justify-center items-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
