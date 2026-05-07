import { IconCalendarWeek } from '@tabler/icons-react'
import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { acceptRejectBookings } from '@/app/utils/api';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from "sonner"

interface Booking {
    _id: string;
    renter: Renter;
    startDate: string; 
    endDate: string;
    total: number;
    status: "pending" | "approved" | "rejected" | string;
    renterVehicle: RenterVehicle;
}

interface Renter {
    name: string;
    phone: number;
    usertype: string;
    avtar: string;
}

interface RenterVehicle {
    _id: string;
    brand: string;
    model: string;
    image: string[];
}

type bookingCardProps = {
    booking: Booking,
    type: string,
}

const Ownerbookingcard = ({ booking, type }: bookingCardProps) => {

    const queryClient = useQueryClient()

    const editMutation = useMutation({
        mutationFn: ({ vid, status }: { vid: string; status: string }) =>
            acceptRejectBookings(vid, status),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["viewOwnerBookings"],
            });
            toast.success("Booking status updated successfully.", { position: "top-center" });
        },
        onError: () => {
            toast.error("Failed to update booking status.", { position: "top-center" });
        }
    });

    return (
        <div className='bg-white border border-gray-300 rounded-2xl shadow-2xl mb-5'>
            <div className='flex'>
                <div className='w-1/5 bg-gray-500 rounded-s-2xl hidden md:block lg:block'>
                    <img src={booking?.renterVehicle?.image[0]} alt="Vehicle Image" className='h-full w-full object-cover rounded-s-2xl' />
                </div>
                <div className='p-6 w-full'>
                    <div className='flex gap-2 mb-2'>
                        <Badge variant="destructive">{booking.status}</Badge>
                        <p className='text-gray-500 text-sm'>Booked on {new Date(booking.startDate).toLocaleDateString()}</p>
                    </div>
                    <p className='text-2xl font-medium mb-2'>{booking.renterVehicle.brand} {booking.renterVehicle.model}</p>
                    <div className='flex gap-1 mb-4'><IconCalendarWeek height={"20px"} className='text-gray-500' /> <span className='text-gray-500 text-sm'>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span></div>
                    <div className='flex justify-between align-middle border-t border-gray-300 pt-4'>
                        <div className='flex gap-3'>
                            <div className='bg-gray-300' style={{ height: "50px", width: "50px", borderRadius: "100%" }}>
                                <img src={booking.renter.avtar} alt="Renter Avatar" className='h-full w-full object-cover rounded-full' />
                            </div>
                            <div className='ownerdtls'>
                                <p className='text-lg font-bold'>{booking.renter.name}</p>
                                <span className='text-gray-500'>Renter</span>
                            </div>
                        </div>
                        {
                            type === "owner" ? (
                                <div className='flex gap-2 '>
                                    <Button variant="outline" size="lg" className="rounded-md flex-1 bg-green-400 border-2 border-green-500 text-white cursor-pointer"
                                    disabled={booking.status === "accept"}
                                        onClick={() =>
                                            editMutation.mutate({
                                                vid: booking._id,
                                                status: "accept",
                                            })
                                        }
                                    >
                                        Accept Booking
                                    </Button>
                                    <Button variant="outline" size="lg" className="rounded-md flex-1 bg-red-400 border-2 border-red-500 text-white cursor-pointer"
                                     disabled={booking.status === "decline"}
                                    onClick={() =>
                                            editMutation.mutate({
                                                vid: booking._id,
                                                status: "decline",
                                            })
                                        }
                                    >
                                        Cancle Booking
                                    </Button>
                                </div>
                            ) : (<div className='flex gap-2 '>
                                <Button variant="outline" size="lg">
                                    View Vehicle
                                </Button>
                                <Button variant="outline" size="lg">
                                    Cancle Booking
                                </Button>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ownerbookingcard
