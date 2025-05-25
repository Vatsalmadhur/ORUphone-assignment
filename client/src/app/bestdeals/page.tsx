import AppSidebar from "@/components/common/AppSidebar";
import CardContainer from "@/components/common/cardContainer";
import React from "react";
export default function BestDeals() {
  return (
    <>
     <div className=" w-screen h-auto min-h-screen flex md:flex-row flex-col ">
      <div className=""><AppSidebar/></div>
      <div className="w-full min-h-screen h-auto">
        <CardContainer items={20} hideBtn={true}/>
        </div>
      </div>
    </>
  );
}
