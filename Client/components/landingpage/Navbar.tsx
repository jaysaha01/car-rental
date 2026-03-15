"use client"

import { profileData, signOut } from '@/app/utils/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { IconCategory } from '@tabler/icons-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { toast } from 'sonner'
import { useRouter } from "next/navigation"


const Navbar = () => {

    const router = useRouter()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            toast.success("Signed out successfully.", { position: "top-center" })
            localStorage.clear();
            queryClient.clear();
            router.push("/login")
        },
        onError: () => {
            toast.error("Failed to sign out.", { position: "top-center" })
        }
    })

    const { isPending, error, data } = useQuery({
        queryKey: ['viewProfile'],
        queryFn: () => profileData()
    })


    let dashboard;

    if (data?.data?.data?.usertype === "Owner") {
        dashboard = "owner";
    } else if (data?.data?.data?.usertype === "Renter") {
        dashboard = "renter";
    } else {
        dashboard = "admin";
    }

    return (
        <>
            <nav className='w-full h-16 bg-white flex items-center justify-between px-4  border-b border-gray-200 fixed top-0 left-0 z-50 mb-10'>
                <Link href="/" className='text-xl font-bold text-gray-800'>

                    <Image
                        src="/logo.png"
                        width={200}
                        height={50}
                        alt="Logo"
                    />
                </Link>
                <div className='flex md:hidden lg:hidden'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <IconCategory stroke={2} />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetDescription>
                                    {/* <div className='bg-gray-200 p-4 rounded-md text-gray-400 font-light'><span>Make changes to your profile here. Click save when you&apos;re done.</span></div> */}
                                    <Image
                                        src="/logo.png"
                                        width={200}
                                        height={50}
                                        alt="Logo"
                                    />
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                <Link href="/" className='text-gray-800 hover:text-gray-800'>Home</Link>
                                <Link href={`/search`} className='text-gray-800 hover:text-gray-800'>Car Lists</Link>
                                <a href="/#why" className='text-gray-500 hover:text-gray-800'>Why Horizon</a>
                                <a href="/#testimonials" className='text-gray-500 hover:text-gray-800'>Testimonial</a>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>

                                    {
                                        data?.data?.data?.usertype ? (
                                            <>
                                                <Link href={`/${dashboard}/dashboard`}> <Button type="button" variant="outline" className='w-full border border-gray-300 shadow-none'>
                                                    Dashboard
                                                </Button></Link>
                                                <Button type="button" className="bg-blue-500 text-white border border-blue-700 shadow-none" onClick={() => {
                                                    mutation.mutate()
                                                }}>
                                                    Sign Out
                                                </Button>
                                            </>

                                        ) : (
                                            <Link href={`/login`}><Button type="button" variant="outline">
                                                Sign In
                                            </Button></Link>
                                        )
                                    }
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                </div>
                <div className='items-center space-x-6 hidden md:flex lg:flex'>
                    <Link href="/" className='text-gray-500 hover:text-gray-800'>Home</Link>
                    <Link href={`/search`} className='text-gray-500 hover:text-gray-800'>Car Lists</Link>
                    <a href="/#why" className='text-gray-500 hover:text-gray-800'>Why Horizon</a>
                    <a href="/#testimonials" className='text-gray-500 hover:text-gray-800'>Testimonial</a>
                    {
                        data?.data?.data?.usertype ? (
                            <>
                                <Link href={`/${dashboard}/dashboard`} className='text-gray-500'>
                                    Dashboard
                                </Link>
                                <Button type="button" className="bg-blue-500 text-white shadow-none" onClick={() => {
                                    mutation.mutate()
                                }}>
                                    Sign Out
                                </Button>
                            </>

                        ) : (
                            <Link href={`/login`}><Button type="button" variant="outline">
                                Sign In
                            </Button></Link>
                        )
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar
