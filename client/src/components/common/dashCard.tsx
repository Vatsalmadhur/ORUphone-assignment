import React from "react";
export default function Card({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-[var(--custom-yellow-light)] shadow-lg rounded-xl p-4 ">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

