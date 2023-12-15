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
import { useTranslation } from "react-i18next";

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

    const { t } = useTranslation();
    const { toast } = useToast();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'),{
            onSuccess: () => {
                toast({
                    title: t("contact_page.success"),
                    description: t("contact_page.success_description"),
                })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: t("global.error"),
                    description: t("global.error_description"),
                })
            },
        });
    };


    return (
        <>


            <div className="flex items-center justify-center gap-5 py-5 px-8 border-b border-gray-300">
                <TiMessage className="h-8 w-8 text-gray-900" />
                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                    {t('contact_page.title')}
                </h1>
            </div>
            <div className="w-full md:container md:px-0 border-2 my-5 bg-gray-50 font-sans rtl:font-arabic rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="hidden w-full h-full md:flex flex-col justify-center overflow-hidden">
                        <img 
                            src="/image/contact-us.png"
                            className="w-full h-full object-cover"
                            alt="contact us"
                        />
                    </div>
                    <div className="px-8 w-full py-5 ltr:font-sans rtl:font-arabic">
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-5 py-4"
                        >
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="flex flex-col gap-2 md:w-1/2">
                                    <label htmlFor="first_name" className="text-sm text-gray-600">
                                        {t('contact_page.first_name')}
                                    </label>
                                    <Input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        value={data.first_name}
                                        placeholder={t('contact_page.first_name')}
                                        onChange={(e) => setData("first_name", e.target.value)}
                                    />
                                    {errors.first_name && (
                                        <p className="text-red-500 text-sm">{errors.first_name}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 md:w-1/2">
                                    <label htmlFor="last_name" className="text-sm text-gray-600">
                                        {t('contact_page.last_name')}
                                    </label>
                                    <Input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        value={data.last_name}
                                        placeholder={t('contact_page.last_name')}
                                        onChange={(e) => setData("last_name", e.target.value)}
                                    />
                                    {errors.last_name && (
                                        <p className="text-red-500 text-sm">{errors.last_name}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm text-gray-600">
                                    {t('contact_page.email')}
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring blue-600 focus:border-transparent"
                                    value={data.email}
                                    placeholder={t('contact_page.email')}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className="text-sm text-gray-600">
                                    {t('contact_page.phone')}
                                </label>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    value={data.phone}
                                    placeholder={t('contact_page.phone')}
                                    onChange={(e) => setData("phone", e.target.value)}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="subject" className="text-sm text-gray-600">
                                    {t('contact_page.subject')}
                                </label>
                                <Input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    value={data.subject}
                                    placeholder={t('contact_page.subject')}
                                    onChange={(e) => setData("subject", e.target.value)}
                                />
                                {errors.subject && (
                                    <p className="text-red-500 text-sm">{errors.subject}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm text-gray-600">
                                    {t('contact_page.message')}
                                </label>
                                <Textarea
                                    name="message"
                                    id="message"
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    value={data.message}
                                    placeholder={t('contact_page.message')}
                                    onChange={(e) => setData("message", e.target.value)}
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm">{errors.message}</p>
                                )}
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                    disabled={processing}
                                >
                                    {t('contact_page.send')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}

Contact.layout = (page) => <LandingMainLayout children={page} />;
export default Contact;
