import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineRight } from "react-icons/ai";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";

const Client = ({...props}) => {
    console.log(props)
    const [data, setData] = useState(props?.employee)

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/orders">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Utilisateurs</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">
                    {data?.first_name} {data?.last_name}
                </h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 bg-gray-100">
                    <div className="flex flex-col text-center md:text-left">
                        <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                            {data?.first_name} {data?.last_name}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {data?.username}
                        </p>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" className="p-0 h-12 w-12 border-0 bg-transparent hover:border border-gray-300 ">
                            <AiOutlineDelete className="text-2xl" />
                        </Button>
                        <Button variant="outline" className="p-0 h-12 w-12 border-0 bg-transparent hover:border border-gray-300 ">
                            <LiaEdit className="text-2xl" />
                        </Button>
                    </div>
                </div>

                <Separator className="" />
                <div className="flex flex-col gap-4 py-5 px-5 ">
                    
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Numéro :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <BsFillTelephoneOutboundFill className="text-base text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {data?.phone}
                            </p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Address :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <IoLocationSharp className="text-lg text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {data?.address}
                            </p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Date De Inscription :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <AiOutlineCalendar className="text-xl text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {formatDate(data?.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
                <Separator className="mt-0" />

            </div>
        </>
    );
}

Client.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Client;