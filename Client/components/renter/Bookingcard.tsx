
import { Badge } from "@/components/ui/badge"
import { IconCalendarWeek, IconChevronRight } from '@tabler/icons-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancleBookigVehicle } from '@/app/utils/api';
import { toast } from "sonner"

interface RenterVehicle {
    _id: string;
    image: string[];
    brand: string;
    model: string;
}

type bookingCardProps = {
    _id: string,
    startDate: string,
    endDate: string,
    total: number,
    status: string,
    isBookingCancel: boolean,
    renterVehicle: RenterVehicle,
}


const Bookingcard = ({ mybooking }: { mybooking: bookingCardProps }) => {

    const queryClient = useQueryClient()

    const editMutation = useMutation({
        mutationFn: (bid: string) =>
            cancleBookigVehicle(bid),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["viewRenterBookings"],
            });
            toast.success("Booking canceled successfully.", { position: "top-center" });
        },
        onError: () => {
            toast.error("Failed to cancel booking. Please try again.", { position: "top-center" });
        }
    });
    return (
        <div className='bg-white border border-gray-300 rounded-2xl shadow-2xl mb-5'>
            <div className='flex'>
                <div className='w-1/5 bg-gray-500 rounded-s-2xl hidden md:block lg:block'>
                    <img src={mybooking?.renterVehicle?.image[0]} alt="Vehicle Image" className='h-full w-full object-cover rounded-s-2xl' />
                </div>
                <div className='one p-6 w-full'>
                    <div className='flex gap-2 mb-2'>
                        <Badge variant="destructive">{mybooking.status}</Badge>
                        <p className='text-gray-500 text-sm'>Booked on {new Date(mybooking.startDate).toLocaleDateString()}</p>
                    </div>
                    <p className='text-2xl font-medium mb-2'>{mybooking.renterVehicle.brand} {mybooking.renterVehicle.model}</p>
                    <div className='flex gap-1 mb-3'><IconCalendarWeek height={"20px"} className='text-gray-200' /> <span className='text-gray-500 text-sm'>{new Date(mybooking.startDate).toLocaleDateString()} - {new Date(mybooking.endDate).toLocaleDateString()}, 2024</span></div>
                    <div className='flex gap-2 border-t border-gray-300 pt-4'>
                        <Link href={`/vehicle/${mybooking.renterVehicle._id}`}>
                            <Button variant="outline" size="lg">
                                View Vehicle
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="lg"
                            disabled={mybooking.isBookingCancel === true}
                            onClick={() => editMutation.mutate(mybooking._id)}
                        >
                            Cancel Booking
                        </Button>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default Bookingcard
