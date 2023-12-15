// React Components
import { useState } from "react";

// Inertia Components
import { Link, router } from "@inertiajs/react";

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


const Agence = ({ ...props }) => {
    console.log(props?.shippingAgency)
    const [agence, setagence] = useState(props?.shippingAgency)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

    const [currentTarif, setCurrentTarif] = useState<any>(null)
    const [showEditTarif, setShowEditTarif] = useState<boolean>(false)
    const [editLoading, setEditLoading] = useState<boolean>(false)

    const { toast } = useToast()

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const handleEditTarif = () => {
        setEditLoading(true)
        router.patch(route('shipping_agency.updateTarif', currentTarif?.id), {
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

    const handleDeleteAgence = () => {
        setDeleteLoading(true)
        router.delete(route('agence.destroy', agence?.id), {
            preserveState: false,
            onSuccess: () => {
                toast({
                    title: "La Agence a été supprimé avec succès",
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Une erreur s'est produite lors de la suppression de la Agence",
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
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/dashboard/agences">
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
                        {[3, 4].includes(props?.auth?.user?.role) && (
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button
                                        variant="outline"
                                        className="group p-0 h-12 w-12 hover:w-32 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                        disabled={deleteLoading}
                                    >
                                        {deleteLoading ? <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> : <AiOutlineDelete className="text-2xl" />}
                                        <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-2 text-sm font-medium text-gray-900">Supprimer</p>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Supprimer La Agence
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Êtes-vous sûr de vouloir supprimer cette Agence ? Vous ne pourrez pas revenir en arrière.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Annuler
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDeleteAgence()}
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