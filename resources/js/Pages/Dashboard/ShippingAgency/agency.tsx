// React Components
import { useEffect, useState } from "react";

// Inertia Components
import { Head, Link, router } from "@inertiajs/react";

// Main Components
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

// Shadcn Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs"
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";

// Icons
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineLoading3Quarters, AiOutlineRight } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

// Types
import { FaChevronRight } from "react-icons/fa";
import { useToast } from "@/shadcn/ui/use-toast";
import { MdEdit } from "react-icons/md";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FaPowerOff } from "react-icons/fa6";


const Agence = ({ ...props }) => {
    const [agence, setagence] = useState(props?.shippingAgency)
    const [statusLoading, setStatusLoading] = useState<boolean>(false)
    const [agenceInfo, setagenceInfo] = useState<any>({
        name: agence?.name,
        name_ar: agence?.name_ar,
    })
    const [editInfoLoading, setDeleteLoading] = useState<boolean>(false)

    const [currentTarif, setCurrentTarif] = useState<any>(null)
    const [showEditTarif, setShowEditTarif] = useState<boolean>(false)
    const [editLoading, setEditLoading] = useState<boolean>(false)

    const { toast } = useToast()

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    useEffect(() => {
        setagence(props?.shippingAgency)
    }, [props?.shippingAgency])

    const handleEditTarif = () => {
        setEditLoading(true)
        router.patch(route('shipping_fee.update', currentTarif?.id), {
            ...currentTarif
        }, {
            preserveState: false,
            onSuccess: () => {
                toast({
                    title: "La Agence Tarif a été modifié avec succès",
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Une erreur s'est produite lors de la modification de la Agence Tarif",
                    description: "",
                    duration: 5000,
                })
            },
            onFinish: () => {
                setEditLoading(false)
            }
        })
    }

    const handleChangeAgenceStatus = (status) => {
        setStatusLoading(true)
        router.patch(route('shipping_agency.update', agence?.id), {
            name: agence?.name,
            name_ar: agence?.name_ar,
            active: status
        }, {
            preserveState: false,
            onSuccess: () => {
                toast({
                    title: "La Agence a été modifié avec succès",
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Une erreur s'est produite lors de la modification de la Agence",
                    description: "",
                    duration: 5000,
                })
            },
            onFinish: () => {
                setStatusLoading(false)
            }
        })
    }

    const handleEditAgence = () => {
        setDeleteLoading(true)
        router.patch(route('shipping_agency.update', agence?.id), {
            ...agenceInfo
        }, {
            preserveState: false,
            onSuccess: () => {
                toast({
                    title: "La Agence a été modifié avec succès",
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Une erreur s'est produite lors de la modification de la Agence",
                    description: "",
                    duration: 5000,
                })
            },
            onFinish: () => {
                setDeleteLoading(false)
            }
        })
    }
    return (
        <>
            <Head>
                <title>
                    {agence?.name}
                </title>
            </Head>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/dashboard/shipping_agencies">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Agences</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">{agence?.name}</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">{agence?.name}</h2>
                            <p className="text-sm text-gray-600 font-medium tracking-tight font-arabic">{agence?.name_ar}</p>
                        </div>
                    </div>
                    {/* ACTIONS */}

                    <div className="flex justify-end gap-2">
                        {[3, 4].includes(parseInt(props?.auth?.user?.role)) && agence?.active === 1 && (
                            <Button
                                variant="outline"
                                className="group p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                disabled={statusLoading[0] && statusLoading[1] === 1}
                                onClick={() => handleChangeAgenceStatus(false)}
                            >
                                {statusLoading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <FaPowerOff className="text-2xl text-red-500" />}
                            </Button>
                        )}
                        {[3, 4].includes(parseInt(props?.auth?.user?.role)) && agence?.active === 0 && (
                            <Button
                                variant="outline"
                                className="group p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                disabled={statusLoading[0] && statusLoading[1] === 0}
                                onClick={() => handleChangeAgenceStatus(true)}
                            >
                                {statusLoading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <FaPowerOff className="text-2xl text-green-500" />}
                            </Button>
                        )}
                        {[3, 4].includes(parseInt(props?.auth?.user?.role)) && (
                            <Dialog>
                                <DialogTrigger
                                    className="group p-0 h-12 w-12 hover:sm:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                    disabled={editInfoLoading}

                                >
                                    {editInfoLoading ? <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> : <MdEdit className="text-2xl" />}
                                    <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-2 text-sm font-medium text-gray-900">Modifier</p>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>

                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="name">
                                                Nom de la Agence
                                            </Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                value={agenceInfo.name}
                                                onChange={(e) => setagenceInfo({ ...agenceInfo, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="name_ar">
                                                Nom de la Agence (Ar)
                                            </Label>
                                            <Input
                                                dir="rtl"
                                                type="text"
                                                name="name_ar"
                                                id="name_ar"
                                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-arabic"
                                                value={agenceInfo.name_ar}
                                                onChange={(e) => setagenceInfo({ ...agenceInfo, name_ar: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button className="mr-2" variant="outline">
                                                Annuler
                                            </Button>
                                        </DialogClose>
                                        <Button type="submit" onClick={() => handleEditAgence()}>
                                            {editInfoLoading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : "Modifier"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}

                    </div>
                </div>


                <Separator className="" />
                <div className="flex flex-col gap-4 py-5 px-5 ">
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Status :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            {agence?.active == 1 && (
                                <div className="flex items-center gap-2 rounded-full bg-green-100 px-2 py-1">
                                    <FaPowerOff className="text-green-500 text-xl" />
                                    <p className="text-sm font-bold text-green-500">Active</p>
                                </div>
                            )}
                            {agence?.active == 0 && (
                                <div className="flex items-center gap-2 rounded-full bg-red-100 px-2 py-1">
                                    <FaPowerOff className="text-red-500 text-xl" />
                                    <p className="text-sm font-bold text-red-500">Désactivé</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <h1 className="text-sm font-medium w-40 text-gray-800">Date De Création :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <AiOutlineCalendar className="text-xl text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">{formatDate(agence?.created_at)}</p>
                        </div>
                    </div>
                </div>
                <Separator className="mt-0" />
                <div className="flex flex-col gap-2 px-5 mt-2">
                    <Tabs defaultValue="product_tarifs" className="w-full">
                        <TabsList className="flex h-auto flex-col md:flex-row justify-start items-center gap-2 bg-transparent">
                            <TabsTrigger value="product_tarifs" className="w-52 border-b rounded-none">Agence Tarifs</TabsTrigger>
                        </TabsList>
                        <TabsContent value="product_tarifs">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-40">Code de Wilaya</TableHead>
                                            <TableHead className="w-40">Nom de Wilaya</TableHead>
                                            <TableHead className="w-40">domicile Tarif</TableHead>
                                            <TableHead className="w-40">Agence Tarif</TableHead>
                                            <TableHead className="w-5">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(agence?.shipping_fees || []).map((tarif, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-bold text-xs">{tarif?.wilaya_code}</TableCell>
                                                <TableCell className="font-bold text-xs">{tarif?.wilaya}</TableCell>
                                                <TableCell className="font-bold text-xs">{tarif?.home_delivery_price} DA</TableCell>
                                                <TableCell className="font-bold text-xs">{tarif?.agency_delivery_price} DA</TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    {[3, 4].includes(parseInt(props?.auth?.user?.role)) && (
                                                        <Button
                                                            variant="outline"
                                                            className="text-xs text-gray-900 hover:text-gray-700 border-0 hover:bg-transparent"
                                                            onClick={() => {
                                                                setCurrentTarif(tarif)
                                                                setShowEditTarif(true)
                                                            }}
                                                        >
                                                            <MdEdit className="h-5 w-5" />
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {(agence?.shipping_fees || []).length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                    Aucune donnée
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            {showEditTarif && (
                <Dialog open={showEditTarif} >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Modifier La Agence Tarif</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="home_delivery">
                                    Domicile Tarif
                                </Label>
                                <Input
                                    type="text"
                                    name="home_delivery"
                                    id="name"
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    value={currentTarif.home_delivery_price}
                                    onChange={(e) => setCurrentTarif({ ...currentTarif, home_delivery_price: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="agency_delivery">
                                    Agence Tarif
                                </Label>
                                <Input
                                    type="text"
                                    name="agency_delivery"
                                    id="name"
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    value={currentTarif.agency_delivery_price}
                                    onChange={(e) => setCurrentTarif({ ...currentTarif, agency_delivery_price: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="mr-2" variant="outline" onClick={() => setShowEditTarif(false)}>
                                    Annuler
                                </Button>
                            </DialogClose>
                            <Button type="submit" onClick={() => handleEditTarif()} disabled={editLoading}>
                                {editLoading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : "Modifier"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

Agence.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Agence;