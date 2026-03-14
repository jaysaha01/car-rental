"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form"
import { loginUser } from "@/app/utils/api"
import { toast } from 'react-toastify';
import Link from "next/link"
import { redirect, RedirectType } from 'next/navigation'

type Inputs = {
    email: string
    password: string
}

const Loginuserform = () => {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let result = await loginUser(data)
        if (result.status == 200) {
            reset()
            window.localStorage.setItem('token', result?.data?.token)
            window.localStorage.setItem('userId', result?.data?.data?._id)
            window.localStorage.setItem('role', result?.data?.data?.usertype)
            toast.success(result.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            redirect('/')
        } else {
            reset()
            toast.error(result.data.message, {
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
        <div className='w-6/6 md:w-2/6 lg:w-2/6 mx-auto mt-15 mb-15'>
            <div>
                <Card className="border border-gray-300 shadow-2xl md:shadow-none md:border-none lg:shadow-none lg:border-none">
                    <CardHeader className="mb-5">
                        <CardTitle className="text-4xl">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account
                        </CardDescription>

                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input id="password" type="password" {...register("password", { required: true })} />
                                    {errors.password && <span className="text-red-600">This field is required</span>}
                                </div>

                            </div>
                            <CardFooter className="flex-col gap-2 mt-5 w-full mb-10">
                                <Button type="submit" className="w-full" disabled={isSubmitting} >
                                    Sign In
                                </Button>
                            </CardFooter>
                        </form>
                        <CardAction>
                            <Link href="/register" className="cursor-pointer"><Button variant="link">Create Account</Button></Link>
                        </CardAction>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default Loginuserform
