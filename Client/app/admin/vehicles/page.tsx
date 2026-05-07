"use client"

import Admincarcard from '@/components/admin/Admincarcard'
import { useQuery } from '@tanstack/react-query'
import { allAdminVehicles} from '@/app/utils/api'
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
        queryKey: ['adminVehicles'],
        queryFn: () => allAdminVehicles()
    })

    return (
        <div className='p-6'>
            <div className='mb-5'>
                <h2 className='text-3xl font-bold mb-1'>Vehicle Approval</h2>
                {/* <p className='text-gray-500'>530 pending approvals</p> */}
            </div>
            <div>
                
                {
                    isPending ? (
                        <Loadnigcard />
                    ) : (
                        <div className="grid md:grid-cols-3 m-5 lg:m-0 gap-5">
                            {data?.data?.data?.map((car: Cartype) => (
                                <Admincarcard
                                    key={car._id}
                                    car={car} 
                                />
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default page
