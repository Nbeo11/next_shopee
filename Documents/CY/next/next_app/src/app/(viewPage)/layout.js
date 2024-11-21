import localFont from "next/font/local";
import "../globals.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="content w-full"> {children}</main>
      <Footer />
    </div>
  );
}
