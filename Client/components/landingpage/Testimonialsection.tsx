import Centerheading from './Centerheading'
import { IconStarFilled } from '@tabler/icons-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const Testimonialsection = () => {
  return (
    <section className='pt-20 pb-20 container mx-auto' id='testimonials'>
      <Centerheading text="What Our Customers Say" color="black" para="Don't just take our word for it - hear from our satisfied customers!" />
      <div className='sm:columns-1 md:columns-3 p-5 md:p-0'>

        <div className='border border-gray-300 p-7 rounded-2xl shadow-2xl mb-5 md:mb-0'>
          {/* Starts  */}
          <div className='flex gap-1 text-amber-400 mb-5'>
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
          </div>

          {/* User Review  */}
          <p className='mb-4 font-light'>
            "RentVehicle has transformed how I travel. The variety of vehicles and the ease of booking is unmatched!"
          </p>

          {/* User Info  */}
          <div className='flex gap-3'>
            <div className='avtar'>
              <Avatar size="lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h6 className='font-bold'>Amanda Roberts</h6>
              <p className='text-gray-500'>Frequent Renter</p>
            </div>
          </div>


        </div>

        <div className='border border-gray-300 p-7 rounded-2xl shadow-2xl mb-5 md:mb-0'>
          {/* Starts  */}
          <div className='flex gap-1 text-amber-400 mb-5'>
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
          </div>

          {/* User Review  */}
          <p className='mb-4 font-light'>
            "I've earned over $15,000 in the past year just by listing my cars. The platform handles everything seamlessly."
          </p>

          {/* User Info  */}
          <div className='flex gap-3'>
            <div className='avtar'>
              <Avatar size="lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h6 className='font-bold'>Robert Kim</h6>
              <p className='text-gray-500'>Vehicle Owner</p>
            </div>
          </div>
        </div>

        <div className='border border-gray-300 p-7 rounded-2xl shadow-2xl mb-5 md:mb-0'>
          {/* Starts  */}
          <div className='flex gap-1 text-amber-400 mb-5'>
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
          </div>
          {/* User Review  */}
          <p className='mb-4 font-light'>
            "Perfect for my business trips. I can always find a reliable vehicle near any airport. Great service!"
          </p>
          {/* User Info  */}
          <div className='flex gap-3'>
            <div className='avtar'>
              <Avatar size="lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h6 className='font-bold'>Jessica Taylor</h6>
              <p className='text-gray-500'>Business Traveler</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonialsection
