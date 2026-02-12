import { AuthForm } from "@/components/auth-form";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

export default function Page({ searchParams }: Props) {
  return (
    <div className="lg:p-8 min-h-[69vh] flex justify-center items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign In using Email
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password below to Sign In
          </p>
        </div>
        <AuthForm callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  );
}
