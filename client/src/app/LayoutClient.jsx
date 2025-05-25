"use client";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/common/footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
export default function LayoutClient({ children }) {
	const pathname = usePathname();
	const hideNavbar = pathname === "/login" || pathname === "/register";

	return (
		<>
			<AuthProvider>
				<Toaster/>
				{!hideNavbar && <Navbar />}
				{children}
				{!hideNavbar && <Footer />}
			</AuthProvider>
		</>
	);
}
