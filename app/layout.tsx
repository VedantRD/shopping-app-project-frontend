import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/globals.scss"; // Import the global styles

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <html>
        <body className="flex flex-col">
          <header className="grow-0">
            <Navbar />
          </header>
          <div className="grow">{children}</div>
          <div className="grow-0">
            <Footer />
          </div>
        </body>
      </html>
    </>
  );
}