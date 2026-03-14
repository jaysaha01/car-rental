
import Centerheading from './Centerheading'
import { IconCar , IconBike , IconTruck, IconCarSuv   } from '@tabler/icons-react'

const Category = () => {
    return (
        <section className='mt-20 mb-20'>
            <Centerheading text="Browse by Category" color="black" para="From compact bikes to spacious vans, find the perfect vehicle for your needs."/>
            <div className='container mx-auto max-w-3/5'>
                <div className="lg:columns-4 md:colums-2 sm:columns-1 container mx-auto p-6 md:p-0">
                    <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-5 md:mb-0 border-1 border-gray-300 shadow-2xl flex flex-col items-center'>
                        <div className='bg-green-200 rounded-md mb-5 backdrop-blur-sm p-3'>
                            <IconCar stroke={3} className='text-green-950 text-8xl' width={30} height={30} />
                        </div>
                        <h3 className='font-bold text-lg mb-2'>Cars</h3>
                        <p className='text-gray-600'>3240 available</p>
                    </div>
                    <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-5 md:mb-0 border-1 border-gray-300 shadow-2xl flex flex-col items-center'>
                        <div className='bg-green-200 rounded-md mb-5 backdrop-blur-sm p-3'>
                            <IconBike stroke={3} className='text-green-950 text-8xl' width={30} height={30} />
                        </div>
                        <h3 className='font-bold text-lg mb-2'>Bikes</h3>
                        <p className='text-gray-600'>3240 available</p>
                    </div>
                    <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-5 md:mb-0 border-1 border-gray-300 shadow-2xl flex flex-col items-center'>
                        <div className='bg-green-200 rounded-md mb-5 backdrop-blur-sm p-3'>
                            <IconTruck stroke={3} className='text-green-950 text-8xl' width={30} height={30} />
                        </div>
                        <h3 className='font-bold text-lg mb-2'>Trucks</h3>
                        <p className='text-gray-600'>3240 available</p>
                    </div>
                    <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-5 md:mb-0 border-1 border-gray-300 shadow-2xl flex flex-col items-center'>
                        <div className='bg-green-200 rounded-md mb-5 backdrop-blur-sm p-3'>
                            <IconCarSuv  stroke={3} className='text-green-950 text-8xl' width={30} height={30} />
                        </div>
                        <h3 className='font-bold text-lg mb-2'>SUV</h3>
                        <p className='text-gray-600'>3240 available</p>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Category
