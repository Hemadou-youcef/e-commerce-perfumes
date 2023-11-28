import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdDeleteOutline, MdSend } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"

type FormData = {
    first_name: string;
    last_name: string;
    phone: string;
    street_address: string;
    city: string;
    state: string;
    state_code: string;
    shipping_method: string;
    shipping_fees: string;
    postal_code: string;
    agency: string;
};


// Information
import wilaya from "@/data/wilaya";

const Cart = ({ ...props }) => {
    const [cartItems, setCartItems] = useState(props?.cartItems);

    const [checkedOut, setCheckedOut] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        first_name: "",
        last_name: "",
        phone: "",
        street_address: "",
        city: "",
        state: "",
        state_code: "",
        shipping_method: "",
        shipping_fees: "",
        postal_code: "",
        agency: "",
    });
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    useEffect(() => {
        setCartItems(props?.cartItems);
    }, [props?.cartItems]);

    const handleSendOrder = () => {
        setCheckoutLoading(true);
        router.post(route('cart.checkout'), {}, {
            onSuccess: () => {
                console.log('success');
            },
            onError: () => {
                console.log('error');
            },
            onFinish: () => {
                setCheckoutLoading(false);
            }
        });
    };

    const handleDeleteCartItem = (id: number) => {
        router.delete(route('cart_item.destroy', id), {
            onSuccess: () => {
                console.log('success');
            },
            onError: () => {
                console.log('error');
            },
            onFinish: () => {
                setCheckoutLoading(false);
            }
        });
    }

    const submit = (e: any) => {
        e.preventDefault();
        post(route('cart.checkout'), {
            onSuccess: () => {
                console.log('success');
            },
            onError: () => {
                console.log('error');
            },
            onFinish: () => {
                setCheckoutLoading(false);
            }
        });
    };


    return (
        <>
            <div className="flex items-center justify-center gap-5 py-5 px-8 border-b border-gray-300">
                <IoBagHandleOutline className="h-8 w-8 text-gray-900" />
                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                    Mon panier
                </h1>
            </div>
            <div className="container grid md:grid-cols-2 mx-auto px-4 my-5 bg-white">
                <div>
                    <form onSubmit={submit} className="w-full p-5 flex flex-col gap-5">
                        <div className="grid gap-3">
                            <Label htmlFor="agency" className="text-base">Agence</Label>
                            <Input
                                id="agency"
                                type="text"
                                className="w-full h-12 border-2 focus-visible:ring-transparent"
                                value={data.agency}
                                onChange={(e) => setData("agency", e.target.value)}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="shipping_method" className="text-base">Mode de livraison</Label>
                            <Input
                                id="shipping_method"
                                type="text"
                                className="w-full h-12 border-2 focus-visible:ring-transparent"
                                value={data.shipping_method}
                                onChange={(e) => setData("shipping_method", e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-base">Nom</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.first_name}
                                    onChange={(e) => setData("first_name", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-base">Prénom</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.last_name}
                                    onChange={(e) => setData("last_name", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="phone" className="text-base">Téléphone</Label>
                            <Input
                                id="phone"
                                type="text"
                                className="w-full h-12 border-2 focus-visible:ring-transparent"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="address" className="text-base">Adresse de la rue</Label>
                            <Input
                                id="address"
                                type="text"
                                className="w-full h-12 border-2 focus-visible:ring-transparent"
                                value={data.street_address}
                                onChange={(e) => setData("street_address", e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="state" className="text-base">Wilaya</Label>
                            <Select>
                                <SelectTrigger >
                                    <SelectValue placeholder="Wilaya" className="w-full h-12 border-2 focus-visible:ring-transparent" />
                                </SelectTrigger>
                                <SelectContent className="w-full h-52 border-2 focus-visible:ring-transparent">
                                    {wilaya.map((item, index): any => (
                                        <SelectItem
                                            key={index}
                                            value={item[0].toString()}
                                        >
                                            {item[0]} - {item[1]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="postal_code" className="text-base">Code postal</Label>
                                <Input
                                    id="postal_code"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.postal_code}
                                    onChange={(e) => setData("postal_code", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="city" className="text-base">Ville</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.city}
                                    onChange={(e) => setData("city", e.target.value)}
                                />
                            </div>
                        </div>

                    </form>
                </div>
                <div className="rounded-lg sticky">

                    <div className="px-8 w-full">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex items-center flex-col md:flex-row gap-5 border-b border-gray-300 py-4">
                                <img
                                    alt=""
                                    src={"/storage/" + item.product?.main_image}
                                    className="h-16 w-16 object-cover mr-4 bg-gray-300"
                                />

                                <div className="flex md:flex-1 flex-col items-center md:items-start justify-center">
                                    <Link
                                        href={`/products/${item.product?.id}`}>
                                        <h2 className="text-xl text-blue-600 font-semibold mb-2">{item?.product?.name}</h2>
                                    </Link>
                                    <p className="text-gray-600 mb-2">
                                        <span className="text-gray-600 mr-1">
                                            {item.quantity * item.product_price?.quantity} {item.product_price?.unit} =
                                        </span>
                                        <span className="text-gray-900 font-semibold">
                                            {item.quantity * item.product_price?.price} DA
                                        </span>
                                    </p>

                                </div>
                                <div>
                                    <Button
                                        variant="outline"
                                        className="text-sm text-gray-500 hover:text-gray-700 border-0 hover:bg-transparent"
                                        onClick={() => handleDeleteCartItem(item.id)}
                                    >
                                        <MdDeleteOutline className="h-8 w-8" />
                                    </Button>
                                </div>

                            </div>
                        ))}
                    </div>
                    {cartItems.length === 0 && (
                        <p className="text-gray-600 text-center my-8">Notre panier est vide. Commencez à magasiner maintenant !</p>
                    )}

                    {cartItems.length > 0 && (
                        <div className="flex flex-col p-5 gap-3">
                            <div className="flex items-center  font-mono justify-between">
                                <p className="text-lg">
                                    Sous-total:
                                </p>
                                <p className="text-base text-gray-900">
                                    {cartItems.reduce((a, b) => a + (b.quantity * b.product_price?.price || 0), 0)},00 DA
                                </p>
                            </div>
                            <div className="flex items-center  font-mono justify-between">
                                <p className="text-lg">
                                    Livraison:
                                </p>
                                <p className="text-base text-gray-900">
                                    800,00 DA
                                </p>
                            </div>
                            <div className="flex items-center font-bold font-mono justify-between">
                                <p className="text-lg">
                                    Total:
                                </p>
                                <p className="text-base text-gray-900">
                                    {cartItems.reduce((a, b) => a + (b.quantity * b.product_price?.price || 0), 0) + 800},00 DA
                                </p>
                            </div>


                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="w-52 text-white px-4 py-2 bg-gray-900 rounded-md hover:bg-gray-800 active:bg-gray-700"
                                >
                                    {checkoutLoading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : (
                                        <div className="flex items-center justify-center gap-2">
                                            <p className="text-sm text-gray-50 font-bold uppercase">
                                                Continuer
                                            </p>
                                            {/* <MdSend className="h-5 w-5" /> */}
                                        </div>
                                    )}

                                </Button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>

    );
};

Cart.layout = (page) => <LandingMainLayout children={page} />;
export default Cart;
