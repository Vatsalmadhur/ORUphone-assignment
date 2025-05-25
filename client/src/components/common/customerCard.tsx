import React from "react";
import { Quote } from "lucide-react";
interface CustomerCardProps {
  review: string;
  name: string;
  location: string;
}

export default function CustomerCard({
  review,
  name,
  location,
}: CustomerCardProps) {
  return (
    <div className="min-w-[400px] h-[300px]  p-4 bg-white rounded-lg shadow-xl">
      <Quote size={96} color="#06275c " strokeWidth={2} />
      <p className="text-lg text-gray-700">{review}</p>
      <p className="text-sm font-bold text-[var(--custom-yellow-dark)] ">
        {name},{location}
      </p>
    </div>
  );
}
