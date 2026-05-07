"use client"

import React, { useEffect } from 'react'
import Slider from '@/components/detailpage/Slider'
import { Badge } from "@/components/ui/badge"
import { IconCircleCheck, IconShieldCheck, IconMapPin } from '@tabler/icons-react';
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { profileData, showVehicle } from '@/app/utils/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { IconGasStation, IconCarSuv, IconUsers, IconCalendarWeek, IconPhoneDone } from '@tabler/icons-react';
import { Calendar } from "@/components/ui/calendar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { bookVehicle } from '@/app/utils/api';
import { paymeyVehicle } from '@/app/utils/api';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import Myloading from '@/components/landingpage/Myloading';
import { toast } from "sonner"

interface vehicleBookData {
  startDate: string,
  endDate: string,
  cost: number,
  serviceFee: number,
  tax: number,
  total: number,
  payment: boolean
}

const page = () => {
  const queryClient = useQueryClient()
  const { error: razorerror, isLoading, Razorpay } = useRazorpay();

  const [sdate, setsDate] = React.useState<Date | undefined>(new Date())
  const [edate, seteDate] = React.useState<Date | undefined>(new Date())
  let [bookigDetails, setBookingDetails] = React.useState({
    startDate: sdate,
    endDate: edate,
    serviceFee: 0,
    cost: 0,
    tax: 0,
    total: 0,
    payment: true,
    diffdate: 0
  })

  const params = useParams();

  const vid = params.vID as string;

  const { isPending, error, data } = useQuery({
    queryKey: ['showsingleVehicle', vid],
    queryFn: () => showVehicle(vid),
    enabled: !!vid
  })

  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: profileData
  })


  const mutation = useMutation({
    mutationFn: ({ startDate, endDate, serviceFee, cost, total, tax, payment }: vehicleBookData) => bookVehicle(vid, { startDate, endDate, serviceFee, cost, total, tax, payment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showsingleVehicle', vid] })
    },
  })


  const { _id, vehicletype, brand, model, year, fueltype, transmission, seats, location, priceperday, priceperweek, pricepermonth, image, status, features } = data?.data?.data || {}
  const { _id: ownerId, avtar, name, email, phone } = data?.data?.data?.ownerDetails || {}

  useEffect(() => {
    if (sdate && edate) {
      const diffInDays = sdate && edate
        ? Math.ceil(
          (edate.getTime() - sdate.getTime()) / (1000 * 60 * 60 * 24)
        )
        : 0;

      const cost = diffInDays * priceperday;
      const serviceFee = cost * 0.1;
      const tax = cost * 0.05;
      const total = cost + serviceFee + tax;

      setBookingDetails(prev => ({
        ...prev,
        startDate: sdate,
        endDate: edate,
        cost: cost,
        serviceFee: serviceFee,
        tax: tax,
        total: total,
        diffdate: diffInDays
      }))
    }

  }, [sdate, edate, priceperday])


  const paymentMutation = useMutation({
    mutationFn: (amount: number) => paymeyVehicle(amount),

    onSuccess: (res) => {
      const { status, amount, currency, order_id } = res?.data;
      if (status === "created") {
        const options: RazorpayOrderOptions = {
          key: "rzp_test_SODZFpwd64KYIJ",
          amount: amount,
          currency: "INR",
          name: "Horizon Company",
          description: "Test Transaction",
          order_id: order_id,
          handler: (response) => {
            const { razorpay_payment_id } = response;
            if (razorpay_payment_id) {
              const payload = {
                startDate: sdate
                  ? sdate.toISOString().split('T')[0]
                  : "",

                endDate: edate
                  ? edate.toISOString().split('T')[0]
                  : "",

                cost: Number(bookigDetails.cost),
                serviceFee: Number(bookigDetails.serviceFee),
                tax: Number(bookigDetails.tax),
                total: Number(bookigDetails.total),
                payment: true
              }
              mutation.mutate(payload)
              toast.success("Payment successful! Booking confirmed.", { position: "top-center" })
            }
          },
          prefill: {
            name: "Ranajay Saha",
            email: "sahajay426@gmail.com",
            contact: "9804771533",
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();

      }
    },

    onError: (error) => {
      toast.error("Payment initiation failed. Please try again.", { position: "top-center" })
    }
  });

  if (isPending) return <Myloading />

  async function payment() {
    try {
      paymentMutation.mutate(bookigDetails.total)
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  }


  return (
    <div>
      <div className='myslider'><Slider imgData={image} /></div>
      <div className='bg-gray-100'>
        <div className='container mx-auto '>
          <div className='flex flex-col md:flex-row lg:flex-row gap-10 p-6 '>
            <div className='sm:w-5/5 lg:w-4/5 md:w-4/5 '>
              <div className='flex justify-between'>
                <div className='mb-6 mt-4'>
                  <Badge className="bg-green-50 text-green-700 dark:bg-green-500 dark:text-green-300 text-1xl mb-3 border-1 border-green-500">
                    {vehicletype}
                  </Badge>
                  <h2 className='text-4xl font-bold mb-3'>{brand} {model}</h2>
                  <div className='flex gap-2'>
                    <IconMapPin stroke={2} className='text-gray-400' />
                    <p className='text-gray-400'>{location}</p>
                  </div>
                </div>

              </div>
              <div className="lg:columns-4 md:colums-2 sm:columns-1 container mx-auto p-6 md:p-0 mt-4">
                <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-5 md:mb-0 border-1 border-gray-300 flex flex-col items-center bg-white'>
                  <IconGasStation stroke={1} className='text-green-950 text-8xl' />
                  <h3 className='font-bold text-lg'>{fueltype}</h3>
                  <p className='text-gray-600'>Fuel Type</p>
                </div>
                <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-5 md:mb-0 border-1 border-gray-300 flex flex-col items-center bg-white'>
                  <IconCarSuv stroke={1} className='text-green-950 text-8xl' />
                  <h3 className='font-bold text-lg'>{transmission}</h3>
                  <p className='text-gray-600'>Transmission</p>
                </div>
                <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-5 md:mb-0 border-1 border-gray-300 flex flex-col items-center bg-white'>
                  <IconUsers stroke={1} className='text-green-950 text-8xl' />
                  <h3 className='font-bold text-lg'>{seats}</h3>
                  <p className='text-gray-600'>Seats</p>
                </div>
                <div className='bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-5 md:mb-0 border-1 border-gray-300 flex flex-col items-center bg-white'>
                  <IconCalendarWeek stroke={1} className='text-green-950 text-8xl' />
                  <h3 className='font-bold text-lg'>{year}</h3>
                  <p className='text-gray-600'>Year</p>
                </div>
              </div>
              <div className='mt-5 border-b border-gray-300 pb-10'>
                <h4 className='text-2xl mt-7 font-bold mb-4'>Features</h4>
                <div className='grid  grid-col-1 md:grid-cols-2 lg:grid-cols-2'>
                  {
                    features ? JSON.parse(features)?.map((feature: string, index: number) => (
                      <div key={index} className='flex gap-3  items-center mb-3 md:mb-0 lg:mb-0'>
                        <IconCircleCheck stroke={2} className='text-green-500 ' />
                        <p className='text-gray-500 font-light'>{feature}</p>
                      </div>
                    )) : <p className='text-gray-500 font-light'>No features listed.</p>
                  }
                </div>
              </div>
              <div className='pt-5 pb-10 border-b border-gray-300'>
                <h1 className='text-2xl font-bold mb-5'>Hosted by</h1>
                <div className='flex justify-between'>
                  <div className='flex gap-4 items-center'>
                    <div className='avtar'> <Avatar size='lg'>
                      <AvatarImage src={avtar} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                    </Avatar></div>
                    <div className='dtl'>
                      <span className='text-2xl font-medium mb-2'>{name}</span>
                      <div className='flex gap-2'>
                        <IconShieldCheck stroke={2} className='text-green-400' width={20} height={20} />
                        <p className='text-gray-500 text-sm'>Verified Host</p>
                      </div>
                    </div>
                  </div>


                  <div className='2'>
                    <a href={`tel:+1-${phone}`}>
                      <Button variant="outline" size="lg">
                        Call {name} <IconPhoneDone />
                      </Button>
                    </a>
                  </div>
                </div>

              </div>
            </div>
            <div className='sm:w-5/5 lg:w-2/5 md:w-2/5 relative mb-5 md:mb-0 sm:mb-0'>
              <div className='sticky top-10 p-7 bg-white rounded-2xl border-gray-240 shadow-xl/20'>
                <h4 className='text-2xl font-bold mb-8'>₹{priceperday}<span className='text-gray-500 font-normal'>/day</span></h4>
                <div className='flex gap-5 border-b border-gray-200 pb-5'>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className='date bg-gray-100 p-2 rounded-md w-full border border-gray-200'>
                        <p className='text-gray-500'>Start Date</p>
                        <h6>{sdate?.toLocaleDateString()}</h6>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogDescription>
                          <Calendar
                            mode="single"
                            selected={sdate}
                            onSelect={setsDate}
                            className="rounded-lg border"
                            captionLayout="dropdown"

                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction>Cancel</AlertDialogAction>
                      </AlertDialogFooter>

                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className='date bg-gray-100 p-2 rounded-md w-full border border-gray-200'>
                        <p className='text-gray-500'>End Date</p>
                        <h6>{edate?.toLocaleDateString()}</h6>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogDescription>
                          <Calendar
                            mode="single"
                            selected={edate}
                            onSelect={seteDate}
                            className="rounded-lg border"
                            captionLayout="dropdown"

                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction>Cancel</AlertDialogAction>
                      </AlertDialogFooter>

                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className='pb-4 border-b border-gray-200 pt-5'>
                  <div className='flex justify-between mb-2'>
                    <p className='text-gray-500'>₹ {priceperday} × {bookigDetails?.diffdate} days</p>
                    <p>{bookigDetails?.cost}</p>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <p className='text-gray-500'>₹ Service fee</p>
                    <p>{bookigDetails?.serviceFee}</p>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <p className='text-gray-500'>₹ Taxes</p>
                    <p>{bookigDetails?.tax}</p>
                  </div>
                </div>
                <div className='flex justify-between border-b border-gray-200 p-3 mb-4'>
                  <p className='font-bold'>Total</p>
                  <p>{bookigDetails?.total}</p>
                </div>
                <Button
                  className='w-full bg-amber-500 p-6'
                  disabled={userProfile?.data?.data?.usertype === "Admin" || userProfile?.data?.data?.usertype === "Owner" || bookigDetails.diffdate <= 0}
                  style={{ fontSize: "20px" }}
                  onClick={() => payment()}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
