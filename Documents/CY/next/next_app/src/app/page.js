import Image from "next/image";
import styles from "./Page.module.css";
import banner from "./assets/images/banner.png";
import banner2 from "./assets/images/banner2.png";
import banner3 from "./assets/images/banner3.png";
import banner4 from "./assets/images/banner4.png";
import card from "./assets/images/card.png";
import cartoon from "./assets/images/cartoon.gif";
import gif1 from "./assets/images/gif1.gif";
import gif2 from "./assets/images/gif2.gif";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./globals.css";

export default function Home() {
  return (
    <div className="layout">
      <Header />
      <div className="max-w-6xl mx-auto content w-full">
        <div className="flex relative items-center justify-center h-48 w-full">
          <Image src={banner} alt="Banner" className="h-48 w-full" />
          <Image src={banner2} alt="Banner" className="h-48 w-full" />
          <Image src={banner3} alt="Banner" className="h-48 w-full" />
          <Image src={banner4} alt="Banner" className="h-48 w-full" />
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
              <Image
                src={card}
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
              <Image src={cartoon} alt="Cartoon" className="h-36 w-fit" />
              <div className="flex justify-evenly">
                <Image src={gif1} alt="GIF 1" className="h-24 w-fit" />
                <Image src={gif2} alt="GIF 2" className="h-36 w-fit" />
              </div>
            </div>
          </div>
        </div>

        {/* Service Section */}
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
