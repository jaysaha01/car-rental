"use client"

import Admincard from '@/components/admin/Admincard'
import Vehiclestatusbox from '@/components/admin/Vehiclestatusbox'
import { useQuery } from '@tanstack/react-query'
import { adminDashboardData } from '@/app/utils/api'
import { IconCalendar, IconCar, IconMoneybagMoveBack, IconUser } from '@tabler/icons-react'
import Myloading from '@/components/landingpage/Myloading'

const page = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['showAdminCard'],
    queryFn: () => adminDashboardData()
  })

  let {totalVehicle, activeBooking, totalUsers, totalRevenue, acceptBooking, pendingBooking} = data?.data?.data?.[0] || {}

  if (isPending) return <Myloading/>

  return (
    <div className='p-6'>
      <div className='mb-5'>
        <h2 className='text-3xl font-bold mb-1'>Admin Dashboard</h2>
        <p className='text-gray-500'>Platform overview and analytics</p>
      </div>
      <div className='flex flex-col md:flex-row lg:flex-row gap-5 mb-7'>
        <Admincard data={totalRevenue} icon={<IconMoneybagMoveBack width="35" height="35" stroke={1} />} title="Total Revenue" />
        <Admincard data={totalVehicle} icon={<IconCar width="35" height="35" stroke={1} />} title="Total Vehicles" />
        <Admincard data={totalUsers} icon={<IconUser width="35" height="35" stroke={1} />} title="Total Users" />
        <Admincard data={activeBooking} icon={<IconCalendar width="35" height="35" stroke={1} />} title="Active Bookings" />
      </div>
      <div className='flex flex-col md:flex-row lg:flex-row gap-5 '>
        {
          pendingBooking && <Vehiclestatusbox title="Pending Bookings" data={pendingBooking} />
        }
        {
          acceptBooking && <Vehiclestatusbox title="Accepted Bookings" data={acceptBooking} />
        }
      </div>
    </div>
  )
}

export default page
