"use client"

import Bookingcard from '@/components/renter/Bookingcard'
import { renterBookigVehicle } from '@/app/utils/api'
import { useQuery } from '@tanstack/react-query'
import Myloading from '@/components/landingpage/Myloading'

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
  isBookingCancel:boolean,
  renterVehicle: RenterVehicle,
}

const page = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['viewRenterBookings'],
    queryFn: () => renterBookigVehicle()
  })

  if (isPending) return <Myloading/>
  
  return (
    <div className='p-6'>
      <div className='mb-5'>
        <h2 className='text-3xl font-bold mb-1'>My Bookings</h2>
      </div>
      <div>
        {
          data?.data?.data?.length === 0 ? (
            <p className="text-gray-500">No bookings available.</p>
          ) : (
            data?.data?.data?.map((booking:bookingCardProps) => <Bookingcard key={booking._id} mybooking={booking} />)
          )
        }

      </div>
    </div>
  )
}

export default page
