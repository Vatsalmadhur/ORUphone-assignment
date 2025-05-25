import { customerReviews } from "@/dummyData";
import React from "react";
import CustomerCard from "./customerCard";
import Highlight from "./highlight";
export default function CustomerContainer() {
  return ( <>
    <Highlight subHeading="Reviews" heading="What do our users say?" text="We believe in providing the best service & experience to all our users."/>
    <div className="w-[100vw] min-h-[500px] overflow-x-scroll flex items-center px-16 ">
       <div className="w-[200vw]  flex flex-nowrap gap-4 px-4">
      {customerReviews.map((item, index) => (
        <CustomerCard
          review={item.review}
          name={item.name}
          location={item.location}
          key={index}
        />
      ))}
</div>
    </div>
    </>
  );
}
