"use client"
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
import { submitVehicle } from '@/app/utils/api'
import { toast } from 'react-toastify';

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

const Vehiclebookingform = () => {
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        defaultValues: {
            features: ["Air Conditioning"],
        }
    })
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const fromData = new FormData();
        fromData.append("vehicletype", data.vehicletype);
        fromData.append("brand", data.brand);
        fromData.append("model", data.model);
        fromData.append("year", data.year.toString());
        fromData.append("fueltype", data.fueltype);
        fromData.append("transmission", data.transmission);
        fromData.append("seats", data.seats.toString());
        fromData.append("location", data.location);
        fromData.append("priceperday", data.priceperday.toString());
        fromData.append("priceperweek", data.priceperweek.toString());
        fromData.append("pricepermonth", data.pricepermonth.toString());
        fromData.append("features", JSON.stringify(data.features));
        for (let i = 0; i < data.myimage.length; i++) {
            fromData.append("file", data.myimage[i]);
        }

        let response = await submitVehicle(fromData)
        console.log(response)
        if (response.statusText
            == "OK") {
            reset()
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        } else {
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    
    return (
        <div className='bg-white p-6 border-2 border-gray-200 rounded-xl mt-5 shadow-2xl mb-10'>
            <h1 className='font-bold text-2xl mb-5'>Vehicle Details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <Controller
                        control={control}
                        name="vehicletype"
                        rules={{
                            required: "Vehicle Type is required"
                        }}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor="city">Vehicle Type</FieldLabel>
                                <Select onValueChange={field.onChange}
                                    value={field.value}>
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
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.vehicletype.message}
                                    </span>
                                )}
                            </Field>
                        )}
                    />

                    <Field>
                        <FieldLabel htmlFor="zip">Brand</FieldLabel>
                        <Input type="text" placeholder="Brand" className='bg-gray-200 p-6' {...register("brand", { required: true })} />
                        {errors.brand && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <Field>
                        <FieldLabel htmlFor="city">Model</FieldLabel>
                        <Input type="text" placeholder="e.g.,Camry" className='bg-gray-200 p-6' {...register("model", { required: true })} />
                        {errors.model && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">Year</FieldLabel>
                        <Input type="number" placeholder="e.g.,2023" className='bg-gray-200 p-6' {...register("year", { required: true, valueAsNumber: true })} />
                        {errors.year && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <Controller
                        control={control}
                        name="fueltype"
                        rules={{
                            required: "Fuel Type is required"
                        }}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor="city">Fuel Type</FieldLabel>
                                <Select onValueChange={field.onChange}
                                    value={field.value}>
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
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.fueltype.message}
                                    </span>
                                )}
                            </Field>
                        )}
                    />


                    <Controller
                        control={control}
                        name="transmission"
                        rules={{
                            required: "Transmission is required"
                        }}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor="city">Transmission</FieldLabel>
                                <Select onValueChange={field.onChange}
                                    value={field.value}>
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
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.transmission.message}
                                    </span>
                                )}
                            </Field>
                        )}
                    />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <Field>
                        <FieldLabel htmlFor="city">Number of Seats</FieldLabel>
                        <Input type="number" placeholder="e.g.,5" className='bg-gray-200 p-6' {...register("seats", { required: true, valueAsNumber: true })} />
                        {errors.seats && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">Pickup Location</FieldLabel>
                        <Input id="city" type="text" placeholder="Enter address" className='bg-gray-200 p-6' {...register("location", { required: true })} />
                        {errors.location && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
                    <Field>
                        <FieldLabel htmlFor="city">Price per Day ($)</FieldLabel>
                        <Input id="city" type="number" placeholder="Price per Day" className='bg-gray-100 p-6' {...register("priceperday", { required: true, valueAsNumber: true })} />
                        {errors.priceperday && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="city">Price per Week ($)</FieldLabel>
                        <Input id="city" type="number" placeholder="Price per Week" className='bg-gray-100 p-6' {...register("priceperweek", { required: true, valueAsNumber: true })} />
                        {errors.priceperweek && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">Price per Month ($)</FieldLabel>
                        <Input id="city" type="text" placeholder="Price per Month" className='bg-gray-100 p-6' {...register("pricepermonth", { required: true, valueAsNumber: true })} />
                        {errors.pricepermonth && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </Field>
                </div>
                <div>
                    <h3 className='mb-3 font-bold mt-6'>Features & Amenities</h3>
                    <Controller
                        control={control}
                        name="features"
                        rules={{
                            required: "Select at least one feature"
                        }}
                        render={({ field }) => (

                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">

                                {featuresList.map((feature) => (

                                    <Field
                                        key={feature}
                                        orientation="horizontal"
                                        className="border border-gray-300 bg-gray-100 p-5 rounded-2xl"
                                    >

                                        <Checkbox
                                            checked={field.value?.includes(feature)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {

                                                    if (!field.value.includes(feature)) {
                                                        field.onChange([...field.value, feature])
                                                    }


                                                } else {

                                                    field.onChange(
                                                        field.value.filter((value) => value !== feature)
                                                    )

                                                }
                                            }}
                                        />
                                        <FieldLabel className="font-normal">
                                            {feature}
                                        </FieldLabel>

                                    </Field>
                                ))}
                            </div>
                        )}
                    />
                    {errors.features && (
                        <span className="text-red-500">
                            {errors.features.message}
                        </span>
                    )}
                </div>

                <Field>
                    <FieldLabel htmlFor="picture">Picture</FieldLabel>
                    <Input id="picture" type="file" multiple {...register("myimage", { required: true })} />
                    <FieldDescription>Select a picture to upload.</FieldDescription>
                    {errors.myimage && <span className="text-red-500 text-sm mt-1">
                        This field is required
                    </span>}
                </Field>
                <Button variant="outline" size="lg" className='mt-5 bg-yellow-500 text-white cursor-pointer' type='submit' disabled={isSubmitting}>
                    Submit for Review
                </Button>
            </form>
        </div>
    )
}

export default Vehiclebookingform
