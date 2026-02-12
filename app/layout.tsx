import { Footer } from "@/components/footer";
import { InnerNavbar, OuterNavbar } from "@/components/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { MobileNav } from "@/components/mobile-sidebar";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/context/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScienceKidz",
  description:
    "Science Kidz is a company with an active maker community that provides a platform to foster creativity and innovation in the fields of electronics, robotics, and physical computing through a kit-based learning approach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <AuthProvider>
          <NextTopLoader showSpinner={false} />
          <OuterNavbar />
          <MobileNav />
          <main
            className="flex w-full flex-col items-center justify-center bg-[#ffffff]"
            style={{
              backgroundImage: `url("/bg-svg.svg")`,
              backgroundSize: "1920px 1080px",
            }}
          >
            <InnerNavbar />
            {children}
            <Footer />
            <Toaster />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
