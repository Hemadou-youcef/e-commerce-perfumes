import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { Button } from "@/shadcn/ui/button";
import { useState } from "react";

const Cart = ({ ...props }) => {
    const [cartItems, setCartItems] = useState(props?.cartItems);

    const handleSendOrder = () => {
        // Implement logic for sending orders
        console.log("Sending orders...");
    };

    return (
        <div className="container mx-auto px-4 my-8">
            <div className="bg-white p-8 border-2 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold mb-6">Mon panier</h1>

                {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center border-b border-gray-300 py-4">
                        <img
                            alt=""
                            src={item.product?.main_image}
                            className="rounded-full h-16 w-16 object-cover mr-4 bg-gray-600"
                        />
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2">{item?.product?.name}</h2>
                            <p className="text-gray-600 mb-2">
                                {item.quantity * item.product_price?.quantity} {item.product_price?.unit}
                            </p>
                            <p className="text-gray-800">
                                Prix: {item.quantity * item.product_price?.price} DA
                            </p>
                        </div>
                    </div>
                ))}

                {cartItems.length === 0 && (
                    <p className="text-gray-600 text-center mt-8">Notre panier est vide. Commencez à magasiner maintenant !</p>
                )}

                {cartItems.length > 0 && (
                    <div className="flex justify-between mt-8">
                        <p className="text-lg font-bold text-gray-900">Total: {cartItems.reduce((a, b) => a + (b.quantity * b.product_price?.price || 0), 0)} DA</p>
                        
                        <Button
                            onClick={handleSendOrder}
                            className="text-white px-4 py-2 rounded-md  transition duration-300 ease-in-out bg-second hover:bg-second-hover"
                        >
                            Envoyer la commande
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

Cart.layout = (page) => <LandingMainLayout children={page} />;
export default Cart;