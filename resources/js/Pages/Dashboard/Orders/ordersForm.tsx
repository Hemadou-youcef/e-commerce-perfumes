import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";


// Shadcn Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table"
import { Separator } from "@/shadcn/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shadcn/ui/sheet"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/shadcn/ui/select"
// import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs"
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";


// Icons
import { AiOutlineLoading3Quarters, AiOutlineMinus, AiOutlinePlus, AiOutlineRight } from "react-icons/ai";
import { FaAngleDown, FaAngleRight, FaCheck, FaPlus, FaSave } from "react-icons/fa";

// Style
import sheetDialog from '@/styles/dialog.module.css'
import { IoClose } from "react-icons/io5";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Progress } from "@/shadcn/ui/progress";
import SelectProductSheet from "@/components/dashboard/order/selectProductSheet";
import { BiSolidSelectMultiple } from "react-icons/bi";
import OrderReceptionsSelector from "@/components/dashboard/order/orderReceptionsSelector";


type reservation = {
    reception_id: string,
    quantity: string,
}
type product = {
    product_id: string,
    quantity: string,
    product_price_id: string,
    reservations: reservation[]
}
type receptionDataFrame = {
    reception_id: number,
    reception_name: string,
    reception_date: string,
    order_product_id: number,
    rest_quantity: number,
    used_quantity: number,
    quantity: number,
}

type reservationDataFrame = {
    reception_id: number,
    order_product_id: number,
    quantity: number,
}
interface FormData {
    products: product[],
}

const stepsInformation = [
    {
        title: "Produits",
        description: "Ajouter les produits du command",
        tab: "products",
        progress: 0,
    },
    {
        title: "Receptions",
        description: "Sélectionner les réceptions du command",
        tab: "receptions",
        progress: 50,
    },
    {
        title: "Terminer",
        description: "Terminer l'ajout du command",
        tab: "finish",
        progress: 100,
    },
]

