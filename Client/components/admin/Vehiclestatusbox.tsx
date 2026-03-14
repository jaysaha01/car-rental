import React from "react";
import { Badge } from "@/components/ui/badge";

interface Booking {
  _id: string;
  status: string;

  rentername: {
    name: string;
  };

  ownername: {
    name: string;
  };

  myvehicle: {
    vehicletype: string;
    brand: string;
    model: string;
  };
}

type VehicleCardProp = {
  title: string;
  data: Booking[];
};

const Vehiclestatusbox = ({ title, data }: VehicleCardProp) => {
  return (
    <div className="box bg-white border border-gray-200 p-8 rounded-2xl w-full">
      
      <h2 className="font-bold text-lg mb-5">{title}</h2>

      {data.length === 0 ? <h1>No Data Found</h1> : data?.map((booking) => (
        <div
          key={booking._id}
          className="bg-gray-100 flex justify-between items-center p-3 rounded-md mb-3"
        >
          <div>
            <h5 className="text-md font-medium">
              {booking.myvehicle.brand} {booking.myvehicle.model} - {booking.ownername.name}
            </h5>
            <span className="text-gray-600">
              {booking.rentername.name}
            </span>
          </div>
          <div>
            <Badge variant="outline">
              {booking.status}
            </Badge>
          </div>

        </div>
      ))}

    </div>
  );
};

export default Vehiclestatusbox;