
// React Components
import { useEffect, useState } from "react";

// Inertia Components
import { Head, Link, router } from "@inertiajs/react";

// Main Components
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

// Shadcn Components
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog"
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";

// Icons
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineLoading3Quarters, AiOutlineRight } from "react-icons/ai";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { MdOutlineFormatAlignLeft, MdOutlineFormatAlignRight, MdOutlineTextDecrease, MdOutlineTextIncrease } from "react-icons/md";
import { RxTextAlignMiddle } from "react-icons/rx";

import { useToast } from "@/shadcn/ui/use-toast";
import { IoMdSend } from "react-icons/io";
import { RiLineHeight } from "react-icons/ri";

const Contact = ({ ...props }) => {
    const [message, setClient] = useState(props?.contact)
    const [direction, setDirection] = useState('ltr')
    const [fontSize, setFontSize] = useState(16)
    const [lineHeight, setLineHeight] = useState(1.5)
    const [deleteloading, setDeleteloading] = useState(false)

    const { toast } = useToast()

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const handleDeleteClient = () => {
        setDeleteloading(true)
        router.delete(route('contact.destroy', { id: message?.id }), {
            onSuccess: () => {
                toast({
                    title: 'Succès',
                    description: 'Le Client a été supprimé avec succès',
                    duration: 5000,
                })
                // router.push(route('clients'))
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Erreur',
                    description: 'Une erreur s\'est produite lors de la suppression du Client',
                    duration: 5000,
                })
            },
            onFinish: () => {
                setDeleteloading(false)
            },
        })

    }
    return (
        <>
            <Head>
                <title>Le Contact</title>
                <meta name="description" content="Découvrez notre liste de contacts" />
            </Head>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/dashboard/contacts">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Contacts</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight font-arabic">
                    {message?.first_name} {message?.last_name}
                </h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 bg-gray-100">
                    <div className="flex flex-col text-center md:text-left">
                        <h2 className="text-xl text-gray-900 font-bold tracking-tight font-arabic">{message?.subject}</h2>
                        <p className="text-sm text-gray-600 font-arabic">{message?.first_name} {message?.last_name}</p>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <a
                            href={`mailto:${message?.email}`}
                            className="flex flex-row justify-center items-center gap-2"
                        >
                            <Button
                                variant="outline"
                                className="group p-0 h-12 w-12 hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                            >
                                <IoMdSend className="text-2xl" />
                                <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Répondre</p>
                            </Button>
                        </a>
                        {[3, 4].includes(parseInt(props?.auth?.user?.role)) && (
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button
                                        variant="outline"
                                        className="group p-0 h-12 w-12 hover:w-32 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                        disabled={deleteloading}
                                    >
                                        {deleteloading ? <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> : <AiOutlineDelete className="text-2xl" />}
                                        <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-2 text-sm font-medium text-gray-900">Supprimer</p>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Supprimer le Message
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Annuler
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDeleteClient()}
                                        >
                                            Continuer
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>

                <Separator className="" />
                <div className="flex flex-col gap-4 py-5 px-5 ">

                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Numéro :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <BsFillTelephoneOutboundFill className="text-base text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {message?.phone}
                            </p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Email :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <IoMail className="text-lg text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {message?.email}
                            </p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Date d'envoi :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <AiOutlineCalendar className="text-xl text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {formatDate(message?.created_at)}
                            </p>
                        </div>
                    </div>
                    <Separator className="" />
                    <div className="flex flex-col justify-start items-center gap-2">

                        <div className="w-full flex flex-row justify-between items-center gap-2">

                            <h1 className="text-sm font-medium md:w-40 text-gray-800">Message :</h1>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <Button
                                    variant="outline"
                                    className="group p-0 h-9 w-9 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                    onClick={() => setDirection('ltr')}
                                >
                                    <MdOutlineFormatAlignLeft className="text-lg" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="group p-0 h-9 w-9 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                    onClick={() => setDirection('rtl')}
                                >
                                    <MdOutlineFormatAlignRight className="text-lg" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="group p-0 h-9 w-9 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                    onClick={() => setFontSize(fontSize + 1)}
                                >
                                    <MdOutlineTextIncrease className="text-lg" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="group p-0 h-9 w-9 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                    onClick={() => setFontSize(fontSize - 1)}
                                >
                                    <MdOutlineTextDecrease className="text-lg" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="group p-0 h-9 w-9 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                    onClick={() => setLineHeight(lineHeight + 0.5)}
                                >
                                    <RiLineHeight className="text-lg" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="group p-0 h-9 w-9 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                    onClick={() => setLineHeight(lineHeight - 0.5)}
                                >
                                    <RxTextAlignMiddle className="text-lg transform rotate-180" />
                                </Button>
                            </div>
                        </div>
                        <div className="w-full items-center gap-2 border border-gray-300 rounded-md p-2">
                            <p className={`font-bold text-gray-900  font-arabic ${direction === 'rtl' ? 'text-right' : 'text-left'}`} style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}` }}>
                                {message?.message.split("custom.\n").map((i, key) => {
                                    return <div key={key}>{i}</div>;
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Contact.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Contact;