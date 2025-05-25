import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
export default function Hero() {
	return (
		<div className="w-[100%] md:h-[50vh]  h-[500px] sm:py-0 py-5 mt-10 flex items-center justify-center">
			<div className="md:w-[80%] w-[90%] border-2 h-full overflow-hidden  flex items-center justify-center gap-5 bg-[var(--custom-yellow-dark)] rounded-4xl">
				<div className="h-full md:w-[45%] w-[90%]  relative flex flex-col  sm:justify-center justify-start sm:pt-0 pt-10 gap-5">
					<p className="lg:text-6xl md:text-5xl text-4xl text-gray-800 font-bold">
						Sell old{" "}
						<span className="text-slate-100">
							Mobile Phones,Tablets <span className="text-gray-800"> and </span>{" "}
							Apple Watch
						</span>{" "}
						for cash.
					</p>
					<p className="text-lg text-white">Let's get started. What are you selling today?</p>
					<div className="h-[40px] flex gap-4 flex-wrap">
					<input
						placeholder="Enter Device Name to get started..."
						className="bg-white p-4 h-full rounded-full w-[300px]"
					/>
					<Button
						variant="default"
						className="bg-black h-full rounded-full text-white text-xl w-[100px] font-semibold"
					>
						Sell
					</Button>
					</div>
				</div>
				<div className="h-full w-[45%]  md:relative md:block hidden">
									<Image
						src={"/homeImg.webp"}
						alt="hero image"
					width={400}
					height={400}
						className="absolute  bottom-0 "
					/>
									<Image
						src={"/iphone1.svg"}
						alt="hero image"
					width={300}
					height={300}
						className="absolute right-0  top-20"
					/>

				</div>
			</div>
		</div>
	);
}
