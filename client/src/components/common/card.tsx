import { HeartIcon, MoveRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type CardProps = {
  make: string;
  model: string;
  price: number;
  images: string[];
  seller: string;
  location: string;
  phoneNumber: number;
};

const Card: React.FC<CardProps> = ({
  make,
  model,
  price,
  images,
  seller,
  location,
  phoneNumber,
}) => {
  return (
    <div className="min-w-[400px] h-[370px]  bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 relative">
      <img
        src={images[0]}
        alt={model}
        className="w-full h-60 object-contain"
      />
        <div className="bg-[var(--custom-yellow-light)] p-2 rounded-full absolute top-4 right-5">
        <HeartIcon size={20}/>
        </div>
      <div className="p-4 ">
        <p className="text-sm text-gray-600"> {make}</p>
        <h2 className="text-xl font-semibold text-gray-900">{model}</h2>
        <p className="text-lg font-bold text-[var(--custom-yellow-dark)]">₹{price.toLocaleString()}</p>
        <p className="text-sm font-semibold text-gray-600">{location}</p>
              <Button variant="yellow" className="absolute bottom-4 right-3 rounded-sm ">Buy now <MoveRight size={16}/></Button>

      </div>
    </div>
  );
};

export default Card;

