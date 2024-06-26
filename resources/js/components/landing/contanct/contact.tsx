import { Button } from "@/shadcn/ui/button";
import { useToast } from "@/shadcn/ui/use-toast";
import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const ContactUsForm = ({ ...props }) => {

    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const { t } = useLaravelReactI18n();
    const { toast } = useToast();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveState: false,
            onSuccess: () => {
                toast({
                    title: t("custom.contact_page.success"),
                    description: t("custom.contact_page.success_description"),
                })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: t("custom.global.error"),
                    description: t("custom.global.error_description"),
                })
            },
        });
    };


    return (
        <>
            <form
                onSubmit={submit}
                className="flex flex-col gap-5 py-4 text-gray-900"
            >
                <div className="flex flex-col md:flex-row gap-5 ">
                    <div className="flex flex-col gap-2 md:w-1/2">
                        <label htmlFor="first_name" className="text-sm text-gray-600">
                            {t('custom.contact_page.first_name')}
                        </label>
                        <Input
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            value={data.first_name}
                            placeholder={t('custom.contact_page.first_name')}
                            onChange={(e) => setData("first_name", e.target.value)}
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-sm">{errors.first_name}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 md:w-1/2">
                        <label htmlFor="last_name" className="text-sm text-gray-600">
                            {t('custom.contact_page.last_name')}
                        </label>
                        <Input
                            type="text"
                            name="last_name"
                            id="last_name"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            value={data.last_name}
                            placeholder={t('custom.contact_page.last_name')}
                            onChange={(e) => setData("last_name", e.target.value)}
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-sm">{errors.last_name}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm text-gray-600">
                        {t('custom.contact_page.email')}
                    </label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 blue-600 focus:border-transparent"
                        value={data.email}
                        placeholder={t('custom.contact_page.email')}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm text-gray-600">
                        {t('custom.contact_page.phone')}
                    </label>
                    <Input
                        type="text"
                        name="phone"
                        id="phone"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        value={data.phone}
                        placeholder={t('custom.contact_page.phone')}
                        onChange={(e) => setData("phone", e.target.value)}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-sm text-gray-600">
                        {t('custom.contact_page.subject')}
                    </label>
                    <Input
                        type="text"
                        name="subject"
                        id="subject"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        value={data.subject}
                        placeholder={t('custom.contact_page.subject')}
                        onChange={(e) => setData("subject", e.target.value)}
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-sm">{errors.subject}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm text-gray-600">
                        {t('custom.contact_page.message')}
                    </label>
                    <Textarea
                        name="message"
                        id="message"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        value={data.message}
                        placeholder={t('custom.contact_page.message')}
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
                        {t('custom.contact_page.send')}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default ContactUsForm;
