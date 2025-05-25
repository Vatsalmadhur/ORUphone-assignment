import React from "react";
export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="bg-white p-4 shadow-lg rounded-xl ">{children}</div>
    </div>
  );
}

