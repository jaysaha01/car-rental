import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '@/app/utils/api'
import { toast } from "sonner"

type useDataprops = {
    _id: string,
    name: string,
    email: string,
    usertype: string,
    avtar?: string
}


const Adminuser = ({ userData }: { userData: useDataprops[] }) => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['showAllUsers'] })
            toast.success("User deleted successfully.", { position: "top-center" })
        },
        onError: () => {
            toast.error("Failed to delete user.", { position: "top-center" })
        }
    })
    
    return (
        <div>
            <Table className='border border-gray-200 rounded-2xl'>
                <TableHeader className='bg-gray-300'>
                    <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        userData?.map((item) => {
                            return (<TableRow key={item._id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.usertype}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-8">
                                                <MoreHorizontalIcon />
                                                <span className="sr-only">Open menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {/* <DropdownMenuSeparator /> */}
                                            <DropdownMenuItem variant="destructive" onClick={(e) => {
                                                mutation.mutate(item._id)
                                            }}>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>)
                        })
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default Adminuser
