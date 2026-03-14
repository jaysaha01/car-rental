"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image'


const Slider = ({ imgData }: { imgData: string[] }) => {
    return (
        <div>
            <Swiper
                pagination={{ type: 'fraction' }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {imgData && imgData.length > 0 ? (
                    imgData.map((imgSrc, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={imgSrc}
                                alt={`Slide ${index + 1}`}
                                width={800}
                                height={500}
                                className="object-cover w-full h-96"
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <p>No images available.</p>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}

export default Slider
