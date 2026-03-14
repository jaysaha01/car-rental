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
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm, SubmitHandler } from "react-hook-form"
import { createUser } from "@/app/utils/api"
import { toast } from 'react-toastify';
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'

type Inputs = {
    name: string
    email: string
    phone: string
    usertype: string
    password: string
}

const Createuserform = () => {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let result = await createUser(data)
        console.log(result)
        if (result.statusText
            == "OK") {
            reset()
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
            redirect('/login')
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
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Create your account</CardTitle>
                        <CardDescription>
                            Fill in your details to get started
                        </CardDescription>
                        <CardAction>
                            <Link href="/login" className="cursor-pointer"><Button variant="link">Sign In</Button></Link>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="Enter your full name"
                                        placeholder="Ranajay Saha"
                                        {...register("name", { required: true })}
                                    />
                                    {errors.name && <span className="text-red-600">This field is required</span>}
                                </div>

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
                                    <Label htmlFor="contact">Phone Number</Label>
                                    <Input
                                        id="contact"
                                        type="tel"
                                        placeholder="+91 9504552433"
                                        {...register("phone", { required: true })}
                                    />
                                    {errors.phone && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input id="password" type="password" {...register("password", { required: true })} />
                                    {errors.password && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div >
                                    <Label className='mb-3'>I want to</Label>
                                    <div>
                                        <RadioGroup defaultValue="plus" className="max-w-sm flex">

                                            <FieldLabel htmlFor="pro-plan">
                                                <Field orientation="horizontal">
                                                    <FieldContent>
                                                        <FieldTitle>Rent Vehicle</FieldTitle>
                                                        <FieldDescription>Find and book vehicles for your personal or business needs.</FieldDescription>
                                                    </FieldContent>
                                                    <RadioGroupItem value="Renter" id="pro-plan" {...register("usertype", { required: true })} />
                                                </Field>
                                            </FieldLabel>
                                            <FieldLabel htmlFor="enterprise-plan">
                                                <Field orientation="horizontal">
                                                    <FieldContent>
                                                        <FieldTitle>List Vehicle</FieldTitle>
                                                        <FieldDescription>
                                                            List your vehicle and earn money by renting it to others.
                                                        </FieldDescription>
                                                    </FieldContent>
                                                    <RadioGroupItem value="Owner" id="enterprise-plan" {...register("usertype", { required: true })} />
                                                </Field>
                                            </FieldLabel>
                                        </RadioGroup>
                                        {errors.usertype && <span>This field is required</span>}
                                    </div>
                                </div>
                            </div>
                            <CardFooter className="flex-col gap-2 mt-5 w-full">
                                <Button type="submit" className="w-full" disabled={isSubmitting} >
                                    Create Account
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Createuserform