const OrderForm = ({ ...props }) => {
    console.log(props)
    const [step, setStep] = useState(0);
    const { data, setData, post, patch, processing, errors, reset } = useForm<FormData>({
        products: []
    });


    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    const [productSelected, setProductSelected] = useState<any>(null);
    const [openSheet, setOpenSheet] = useState(false);
    const [openReceptionSheet, setOpenReceptionSheet] = useState(false);

    const [receptions, setReceptions] = useState<receptionDataFrame[]>([]);
    const [reservations, setReservations] = useState<reservationDataFrame[]>([]);

    useEffect(() => {
        if (step === 2) {
            createReceptions();
        }
    }, [step])

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const isAllRulesVerified = () => {
        const rules = [
        ];
        return rules.every((rule) => rule);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

    };


    const createReceptions = () => {
        const receptionsList: receptionDataFrame[] = [];
        selectedProducts.forEach((product, index) => {
            product?.receptions?.forEach((reception) => {
                receptionsList.push({
                    reception_id: reception?.id,
                    reception_name: reception?.name,
                    reception_date: reception?.date,
                    order_product_id: index,
                    rest_quantity: reception?.rest,
                    used_quantity: 0,
                    quantity: 0,
                })
            })
        })
        setReceptions(receptionsList);
    }

    const addProduct = (product: any) => {
        console.log(product)
        setSelectedProducts([...selectedProducts, {
            ...product,
            total_quantity: 0,
        }])
    }

    const autoComplete = () => {
        if (!needQuantityForConfirm()) return false;

        // EMPTY THE RESERVATIONS ARRAY
        setReservations([]);

        // Clone the receptions array to avoid mutating the original
        let updatedReceptions = [...receptions];
        let updatedReservations = [];

        // Iterate over each product in the order and work with the reservations
        props?.order?.order_products.forEach((product_order) => {
            let remainingQuantity = product_order?.total_quantity;
            // CREATE RESERVATION FOR EACH RECEPTIONS IF NEEDED 
            product_order?.product?.receptions?.forEach((reception) => {
                const alreadyReservedQuantity = updatedReservations.filter((reservation) => reservation?.reception_id == reception?.id).reduce((a, b) => a + b?.quantity, 0);

                const receptionRestQuantity = reception?.rest - alreadyReservedQuantity;
                if (reception?.rest > 0) {
                    const reservation = {
                        reception_id: reception?.id,
                        order_product_id: product_order?.id,
                        quantity: 0,
                    }
                    if (remainingQuantity > 0) {
                        if (remainingQuantity > receptionRestQuantity) {
                            reservation.quantity = receptionRestQuantity;
                            remainingQuantity -= receptionRestQuantity;
                        }
                        else {
                            reservation.quantity = remainingQuantity;
                            remainingQuantity = 0;
                        }
                    }


                    updatedReservations.push(reservation);
                    // Update all the reception quantity that have same reception_id
                    updatedReceptions = updatedReceptions.map((reception) => {
                        if (reception?.reception_id == reservation?.reception_id) {
                            reception.quantity = alreadyReservedQuantity + reservation?.quantity;
                        }
                        reception.used_quantity = 0;
                        return reception;
                    })


                }
            })
        })
        setReceptions(updatedReceptions);
        setReservations(updatedReservations);

    };

    const createReservation = () => {
        const data: reservationDataFrame[] = [];
        receptions.forEach((reception) => {
            if (reception?.quantity > 0) {
                data.push({
                    reception_id: reception?.reception_id,
                    order_product_id: reception?.order_product_id,
                    quantity: reception?.used_quantity,
                })
            }
        })
        setReservations(data);
    }
    const needQuantityForConfirm = () => {
        let neededQuantity = false;
        selectedProducts.forEach((product_order, index) => {
            const usedQuantity = reservations.filter((reservation) => reservation?.order_product_id == index).reduce((a, b) => a + b?.quantity, 0);
            if (usedQuantity != product_order?.total_quantity) {
                neededQuantity = true;
            }
        });
        return neededQuantity;
    }

    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/orders">
                    <h2 className="text-sm md:text-lg text-gray-900 font-bold tracking-tight">Les Commandes</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-sm md:text-lg text-gray-600 font-medium tracking-tight">Ajouter un Commande</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center px-5 py-5 gap-5 ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        {/* <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-600 text-white text-2xl font-bold">
                            <p>P</p>
                        </div> */}
                        <div className="flex flex-col text-center md:text-left">
                            <h2 className="text-xl text-gray-900 font-bold tracking-tight">
                                Ajouter un Commande
                            </h2>
                            <p className="text-sm text-gray-600">
                                Ajouter un command dans votre base de données
                            </p>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">
                        {step === 0 && (
                            <Button
                                variant="outline"
                                className="h-10 flex justify-center items-center gap-2"
                                onClick={() => {
                                    setStep(step + 1)
                                }}
                                disabled={selectedProducts.length === 0}
                            >
                                <span className="text-sm text-gray-600">
                                    Suivant
                                </span>
                                <FaAngleRight className="text-lg text-gray-900" />
                            </Button>
                        )}
                        {/* <Button
                            variant="outline"
                            className="p-0 h-12 w-12 border bg-transparent hover:border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 flex justify-center items-center"
                            onClick={(e) => submit(e)}
                            disabled={processing || !isAllRulesVerified()}
                        >
                            {processing ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : <FaSave className="text-lg" />}

                        </Button> */}
                    </div>
                </div>

                <Progress value={stepsInformation[step].progress} className="h-2 rounded-none" />
                <Tabs className="w-full" value={stepsInformation[step].tab}>
                    <TabsContent value="products">
                        <div className="flex flex-col gap-5 px-5 py-5">

                            <div className="flex flex-col gap-5">
                                {/* SELECT PRODUCTS */}
                                {selectedProducts.map((product, index) => (
                                    <div key={index} className="flex flex-col border p-2 rounded-md gap-2">
                                        {/* Product */}
                                        <div className="flex flex-row justify-between items-center gap-2">
                                            <div className="flex flex-col">
                                                <h2 className="text-lg text-gray-900 font-bold tracking-tight">
                                                    {product.name}
                                                </h2>
                                                <p className="text-sm text-gray-600">
                                                    {product.quantity} {product.unit}
                                                </p>
                                            </div>
                                            <div className="flex flex-row justify-between items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    className=" h-10 flex justify-center items-center gap-2"
                                                    onClick={() => {
                                                        setSelectedProducts(selectedProducts.filter((p, i) => i !== index))
                                                    }}
                                                >
                                                    <MdDeleteOutline className="text-lg text-gray-900" />
                                                    {/* <span className="text-sm text-gray-600">
                                                        Supprimer
                                                    </span> */}
                                                </Button>
                                            </div>
                                        </div>
                                        {/* Price List */}
                                        <div className="flex flex-row gap-2">
                                            {product?.prices?.map((price, index) => (
                                                <div key={index} className="flex flex-row justify-between items-center gap-2">
                                                    <div className="flex flex-col">
                                                        <h2 className="text-xs text-gray-900 font-bold tracking-tight">
                                                            {price.name}
                                                        </h2>
                                                        <p className="text-xs text-gray-600">
                                                            {price.price} {price.currency}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row justify-between items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            className=" h-10 flex justify-center items-center gap-2"
                                                            onClick={() => {
                                                                setSelectedProducts(selectedProducts.filter((p, i) => i !== index))
                                                            }}
                                                        >
                                                            <IoClose className="text-lg text-gray-900" />
                                                            <span className="text-sm text-gray-600">
                                                                Supprimer
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                        <div className="w-52 flex justify-between gap-1 items-center border-2 overflow-hidden">
                                            <div className="w-10 h-10 flex justify-center items-center text-gray-600 font-bold gap-1 select-none cursor-pointer"
                                                onClick={() => {
                                                    if (product?.total_quantity > 0) {
                                                        setSelectedProducts(selectedProducts.map((p, i) => {
                                                            if (i === index) {
                                                                return {
                                                                    ...p,
                                                                    total_quantity: p?.total_quantity - 1
                                                                }
                                                            }
                                                            return p;
                                                        }))
                                                    }
                                                }}>
                                                <AiOutlineMinus className="w-4 h-4 text-gray-600 ml-2 select-none cursor-pointer" />
                                            </div>
                                            <div className="w-10 h-10 flex justify-center items-center text-gray-600 font-bold gap-1">
                                                <input
                                                    value={product?.total_quantity}
                                                    onChange={(e) => (parseInt(e.target.value) > 0) ? setSelectedProducts(selectedProducts.map((p, i) => {
                                                        if (i === index) {
                                                            return {
                                                                ...p,
                                                                total_quantity: parseInt(e.target.value)
                                                            }
                                                        }
                                                        return p;
                                                    })) : setSelectedProducts(selectedProducts.map((p, i) => {
                                                        if (i === index) {
                                                            return {
                                                                ...p,
                                                                total_quantity: 0
                                                            }
                                                        }
                                                        return p;
                                                    }))}
                                                    className="outline-none w-10 h-10 text-center text-gray-700 font-bold text-xs md:text-sm lg:tex"
                                                />
                                            </div>
                                            <div
                                                className="w-10 h-10 flex justify-center items-center text-gray-600 font-bold gap-1 select-none cursor-pointer"
                                                onClick={() => {
                                                    setSelectedProducts(selectedProducts.map((p, i) => {
                                                        if (i === index) {
                                                            return {
                                                                ...p,
                                                                total_quantity: p?.total_quantity + 1
                                                            }
                                                        }
                                                        return p;
                                                    }))
                                                }} >
                                                <AiOutlinePlus className="w-4 h-4 text-gray-600 " />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {selectedProducts.length === 0 && (
                                    <div className="flex flex-col justify-center items-center gap-2 p-5">
                                        <img src="/image/empty.png" alt="empty" className="w-40 h-40" />
                                        <h2 className="text-sm text-gray-900 font-bold tracking-tight">
                                            Aucun produit sélectionné
                                        </h2>
                                        <p className="text-xs text-gray-600 text-center">
                                            Vous n'avez sélectionné aucun produit pour ce command.
                                        </p>

                                    </div>
                                )}
                                {/* SELECT PRODUCTS */}
                                <div className="flex justify-center items-start gap-2 px-2">
                                    <Button className="h-10 flex justify-center items-center gap-2" onClick={() => setOpenSheet(true)}>
                                        <FaPlus className="text-lg text-gray-50" />
                                        <span className="text-sm font-bold text-gray-50">
                                            Ajouter un produit
                                        </span>
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="receptions">
                        <div className="flex flex-col gap-5 px-5 py-5">
                            <div className="flex flex-col gap-5">
                                <div className="mb-2 flex justify-end">
                                    <Button
                                        variant="outline" className="flex items-center h-9 space-x-2 border-transparent bg-transparent hover:border border-gray-300"
                                        onClick={() => autoComplete()}
                                        disabled={!needQuantityForConfirm()}
                                    >
                                        <span className="text-sm font-medium">
                                            Auto Complete
                                        </span>
                                    </Button>
                                </div>
                                {/* SELECT PRODUCTS */}
                                {selectedProducts.map((product, index) => (
                                    <div key={index} className="border p-2 rounded-md">
                                        {/* Product */}
                                        <div className="flex flex-row justify-between items-center gap-2">
                                            <div className="flex flex-col">
                                                <h2 className="text-sm text-gray-900 font-bold tracking-tight">
                                                    {product.name}
                                                </h2>
                                                <p className="text-xs text-gray-600">
                                                    {product.quantity} {product.unit}
                                                </p>
                                            </div>
                                            <div className="flex flex-row justify-between items-center gap-2">

                                            </div>
                                        </div>
                                        {/* Price List */}
                                        <div className="flex flex-col gap-2">
                                            {product?.prices?.map((price, index) => (
                                                <div key={index} className="flex flex-row justify-between items-center gap-2">
                                                    <div className="flex flex-col">
                                                        <h2 className="text-xs text-gray-900 font-bold tracking-tight">
                                                            {price.name}
                                                        </h2>
                                                        <p className="text-xs text-gray-600">
                                                            {price.price} {price.currency}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row justify-between items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            className=" h-10 flex justify-center items-center gap-2"
                                                            onClick={() => {
                                                                setSelectedProducts(selectedProducts.filter((p, i) => i !== index))
                                                            }}
                                                        >
                                                            <IoClose className="text-lg text-gray-900" />
                                                            <span className="text-sm text-gray-600">
                                                                Supprimer
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

            </div >
            {openSheet && (
                <SelectProductSheet
                    openSheet={openSheet}
                    setOpenSheet={setOpenSheet}
                    products={props.products}
                    setSelectedProduct={addProduct}
                />
            )
            }
            {
                openReceptionSheet && (<OrderReceptionsSelector
                    open={openReceptionSheet}
                    setOpen={setOpenReceptionSheet}
                    productSelected={productSelected}
                    receptions={receptions}
                    setReceptions={setReceptions}
                    reservations={reservations}
                    setReservations={setReservations}
                />)
            }
        </>
    );
}

OrderForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default OrderForm;