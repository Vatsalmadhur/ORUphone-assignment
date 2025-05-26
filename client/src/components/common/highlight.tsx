import React from "react";
interface highlightProps{
	subHeading:string;
	heading:string;
	text:string;
}
export default function Highlight({ subHeading, heading, text }: highlightProps) {
	return (
		<>
			<div className=" w-full h-[200px] mt-[100px] flex items-center justify-center">
				<div className="md:w-[40%] w-[90%] text-center">
					<p className="text-lg text-[var(--custom-yellow-dark)] font-bold">{subHeading}</p>
					<p className="text-4xl text-slate-900 font-bold">{heading}</p>
					<p className="text-xl text-gray-500 font-semibold">{text}</p>
				</div>
			</div>
		</>
	);
}
