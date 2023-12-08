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
    state_code: string;
    shipping_method: string;
    postal_code: string;
};


// Information
import wilaya from "@/data/wilaya";
import yalidine from "@/data/yalidine";
import { useTranslation } from "react-i18next";

const Cart = ({ ...props }) => {
    console.log(props);
    const [cartItems, setCartItems] = useState(props?.cartItems);
    const { data, setData, post, transform, processing, errors, reset } = useForm<FormData>({
        first_name: props?.auth?.user?.first_name || '',
        last_name: props?.auth?.user?.last_name || '',
        phone: props?.auth?.user?.phone || '',
        street_address: props?.auth?.user?.address || '',
        city: '',
        state_code: '',
        shipping_method: '2',
        postal_code: '',
    });
    const [checkedOut, setCheckedOut] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const { t } = useTranslation()

    useEffect(() => {
        setCartItems(props?.cartItems);
    }, [props?.cartItems]);

    const isAllRulesVerified = () => {
        const rules = [
            data.first_name.length > 0,
            data.last_name.length > 0,
            data.phone.length > 0,
            data.street_address.length > 0,
            data.city.length > 0,
            data.state_code.length > 0,
            data.shipping_method.length > 0,
            data.postal_code.length > 0,
        ];
        return rules.every((rule) => rule);
    }


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
        setCheckoutLoading(true);
        transform((data: any) => {
            return {
                ...data,
                state_code: parseInt(data.state_code),
                shipping_method: parseInt(data.shipping_method),
            };
        });
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
            <div className="flex items-center justify-center gap-2 py-5 px-8 border-b border-gray-300 font-sans rtl:font-arabic">
                <IoBagHandleOutline className="h-8 w-8 text-gray-900" />
                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                    {t('cart_page.title')}
                    {/* Mon panier */}
                </h1>
            </div>
            <div className={`container border-2 rounded-md mx-auto px-4 my-5 first-letter:font-sans rtl:font-arabic bg-white ${checkedOut ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                {checkedOut && <div>
                    <form onSubmit={submit} className="w-full p-5 flex flex-col gap-5">
                        <div className="grid gap-3">
                            <Label htmlFor="agency" className="text-base">
                                {t('cart_page.agency')}
                                {/* Agence  */}
                            </Label>
                            <Select>
                                <SelectTrigger >
                                    <SelectValue placeholder="Yalidine" className="w-full h-12 border-2 focus-visible:ring-transparent" />
                                </SelectTrigger>
                                <SelectContent dir="rtl" className="w-full border-2 focus-visible:ring-transparent">
                                    <SelectItem value="yalidine">Yalidine</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="shipping_method" className="text-base">
                                {t('cart_page.shipping_method')}
                                {/* Méthode de livraison */}
                            </Label>
                            <Select onValueChange={(value) => {
                                setData(data => ({ ...data, shipping_method: value }))
                            }}>
                                <SelectTrigger >
                                    <SelectValue placeholder={t('cart_page.home_delivery')} className="w-full h-12 border-2 focus-visible:ring-transparent" />
                                </SelectTrigger>
                                <SelectContent className="w-full border-2 focus-visible:ring-transparent">
                                    <SelectItem value="2">
                                        {t('cart_page.home_delivery')}
                                    </SelectItem>
                                    <SelectItem value="1">
                                        {t('cart_page.agency_delivery')}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-base">
                                    {t('cart_page.first_name')}
                                    {/* Nom */}
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.first_name}
                                    onChange={(e) => {
                                        setData(data => ({ ...data, first_name: e.target.value }))
                                    }}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-base">
                                    {t('cart_page.last_name')}
                                    {/* Prénom */}
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.last_name}
                                    onChange={(e) => {
                                        setData(data => ({ ...data, last_name: e.target.value }))
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="phone" className="text-base">
                                {t('cart_page.phone')}
                                {/* Numéro de téléphone */}
                            </Label>
                            <Input
                                id="phone"
                                type="text"
                                className="w-full h-12 border-2 focus-visible:ring-transparent"
                                value={data.phone}
                                onChange={(e) => {
                                    setData(data => ({ ...data, phone: e.target.value }))
                                }}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="address" className="text-base">
                                {t('cart_page.street_address')}
                                {/* Adresse */}
                            </Label>
                            <Input
                                id="address"
                                type="text"
                                className="w-full h-12 border-2 focus-visible:ring-transparent"
                                value={data.street_address}
                                onChange={(e) => {
                                    setData(data => ({ ...data, street_address: e.target.value }))
                                }}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="state" className="text-base">
                                {t('cart_page.state')}
                                {/* Wilaya */}
                            </Label>
                            <Select onValueChange={(value) => {
                                setData(data => ({ ...data, state_code: value }))
                            }}>
                                <SelectTrigger >
                                    <SelectValue placeholder="" className="w-full h-12 border-2 focus-visible:ring-transparent" />
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
                                <Label htmlFor="postal_code" className="text-base">
                                    {t('cart_page.postal_code')}
                                    {/* Code postal */}
                                </Label>
                                <Input
                                    id="postal_code"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.postal_code}
                                    onChange={(e) => {
                                        setData(data => ({ ...data, postal_code: e.target.value }))
                                    }}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="city" className="text-base">
                                    {t('cart_page.city')}
                                    {/* Ville */}
                                </Label>
                                <Input
                                    id="city"
                                    type="text"
                                    className="w-full h-12 border-2 focus-visible:ring-transparent"
                                    value={data.city}
                                    onChange={(e) => {
                                        setData(data => ({ ...data, city: e.target.value }))
                                    }}
                                />
                            </div>
                        </div>

                    </form>
                </div>}
                <div className="rounded-lg sticky font-sans rtl:font-arabic">
                    <div className="px-8 w-full">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex items-center flex-col md:flex-row gap-5 border-b border-gray-300 py-4">
                                <img
                                    alt=""
                                    src={item?.product?.main_image?.path}
                                    className="h-24 w-24 object-cover mr-4 border-2 border-gray-700 rounded-md bg-gray-300"
                                />

                                <div className="flex md:flex-1 flex-col items-center md:items-start justify-center">
                                    <Link
                                        href={`/products/${item.product?.id}`}>
                                        <h2 className="text-xl text-blue-600 font-semibold mb-2">{item?.product?.name}</h2>
                                    </Link>
                                    <p  className="flex gap-2 text-gray-600 mb-2">
                                        <span className="text-gray-600 mr-1">
                                            {item.quantity * item.product_price?.quantity} {item.product_price?.unit} =
                                        </span>
                                        <span className="text-gray-900 font-semibold">
                                            {item.quantity * item.product_price?.price} {t("global.da")}
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
                        <p className="text-gray-600 text-2xl text-center my-8">
                            {t('cart_page.empty_cart')}
                            {/* Notre panier est vide. Commencez à magasiner maintenant ! */}
                        </p>
                    )}

                    {cartItems.length > 0 && (
                        <div className="flex flex-col p-5 gap-3">
                            {checkedOut &&
                                <><div className="flex items-center font-mono rtl:font-arabic justify-between">
                                    <p className="text-lg">
                                        {t('cart_page.sub_total')}:
                                    </p>
                                    <p className="flex rtl:flex-row-reverse gap-2 text-base text-gray-900">
                                    {cartItems.reduce((a, b) => a + (b.quantity * b.product_price?.price || 0), 0)},00 {t("global.da")}
                                    </p>
                                </div>
                                    <div className="flex items-center font-mono rtl:font-arabic justify-between">
                                        <p className="text-lg">
                                            {t('cart_page.shipping')}:
                                        </p>
                                        <p className="text-base text-gray-900">
                                            {data.state_code != "" ?
                                                yalidine[(parseInt(data.state_code) || 1) - 1][data.shipping_method == "1" ? "2" : "1"] + ",00" + t("global.da") :
                                                "remplir l'entrée"
                                            } 
                                        </p>
                                    </div>
                                    <div className="flex items-center font-bold font-mono rtl:font-arabic justify-between">
                                        <p className="text-lg">
                                            {t('cart_page.total')}:
                                        </p>
                                        <p className="text-base text-gray-900">
                                            {cartItems.reduce((a, b) => a + (b.quantity * b.product_price?.price || 0), 0) + (data.state_code != "" ?
                                                yalidine[(parseInt(data.state_code) || 1) - 1][data.shipping_method == "1" ? "2" : "1"] :
                                                0
                                            )},00 {t("global.da")}
                                        </p>
                                    </div>
                                </>
                            }

                            <div className="flex justify-end">
                                {checkedOut ? (
                                    <Button
                                        type="submit"
                                        className="w-52 text-white px-4 py-2 bg-gray-900 rounded-md hover:bg-gray-800 active:bg-gray-700"
                                        onClick={submit}
                                        disabled={processing || !isAllRulesVerified()}
                                    >
                                        {checkoutLoading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : (
                                            <div className="flex items-center justify-center gap-2">
                                                <p className="text-sm text-gray-50 font-bold uppercase">
                                                    {t('cart_page.order_now')}
                                                    {/* Passer à la caisse */}
                                                </p>
                                                {/* <MdSend className="h-5 w-5" /> */}
                                            </div>
                                        )}

                                    </Button>
                                ) : (
                                    <Button
                                        className="w-52 text-white px-4 py-2 bg-gray-900 rounded-md hover:bg-gray-800 active:bg-gray-700"
                                        onClick={() => setCheckedOut(true)}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <p className="text-sm text-gray-50 font-bold uppercase">
                                                Passer à la caisse
                                            </p>
                                            {/* <MdSend className="h-5 w-5" /> */}
                                        </div>
                                    </Button>
                                )}
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
