import React from "react";
export default function Banner() {
  return (
    <div className="w-full h-auto bg-[var(--custom-yellow-dark)] flex flex-col gap-4 p-10 items-center justify-center">
      <p className="text-4xl font-bold text-gray-700">
        Trusted by 5,00,000+ Users
      </p>
      <p className="text-xl max-w-[800px] text-center  text-gray-800">
        We provide our users a complete solution wherein customer can enjoy to
        sell old or used phones, tablets and watches hassle free online
      </p>
      <div className="md:w-[600px] w-[350px]  flex   items-center justify-center gap-5">
        <div className="text-center">
          <p className="md:text-5xl text-3xl font-bold text-gray-700">500k+</p>
          <p className="md:text-lg text-sm text-gray-800">Users in multiple cities</p>
        </div>
        <div className="text-center">
          <p className="md:text-5xl text-3xl font-bold text-gray-700">100+</p>
          <p className="md:text-lg text-sm text-gray-800">Cities</p>
        </div>
        <div className="text-center">
          <p className="md:text-5xl text-3xl font-bold text-gray-700">4.6</p>
          <p className="md:text-lg text-sm text-gray-800">PlayStore Rating</p>
        </div>
      </div>
    </div>
  );
}
