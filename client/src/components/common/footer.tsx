import Image from "next/image";
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-[#06275C] w-full text-white px-6 md:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 text-sm text-[#E2E8F0]">
        {/* About Us */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">About Us</h3>
          <ul className="space-y-2">
            {[
              "Company Information",
              "Contact Us",
              "Services",
              "Sitemap",
              "Create store",
              "Report Problem",
              "Blogs",
              "Privacy Policy",
              "Terms & Services"
            ].map((item) => (
              <li key={item} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>

          {/* Logo */}
        </div>

        {/* Phones */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Phones</h3>
          <ul className="space-y-2">
            {[
              "Apple",
              "Samsung",
              "Xiaomi",
              "OnePlus",
              "Realme",
              "Oppo",
              "Vivo",
              "Motorola",
              "Nokia",
              "Asus",
              "Sell Used Phones"
            ].map((brand) => (
              <li key={brand} className="hover:underline cursor-pointer">
                {brand}
              </li>
            ))}
          </ul>
        </div>

        {/* Top Deals Near You */}
        <div className="md:col-span-1 lg:col-span-2">
          <h3 className="text-white font-semibold text-lg mb-4">
            Top Deals Near You
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-2 gap-x-4">
            {[
              "Bihar", "Arunachal-Pradesh", "Andhra-Pradesh", "Assam", "Goa",
              "Gujarat", "Chhattisgarh", "Haryana", "Himachal-Pradesh",
              "Jharkhand", "Karnataka", "Kerala", "Madhya-Pradesh", "Maharashtra",
              "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
              "Rajasthan", "Sikkim", "Tamil-Nadu", "Telangana", "Tripura",
              "Uttarakhand", "Uttar-Pradesh", "West-Bengal", "Lakshwadeep",
              "Chandigarh", "Ladakh"
            ].map((state) => (
              <div key={state} className="hover:underline cursor-pointer">
                {state}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <Image src='./OLDPhones4.svg' alt="logo here" width={150} height={150}/>
      </div>
    </footer>
  );
};

export default Footer;

