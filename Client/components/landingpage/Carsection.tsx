"use client"

import React from 'react'
import Sideheading from './Sideheading'
import { Carcard } from './Carcard'
import { allHomeVehicles} from '@/app/utils/api'
import { useQuery } from '@tanstack/react-query'
import Loadnigcard from './Loadnigcard'

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

const Carsection = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['showHomeVehicles'],
        queryFn: () => allHomeVehicles()
    })
    return (
        <section className='container mx-auto mb-10'>
            <Sideheading />
            <div>
                {
                    isPending ? (
                        <Loadnigcard />
                    ) : (
                        <div className="grid md:grid-cols-3 m-5 lg:m-0 gap-5">
                            {data?.data?.data?.slice(0,6).map((car: Cartype) => (
                                <Carcard
                                    key={car._id}
                                    car={car}
                                    options={false}
                                />
                            ))}
                        </div>
                    )
                }

            </div>
        </section>
    )
}

export default Carsection
