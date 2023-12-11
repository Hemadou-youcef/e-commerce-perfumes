
// Styles
import { Button } from "@/shadcn/ui/button";
import "@/styles/receipe.module.css"
import { router } from "@inertiajs/react";
import { forwardRef, useEffect, useRef } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";

const PrintOrder = ({ order }) => {

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    useEffect(() => {
        // Function to print the page when it has fully loaded
        const printPage = () => {
            setTimeout(() => {
                window.print();
            }, 2000);
        };

        // Add event listener for the 'load' event
        window.addEventListener('load', printPage);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('load', printPage);
        };
    }, []);

    const getProductPrice = (product) => {
        const productPrice = product?.product?.active_product_prices?.find((price) => price.id === product.product_price_id);
        return productPrice;
    }

    const getQuantity = (product) => {
        const productPrice = getProductPrice(product);
        return productPrice?.quantity * product.quantity;
    }


    return (
        <>
            {/* <div className="container w-full py-10 relative">
                <div
                    className="w-full flex items-center gap-2"
                >
                    <Button
                        onClick={() => router.get(route("order", order.id))}
                        className="bg-gray-900 text-white px-5 py-2 rounded-md shadow-md hover:bg-gray-800">
                        <FaAngleLeft className="text-xl" />
                        Retour
                    </Button>
                    <Button
                        onClick={() => pageToBePrinted.current?.print()}
                        className="bg-gray-900 text-white px-5 py-2 rounded-md shadow-md hover:bg-gray-800"
                    >
                        Imprimer
                        <IoMdPrint className="text-xl ml-2" />
                    </Button>
                </div>
            </div> */}
            <div className={`container w-full py-10 relative`}>
                <h1 className="text-3xl text-center font-medium mb-5">
                    BON DE COMMANDE
                </h1>
                {order && (
                    <table className="mx-auto w-11/12">
                        <thead>
                            <div id="header" className="mt-2">

                                <ul>
                                    <li>RUMAH PARFUM</li>
                                    <li><strong>Address:</strong> </li>
                                    <li><strong>Téléphone:</strong> </li>
                                    <li><strong>Mail:</strong> </li>

                                    {/* User Information in the right  */}
                                    <li className="w-full flex flex-col items-end justify-end">
                                        <strong>Destinataire</strong>
                                        <span>{`${order.user.first_name}, ${order.user.last_name}`}</span>
                                        <span>{order.user.address}</span>
                                    </li>

                                    <li className="w-full flex flex-col justify-start">
                                        <span>Bon de commande N°: {order.id}</span>
                                        <span>Date: {formatDate(order.created_at)}</span>
                                        <span>Lieu d'émission: {order.address}</span>
                                        <span>Numéro de client: {order.user.phone}</span>

                                    </li>
                                </ul>

                            </div>
                        </thead>
                        {/* Order Products */}
                        <tbody>
                            <div className="">
                                <table className="mt-5 w-full text-sm font-mono border border-dashed border-gray-900">
                                    <thead>
                                        <tr className="border-b border-gray-900 border-dashed">
                                            <th className="pl-2 text-left">Produit</th>
                                            <th className="text-left">Quantité</th>
                                            <th className="pr-2 text-left">Prix</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* create n array of same object order.order_products */}
                                        {order?.order_products?.map((product, index) => (
                                            <tr key={index} className="border-b border-gray-900 border-dashed">
                                                <td className="pl-2 text-left">{product?.product?.name}</td>
                                                <td className="text-left">{getQuantity(product)} {product?.product?.unit}</td>
                                                <td className="pr-2 text-left">{product?.price} DA</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={2} className="pl-2 text-left">Total</td>
                                            <td className="pr-2 text-left">{order.total} DA</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </tbody>
                    </table>
                )}
                {/* signature of the sended */}
                <div className="mt-10 w-full flex justify-between items-center font-bold">
                    <span>Signature expéditeur</span>

                    <span>Signature destinataire</span>
                </div>
            </div>
        </>
    );
}

export default PrintOrder;
