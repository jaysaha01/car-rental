import { IconMapPin } from '@tabler/icons-react';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconChargingPile, IconAutomaticGearbox, IconUsers, IconEdit } from '@tabler/icons-react';
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { approveVehicle } from '@/app/utils/api';
import { toast } from "sonner"

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

const Admincarcard = ({ car }: { car: Cartype }) => {

    const queryClient = useQueryClient()

    const editMutation = useMutation({
        mutationFn: ({ vid, status }: { vid: string; status: string }) =>
            approveVehicle(vid, status),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["adminVehicles"],
            });
            toast.success("Vehicle status updated successfully.", { position: "top-center" });
        },
        onError: () => {
            toast.error("Failed to update vehicle status.", { position: "top-center" });
        }
    });

    return (
        <>
            <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                <div className="relative">

                    <div className="absolute top-3 left-3">
                        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                            {car.status}
                        </Badge>
                    </div>

                    <div className="absolute bottom-3 right-3">
                        <div className="p-2 bg-white border border-gray-300 rounded-lg">
                            {car.priceperday}
                            <span className="text-gray-500 text-sm">/day</span>
                        </div>
                    </div>

                    <div
                        className="imgbox bg-gray-400 rounded-t-lg"
                        style={{ height: "250px", width: "100%" }}
                    >
                        <img
                            src={car.image[1]}
                            alt={`${car.brand} ${car.model}`}
                            className="w-full h-full object-cover rounded-t-lg"
                        />
                    </div>

                </div>

                <div className="description p-4">

                    <div className="flex justify-between mb-3">
                        <h4 className="text-lg font-medium">
                            {car.brand} {car.model}
                        </h4>

                        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            {car.status}
                        </Badge>
                    </div>

                    <div className="flex mb-2 gap-1">
                        <IconMapPin className="text-gray-400" />
                        <span className="text-gray-400">{car.location}</span>
                    </div>

                    <div className="flex gap-4">

                        <div className="flex mb-4 gap-1">
                            <IconChargingPile className="text-gray-400" />
                            <span className="text-gray-400">{car.fueltype}</span>
                        </div>

                        <div className="flex mb-4 gap-1">
                            <IconAutomaticGearbox className="text-gray-400" />
                            <span className="text-gray-400">{car.transmission}</span>
                        </div>

                        <div className="flex mb-4 gap-1">
                            <IconUsers className="text-gray-400" />
                            <span className="text-gray-400">{car.seats}</span>
                        </div>

                    </div>

                </div>

                {
                    car.status === "Pending" && (<div className='flex p-4 border-t border-gray-300 gap-2'>
                        <Button
                            variant="outline"
                            className="rounded-md flex-1 bg-green-400 border-2 border-green-500 text-white cursor-pointer"
                            onClick={() =>
                                editMutation.mutate({
                                    vid: car._id,
                                    status: "Confirmed",
                                })
                            }
                        >
                            Approve
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-md flex-1 bg-red-400 border-2 border-red-500 text-white cursor-pointer"
                            onClick={() =>
                                editMutation.mutate({
                                    vid: car._id,
                                    status: "Reject",
                                })
                            }
                        >
                            Reject
                        </Button>
                    </div>)
                }
            </div>
        </>
    )
}

export default Admincarcard
