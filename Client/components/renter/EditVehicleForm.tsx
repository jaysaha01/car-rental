"use client"

import React, { useEffect, useState } from 'react'
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from '../ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Controller } from 'react-hook-form'
import { useForm, SubmitHandler } from "react-hook-form"
import { editVehicle, getVehicleById } from '@/app/utils/api'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'

type Inputs = {
    vehicletype: string
    brand: string
    model: string
    year: number
    fueltype: string
    transmission: string
    seats: number
    location: string
    priceperday: number
    priceperweek: number
    pricepermonth: number
    features: string[]
    myimage: FileList
}

const featuresList = [
    "Air Conditioning",
    "GPS Navigation",
    "Bluetooth",
    "Backup Camera",
    "Sunroof",
    "Leather Seats",
    "Heated Seats",
    "Cruise Control",
    "Apple CarPlay",
    "Android Auto",
    "ABS",
    "Airbags"
]

const EditVehicleForm = () => {
    const params = useParams()
    const router = useRouter()
    const vehicleId = params?.vid as string

    const [existingImages, setExistingImages] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()


    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await getVehicleById(vehicleId)
                const vehicle = response?.data?.data

                console.log("Fetched vehicle data:", vehicle)

                if (vehicle) {
                    let parsedFeatures: string[] = []
                    if (typeof vehicle.features === "string") {
                        try {
                            parsedFeatures = JSON.parse(vehicle.features)
                        } catch {
                            parsedFeatures = []
                        }
                    } else if (Array.isArray(vehicle.features)) {
                        parsedFeatures = vehicle.features
                    }

                    reset({
                        vehicletype: vehicle.vehicletype,
                        brand: vehicle.brand,
                        model: vehicle.model,
                        year: vehicle.year,
                        fueltype: vehicle.fueltype,
                        transmission: vehicle.transmission,
                        seats: vehicle.seats,
                        location: vehicle.location,
                        priceperday: vehicle.priceperday,
                        priceperweek: vehicle.priceperweek,
                        pricepermonth: vehicle.pricepermonth,
                        features: parsedFeatures,
                    })

                    if (vehicle.images) {
                        setExistingImages(vehicle.images)
                    }
                }
            } catch (error) {
                toast.error("Failed to load vehicle data", { theme: "dark" })
            } finally {
                setLoading(false)
            }
        }

        if (vehicleId) fetchVehicle()
    }, [vehicleId, reset])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData()
        formData.append("vehicletype", data.vehicletype)
        formData.append("brand", data.brand)
        formData.append("model", data.model)
        formData.append("year", data.year.toString())
        formData.append("fueltype", data.fueltype)
        formData.append("transmission", data.transmission)
        formData.append("seats", data.seats.toString())
        formData.append("location", data.location)
        formData.append("priceperday", data.priceperday.toString())
        formData.append("priceperweek", data.priceperweek.toString())
        formData.append("pricepermonth", data.pricepermonth.toString())

        const featuresArray: string[] = Array.isArray(data.features)
            ? data.features.filter((f): f is string => typeof f === "string" && !f.startsWith("["))
            : []
        formData.append("features", JSON.stringify(featuresArray))

        if (data.myimage && data.myimage.length > 0) {
            for (let i = 0; i < data.myimage.length; i++) {
                formData.append("file", data.myimage[i]);
            }
        }

        const response = await editVehicle(vehicleId, formData)

        if (response.statusText === "OK") {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
            router.push('/owner/vehicles')
        } else {
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-500 text-lg">Loading vehicle data...</p>
            </div>
        )
    }

    return (
        <div className='bg-white p-6 border-2 border-gray-200 rounded-xl mt-5 shadow-2xl mb-10'>
            <h1 className='font-bold text-2xl mb-5'>Edit Vehicle Details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <Controller
                        control={control}
                        name="vehicletype"
                        rules={{ required: "Vehicle Type is required" }}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Vehicle Type</FieldLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full bg-gray-200 p-6">
                                        <SelectValue placeholder="Select Your Car Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Vehicle Type</SelectLabel>
                                            <SelectItem value="Car">Car</SelectItem>
                                            <SelectItem value="Suv">Suv</SelectItem>
                                            <SelectItem value="Van">Van</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.vehicletype && (
                                    <span className="text-red-500 text-sm mt-1">{errors.vehicletype.message}</span>
                                )}
                            </Field>
                        )}
                    />

                    <Field>
                        <FieldLabel>Brand</FieldLabel>
                        <Input type="text" placeholder="Brand" className='bg-gray-200 p-6' {...register("brand", { required: true })} />
                        {errors.brand && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <Field>
                        <FieldLabel>Model</FieldLabel>
                        <Input type="text" placeholder="e.g., Camry" className='bg-gray-200 p-6' {...register("model", { required: true })} />
                        {errors.model && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                    <Field>
                        <FieldLabel>Year</FieldLabel>
                        <Input type="number" placeholder="e.g., 2023" className='bg-gray-200 p-6' {...register("year", { required: true, valueAsNumber: true })} />
                        {errors.year && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <Controller
                        control={control}
                        name="fueltype"
                        rules={{ required: "Fuel Type is required" }}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Fuel Type</FieldLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full bg-gray-200 p-6">
                                        <SelectValue placeholder="Select fuel type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select fuel type</SelectLabel>
                                            <SelectItem value="Petrol">Petrol</SelectItem>
                                            <SelectItem value="Diesel">Diesel</SelectItem>
                                            <SelectItem value="Electric">Electric</SelectItem>
                                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.fueltype && (
                                    <span className="text-red-500 text-sm mt-1">{errors.fueltype.message}</span>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        control={control}
                        name="transmission"
                        rules={{ required: "Transmission is required" }}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Transmission</FieldLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full bg-gray-200 p-6">
                                        <SelectValue placeholder="Select transmission" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select transmission</SelectLabel>
                                            <SelectItem value="Manual">Manual</SelectItem>
                                            <SelectItem value="Automatic">Automatic</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.transmission && (
                                    <span className="text-red-500 text-sm mt-1">{errors.transmission.message}</span>
                                )}
                            </Field>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <Field>
                        <FieldLabel>Number of Seats</FieldLabel>
                        <Input type="number" placeholder="e.g., 5" className='bg-gray-200 p-6' {...register("seats", { required: true, valueAsNumber: true })} />
                        {errors.seats && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                    <Field>
                        <FieldLabel>Pickup Location</FieldLabel>
                        <Input type="text" placeholder="Enter address" className='bg-gray-200 p-6' {...register("location", { required: true })} />
                        {errors.location && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
                    <Field>
                        <FieldLabel>Price per Day ($)</FieldLabel>
                        <Input type="number" placeholder="Price per Day" className='bg-gray-100 p-6' {...register("priceperday", { required: true, valueAsNumber: true })} />
                        {errors.priceperday && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                    <Field>
                        <FieldLabel>Price per Week ($)</FieldLabel>
                        <Input type="number" placeholder="Price per Week" className='bg-gray-100 p-6' {...register("priceperweek", { required: true, valueAsNumber: true })} />
                        {errors.priceperweek && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                    <Field>
                        <FieldLabel>Price per Month ($)</FieldLabel>
                        <Input type="number" placeholder="Price per Month" className='bg-gray-100 p-6' {...register("pricepermonth", { required: true, valueAsNumber: true })} />
                        {errors.pricepermonth && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                </div>

                <div>
                    <h3 className='mb-3 font-bold mt-6'>Features & Amenities</h3>
                    <Controller
                        control={control}
                        name="features"
                        rules={{ required: "Select at least one feature" }}
                        render={({ field }) => (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
                                {featuresList.map((feature) => (
                                    <Field
                                        key={feature}
                                        orientation="horizontal"
                                        className="border border-gray-300 bg-gray-100 p-5 rounded-2xl"
                                    >
                                        <Checkbox
                                            checked={Array.isArray(field.value) && field.value.includes(feature)}
                                            onCheckedChange={(checked) => {
                                                const current = Array.isArray(field.value) ? field.value : []
                                                if (checked) {
                                                    field.onChange([...new Set([...current, feature])])
                                                } else {
                                                    field.onChange(current.filter((value) => value !== feature))
                                                }
                                            }}
                                        />
                                        <FieldLabel className="font-normal">{feature}</FieldLabel>
                                    </Field>
                                ))}
                            </div>
                        )}
                    />
                    {errors.features && (
                        <span className="text-red-500">{errors.features.message}</span>
                    )}
                </div>

                {/* Show existing images */}
                {existingImages.length > 0 && (
                    <div className="mb-4">
                        <h3 className='mb-3 font-bold mt-6'>Current Images</h3>
                        <div className="flex flex-wrap gap-3">
                            {existingImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Vehicle image ${index + 1}`}
                                    className="w-32 h-24 object-cover rounded-lg border border-gray-300"
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Upload new images below to replace the current ones.
                        </p>
                    </div>
                )}

                <Field>
                    <FieldLabel htmlFor="picture">Upload New Images (optional)</FieldLabel>
                    <Input id="picture" type="file" multiple {...register("myimage")} />
                    <FieldDescription>Leave empty to keep existing images. Select new files to replace them.</FieldDescription>
                </Field>

                <div className="flex gap-3 mt-5">
                    <Button
                        variant="outline"
                        size="lg"
                        className='bg-yellow-500 text-white cursor-pointer'
                        type='submit'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className='cursor-pointer'
                        type='button'
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditVehicleForm