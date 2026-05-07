"use client"

import { useState } from 'react'
import Adminuser from '@/components/admin/Adminuser'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { userData, searchUser } from '@/app/utils/api'
import {useQuery} from '@tanstack/react-query'
import Myloading from '@/components/landingpage/Myloading'

const page = () => {

  const [searchTerm, setSearchTerm] = useState("")

  const { isPending, data } = useQuery({
    queryKey: ['users', searchTerm],
    queryFn: () => {
      if (searchTerm) {
        return searchUser(searchTerm)
      }
      return userData()
    }
  })

  const users = data?.data?.data || []

  return (
    <div className='p-6'>
      <div className='mb-5'>
        <h2 className='text-3xl font-bold mb-1'>User Management</h2>
        <p className='text-gray-500'>{data?.data?.data?.length || 0} total users</p>
      </div>
      <div>
        <div className='mb-5'>
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search user with name or email..." onChange={(e) => setSearchTerm(e.target.value)}/>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">{data?.data?.data?.length || 0} results</InputGroupAddon>
          </InputGroup>
        </div>
        <Adminuser userData={users || []} />
      </div>
    </div>
  )
}

export default page
