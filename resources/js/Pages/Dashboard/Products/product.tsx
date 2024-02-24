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
    DialogTrigger,
} from "@/shadcn/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs"
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";

// Icons
import { AiOutlineDelete, AiOutlineLoading3Quarters, AiOutlineRight } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineArchive, MdOutlineUnarchive, MdUnarchive } from "react-icons/md";
import { TiPin, TiPinOutline, TiPlus } from "react-icons/ti";

// Types
import { ProductsInfo } from "@/components/columns/products";
import { TbExternalLink } from "react-icons/tb";
import { useToast } from "@/shadcn/ui/use-toast";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { FaChevronRight, FaPlus } from "react-icons/fa";
import Pagination from "@/components/tables/pagination";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";

const Product = ({ ...props }) => {
    const [product, setProduct] = useState<ProductsInfo | null>(props?.product)
    const [statusLoading, setStatusLoading] = useState<[boolean, number]>([false, -1])
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [receptionData, setReceptionData] = useState<any>({
        name: "",
        quantity: "",
        price: 1,
        product_id: "",
    })
    const [receptionLoading, setReceptionLoading] = useState<boolean>(false)

    const { toast } = useToast()

    useEffect(() => {
        setProduct(props?.product)
    }, [props?.product])

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const status = () => {
        let text = "NaN";
        let color = "bg-gray-600";
        switch (product?.status) {
            case "archived":
                text = "ARCHIVÉ";
                color = "bg-gray-600";

                break;
            case "published":
                text = "PUBLIÉ";
                color = "bg-green-600";
                break;
            case "pinned":
                text = "ÉPINGLEÉ";
                color = "bg-blue-600";
                break;
            default:
                text = "PUBLIÉ";
                color = "bg-green-600";
                break;
        }
        return (
            <div className="flex flex-row justify-start items-center gap-2">
                <p className={`px-3 py-1 rounded-sm text-xs font-medium text-white uppercase ${color}`}>
                    {text}
                </p>
            </div>
        )
    }

    const handleUpdateStatus = (status: number) => {
        setStatusLoading([true, status])
        router.patch(route('product.update_status', product?.id), {
            status: status,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Status modifié',
                    description: 'Le status a été modifié avec succès',
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Erreur',
                    description: 'Une erreur s\'est produite lors de la modification du status',
                    duration: 5000,
                })
            },
            onFinish: () => {
                setStatusLoading([false, -1])
            },
        })
    }

    const handleAddReception = () => {
        const data = {
            name: receptionData.name,
            quantity: receptionData.quantity,
            price: receptionData.price / receptionData.quantity,
            product_id: product?.id,
        }
        setReceptionLoading(true)
        router.post(route('reception.store'), data, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Reception ajouté',
                    description: 'Le reception a été ajouté avec succès',
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Erreur',
                    description: 'Une erreur s\'est produite lors de l\'ajout du reception',
                    duration: 5000,
                })
            },
            onFinish: () => {
                setReceptionLoading(false)
            },
        })
    }

    const handleDeleteProduct = () => {
        setDeleteLoading(true)
        router.delete(route('product.destroy', product?.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Product supprimé',
                    description: 'Le product a été supprimé avec succès',
                    duration: 5000,
                })
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Erreur',
                    description: 'Une erreur s\'est produite lors de la suppression du product',
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
            <Head>
                <title>
                    {product?.name}
                </title>
            </Head>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/dashboard/products">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Produits</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">{product?.name}</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">{product?.name}</h2>
                            {/* <p className="text-sm text-gray-600">{product?.category}</p> */}
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex flex-wrap sm:flex-nowrap justify-center md:justify-end gap-2">
                        {true && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="group p-0 h-12 w-12 hover:w-52 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                        disabled={statusLoading[0] && statusLoading[1] === 1}
                                        onClick={() => handleUpdateStatus(1)}
                                    >
                                        {receptionLoading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <FaPlus className="text-xl" />}
                                        <p className="hidden md:block group-hover:w-36 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Ajouter une reception</p>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Ajouter un reception</DialogTitle>
                                        <DialogDescription>
                                            Ajouter un reception pour le product {product?.name}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="name">Nom</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                value={receptionData.name}
                                                onChange={(e) => setReceptionData({ ...receptionData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="quantity">Quantité</Label>
                                            <Input
                                                type="number"
                                                name="quantity"
                                                id="quantity"
                                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                value={receptionData.quantity}
                                                onChange={(e) => setReceptionData({ ...receptionData, quantity: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="price">Prix</Label>
                                            <Input
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                value={receptionData.price}
                                                onChange={(e) => setReceptionData({ ...receptionData, price: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button className="mr-2" variant="outline">
                                                Annuler
                                            </Button>
                                        </DialogClose>
                                        <Button type="submit" onClick={() => handleAddReception()}>
                                            {receptionLoading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : "Ajouter"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                        {product?.status === "pinned" && (
                            <Button
                                variant="outline"
                                className="group p-0 h-12 w-12 md:hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                disabled={statusLoading[0] && statusLoading[1] === 1}
                                onClick={() => handleUpdateStatus(1)}
                            >
                                {statusLoading[0] && statusLoading[1] === 1 ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <TiPin className="text-2xl" />}
                                <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Détacher</p>
                            </Button>
                        )}
                        {product?.status !== "pinned" && (
                            <Button
                                variant="outline"
                                className="group p-0 h-12 w-12 md:hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                disabled={statusLoading[0] && statusLoading[1] === 2}
                                onClick={() => handleUpdateStatus(2)}
                            >
                                {statusLoading[0] && statusLoading[1] === 2 ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <TiPinOutline className="text-2xl" />}
                                <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Épingler</p>
                            </Button>
                        )}
                        {product?.status === "archived" && (
                            <Button
                                variant="outline"
                                className="group p-0 h-12 w-12 md:hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                disabled={statusLoading[0] && statusLoading[1] === 1}
                                onClick={() => handleUpdateStatus(1)}
                            >
                                {statusLoading[0] && statusLoading[1] === 1 ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <MdUnarchive className="text-2xl" />}
                                <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Publier</p>
                            </Button>
                        )}
                        {product?.status !== "archived" && (
                            <Button
                                variant="outline"
                                className="group p-0 h-12 w-12 md:hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                disabled={statusLoading[0] && statusLoading[1] === 0}
                                onClick={() => handleUpdateStatus(0)}
                            >
                                {statusLoading[0] && statusLoading[1] === 0 ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <MdOutlineArchive className="text-2xl" />}
                                <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Archiver</p>
                            </Button>
                        )}

                        {[3, 4].includes(parseInt(props?.auth?.user?.role)) && (
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button
                                        variant="outline"
                                        className="group p-0 h-12 w-12 md:hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                                        disabled={deleteLoading}
                                    >
                                        {deleteLoading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : <AiOutlineDelete className="text-2xl" />}
                                        <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Supprimer</p>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Supprimer La Product
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Êtes-vous sûr de vouloir supprimer cette product ? Cette action est irréversible.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Annuler
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDeleteProduct()}
                                        >
                                            Continuer
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}

                        <Link href={`/dashboard/products/${product?.id}/edit`}>
                            <Button
                                variant="outline"
                                className="group p-0 h-12 w-12 md:hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                            >
                                <LiaEdit className="text-2xl" />
                                <p className="hidden md:block group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">Modifier</p>
                            </Button>
                        </Link>
                    </div>
                </div>

                <Separator />
                <div className="flex flex-col gap-4 py-5 px-5 ">
                    <Link href={`/products/${product?.id}`}>
                        <Button variant="outline" className="flex items-center gap-2 border-2 border-gray-600 hover:border-gray-800">
                            <p className="text-sm font-bold text-gray-600">Voir La Page</p>
                            <FaChevronRight className="text-sm text-gray-600" />
                        </Button>
                    </Link>
                    <Swiper
                        modules={[Scrollbar]}
                        spaceBetween={5}
                        scrollbar={{ draggable: true }}
                        slidesPerView={1}
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 3,
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 3,
                            },
                            // when window width is >= 1200px
                            1200: {
                                slidesPerView: 5,
                            },
                        }}
                        className="w-full h-[250px]"
                    >
                        {(product?.images || []).map((image: any, index) => (
                            <SwiperSlide
                                key={index}
                                className="flex justify-center items-center cursor-pointer"
                            >
                                <div
                                    className={`w-auto h-52 md:h-56 shrink-0 snap-center flex flex-col items-center justify-start bg-cover bg-center border shadow-md rounded-md`}
                                    style={{
                                        backgroundImage: `url(${image.path})`,
                                    }}
                                >
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* {(product?.images || []).map((image: any, index) => (
                            <div key={index} className="relative h-64 border shadow-md rounded-md">
                                <img
                                    src={`${image.path}`}
                                    className="absolute h-full w-full object-cover rounded-md"
                                />
                            </div>
                        ))} */}

                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">ID :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">#{product?.id}</p>

                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Reference :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{product?.reference}</p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Categories :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            {product?.categories.map((category: any, index) => (
                                <p key={index} className="px-2 py-1 rounded-sm text-xs font-medium text-white uppercase bg-gray-600">{category.name}</p>
                            ))}
                            {product?.categories.length === 0 && (
                                <p className="text-sm font-bold text-gray-500">Aucune categorie</p>
                            )}
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Status :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <div className="text-sm font-bold text-gray-500">{status()}</div>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Quantité</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{product?.quantity} {product?.unit}</p>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col justify-center md:justify-start items-start gap-2">
                        <h1 className="text-sm font-medium md:w-128 text-gray-800">Description :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <div className="text-sm font-bold text-gray-500">{product?.description.split('custom.<br/>').map((value, index) => (<div key={index}><span>{value}</span><br /></div>))}</div>
                        </div>
                    </div>
                    <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col  justify-center md:justify-start items-start gap-2">
                        <h1 className="text-sm font-medium md:w-128 text-gray-800">Description En arabe :</h1>
                        <div dir="rtl" className="w-full flex flex-row justify-start items-center gap-2">
                            <div className="text-sm font-bold text-gray-500 font-arabic">{product?.description_ar.split('custom.<br/>').map((value, index) => (<div key={index}><span>{value}</span><br /></div>))}</div>
                        </div>
                    </div>
                    {/* <Separator className="mt-0 md:hidden" />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                        <h1 className="text-sm font-medium md:w-40 text-gray-800">Date de création :</h1>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <p className="text-sm font-bold text-gray-500">{formatDate(product?.created_at)}</p>
                        </div>
                    </div> */}
                </div>
                <Separator className="mt-0" />
                <div className="flex flex-col gap-2 mt-2">
                    <Tabs defaultValue="prices" className="w-full">
                        <TabsList className="flex h-auto flex-col md:flex-row justify-start items-center gap-2 bg-transparent  overflow-x-auto">
                            <TabsTrigger value="prices" className="w-52 border-b rounded-none">Les prix</TabsTrigger>
                            <TabsTrigger value="reception" className="w-52  border-b rounded-none">Les reception</TabsTrigger>
                            <TabsTrigger value="orders" className="w-52  border-b rounded-none">Les commandes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="prices" className="px-5">
                            <div className="w-full  mb-5 border-2 ">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-40">Quantité</TableHead>
                                            <TableHead>Prix</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(product?.productPrices || []).sort((a, b) => a.active ? -1 : 1).map((price, index) => (
                                            <TableRow key={index} className="relative">

                                                <TableCell className="font-medium text-xs">
                                                    {!price.active && (
                                                        <>
                                                            <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
                                                            {/* MAKE A LINE IN THE MIDDLE */}
                                                            <div className="absolute inset-0 flex flex-row justify-center items-center">
                                                                <div className="w-full h-[1px] bg-gray-600"></div>
                                                            </div>
                                                        </>
                                                    )}
                                                    {price.id}
                                                </TableCell>
                                                <TableCell className="font-bold text-xs">{price.quantity} {price.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{price.price} DA</TableCell>
                                            </TableRow>
                                        ))}
                                        {(product?.productPrices || []).length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                    Aucune donnée
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>
                            </div>
                        </TabsContent>
                        <TabsContent value="reception" className="px-5">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="min-w-[700px] w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-32">Quantité</TableHead>
                                            <TableHead className="w-36">Reste En Stock</TableHead>
                                            <TableHead className="w-60">Ajouter par</TableHead>
                                            <TableHead className="w-auto">Date</TableHead>
                                            <TableHead className="w-5"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(product?.receptions?.data || []).map((reception, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{reception.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.quantity} {product?.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.rest} G</TableCell>
                                                <TableCell className="font-bold text-xs">{reception.user_id}</TableCell>
                                                <TableCell className="font-bold text-xs">{formatDate(reception.created_at)}</TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    <Link href={`/dashboard/receptions/${reception.id}`}>
                                                        <Button variant="outline" className="flex items-center gap-2 border-2 border-gray-600 hover:border-gray-800">
                                                            <p className="text-sm font-bold text-gray-600">Voir Plus</p>
                                                            <FaChevronRight className="text-sm text-gray-600" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {(product?.receptions?.data || []).length === 0 && (
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
                                <Pagination meta={product?.receptions} preserveScroll={true} preservestate={true} />
                            </div>
                        </TabsContent>
                        <TabsContent value="orders" className="px-5">
                            <div className="w-full mb-5 border-2 ">
                                <Table className="min-w-[700px] w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                            <TableHead className="w-5">ID</TableHead>
                                            <TableHead className="w-40">User</TableHead>
                                            <TableHead className="w-60">quantité commandée</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="w-5"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(product?.orders?.data || []).map((order, index) => (
                                            <TableRow key={index} >
                                                <TableCell className="font-medium text-xs">{order.id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.user_id}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.total} {product?.unit}</TableCell>
                                                <TableCell className="font-bold text-xs">{order.status}</TableCell>
                                                <TableCell className="font-bold text-xs">
                                                    <Link href={`/dashboard/orders/${order.id}`}>
                                                        <Button variant="outline" className="flex items-center gap-2 border-2 border-gray-600 hover:border-gray-800">
                                                            <p className="text-sm font-bold text-gray-600">Voir Plus</p>
                                                            <FaChevronRight className="text-sm text-gray-600" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {(product?.orders?.data || []).length === 0 && (
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
                                <Pagination meta={product?.orders} preserveScroll={true} preservestate={true} />
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </>
    );
}

Product.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default Product;
