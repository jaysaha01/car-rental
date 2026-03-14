
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const Baner = () => {
    return (
        <div className='flex flex-col md:flex-row lg:flex-row md:h-screen lg:h-screen mt-15 mb-15'>
            <div className=' w-full md:w-1/2 lg:w-1/2  flex flex-col justify-center p-8'>
                <div className='relative mb-6'>
                    <h1 className="scroll-m-20  text-5xl font-extrabold tracking-tight text-balance mb-5">Your Journey, Our Wheels</h1>
                    <img src="underline.png" alt="Line Image" className='absolute bottom-0 left-0 w-2/5 h-5  ' />
                </div>
                <p className='font-light '>We believe a rental shouldn't feel like a transaction—it should feel like the start of an adventure. Whether you're heading to a career-defining meeting, a long-awaited family reunion, or a solo escape into the mountains, we provide more than just four wheels. We provide the reliability you need to focus on the people and places that matter most.</p>

                <div className=' border border-gray-300 w-full  md:w-3/5 sm:3/5 mt-10 display:inline p-2 rounded-lg flex gap-3'>
                    <input type="text" className='w-full outline-none border-none text-gray-400 font-light    ' />
                    <Button className='bg-blue-500'>Get Started</Button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 border-b border-gray-300'>
                    <div className=' md:border-e lg:border-e border-gray-300 p-4'>
                        <h3 className='text-5xl mb-3'>75%</h3>
                        <p className='text-gray-400'>of users are satisfied with our product</p>
                    </div>
                    <div className='p-4'>
                        <h3 className='text-5xl mb-3'>90%</h3>
                        <p className='text-gray-400'>of customers recommend our service</p>
                    </div>
                </div>



            </div>

            <div className='w-full md:w-1/2 lg:w-1/2  flex flex-col justify-center'>
                <Image
                    src="/banner.png"
                    width={700}
                    height={700}
                    alt="Picture of the author"
                />
            </div>
        </div>
    )
}

export default Baner
