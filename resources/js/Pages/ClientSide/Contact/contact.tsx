import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { Button } from "@/shadcn/ui/button";
import { useToast } from "@/shadcn/ui/use-toast";
import { Link, router } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { FaRegBookmark } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { TiMessage } from "react-icons/ti";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const Contact = ({ ...props }) => {

    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const { toast } = useToast();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'));
    };


    return (
        <>

            <div className="container border-2 mx-auto px-4 my-5 bg-white">
                <div className="flex items-center justify-center gap-5 py-5 px-8 border-b border-gray-300">
                    <TiMessage className="h-8 w-8 text-gray-900" />
                    <h1 className="text-2xl font-bold text-gray-900 uppercase">
                        Contactez Nous
                    </h1>
                </div>
                <div className="px-8 w-full py-5">
                    <form
                        onSubmit={submit}
                        className="flex flex-col gap-5 py-4"
                    >
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="flex flex-col gap-2 md:w-1/2">
                                <label htmlFor="first_name" className="text-sm text-gray-600">Prénom</label>
                                <Input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    value={data.first_name}
                                    onChange={(e) => setData("first_name", e.target.value)}
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-sm">{errors.first_name}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 md:w-1/2">
                                <label htmlFor="last_name" className="text-sm text-gray-600">Nom</label>
                                <Input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    value={data.last_name}
                                    onChange={(e) => setData("last_name", e.target.value)}
                                />
                                {errors.last_name && (
                                    <p className="text-red-500 text-sm">{errors.last_name}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm text-gray-600">Email</label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring blue-600 focus:border-transparent"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="text-sm text-gray-600">Téléphone</label>
                            <Input
                                type="text"
                                name="phone"
                                id="phone"
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="subject" className="text-sm text-gray-600">Sujet</label>
                            <Input
                                type="text"
                                name="subject"
                                id="subject"
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                value={data.subject}
                                onChange={(e) => setData("subject", e.target.value)}
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-sm">{errors.subject}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm text-gray-600">Message</label>
                            <Textarea
                                name="message"
                                id="message"
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                value={data.message}
                                onChange={(e) => setData("message", e.target.value)}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm">{errors.message}</p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                disabled={processing}
                            >
                                Envoyer
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Contact.layout = (page) => <LandingMainLayout children={page} />;
export default Contact;
