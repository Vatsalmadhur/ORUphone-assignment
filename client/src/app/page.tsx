import Banner from "@/components/common/banner";
import CardContainer from "@/components/common/cardContainer";
import CustomerContainer from "@/components/common/customerContainer";
import Heading from "@/components/common/heading";
import Highlight from "@/components/common/highlight";
import Spacer from "@/components/common/spacer";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import React from "react";
export default function page() {
  return (
    <>
      <div className="flex flex-col px-16 items-center ">
      <Hero />
      <Highlight
        subHeading="POPULAR BRANDS"
        heading="Browse all brands on our platform"
        text="We buy products belonging to a wide range of brands and manufacturers around the globe"
      />
        <Spacer height={50}/>
      <Marquee />
     <Spacer height={100}/> 
        <Heading title="Top Deals" subTitle="India"/>
        <Spacer height={50}/>
      <CardContainer items={9} />
      <CustomerContainer />
    </div>
    <Banner/>
    </>
  );
}
