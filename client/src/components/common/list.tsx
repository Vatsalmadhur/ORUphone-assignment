import React from "react";
export default function List<T>({
  data,
  keyLabel,
  valueLabel,
}: {
  data: T[];
  keyLabel: keyof T;
  valueLabel: keyof T;
}) {
  return (
    <ul className="space-y-2 text-sm">
      {data.map((item, index) => (
        <li key={index} className="flex justify-between">
          <span className="font-semibold text-gray-600">{decodeURIComponent(String(item[keyLabel]))}</span>
          <span className="font-bold text-[var(--custom-yellow-dark)]">
  {Number(item?.[valueLabel])?.toFixed(2)}
</span>

        </li>
      ))}
    </ul>
  );
}

