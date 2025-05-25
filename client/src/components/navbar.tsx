"use client";

import * as React from "react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	BellIcon,
	Circle,
	CircleUser,
	HeartIcon,
	Link,
	LocateIcon,
	LocationEditIcon,
	SearchIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTracker } from "@/hooks/useTracker";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@radix-ui/react-popover";
import { toast } from "sonner";

export default function Navbar() {
	const { userLoggedIn, userName, isAdmin } = useAuth();

	useTracker();
	const router = useRouter();
	const handleNavigate = () => {
		router.push("/login");
	};
	const handleAdminNavigate = () => {
		router.push("/admin");
	};

	const handleLogout = async () => {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/logout`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ userName }),
			});
			if (res.ok) {
				toast("Logout successful");
				router.push("/login");
			}
		} catch (error) {
			console.error("Logout failed", error);
			toast("Logout failed");
		}
	};

	return (
		<nav className="w-full h-[100px] pt-3 px-4 ">
			<div className="w-full h-1/2 py-5  flex item-center justify-center gap-5">
				<div
					className="w-[10%] h-auto text-center pl-2 pt-2  flex items-center justify-center 
"
				>
					<Image
						src="/OLDPhones4.svg"
						width={120}
						height={120}
						alt="logo here"
					/>
				</div>
				<div className="w-[10%] h-full flex items-center justify-center ">
					<Button variant="outline" className="rounded-full border-gray-200">
						<LocationEditIcon /> India
					</Button>
				</div>
				<div className="w-[60%] h-full flex gap-2 items-center justify-center  relative">
					<input
						placeholder="Search phones with make,model..."
						className="w-full bg-gray-100 rounded-full h-full p-5 focus:border-gray-200 focus:border focus:outline-none "
					/>
					<SearchIcon className="absolute right-4" size={20} />
				</div>
				<div className="w-[10%] h-full flex gap-5 justify-center items-center">
					<div className="bg-gray-100 p-2 rounded-full">
						<HeartIcon size={20} />
					</div>
					<div className="bg-gray-100 p-2 rounded-full">
						<BellIcon size={20} />
					</div>
					<div className="bg-gray-100 p-2 rounded-full">
						{userLoggedIn ? (
							<Popover>
								<PopoverTrigger asChild>
									<CircleUser size={20} />
								</PopoverTrigger>
								<PopoverContent className="z-10 w-[300px] text-center p-5 bg-white shadow-xl rounded-lg">
									<p className="text-2xl py-3">
										Hello,
										<span className="font-bold text-[var(--custom-yellow-dark)]">
											{userName}
										</span>
									</p>
									{isAdmin ? (
										<Button
											variant="yellow"
											onClick={handleAdminNavigate}
											className="rounded-sm m-3"
										>
											Admin
										</Button>
									) : (null)}
									<Button
										variant="yellow"
										onClick={handleLogout}
										className="rounded-sm m-3"
									>
										Logout
									</Button>
								</PopoverContent>
							</Popover>
						) : (
							<CircleUser size={20} />
						)}
					</div>
				</div>
				<div
					className="w-[10%] h-full  flex items-center justify-center 
 "
				>
					{userLoggedIn ? (
						<Button variant="yellow">Sell your device</Button>
					) : (
						<Button variant="yellow" onClick={handleNavigate}>
							Sign In
						</Button>
					)}
				</div>
			</div>

			<div className="w-full h-1/2 flex items-center justify-center gap-2  border-bottom border-gray-50 py-5">
				<NavigationMenu className="list-none">
					<NavigationMenuLink className="px-4 py-2 font-medium ">
						Register a Store
					</NavigationMenuLink>
				</NavigationMenu>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Buy Used Phones</NavigationMenuTrigger>
							<NavigationMenuContent className="min-w-[200px] border-white bg-white font-semibold">
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Nearby Deals
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Best Deals
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									With Warranty
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Refurbished Phones
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Compare Prices
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Top Brands
								</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Sell Used Phones</NavigationMenuTrigger>
							<NavigationMenuContent className="min-w-[200px] border-white bg-white font-semibold">
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Sell Your Phone
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Compare Prices
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Open Online Store/Shop
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Top Brands
								</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Compare Prices</NavigationMenuTrigger>
							<NavigationMenuContent className="min-w-[200px] border-white bg-white font-semibold">
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Compare when Buying
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Compare when Selling
								</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Services</NavigationMenuTrigger>
							<NavigationMenuContent className="min-w-[200px] border-white bg-white font-semibold">
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									IMEI Check
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Phone Health Check
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Battery Health Check
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Check Device Details
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Data Wipe
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Grade Your Phone
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Data Transfer
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Data Backup
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Fake Part Detection
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Stolen Phone
								</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<NavigationMenu className="list-none">
					<NavigationMenuLink className="px-4 py-2 font-medium ">
						Register a Store
					</NavigationMenuLink>
				</NavigationMenu>

				<NavigationMenu className="list-none">
					<NavigationMenuLink className="px-4 py-2 font-bold text-[var(--custom-yellow-dark)] ">
						Get the App!
					</NavigationMenuLink>
				</NavigationMenu>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
								More
							</NavigationMenuTrigger>
							<NavigationMenuContent className="min-w-[200px] border-white bg-white font-semibold">
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									How To Sell
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									How To Buy
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Blog
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									T & C
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									About Us
								</NavigationMenuLink>
								<NavigationMenuLink className="block w-full px-4 py-2 hover:bg-gray-200">
									Contact Us
								</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</nav>
	);
}
