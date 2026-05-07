'use client'

import Renterbookingbox from '@/components/renter/Renterbookingbox'
import { profileData, renterDashboardData } from '@/app/utils/api'
import { useQuery } from '@tanstack/react-query'
import Myloading from '@/components/landingpage/Myloading'

const page = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['viewRenterBookings'],
    queryFn: () => renterDashboardData()
  })

  const { isPending: profilePendng, error: profileError, data: profileFetchedData } = useQuery({
    queryKey: ['viewProfile'],
    queryFn: () => profileData()
  })

  if (isPending || profilePendng) return <Myloading/>

  return (
    <div className='p-6'>
      <div className='mb-5'>
        <h2 className='text-3xl font-bold mb-1'>Welcome back, {profileFetchedData?.data?.data?.name || "Renter"}!</h2>
        <p className='text-gray-500'>Here's an overview of your rental activity</p>
      </div>
      {/* <div className='flex flex-col md:flex-row lg:flex-row gap-5 mb-7'>
        <Admincard />
        <Admincard />
        <Admincard />
        <Admincard />
      </div> */}
      <div className='flex flex-col md:flex-row lg:flex-row gap-5 '>
        <Renterbookingbox mydata={data?.data?.data} />
      </div>
    </div>
  )
}

export default page
