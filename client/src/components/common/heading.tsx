import { MapPin } from "lucide-react";
import React from "react";
interface headingProps{
	title:String;
	subTitle:String;
}
export default function Heading({title,subTitle}:headingProps){
return (
		<div className="text-start w-[90%]">
			<p className="text-4xl font-bold text-gray-600 ">{title}</p>
						<p className="text-xl font-bold text-gray-700 pt-2 flex gap-1 ">{<MapPin size={24} color="#f6c018"/>}{subTitle}</p>

		</div>
	);
}
