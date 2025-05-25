import Image from "next/image";
import React from "react";
import MarqueeReact from "react-fast-marquee";
export default function Marquee() {
  const images = ["a1.webp", "a2.webp", "a3.webp", "a4.webp", "a5.webp"];
  const images2 = ["a6.webp", "a7.webp", "a8.webp", "a9.webp", "a10.webp"];

  return (
    <div className="space-y-6 md:w-[60vw] w-[100vw]">
      {/* First Marquee */}
      <MarqueeReact speed={40} gradient={true} direction="left"></MarqueeReact>

      <MarqueeReact speed={40} gradient={true} direction="left">
        {images.map((img, idx) => (
          <div key={`row2-${idx}`} className="px-14">
            <Image src={`/${img}`} alt={img} width={80} height={80} />
          </div>
        ))}
      </MarqueeReact>

      {/* Second Marquee */}
      <MarqueeReact speed={40} gradient={true} direction="right">
        {images2.map((img, idx) => (
          <div key={`row2-${idx}`} className="px-14">
            <Image src={`/${img}`} alt={img} width={80} height={80} />
          </div>
        ))}
      </MarqueeReact>
    </div>
  );
}
