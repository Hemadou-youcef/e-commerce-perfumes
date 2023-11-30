import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

// Shadcn Components
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shadcn/ui/form"
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Textarea } from "@/shadcn/ui/textarea";
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/shadcn/ui/context-menu"

// Icons
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { AiOutlineClose, AiOutlineLoading3Quarters, AiOutlineRight } from "react-icons/ai";
import { FaPlus, FaSave } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { LuCrown } from "react-icons/lu";

// Types
type prices = {
    price: number;
    unit: string;
    quantity: number;
}
interface FormData {
    name: string;
    description: string;
    description_ar: string;
    unit: string;
    status: string;
    main_image: File | string | null;
    images: File[];
    prices: prices[];
    other_images: number[];
    removed_images: number[];
}

const ProductForm = ({ ...props }) => {
    console.log(props)
    const editMode = props?.product ? true : false;
    const { data, setData, post, patch, processing, errors, reset } = useForm<FormData>({
        name: props?.product?.name || "",
        description: props?.product?.description || "",
        description_ar: props?.product?.description_ar || "",
        unit: props?.product?.unit?.toUpperCase() || "G",
        status: props?.product?.status || "published",
        main_image: props?.product?.main_image || null,
        images: [],
        prices: props?.product?.product_prices || [],
        other_images: [],
        removed_images: [],
    });

    const [imagesUploaded, setImagesUploaded] = useState<File[]>([
        new File([""], "image1"),
    ]);
    const [currentPrice, setCurrentPrice] = useState<prices>({
        price: 0,
        unit: data?.unit,
        quantity: 0,
    });

    useEffect(() => {
        imagesToDataForm();
    }, [imagesUploaded]);

    const imagesToDataForm = () => {
        const images = imagesUploaded.filter((img, index) => {
            // const notTheMainImage = img.name !== data.main_image?.name;
            const notZeroIndex = index !== 0;
            return notZeroIndex;

        });
        setData(editMode ? "other_images" : "images", images);
    }

    const changeAllPricesUnit = (unit: string) => {
        const prices = data.prices.map((price) => {
            return { ...price, unit: unit };
        });
        setData("prices", prices);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editMode) {
            post(route('product.update', props?.product?.id));
        } else {
            post(route("product.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setImagesUploaded([new File([""], "image1")]);
                },
            });
        }
    };
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/products">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Produits</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                {editMode && <Link href={`/admin/products/${props?.product?.id}`}>
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">
                        {props?.product?.name.length > 16 ? props?.product?.name.substring(0, 16) + "..." : props?.product?.name}
                    </h2>
                </Link>}
                {editMode && <AiOutlineRight className="text-sm text-gray-800" />}
                {editMode && <h2 className="text-lg text-gray-900 font-medium tracking-tight">Modifier une produit</h2>}
                {!editMode && <h2 className="text-lg text-gray-600 font-medium tracking-tight">Ajouter une produit</h2>}
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                                {editMode ? "Modifier une produit" : "Ajouter une produit"}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {editMode ? "Modifier une produit à votre liste de produits" : "Ajouter une produit à votre liste de produits"}
                            </p>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                            onClick={(e) => {
                                submit(e)
                            }}
                        >
                            {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : editMode ? <MdEdit className="text-lg"/> : <FaSave className="text-lg" />}
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <form onSubmit={submit} className="w-full">
                    <div className="grid lg:grid-cols-2 gap-5 ">
                        <div className="p-5 flex flex-col gap-5">
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-base"> Nom de la produit</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description" className="text-base">Description</Label>
                                <Textarea
                                    id="description"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description_ar" className="text-base">Description Arabe</Label>
                                <Textarea
                                    id="description_ar"
                                    dir="rtl"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.description_ar}
                                    onChange={(e) => setData("description_ar", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="unit" className="text-base">Unité</Label>
                                <Select
                                    value={data.unit}
                                    onValueChange={(value) => {
                                        changeAllPricesUnit(value)
                                        return setData("unit", value)
                                    }}
                                >
                                    <SelectTrigger className="w-full h-12">
                                        <SelectValue placeholder="Publié" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="G">G</SelectItem>
                                        <SelectItem value="KG">KG</SelectItem>
                                        <SelectItem value="L">L</SelectItem>
                                        <SelectItem value="ML">ML</SelectItem>
                                        <SelectItem value="U">Unité</SelectItem>
                                        <SelectItem value="P">Piece</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="status" className="text-base">Status</Label>
                                <Select onValueChange={(value) => setData("status", value)} value={data.status}>
                                    <SelectTrigger className="w-full h-12">
                                        <SelectValue placeholder="Publié" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="published">Publié</SelectItem>
                                        <SelectItem value="pinned">Épinglé</SelectItem>
                                        <SelectItem value="archived">Archivé</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col gap-5 ">
                            <div className="grid gap-3">
                                <Label htmlFor="file" className="text-base">Ajouter les images</Label>
                                <div className="flex flex-row flex-wrap gap-5">
                                    {imagesUploaded.map((image, index) => (
                                        <div key={index} className="relative w-32 h-32 border-2 rounded-md overflow-hidden group">
                                            <ContextMenu>
                                                <ContextMenuTrigger>
                                                    <div
                                                        style={{ backgroundImage: "url(" + URL.createObjectURL(image) + ")" }}
                                                        className={`w-full h-full relative flex items-center justify-center bg-cover bg-center cursor-pointer`}
                                                        onClick={() => {
                                                            setImagesUploaded(imagesUploaded.filter((img) => img !== image));
                                                        }}
                                                    >
                                                        <div className="absolute inset-0 w-full h-full bg-gray-300 opacity-0 group-hover:opacity-50 transition-all duration-300">
                                                        </div>
                                                        {index !== 0 ? (
                                                            <MdDeleteOutline className=" text-gray-50 w-6 h-6 group-hover:block hidden transition-all duration-300" />
                                                        ) : (
                                                            <FaPlus className=" text-gray-400 w-10 h-10 transition-all duration-300" />
                                                        )}

                                                    </div>
                                                    <Input
                                                        id="file"
                                                        type="file"
                                                        accept="image/*"
                                                        className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${index !== 0 ? "hidden" : ""}`}
                                                        onChange={(e: any) => {
                                                            setImagesUploaded([...imagesUploaded, e.target.files[0]]);
                                                        }}
                                                    />
                                                </ContextMenuTrigger>
                                                {index !== 0 && (
                                                    <ContextMenuContent>
                                                        <ContextMenuItem
                                                            className="flex items-center justify-center gap-2"
                                                            onClick={() => {
                                                                console.log(data.main_image)
                                                                setData("main_image", new File([image], image.name));
                                                            }}
                                                        >
                                                            Définir comme image principale
                                                        </ContextMenuItem>
                                                    </ContextMenuContent>
                                                )}
                                            </ContextMenu>

                                            {data.main_image?.name === image.name && (
                                                <div className="absolute top-0 right-0 w-7 h-7 bg-yellow-400 flex items-center justify-center">
                                                    <LuCrown className="w-4 h-4 text-gray-50" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {editMode && props?.product?.images.filter((image) => !data.removed_images.includes(image.id)).map((image, index) => (
                                        <div key={index} className="relative w-32 h-32 border-2 rounded-md overflow-hidden group">
                                            <ContextMenu>
                                                <ContextMenuTrigger>
                                                    <div
                                                        style={{ backgroundImage: "url(" + image.path + ")" }}
                                                        className={`w-full h-full relative flex items-center justify-center bg-cover bg-center cursor-pointer`}
                                                        onClick={() => {
                                                            setData("removed_images", [...data.removed_images, image.id]);
                                                        }}
                                                    >
                                                        <div className="absolute inset-0 w-full h-full bg-gray-300 opacity-0 group-hover:opacity-50 transition-all duration-300">
                                                        </div>
                                                        <MdDeleteOutline className=" text-gray-50 w-6 h-6 group-hover:block hidden transition-all duration-300" />
                                                    </div>
                                                </ContextMenuTrigger>
                                                <ContextMenuContent>
                                                    <ContextMenuItem
                                                        className="flex items-center justify-center gap-2"
                                                        onClick={() => {
                                                            setData("main_image", image.path);
                                                        }}
                                                    >
                                                        Définir comme image principale
                                                    </ContextMenuItem>
                                                </ContextMenuContent>
                                            </ContextMenu>
                                            {data.main_image === image.path && (
                                                <div className="absolute top-0 right-0 w-7 h-7 bg-yellow-400 flex items-center justify-center">
                                                    <LuCrown className="w-4 h-4 text-gray-50" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* {editMode && <Separator className="mb-2" />}
                            <div className="grid gap-3">
                                <Label htmlFor="prices" className="text-base">Image actuelle</Label>
                                {editMode && (<div className="flex flex-row gap-2">

                                </div>)}
                            </div> */}

                            < Separator className="mb-2" />
                            <div className="grid gap-3">
                                <Label htmlFor="prices" className="text-base">Des prix</Label>
                                <div className="flex flex-col gap-2">
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                                <TableHead >Quantité</TableHead>
                                                <TableHead >Prix</TableHead>
                                                <TableHead className="w-20"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {data.prices.map((price, index) => (
                                                <TableRow key={index} className="hover:bg-gray-100">
                                                    <TableCell className="r">
                                                        {price.quantity} {price.unit}
                                                    </TableCell>
                                                    <TableCell className="r">
                                                        {price.price} DA
                                                    </TableCell>
                                                    <TableCell className="r">
                                                        <div className="flex flex-row gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                className="p-2 text-red-600 border-0"
                                                                onClick={() => {
                                                                    setData("prices", data.prices.filter((p) => p !== price));
                                                                }}
                                                            >
                                                                <MdDeleteOutline className="w-6 h-6" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                    <div className="flex flex-row justify-between items-center gap-2">
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                id="quantity"
                                                type="number"
                                                className="w-full h-12 border-2 focus-visible:ring-transparent"
                                                value={currentPrice.quantity}
                                                onChange={(e) => {
                                                    setCurrentPrice({ ...currentPrice, quantity: parseInt(e.target.value) });
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {data.unit}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                id="price"
                                                type="number"
                                                className="w-full h-12 border-2 focus-visible:ring-transparent"
                                                value={currentPrice.price}
                                                onChange={(e) => {
                                                    setCurrentPrice({ ...currentPrice, price: parseInt(e.target.value) });
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className=" text-gray-900 border border-gray-900 hover:bg-gray-900"
                                                    onClick={() => {
                                                        setData("prices", [...data.prices, currentPrice]);
                                                        setCurrentPrice({ price: 0, unit: data?.unit, quantity: 0 });
                                                    }}
                                                >
                                                    <TiPlus className="w-5 h-5 text-gray-900" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
ProductForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default ProductForm;
