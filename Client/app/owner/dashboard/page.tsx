"use client"

import React from 'react'
import Admincard from '@/components/admin/Admincard'
import Renterbookingbox from '@/components/renter/Renterbookingbox'
import { useQuery } from '@tanstack/react-query'
import { adminDashboard, profileData } from '@/app/utils/api'
import { IconMoneybagMoveBack, IconCalendarStar, IconCalendar, IconCalendarStats } from '@tabler/icons-react'
import { AdminBarchart } from '@/components/owner/AdminBarchart'
import Myloading from '@/components/landingpage/Myloading'

const page = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['showAdminDashboard'],
    queryFn: () => adminDashboard()
  })

  const { isPending:profilePendng, error:profileError, data:profileFetchedData } = useQuery({
    queryKey: ['viewProfile'],
    queryFn: () => profileData()
  })

  if (isPending) return <Myloading/>

  return (
    <div className='p-6'>
      <div className='mb-5'>
        <h2 className='text-3xl font-bold mb-1'>Welcome back, {profileFetchedData?.data?.data?.name || 'User'}</h2>
        <p className='text-gray-500'>Here's an overview of your rental activity</p>
      </div>
      <div className='flex flex-col md:flex-row lg:flex-row gap-5 mb-7'>
        <Admincard data={data?.data?.data?.booking[0]?.totalRevenue || 0} icon={<IconMoneybagMoveBack width="35" height="35" stroke={1} />} title="Total Revenue" />
        <Admincard data={data?.data?.data?.booking[0]?.totalBooking || 0} icon={<IconCalendarStar width="35" height="35" stroke={1} />} title="Total Booking" />
        <Admincard data={data?.data?.data?.booking[0]?.activeBooking || 0} icon={<IconCalendar width="35" height="35" stroke={1} />} title="Active Booking" />
        <Admincard data={data?.data?.data?.booking[0]?.pendingBooking || 0} icon={<IconCalendarStats width="35" height="35" stroke={1} />} title="Pending Booking" />
      </div>
      <div>
        <AdminBarchart myChartData={data?.data?.data?.chart} />
      </div>
    </div>
  )
}

export default page
