
import { IconBrandMeta, IconBrandX, IconBrandInstagram } from '@tabler/icons-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <section className='footer bg-[#052c6b] pt-20 pb-10 p-5 '>
      <div className='footer container mx-auto '>

        <div className='flex justify-between w-full flex-col md:flex-row lg:flex-row '>
          <div className='w-full md:w-2/5 lg:w-2/5'>
            <div className="one mb-10 md:mb-0 ld:mb-0">
              <Image
                src="/logo.png"
                width={200}
                height={50}
                alt="Logo"
                className='mb-5 grayscale'
              />
              <p className='me-10'>We believe a rental shouldn't feel like a transaction—it should feel like the start of an adventure. Whether you're heading to a career-defining meeting, a long-awaited family reunion, or a solo escape into the mountains, we provide more than just four wheels. We provide the reliability you need to focus on the people and places that matter most.</p>

              <div className="socialicons flex gap-2">
                <div className="icon"><IconBrandMeta stroke={1} /></div>
                <div className="icon"><IconBrandX stroke={1} /></div>
                <div className="icon"><IconBrandInstagram stroke={1} /></div>
              </div>
            </div>
          </div>


          <div className='flex  flex-col md:flex-row lg:flex-row gap-1 md:gap-20 lg:gap-20'>
            <div className="one mb-10 md:mb-0 ld:mb-0">
              <h2>Support</h2>
              <p>Help Center</p>
              <p>Safety</p>
              <p>Cancellation</p>
              <p>Contact Us</p>
            </div>
            <div className="one mb-10 md:mb-0 ld:mb-0">
              <h2>Legal</h2>
              <p>Terms of Service</p>
              <p>Privacy Policy</p>
              <p>Cookie Policy</p>
              <p>Accessibility</p>
            </div>
            <div className="one mb-10 md:mb-0 ld:mb-0">
              <h2>Host</h2>
              <p>List Your Vehicle</p>
              <p>Host Resources</p>
              <p>Insurance</p>
              <p>Community</p>
            </div>
          </div>



        </div>
        {/* <div className='footerbtm flex justify-between w-full flex-col md:flex-row lg:flex-row '>

          <div className="trademarke mb-3 md:mb-0 ms-5 ld:ms-0"><p>© 2026 RentVehicle. All rights reserved.</p></div>
          <div className="socialicons flex gap-2 ms-5 ld:ms-0">
            <div className="icon"><IconBrandMeta stroke={2} /></div>
            <div className="icon"><IconBrandMeta stroke={2} /></div>
            <div className="icon"><IconBrandMeta stroke={2} /></div>
            <div className="icon"><IconBrandMeta stroke={2} /></div>
          </div>

        </div> */}
      </div>
    </section>
  )
}

export default Footer
