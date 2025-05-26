import { Button } from "@/components/ui/button";
import { dummyDevices } from "@/dummyData";
import { CircleUser, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProductPageProps {
  params: any;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { model } = params;
  const decodedModel = decodeURIComponent(model);

  const deviceDetails = dummyDevices.find((p) => p.model == decodedModel);
  return (
    <div className="w-screen min-h-screen flex md:flex-row md:items-start flex-col items-center md:gap-10 gap-3 justify-center mb-10">
      <div className="w-[40%] min-w-[350px] h-auto  flex  items-center justify-center mt-10">
        <img src={deviceDetails?.images?.[0]} alt="device image here" />
      </div>
      <div className="w-[40%] min-w-[350px] h-[full]  flex flex-col gap-5 mt-10 ">
        <div className="flex flex-col gap-1">
          <p className="text-md  ">{deviceDetails?.make}</p>
          <p className="text-4xl font-bold ">{deviceDetails?.model}</p>
          <p className="text-lg text-gray-700 font-semibold">
            {deviceDetails?.variant}
          </p>
          <p className="text-lg text-gray-700 font-semibold ">
            {deviceDetails?.location}
          </p>

          <p className="text-2xl font-bold text-[var(--custom-yellow-dark)] ">
            ₹{deviceDetails?.price}
          </p>
        </div>
        <div className="bg-gray-200 p-3 rounded-md">
          <p className="text-2xl font-semibold   ">About the seller</p>

          <p className="text-lg flex gap-1 items-center">
            <CircleUser size={20} />
            {deviceDetails?.seller}
          </p>
          <p className="text-lg flex gap-1 items-center ">
            <PhoneCall size={20} />
            {deviceDetails?.phoneNumber}
          </p>
        </div>
        <Button
          variant="yellow"
          className="text-xl text-gray-600 rounded-sm h-14"
        >
          Contact Seller
        </Button>
        <Button variant="outline" className=" h-14 text-xl font-bold">
          Negiotitate
        </Button>
        <div className="flex flex-col">
          <p className="text-2xl font-semibold ">Device condition:</p>
          <p className="text-lg font-bold text-[var(--custom-yellow-dark)] ">
            {deviceDetails?.condition}
          </p>
          <p className="text-lg text-gray-700 ">
            {deviceDetails?.conditionDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
