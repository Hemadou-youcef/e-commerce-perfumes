import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

// Shadcn Components
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shadcn/ui/sheet"
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

// Styles
import sheetDialog from '@/styles/dialog.module.css'

// Icons
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { AiOutlineLoading3Quarters, AiOutlineRight } from "react-icons/ai";
import { FaCheck, FaPlus, FaSave } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { LuCrown } from "react-icons/lu";

// Types
type prices = {
    price: number;
    unit: string;
    quantity: number;
}

type Image = {
    id: number;
    product_id: number;
    path: string;
}

type Category = {
    id: number;
    name: string;
    name_ar: string;
}
interface FormData {
    name: string;
    description: string;
    description_ar: string;
    unit: string;
    status: string;
    category_ids: number[];
    main_image?: File | null;
    main_image_id?: number | null;
    images?: File[] | Image[];
    prices: prices[];
    other_images?: number[];
    removed_images: number[];
}

const ProductForm = ({ ...props }) => {
    console.log(props)
    const editMode = props?.product ? true : false;
    const { data, setData, post, transform, processing, errors, reset } = useForm<FormData>({
        name: props?.product?.name || "",
        description: props?.product?.description || "",
        description_ar: props?.product?.description_ar || "",
        unit: props?.product?.unit?.toUpperCase() || "G",
        status: props?.product?.status || "published",
        category_ids: props?.product?.categories?.map((category) => category.id) || [],
        main_image: null,
        main_image_id: props?.product?.main_image_id || null,
        images: props?.product?.images || [],
        prices: props?.product?.product_prices || [],
        other_images: [],
        removed_images: [],
    });
    const [categories, setCategories] = useState<any[]>(props?.categories || [])

    const [imagesUploaded, setImagesUploaded] = useState<File[]>([
        new File([""], "image1"),
    ]);
    const [currentPrice, setCurrentPrice] = useState<prices>({
        price: 0,
        unit: data?.unit,
        quantity: 0,
    });
    const [openSheet, setOpenSheet] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [checkBoxSelectedCategory, setCheckBoxSelectedCategory] = useState<Category | null>(null)
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        imagesToDataForm();
    }, [imagesUploaded, data.main_image, data.main_image_id]);

    const isAllRulesVerified = () => {
        const rules = [
            data.name.length > 0,
            data.description.length > 0,
            data.description_ar.length > 0,
            data.unit.length > 0,
            data.status.length > 0,
            data.main_image || data.main_image_id,
            editMode || (imagesUploaded || []).length > 0,
        ];
        return rules.every((rule) => rule);
    }

    const imagesToDataForm = () => {
        const images = imagesUploaded.filter((img, index) => {
            const notTheMainImage = img.name !== data.main_image?.name;
            const notZeroIndex = index !== 0;
            return notZeroIndex && notTheMainImage;

        });
        setData(editMode ? "other_images" : "images", images);
    }

    const changeAllPricesUnit = (unit: string) => {
        const prices = data.prices.map((price) => {
            return { ...price, unit: unit };
        });
        setData("prices", prices);
    }

    const handleChangeMainImage = (type, value) => {
        if (type === "file") {
            console.log(value)
            setData(data => ({ ...data, main_image: value }));
            setData(data => ({ ...data, main_image_id: null }));
        } else {
            setData(data => ({ ...data, main_image_id: value }));
            setData(data => ({ ...data, main_image: null }));
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editMode) {
            transform((data: FormData) => {
                if (data.main_image_id) {
                    delete data.main_image;
                    delete data.images;
                } else {
                    delete data.main_image_id;
                    delete data.other_images;
                }
                return data;
            });
            post(route('product.update', props?.product?.id));
        } else {
            transform((data: FormData) => {
                delete data.main_image_id;
                delete data.other_images;
                delete data.removed_images;
                return data;
            });
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
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Produits</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                {editMode && <Link href={`/admin/products/${props?.product?.id}`}>
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">
                        {props?.product?.name.length > 16 ? props?.product?.name.substring(0, 16) + "..." : props?.product?.name}
                    </h2>
                </Link>}
                {editMode && <AiOutlineRight className="text-sm text-gray-800" />}
                {editMode && <h2 className="text-sm md:text-lg text-gray-900 font-medium tracking-tight">Modifier une produit</h2>}
                {!editMode && <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">Ajouter une produit</h2>}
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
                            className="group p-0 h-12 w-12 hover:w-28 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center  transition-all duration-150"
                            onClick={(e) => {
                                submit(e)
                            }}
                            disabled={!isAllRulesVerified()}
                        >
                            {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : editMode ? <MdEdit className="text-lg" /> : <FaSave className="text-lg" />}
                            <p className="group-hover:w-16 w-0 overflow-hidden transition-all group-hover:ml-1 text-sm font-medium text-gray-900">{editMode ? "Modifier" : "Ajouter"}</p>
                        </Button>
                    </div>
                </div>
                <Separator className="mb-2" />
                <form onSubmit={submit} className="w-full">
                    <div className="grid lg:grid-cols-2 lg:gap-5 ">
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

                                {editMode && data.name.length === 0 && <p className="text-xs text-red-500">Le nom de la produit est obligatoire</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description" className="text-base">Description</Label>
                                <Textarea
                                    id="description"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                {editMode && data.description.length === 0 && <p className="text-xs text-red-500">La description de la produit est obligatoire</p>}
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
                                {editMode && data.description_ar.length === 0 && <p className="text-xs text-red-500">La description de la produit est obligatoire</p>}
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
                            <div className="grid gap-3">
                                <Label htmlFor="categories" className="text-base">Catégories</Label>
                                <div className="w-fit flex flex-col gap-2">
                                    <div
                                        className="flex flex-row gap-2 items-center cursor-pointer"
                                        onClick={() => setOpenSheet(true)}
                                    >
                                        <Button
                                            variant="outline"
                                            className="h-8 w-8 p-1 rounded-full border-2 border-gray-600 gap-2"

                                        >
                                            {/* <span className="text-lg text-gray-600">
                                                Choisir
                                            </span> */}
                                            <FaPlus className="h-3 w-3 text-lg text-gray-600" />
                                        </Button>
                                        <div className="flex flex-col gap-2 font-bold uppercase text-gray-700">
                                            Ajouter une categorie
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-wrap gap-2">
                                        {data.category_ids.map((category_id, index) => (
                                            <div key={index} className="flex flex-row gap-2 items-center">
                                                <Button
                                                    variant="outline"
                                                    className="h-8 w-8 p-1 rounded-full border-2 border-gray-600 gap-2"
                                                    onClick={() => {
                                                        setData("category_ids", data.category_ids.filter((id) => id !== category_id));
                                                    }}
                                                >
                                                    {/* <span className="text-lg text-gray-600">
                                                        Choisir
                                                    </span> */}
                                                    <MdDeleteOutline className="w-4 h-4 text-lg text-gray-600" />
                                                </Button>
                                                <div className="flex flex-col gap-2 font-bold uppercase text-gray-700">
                                                    {categories?.find((category) => category.id === category_id)?.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                                                            if (data?.main_image?.name === image.name) {
                                                                setData(data => ({ ...data, main_image: null }));
                                                            }
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
                                                            onClick={() => handleChangeMainImage("file", new File([image], image.name))}
                                                        >
                                                            Définir comme image principale
                                                        </ContextMenuItem>
                                                    </ContextMenuContent>
                                                )}
                                            </ContextMenu>

                                            {data?.main_image?.name === image.name && (
                                                <div className="absolute top-0 right-0 w-7 h-7 bg-yellow-400 flex items-center justify-center">
                                                    <LuCrown className="w-4 h-4 text-gray-50" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {editMode && data.images?.filter((image) => !data.removed_images.includes((image as Image).id)).map((image, index) => (
                                        <div key={index} className="relative w-32 h-32 border-2 rounded-md overflow-hidden group">
                                            <ContextMenu>
                                                <ContextMenuTrigger>
                                                    <div
                                                        style={{ backgroundImage: "url(" + (image as Image).path + ")" }}
                                                        className={`w-full h-full relative flex items-center justify-center bg-cover bg-center cursor-pointer`}
                                                        onClick={() => {
                                                            if (data.main_image_id === (image as Image).id) {
                                                                setData(data => ({ ...data, main_image_id: null }));
                                                            }
                                                            setData((data : any) => ({
                                                                ...data, 
                                                                images: data.images?.filter((img) => img.id !== (image as Image).id)
                                                            }));
                                                            setData(data => ({ ...data, removed_images: [...data.removed_images, (image as Image).id] }));
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
                                                            handleChangeMainImage("id", (image as Image).id);
                                                        }}
                                                    >
                                                        Définir comme image principale
                                                    </ContextMenuItem>
                                                </ContextMenuContent>
                                            </ContextMenu>
                                            {data.main_image_id === (image as Image).id && (
                                                <div className="absolute top-0 right-0 w-7 h-7 bg-yellow-400 flex items-center justify-center">
                                                    <LuCrown className="w-4 h-4 text-gray-50" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {!editMode && imagesUploaded.length > 1 && data.main_image == null && (
                                    <p className="text-xs text-red-500">Veuillez choisir une image principale</p>
                                )}
                                {editMode && (data.main_image == null && data.main_image_id == null) && (
                                    <p className="text-xs text-red-500">Veuillez choisir une image principale</p>
                                )}
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
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetContent className={`w-full md:w-[768px] sm:max-w-none p-0 ${sheetDialog.dialogSheet}`}>
                    <SheetHeader className="h-screen relative">
                        <SheetTitle className="px-5 pt-3">

                            {/* <Separator className="mt-2"/> */}
                            <div className="mt-7 md:mt-0 flex flex-col md:flex-row justify-between items-center gap-2 p-0">
                                <h2 className="md:text-2xl text-gray-900 font-bold tracking-tight">
                                    Choisir un categorie
                                </h2>
                                <div className="w-full md:w-auto flex flex-row justify-between items-center gap-2">
                                    <Input
                                        id="search"
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Rechercher un categorie..."
                                        className="md:w-96 h-12 rounded-3xl border-2 focus-visible:ring-transparent"
                                    />
                                    <Button
                                        variant="outline"
                                        className="h-11 w-11 p-3 rounded-full border-2 border-gray-600 gap-2"
                                        onClick={() => {
                                            if (data.category_ids.includes((checkBoxSelectedCategory as Category)?.id)) return
                                            setOpenSheet(false)
                                            setSelectedCategory(checkBoxSelectedCategory)
                                            setData("category_ids", [...data.category_ids, (checkBoxSelectedCategory as Category)?.id])
                                            setCheckBoxSelectedCategory(null)
                                        }}
                                    >
                                        {/* <span className="text-lg text-gray-600">
                                            Choisir
                                        </span> */}
                                        <FaCheck className="text-lg text-gray-600" />
                                    </Button>
                                </div>

                            </div>

                        </SheetTitle>
                        <div className="overflow-y-auto border p-2" style={{ scrollbarGutter: 'stable' }}>
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                        <TableHead className="w-16">ID</TableHead>
                                        <TableHead className="w-9/12">Nom De Category</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>

                                    {(categories || []).filter((category: any) => category.name.toLowerCase().includes(search.toLowerCase())).map((category: any, index: number) => (
                                        <TableRow
                                            key={index}
                                            className={`hover:bg-gray-50 cursor-pointer ${checkBoxSelectedCategory?.id === category.id ? "bg-gray-100" : ""}`}
                                            onClick={() => setCheckBoxSelectedCategory(category)}
                                        >
                                            <TableCell className="h-12 ">
                                                <div className="w-6 h-6 flex p-1 flex-row justify-center items-center border-2 border-gray-400 rounded-sm gap-2">
                                                    {checkBoxSelectedCategory?.id === category.id ? <FaCheck className="text-lg text-gray-600" /> : <FaCheck className="text-lg text-gray-600 invisible" />}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-bold text-xs">{category.name}</TableCell>
                                        </TableRow>
                                    ))}
                                    {(categories || []).filter((category: any) => category.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-sm font-medium text-gray-500 uppercase">
                                                Aucune donnée
                                            </TableCell>
                                        </TableRow>
                                    )}

                                </TableBody>

                            </Table>
                        </div>

                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
}
ProductForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default ProductForm;
