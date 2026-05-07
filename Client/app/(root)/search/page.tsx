"use client"

import * as React from "react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"

import {
    IconMapPin
} from "@tabler/icons-react"
import { Carcard } from "@/components/landingpage/Carcard"
import { Button } from "@/components/ui/button"
import { IconChevronRight, IconFilter } from "@tabler/icons-react"
import {
    useQuery,
} from '@tanstack/react-query'
import { allVehicles, showAllVehicle } from "@/app/utils/api"
import Loadnigcard from "@/components/landingpage/Loadnigcard"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"


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

const page = () => {

    const [search, setSearch] = React.useState("")
    const [vehicleType, setVehicleType] = React.useState<string[]>([])
    const [fuelType, setFuelType] = React.useState<string[]>([])
    const [transmission, setTransmission] = React.useState<string[]>([])

    const { isPending, data } = useQuery({
        queryKey: [
            "showVehicles",
            search,
            vehicleType.join(","),
            fuelType.join(","),
            transmission.join(","),
        ],
        queryFn: () =>
            allVehicles({
                search,
                vehicletype: vehicleType.join(","),
                fueltype: fuelType.join(","),
                transmission: transmission.join(","),
            }),
    });

    const handleCheckboxChange = (
        value: string,
        state: string[],
        setState: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        if (state.includes(value)) {
            setState(state.filter((item) => item !== value))
        } else {
            setState([...state, value])
        }
    }


    return (
        <div className="mt-15">
            <div className="serchbox bg-gradient-to-r from-green-400 to-blue-500 p-10">
                <InputGroup className="w-5/5 md:w-3/5 lg:w-3/5 mx-auto bg-white p-6 rounded-lg">
                    <InputGroupButton size="icon-sm">
                        <IconMapPin />
                    </InputGroupButton >
                    <InputGroupInput placeholder="Search by location or vehicle name..." onChange={(e) => setSearch(e.target.value)} />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="secondary">Search</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <div className="flex gap-5 container mx-auto mt-10 mb-10">

                <div className="w-1/5  hidden md:inline-block lg:inline-block rounded-md  relative ">
                    <form className="sticky top-5">
                        <div className="bg-card rounded-2xl border border-border p-6">

                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-semibold text-lg">Filters</h2>

                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                </div>
                            </div>
                            <div className="space-y-6">


                                {/* Vehicle Type */}
                                <div>
                                    <h3 className="font-semibold mb-4">
                                        Vehicle Type
                                    </h3>
                                    <div className="space-y-3">

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="checkbox border border-gray-300 bg-gray-200"
                                                checked={vehicleType.includes("Car")}
                                                onChange={() =>
                                                    handleCheckboxChange("Car", vehicleType, setVehicleType)
                                                }
                                            />

                                            <span className="capitalize">
                                                car
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={vehicleType.includes("Suv")} onChange={() =>
                                                handleCheckboxChange("Suv", vehicleType, setVehicleType)
                                            } />

                                            <span className="capitalize">
                                                suv
                                            </span>

                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={vehicleType.includes("Van")} onChange={() =>
                                                handleCheckboxChange("Van", vehicleType, setVehicleType)
                                            } />

                                            <span className="capitalize">
                                                van
                                            </span>

                                        </label>
                                    </div>
                                </div>
                                {/* Fuel Type */}
                                <div>
                                    <h3 className="font-semibold mb-4">
                                        Fuel Type
                                    </h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={fuelType.includes("Petrol")} onChange={() =>
                                                handleCheckboxChange("Petrol", fuelType, setFuelType)
                                            } />

                                            <span className="capitalize">
                                                petrol
                                            </span>

                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={fuelType.includes("Diesel")} onChange={() =>
                                                handleCheckboxChange("Diesel", fuelType, setFuelType)
                                            } />

                                            <span className="capitalize">
                                                Diesel
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={fuelType.includes("Electric")} onChange={() =>
                                                handleCheckboxChange("Electric", fuelType, setFuelType)
                                            } />

                                            <span className="capitalize">
                                                Electric
                                            </span>

                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={fuelType.includes("Hybrid")} onChange={() =>
                                                handleCheckboxChange("Hybrid", fuelType, setFuelType)
                                            } />

                                            <span className="capitalize">
                                                Hybrid
                                            </span>

                                        </label>
                                    </div>
                                </div>
                                {/* Transmission */}
                                <div>
                                    <h3 className="font-semibold mb-4">
                                        Transmission
                                    </h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" onChange={() =>
                                                handleCheckboxChange("Manual", transmission, setTransmission)
                                            } />

                                            <span className="capitalize">
                                                Manual
                                            </span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" onChange={() =>
                                                handleCheckboxChange("Automatic", transmission, setTransmission)
                                            } />

                                            <span className="capitalize">
                                                Automatic
                                            </span>

                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="cars w-5/5 lg:w-4/5 md:w-4/5">

                    <div className="mb-4 md:mb-0 ld-mb-0 contains md:hidden lg:hidden ms-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="lg" >
                                    Filters <IconFilter />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetDescription>
                                        {/* <div className='bg-gray-200 p-4 rounded-md text-gray-400 font-light'><span>Make changes to your profile here. Click save when you&apos;re done.</span></div> */}
                                        <Image
                                            src="/logo.png"
                                            width={200}
                                            height={50}
                                            alt="Logo"
                                        />
                                    </SheetDescription>
                                </SheetHeader>

                                <form>
                                    <div className="bg-card p-6">

                                        <div className="flex items-center justify-between mb-6">
                                           
                                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                {/* 1 */}
                                            </div>
                                        </div>
                                        <div className="space-y-6">


                                            {/* Vehicle Type */}
                                            <div>
                                                <h3 className="font-semibold mb-4">
                                                    Vehicle Type
                                                </h3>
                                                <div className="space-y-3">

                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox border border-gray-300 bg-gray-200"
                                                            checked={vehicleType.includes("Car")}
                                                            onChange={() =>
                                                                handleCheckboxChange("Car", vehicleType, setVehicleType)
                                                            }
                                                        />

                                                        <span className="capitalize">
                                                            car
                                                        </span>
                                                    </label>

                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={vehicleType.includes("Suv")} onChange={() =>
                                                            handleCheckboxChange("Suv", vehicleType, setVehicleType)
                                                        } />

                                                        <span className="capitalize">
                                                            suv
                                                        </span>

                                                    </label>

                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={vehicleType.includes("Van")} onChange={() =>
                                                            handleCheckboxChange("Van", vehicleType, setVehicleType)
                                                        } />

                                                        <span className="capitalize">
                                                            van
                                                        </span>

                                                    </label>
                                                </div>
                                            </div>
                                            {/* Fuel Type */}
                                            <div>
                                                <h3 className="font-semibold mb-4">
                                                    Fuel Type
                                                </h3>
                                                <div className="space-y-3">
                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={fuelType.includes("Petrol")} onChange={() =>
                                                            handleCheckboxChange("Petrol", fuelType, setFuelType)
                                                        } />

                                                        <span className="capitalize">
                                                            petrol
                                                        </span>

                                                    </label>

                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={fuelType.includes("Diesel")} onChange={() =>
                                                            handleCheckboxChange("Diesel", fuelType, setFuelType)
                                                        } />

                                                        <span className="capitalize">
                                                            Diesel
                                                        </span>
                                                    </label>

                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={fuelType.includes("Electric")} onChange={() =>
                                                            handleCheckboxChange("Electric", fuelType, setFuelType)
                                                        } />

                                                        <span className="capitalize">
                                                            Electric
                                                        </span>

                                                    </label>
                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" checked={fuelType.includes("Hybrid")} onChange={() =>
                                                            handleCheckboxChange("Hybrid", fuelType, setFuelType)
                                                        } />

                                                        <span className="capitalize">
                                                            Hybrid
                                                        </span>

                                                    </label>
                                                </div>
                                            </div>
                                            {/* Transmission */}
                                            <div>
                                                <h3 className="font-semibold mb-4">
                                                    Transmission
                                                </h3>
                                                <div className="space-y-3">
                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" onChange={() =>
                                                            handleCheckboxChange("Manual", transmission, setTransmission)
                                                        } />

                                                        <span className="capitalize">
                                                            Manual
                                                        </span>
                                                    </label>
                                                    <label className="flex items-center gap-3 cursor-pointer">
                                                        <input type="checkbox" className="checkbox border border-gray-300 bg-gray-200" onChange={() =>
                                                            handleCheckboxChange("Automatic", transmission, setTransmission)
                                                        } />

                                                        <span className="capitalize">
                                                            Automatic
                                                        </span>

                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <SheetFooter>
                                    <SheetClose asChild>


                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* <Button variant="outline" size="lg" >
                        Filters <IconFilter />
                    </Button> */}
                    <div>
                        {
                            isPending ? (
                                <Loadnigcard />
                            ) : (
                                <div className="grid md:grid-cols-3 m-5 lg:m-0 gap-5">
                                    {data?.data?.map((car: Cartype) => (
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
                </div>
            </div>
        </div>
    )
}

export default page
