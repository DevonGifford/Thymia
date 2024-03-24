import { Toaster } from "react-hot-toast";
import UserContextProvider from "../providers/UserContextProvider";
import NavBar from "../components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Two-back",
  description: "A frontend technical assessment by Devon Gifford",
};

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#8b69d473",
          color: "#fff",
          display: "flex",
          textAlign: "center",
        },
      }}
    />
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <ToasterProvider />
          <NavBar />
          <main className="flex h-full md:h-screen py-24 sm:py-32 justify-center flex-col gap-5 md:gap-10 mx-5 md:mx-20 items-center">
            {children}
          </main>
        </UserContextProvider>
      </body>
    </html>
  );
}
