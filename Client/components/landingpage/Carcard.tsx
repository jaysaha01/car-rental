"use client"

import { IconMapPin } from '@tabler/icons-react';
import { Badge } from "@/components/ui/badge"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react"
import { IconChargingPile, IconAutomaticGearbox, IconUsers, IconEdit } from '@tabler/icons-react';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { deleteOwnerVehicle } from '@/app/utils/api';
import Link from 'next/link';
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

interface CarcardProps {
  car: Cartype;
  options: boolean;
}

export const Carcard: React.FC<CarcardProps> = ({ car, options }) => {

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteOwnerVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['viewVehicle']
      })
      toast.success("Vehicle deleted successfully.", { position: "top-center" })
    },
    onError: () => {
      toast.error("Failed to delete vehicle.", { position: "top-center" });
    }
  })

  return (
    <>
    <Link href={`/vehicle/${car._id}`}>
    <div className="border border-gray-300 rounded-lg shadow-lg">
      <div className="relative">
        <div className='absolute top-3 left-3'><Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
          {car.vehicletype}
        </Badge></div>
        {options && (
          <div className='absolute top-3 right-3'>
            <ButtonGroup>
              <Button variant="outline">Options</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="More Options">
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup>
                    <Link href={`/owner/edit-vehicle/${car._id}`}>
                    <DropdownMenuItem
                    >
                      <IconEdit />
                      Edit Vehicle
                    </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" onClick={() => deleteMutation.mutate(car._id)}>
                      <Trash2Icon />
                      Trash
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>
        )}

        <div className='absolute bottom-3 right-3'><div className='p-2 bg-white border border-gray-300 rounded-lg'>{car.priceperday}<span className='text-gray-500 text-sm'>/day</span></div></div>
        <div className="imgbox bg-gray-400 rounded-t-lg" style={{ height: "250px", width: "100%" }}>
          <img src={car?.image[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover rounded-t-lg" />
        </div>
      </div>
      <div className="description p-4">
        <div className="flex justify-between mb-3">
          <h4 className="text-lg font-medium">{car.brand} {car.model}</h4>
          <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {car.status}
          </Badge>
        </div>
        <div className="flex mb-2 gap-1">
          <IconMapPin className="text-gray-400" /><span className="text-gray-400">{car.location}</span>
        </div>
        <div className="flex gap-4">
          <div className="flex mb-4 gap-1">
            <IconChargingPile className="text-gray-400" /><span className="text-gray-400">{car.fueltype}</span>
          </div>
          <div className="flex mb-4 gap-1">
            <IconAutomaticGearbox className="text-gray-400" /><span className="text-gray-400">{car.transmission}</span>
          </div>
          <div className="flex mb-4 gap-1">
            <IconUsers className="text-gray-400" /><span className="text-gray-400">{car.seats}</span>
          </div>
        </div>
      </div>
    </div>
    </Link>
    </>
    
  )
}
