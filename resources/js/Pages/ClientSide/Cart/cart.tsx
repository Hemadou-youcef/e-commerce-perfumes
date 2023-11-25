import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { Button } from "@/shadcn/ui/button";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdDeleteOutline, MdSend } from "react-icons/md";

const Cart = ({ ...props }) => {
    const [cartItems, setCartItems] = useState(props?.cartItems);
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


    return (
        <div className="container mx-auto px-4 my-8">
            <div className="bg-white border-2 rounded-lg shadow-md">
                <div className="flex items-center justify-center gap-5 py-5 px-8 border-b border-gray-300">
                    <IoBagHandleOutline className="h-8 w-8 text-gray-900" />
                    <h1 className="text-2xl font-bold text-gray-900 uppercase">
                        Mon panier
                    </h1>
                </div>
                <div className="px-8 w-full">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex items-center flex-col md:flex-row gap-5 border-b border-gray-300 py-4">
                            <img
                                alt=""
                                src={item.product?.main_image}
                                className="h-16 w-16 object-cover mr-4 bg-gray-300"
                            />
                            <div className="flex md:flex-1 flex-col items-center md:items-start justify-center">
                                <h2 className="text-xl font-semibold mb-2">{item?.product?.name}</h2>
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
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 p-5 gap-5">
                        <p className="text-lg font-bold p-2 bg-gray-100 rounded-md">
                            Total: {cartItems.reduce((a, b) => a + (b.quantity * b.product_price?.price || 0), 0)} DA
                        </p>

                        <Button
                            onClick={handleSendOrder}
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
                )}
            </div>
        </div>
    );
};

Cart.layout = (page) => <LandingMainLayout children={page} />;
export default Cart;
