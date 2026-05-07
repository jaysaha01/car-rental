"use client"

import { Carcard } from '@/components/landingpage/Carcard'
import {
    useQuery,
} from '@tanstack/react-query'
import { viewOwnerVehicle } from '@/app/utils/api'
import Loadnigcard from '@/components/landingpage/Loadnigcard'

interface Cartype {
    _id: string;
    brand: string;
    createdAt: string;
    features: string[];
    fueltype: string;
    location: string;
    model: string;
    priceperday: number;
    pricepermonth: number;
    priceperweek: number;
    seats: number;
    transmission: string;
    updatedAt: string;
    vehicletype: string;
    image: string[];
    status: string
}

const page = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ['viewVehicle'],
        queryFn: () => viewOwnerVehicle()
    })

    return (
        isPending ? (
            <Loadnigcard />
        ) : (
            <div className='p-6'>
                <div className='mb-5'>
                    <h2 className='text-3xl font-bold mb-1'>Vehicle Approval</h2>
                    <p className='text-gray-500'>530 pending approvals</p>
                </div>

                <div className="grid md:grid-cols-3 m-5 lg:m-0 gap-5">
                    {data?.data?.data?.map((car: Cartype) => (
                        <Carcard
                            key={car._id}
                            car={car}
                            options={true}
                        />
                    ))}
                </div>

            </div>
        )
    )
}

export default page
