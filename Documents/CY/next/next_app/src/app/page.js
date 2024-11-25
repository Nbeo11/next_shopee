/* eslint-disable @next/next/no-img-element */
import styles from "./Page.module.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./globals.css";

export default function Home() {
  return (
    <div className="layout">
      <Header />
      <div className="max-w-6xl mx-auto content w-full">
        <div className="flex relative items-center justify-center h-48 w-full">
          <img src="/images/banner.png" alt="Banner" className="h-48 w-full" />
          <img
            src="/images/banner2.png"
            alt="Banner2"
            className="h-48 w-full"
          />
          <img
            src="/images/banner3.png"
            alt="Banner3"
            className="h-48 w-full"
          />
          <img
            src="/images/banner4.png"
            alt="Banner4"
            className="h-48 w-full"
          />
          <div
            className="absolute text-gray-900 text-2xl font-bold uppercase text-center px-4 py-2 rounded"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Welcome to our shop
          </div>
        </div>

        <div className="px-10 pt-10 pb-6">
          <div className="text-xl font-bold mb-6">About my shop</div>
          <div className="flex justify-evenly flex-col md:flex-row">
            <div className="relative h-72">
              <img
                src="/images/card.png"
                alt="Card"
                className="h-full w-full object-cover shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center px-24 text-justify leading-8">
                Welcome to MiniShop! We’re dedicated to providing quality,
                trendy products that cater to every style. Enjoy a seamless
                shopping experience with our curated collections and friendly
                customer support. Visit us to discover exclusive deals and new
                arrivals!
              </div>
            </div>
            <div className="flex flex-col">
              <img
                src="/images/cartoon.gif"
                alt="cartoon"
                className="h-36 w-fit"
              />
              <div className="flex justify-evenly">
                <img src="/images/gif1.gif" alt="Gif1" className="h-24 w-fit" />
                <img src="/images/gif2.gif" alt="Gif2" className="h-36 w-fit" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 pb-16">
          <div className="text-xl font-bold mb-6">Service</div>
          <div
            className={`${styles.borderAnimated} p-2 text-justify leading-8`}
          >
            At MiniShop, we offer a range of services to enhance your shopping
            experience. Enjoy fast and reliable delivery, comprehensive warranty
            on all products, and personalized product consultations to help you
            make the best choice. We are here to ensure your satisfaction every
            step of the way!
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
