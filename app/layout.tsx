import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/globals.scss"; // Import the global styles

export default function Layout({ children }: { children: ReactNode }) {
  console.log('Current NODE_ENV:', process.env.NODE_ENV);
  console.log('Current API_URL:', process.env.API_URL);
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