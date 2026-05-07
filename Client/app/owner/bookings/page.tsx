"use client"

import Ownerbookingcard from '@/components/owner/Ownerbookingcard'
import { useQuery} from '@tanstack/react-query'
import { ownerVehicleBookings } from '@/app/utils/api'
import Myloading from '@/components/landingpage/Myloading'

interface Booking {
  _id: string;
  renter: Renter;
  startDate: string; // ISO date string
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

const page = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['viewOwnerBookings'],
    queryFn: () => ownerVehicleBookings()
  })

  if (isPending) return <Myloading/>

  return (
    <div className='p-6'>
      <div className='mb-7'>
        <h2 className='text-3xl font-bold mb-1'>My Bookings</h2>
        <p className='text-gray-500'>Manage booking requests from renters</p>
      </div>
      <div>
        {
          data?.data?.data?.length === 0 ? (
            <p className="text-gray-500">No bookings available.</p>
          ) : (
            data?.data?.data?.map((booking: Booking) => <Ownerbookingcard key={booking._id} booking={booking} type="owner" />)
          )
        }
      </div>
    </div>
  )
}

export default page
