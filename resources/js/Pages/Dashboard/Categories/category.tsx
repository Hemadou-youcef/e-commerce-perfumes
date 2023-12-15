import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { Link, router } from "@inertiajs/react";
import { useState } from "react";


// Shadcn Components
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs"

// Icons
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineLoading3Quarters, AiOutlineRight } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import { useToast } from "@/shadcn/ui/use-toast";
import { FaChevronRight } from "react-icons/fa";
import Pagination from "@/components/tables/pagination";

// Types
const Category = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState(props?.category)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

    const { toast } = useToast()

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    const handleDeleteCategory = () => {
        setDeleteLoading(true)
        router.delete(route('category.destroy', data?.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Succès',
                    description: 'Le Categorie a été supprimé avec succès',
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Erreur',
                    description: 'Une erreur s\'est produite lors de la suppression du Categorie',
                    duration: 5000,
                })
            },
            onFinish: () => {
                setDeleteLoading(false)
            },
        })
    }
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/dashboard/categories">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Categories</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">
                    {data?.name}
                </h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-col text-center md:text-left">
                        <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                            {data?.name}
                        </h2>
                        <p className="text-sm text-gray-600 font-arabic">
                            {data?.name_ar}
                        </p>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        {[3, 4].includes(props?.auth?.user?.role) && (
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button
                                        variant="outline"
                                        className="group p-0 h-12 w-12 hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                        disabled={deleteLoading}
                                    >
                                        {deleteLoading ? <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> : <AiOutlineDelete className="text-2xl" />}
                                        <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Supprimer</p>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Supprimer La Categorie
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Êtes-vous sûr de vouloir supprimer cette Categorie ? Cette action est irréversible.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Annuler
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDeleteCategory()}
                                        >
                                            Continuer
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}

                        <Link href={`/dashboard/categories/${data?.id}/edit`}>
                            <Button
                                variant="outline"
                                className="group p-0 h-12 w-12 hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                            >
                                <LiaEdit className="text-2xl" />
                                <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Modifier</p>
                            </Button>
                        </Link>
                    </div>
                </div>

                <Separator className="" />
                <div className="flex flex-col gap-4 py-5 px-5 ">
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Date De Création :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <AiOutlineCalendar className="text-xl text-gray-800" />
                            <p className="text-sm font-bold text-gray-500">
                                {formatDate(data?.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
                <Separator className="mt-0" />
                <div className="flex flex-col gap-2 px-5 mt-2">
                    <Tabs defaultValue="product_used_it" className="w-full">
                        <TabsList className="flex flex-row justify-start items-center gap-2 bg-transparent">
                            <TabsTrigger value="product_used_it" className="w-52 border-b rounded-none">Les Produits</TabsTrigger>
                        </TabsList>
                        <TabsContent value="product_used_it">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-52">Product</TableHead>
                                            <TableHead className="w-52">Date</TableHead>
                                            <TableHead className="w-64">QTE</TableHead>
                                            <TableHead className="w-auto"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(data?.products?.data || []).map((product, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-bold text-xs">{product.name}</TableCell>
                                                <TableCell className="font-medium text-xs">{formatDate(product.created_at)}</TableCell>
                                                <TableCell className="font-medium text-xs">{product.quantity}</TableCell>
                                                <TableCell className="font-medium flex justify-end text-xs">
                                                    <Link href={`/dashboard/products/${product.id}`}>
                                                        <Button variant="outline" className="flex items-center gap-2 border-2 border-gray-600 hover:border-gray-800">
                                                            <p className="text-sm font-bold text-gray-600">Voir Plus</p>
                                                            <FaChevronRight className="text-sm text-gray-600" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {(data?.products?.data || []).length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                    Aucune donnée
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="px-5">
                                <Pagination meta={data?.products} preserveScroll={true} preservestate={true} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

Category.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Category;