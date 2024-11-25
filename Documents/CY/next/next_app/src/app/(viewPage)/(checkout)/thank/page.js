"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

export default function ThankYouPage() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center py-16 gap-8">
      <div className="relative overflow-hidden max-w-md h-96">
        <Image
          src="/images/thankyou.png"
          alt="Thank You"
          width={400}
          height={288}
          className="max-w-md h-72"
        />
        <Image
          src="/images/cartshopping.gif"
          alt="Shopping Cart"
          width={80}
          height={60}
          className="animated-gif mt-72 h-20 absolute top-0 right-0"
        />
      </div>
      <div className="flex gap-8 text-xl">
        <div
          className="hover:scale-105 hover:text-blue-600 hover:cursor-pointer transition-all"
          onClick={() => navigateTo("/orders")}
        >
          View your order
        </div>
        <div
          className="hover:scale-105 hover:text-blue-600 hover:cursor-pointer transition-all"
          onClick={() => navigateTo("/products")}
        >
          Continue shopping
        </div>
      </div>
    </div>
  );
}
