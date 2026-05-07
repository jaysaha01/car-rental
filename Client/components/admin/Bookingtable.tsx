
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


type BookingData = {
    _id: string;
    startDate: string;
    endDate: string;
    total: number;
    status: string;
    vehicleBrand: string;
    vehicleName: string;
    renterName: string;
    ownerName: string;
};


const Bookingtable = ({ data }: { data: BookingData[] }) => {
    return (
        <div>
            <Table className='border border-gray-300'>
                <TableCaption>A list of your recent bookings.</TableCaption>
                <TableHeader className="bg-gray-300">
                    <TableRow>
                        <TableHead className="w-[100px]">Vehicle Name</TableHead>
                        <TableHead>Owner Name</TableHead>
                        <TableHead>Renter Name</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Start Date</TableHead>
                        <TableHead className="text-right">End Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='border-b border-gray-300'>
                    {data.slice(0, 3).map((booking) => (
                        <TableRow key={booking._id}>
                            <TableCell className="font-medium">{booking.vehicleName}</TableCell>
                            <TableCell>{booking.ownerName}</TableCell>
                            <TableCell>{booking.renterName}</TableCell>
                            <TableCell className="text-right">{booking.status}</TableCell>
                            <TableCell className="text-right">{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">{new Date(booking.endDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                
            </Table>
        </div>
    )
}

export default Bookingtable
