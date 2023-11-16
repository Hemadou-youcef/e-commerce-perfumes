import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";


interface FormData {
    name: string;
    quantity: string;
    price: string;
    product_id: string;
}

const ReceptionForm = ({ ...props }) => {
    // console.log(props)
    // REGISTER NEW RECEPTION
    // WITH COLUMN :
    // - Name
    // - Reception ID
    // - Quantity
    // - Price
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: "",
        quantity: "",
        price: "",
        product_id: "",
    });
    const [dataProducts, setDataProducts] = useState(() => {
        return props?.products.map((product: any) => {
            return {
                value: product.id,
                label: product.name
            }
        })

    })


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('receptions.store'));
    };
    return (
        <>
            <div className="flex flex-row justify-start items-center px-5 pt-5 pb-2 gap-2">
                <Link href="/admin/receptions">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Les Réceptions</h2>
                </Link>
                <AiOutlineRight className="text-sm text-gray-800" />
                <h2 className="text-lg text-gray-600 font-medium tracking-tight">Ajouter une réception</h2>
            </div>
            <div className="md:mx-10 p-0 m-2 border rounded-none md:rounded-md overflow-hidden bg-white">
                <form onSubmit={submit} className="w-full">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                        <div className="flex flex-col gap-5">
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-lg"> Nom </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quantity" className="text-lg"> Quantité </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.quantity}
                                    onChange={(e) => setData("quantity", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price" className="text-lg"> Prix </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.price}
                                    onChange={(e) => setData("price", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-2 flex flex-col gap-3">
                            <Label htmlFor="price" className="text-lg"> Product </Label>
                            <Select 
                            onValueChange={(v:any)=> setData("product_id",v)}>
                                <SelectTrigger className="w-full h-12 border-2 focus-visible:ring-transparent ">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent className="focus-visible:ring-transparent">
                                    {dataProducts.map((product: any) => (
                                        <SelectItem key={product.value} value={product.value}>
                                            {product.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-center px-5 py-2 gap-2">
                        <Link href="/admin/receptions">
                            <Button type="button" className="btn btn-outline">
                                Annuler
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => post('/admin/receptions/create')}
                        >
                            Ajouter
                        </Button>

                    </div>


                </form >
            </div >
        </>
    );
}

ReceptionForm.layout = (page: React.ReactNode) => <DashboardMainLayout children={page} />;
export default ReceptionForm;