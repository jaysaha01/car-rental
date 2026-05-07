"use client"

import React from 'react'
import Bookingtable from '@/components/admin/Bookingtable'
import { useQuery } from '@tanstack/react-query'
import { bookingData } from '@/app/utils/api'
import Myloading from '@/components/landingpage/Myloading'

const page = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['showAllBookings'],
    queryFn: () => bookingData()
  })

  if (isPending) return <Myloading />

  return (
    <div className='p-6'>
      <div className='mb-10'>
        <h2 className='text-3xl font-bold mb-1'>Booking Management</h2>
      </div>
      <div>
        <Bookingtable data={data?.data?.data || []} />
      </div>
    </div>
  )
}

export default page
