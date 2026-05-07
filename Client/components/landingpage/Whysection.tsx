import React from 'react'
import Centerheading from './Centerheading'
import { IconShieldCheck, IconClockHour10 , IconCreditCardPay,IconCheck   } from '@tabler/icons-react';

const Whysection = () => {
    return (
        <section className='pt-15 pb-15 bg-[#052c6b]' id="why">
            <Centerheading text="Why Choose Us" color="white" para="We're committed to providing the best rental experience."/>
            <div className="lg:columns-4 md:colums-2 sm:columns-1 container mx-auto p-6 md:p-0">
                <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 mb-5 md:mb-0'>
                    <div className='bg-green-200 w-1/5 h-1/5 flex items-center p-3 rounded-md mb-5 backdrop-blur-sm'>
                        <IconShieldCheck stroke={3} className='text-green-950'/>
                    </div>
                    <h3 className='font-bold text-lg mb-2 text-white'>Verified Vehicles</h3>
                    <p className='text-gray-300'>Every vehicle is inspected and verified for safety and quality.</p>
                </div>

                <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 mb-5 md:mb-0'>
                    <div className='bg-green-200 w-1/5 h-1/5 flex items-center p-3 rounded-md mb-5 backdrop-blur-sm'>
                        <IconClockHour10 stroke={3} className='text-green-950'/>
                    </div>
                    <h3 className='font-bold text-lg mb-2 text-white'>24/7 Support</h3>
                    <p className='text-gray-300'>Our support team is always available to help you on your journey.</p>
                </div>

                <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 mb-5 md:mb-0'>
                    <div className='bg-green-200 w-1/5 h-1/5 flex items-center p-3 rounded-md mb-5 backdrop-blur-sm'>
                        <IconCreditCardPay  stroke={3} className='text-green-950'/>
                    </div>
                    <h3 className='font-bold text-lg mb-2 text-white'>Secure Payments</h3>
                    <p className='text-gray-300'>Your payments are protected with industry-leading encryption.</p>
                </div>
                <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 mb-5 md:mb-0'>
                    <div className='bg-green-200 w-1/5 h-1/5 flex items-center p-3 rounded-md mb-5 backdrop-blur-sm'>
                        <IconCheck  stroke={3} className='text-green-950'/>
                    </div>
                    <h3 className='font-bold text-lg mb-2 text-white'>Free Cancellation</h3>
                    <p className='text-gray-300'>Cancel up to 24 hours before pickup for a full refund.</p>
                </div>
            </div>
        </section>
    )
}

export default Whysection
