
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import '../globals.scss'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import Adminnavbar from "@/components/admin/Adminnavbar";
import { ToastContainer, toast } from 'react-toastify';
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";

let sidebarData = [
  {
    name: "Dashboard",
    href: "/owner/dashboard",
    icon: "dashboard"
  },
  {
    name: "Add Vehicle",
    href: "/owner/add-vehicle",
    icon: "vehicles"
  },
  {
    name: "Booking",
    href: "/owner/bookings",
    icon: "booking"
  },
  {
    name: "Profile",
    href: "/owner/profile",
    icon: "users"
  },
  {
    name: "Vehicles",
    href: "/owner/vehicles",
    icon: "vehicles"
  },
]

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horizon | Car Rental Service | Owner",
  description: "Horizon is a car rental service that offers a wide range of vehicles for rent. Whether you need a car for a day, a week, or a month, Horizon has you covered. With our easy-to-use platform, you can quickly find and book the perfect car for your needs. Our fleet includes everything from compact cars to luxury SUVs, so you can choose the right vehicle for your trip. Plus, with our competitive pricing and excellent customer service, you can trust Horizon to provide you with a seamless car rental experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
       <Provider>
          <SidebarProvider>
            <AppSidebar data={sidebarData}/>
            <main className="flex-1 p-0 m-0 w-full">
              <Adminnavbar title="Owner Dashboard" />
              <SidebarTrigger />
              {children}
            </main>
            <Toaster />
          </SidebarProvider>
        </Provider>
      </body>
    </html>
  );
}
