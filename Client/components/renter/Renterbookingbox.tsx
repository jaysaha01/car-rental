
import { Button } from '../ui/button'
import { IconChevronRight } from '@tabler/icons-react'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

export interface Booking {
    _id: string
    renter: Renter
    startDate: string
    status: string
    renterVehicle: RenterVehicle
}

export interface Renter {
    _id: string
    name: string
}

export interface RenterVehicle {
    _id: string
    brand: string
    model: string
    image: string[]
}

const Renterbookingbox = ({ mydata }: { mydata: Booking[] }) => {
    return (
        <div className='box bg-white border border-gray-200 p-8 rounded-2xl w-full'>
            <div className='flex justify-between align-middle mb-5'>
                <h2 className='font-bold text-lg mb-5'>Recent Bookings</h2>
                <Link href="/renter/bookings"><Button variant="outline" size="lg">
                    View All <IconChevronRight />
                </Button></Link>
            </div>
            {
                mydata?.length === 0 ? (
                    <p className="text-gray-500">No recent bookings available.</p>
                ) : (
                    mydata?.map((booking) => (
                        <div key={booking?._id} className='bg-gray-100 flex justify-between items-center p-3 rounded-md mb-3'>
                            <div className='flex flex-col md:flex-row lg:flex-row align-middle gap-3'>
                                <div>
                                    <img src={booking?.renterVehicle?.image[0]} style={{ height: "50px", width: "80px", objectFit: "contain" }} className='rounded-lg' />
                                </div>
                                <div>
                                    <h5 className='text-md font-medium'>{booking?.renterVehicle?.brand} {booking?.renterVehicle?.model}</h5>
                                    <span className='text-gray-600'>{booking?.renter?.name}</span>
                                </div>
                            </div>
                            <div><Badge variant="destructive">{booking?.status}</Badge></div>
                        </div>
                    )))
            }


        </div>
    )
}

export default Renterbookingbox
