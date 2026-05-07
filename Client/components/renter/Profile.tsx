"use client"

import React from 'react'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    CheckIcon,
    CreditCardIcon,
    InfoIcon,
    MailIcon,
    SearchIcon,
    StarIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, BookmarkIcon } from "lucide-react"
import { Button } from '../ui/button'
import { IconChevronRight, IconUser, IconMessageShare, IconPhoneDone } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { profileData, updateProfile } from '@/app/utils/api'
import { AxiosResponse } from 'axios'
import { toast } from "sonner"

const Profile = () => {

    const queryClient = useQueryClient()

    const { isPending, error, data } = useQuery({
        queryKey: ['viewProfile'],
        queryFn: () => profileData()
    })

    const [userData, setUserData] = React.useState({ name: "" })

    const mutation = useMutation<AxiosResponse, Error, { name: string }>({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['viewProfile'] })
            toast.success("Profile has been updated", { position: "top-center" })
        },
        onError: () => {
            toast.error("Failed to update profile", { position: "top-center" })
        }
    })

    
    React.useEffect(() => {
        if (data?.data?.data?.name) {
            setUserData({ name: data.data.data.name })
        }
    }, [data])

    return (
        <div className='bg-white border border-e-gray-300 p-6 rounded-2xl shadow-2xl'>
            <div className='flex gap-4 mb-5 align-middle border-b border-gray-200 pb-5'>
                <div className='imgprofile bg-gray-300 rounded-full' style={{ height: "90px", width: "90px" }}>
                    <img src={data?.data?.data?.avtar} alt="Profile Picture" className='rounded-full w-full h-full object-cover' />
                </div>
                <div>
                    <h5 className='font-medium text-2xl'>{data?.data?.data?.name}</h5>
                    <span className='text-gray-500 text-sm'>{data?.data?.data?.email}</span><br />
                    <Badge variant="secondary" className='mt-3'>
                        <BadgeCheck data-icon="inline-start" />
                        Verified {data?.data?.data?.usertype}
                    </Badge>
                </div>
            </div>

            <div className='inputsgridbox flex gap-3 mb-3'>
                <div className='w-full'>
                    <InputGroup className='p-5'>
                        {/* readOnly */}
                        <InputGroupInput value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                        <InputGroupAddon>
                            <IconUser />
                        </InputGroupAddon>
                    </InputGroup></div>
                <div className='w-full'>
                    <InputGroup className='p-5'>
                        <InputGroupInput value={data?.data?.data?.email || ""} readOnly />
                        <InputGroupAddon>
                            <IconMessageShare />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
            <div className='inputsgridbox flex gap-3 mb-3'>
                <div className='w-full'>
                    <InputGroup className='p-5'>
                        <InputGroupInput value={data?.data?.data?.phone || ""} readOnly />
                        <InputGroupAddon>
                            <IconPhoneDone />
                        </InputGroupAddon>
                    </InputGroup></div>

            </div>
            <div className='mt-10'>
                <Button
                    disabled={mutation.isPending}
                    onClick={() => mutation.mutate({ name: userData?.name })}
                >
                    {mutation.isPending ? "Saving..." : mutation.isSuccess ? "Saved ✓" : "Save Changes"}
                    <IconChevronRight />
                </Button>
            </div>

        </div>
    )
}

export default Profile
