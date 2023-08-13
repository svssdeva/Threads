"use client"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {UserValidation} from "@/lib/validations/user";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import {ChangeEvent} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod"

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    },
    btnTitle: string;
}

const AccountProfile = ({user, btnTitle}: Props) => {
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: '',
            name: '',
            username: '',
            bio: ''
        }
    })

    function onSubmit(values: z.infer<typeof UserValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        // const fileReader = new FileReader();
        //
        // if (e.target.files && e.target.files.length > 0) {
        //     const file = e.target.files[0];
        //     setFiles(Array.from(e.target.files));
        //
        //     if (!file.type.includes("image")) return;
        //
        //     fileReader.onload = async (event) => {
        //         const imageDataUrl = event.target?.result?.toString() || "";
        //         fieldChange(imageDataUrl);
        //     };
        //
        //     fileReader.readAsDataURL(file);
        // }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({field}) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="account-form_image-label">
                                {field.value ? (
                                    <Image src={field.value} alt="profile photo"
                                           width="96" height="96" priority
                                           className="rounded-full object-contain"
                                    />
                                ) : (
                                    <Image src="/assets/profile.svg" alt="profile photo"
                                           width="24" height="24"
                                           className="object-contain"
                                    />
                                )}
                            </FormLabel>
                            <FormControl className="flex-1 text-gray-200 text-base-semibold">
                                <Input
                                    type='file'
                                    accept='image/*'
                                    placeholder='Add profile photo'
                                    className='account-form_image-input'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem className="flex w-full items-center gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Name
                            </FormLabel>
                            <FormControl className="flex-1 text-gray-200 text-base-semibold">
                                <Input className="account-form_image no-focus" type="text" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem className="flex w-full items-center gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Username
                            </FormLabel>
                            <FormControl className="flex-1 text-gray-200 text-base-semibold">
                                <Input className="account-form_image no-focus" type="text" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({field}) => (
                        <FormItem className="flex w-full items-center gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Bio
                            </FormLabel>
                            <FormControl className="flex-1 text-gray-200 text-base-semibold">
                                <Textarea className="account-form_image no-focus" rows={10} {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="ng-primary-500">Submit</Button>
            </form>
        </Form>
    )
}

export default AccountProfile