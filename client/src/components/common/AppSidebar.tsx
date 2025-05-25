import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AppSidebar() {
  // sidebarData.ts
  const sidebarData = {
    Location: [], // can be populated dynamically
    "Distance Range": [
      "Within 10 Km",
      "Within 20 Km",
      "Within 30 Km",
      "Within 50 Km",
      "Within 250 Km",
    ],
    Brands: [
      "All Brands",
      "Apple",
      "Samsung",
      "Xiaomi",
      "Vivo",
      "OnePlus",
      "Oppo",
      "Motorola", "Realme",
      "Google",
      "Nothing",
      "Nokia",
      "Asus",
    ],
    Condition: [
      "Any Condition",
      "Like New",
      "Excellent",
      "Good",
      "Fair",
      "Needs Repair",
    ],
    Storage: [
      "Any",
      "4 GB",
      "8 GB",
      "16 GB",
      "32 GB",
      "64 GB",
      "128 GB",
      "256 GB",
      "512 GB",
    ],
    RAM: ["1 GB", "2 GB", "3 GB", "4 GB", "6 GB", "8 GB", "12 GB", "16 GB"],
    Verification: ["Verified Only"],
    Warranty: ["Brand Warranty", "Seller Warranty"],
    "Price Range": [
      "Below ₹5,000",
      "₹5,000 - ₹10,000",
      "₹10,000 - ₹15,000",
      "₹15,000 - ₹25,000",
      "₹25,000 - ₹40,000",
      "₹40,000 - ₹60,000",
      "₹60,000 & Above",
    ],
  };

  return (
    <>
      <div className="md:h-screen h-auto md:w-[16vw] w-full md:border-r border-gray-100 flex md:flex-col flex-row  items-center justify-start ">
      <div className="w-full md:block hidden p-4 mt-5 ">
        <p className="text-xl font-bold text-gray-700">Filters</p>
        <p className="text-md text-gray-500">Choose what suits you the best!</p>
        </div>
        <div className="w-full  px-4  text-md overflow-x-scroll">
          <Accordion type="multiple" collapsible="true" className=" flex flex-row md:flex-col gap-5" >
            {Object.entries(sidebarData).map(([section, options]) => (
              <AccordionItem value={section} key={section}>
                <AccordionTrigger className="md:text-lg text-sm text-gray-700 font-semibold">
                  {section}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {options.length > 0 ? (
                      options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`${section}-${index}`}
                            className="accent-yellow-500"
                          />
                          <label className="md:text-lg text-sm" htmlFor={`${section}-${index}`}>
                            {option}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">Coming soon</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
