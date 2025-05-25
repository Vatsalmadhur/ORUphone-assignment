'use client'
import React from "react";
import Card from "./card";
import { dummyDevices } from "@/dummyData";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface CardContainerProps {
	items?: number;
	hideBtn?: boolean;
	}
export default function CardContainer({items,hideBtn}:CardContainerProps) {
	const router = useRouter();
	const handleClick=()=>{
		router.push('/bestdeals')
	}


	return (<>
		<div className="flex items-center justify-center flex-wrap gap-4 w-full h-auto">
			{dummyDevices.slice(0,items).map((item, index) => (
				<Link key={index}  href={`/bestdeals/product/${item.model}`}>
				<Card key={index} {...item} />
				</Link>
			))}
		</div>
			{!hideBtn && 
		<Button variant="yellow" className="w-[200px] text-lg mt-[50px]" onClick={handleClick}>View all Deals</Button>
		}
		</>
	);
}
