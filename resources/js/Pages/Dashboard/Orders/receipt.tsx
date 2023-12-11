
// Styles
import { Button } from "@/shadcn/ui/button";
import "@/styles/receipe.module.css"
import { router } from "@inertiajs/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";

const PrintOrder = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState(props?.order || props?.days)
    const urlParams = new URLSearchParams(window.location.search);
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
                    REÇU
                </h1>
                {data && (
                    <table className="w-11/12 mx-auto  ">
                        <thead>
                            <div id="header" className="mt-2">

                                <ul>
                                    <li>RUMAH PARFUM</li>

                                    {/* User Information in the right  */}
                                    <li className="w-full flex flex-col justify-start">
                                        <span>Date: {props?.order ? urlParams.get('date') : urlParams.get('startDate') + " - " + urlParams.get('endDate')}</span>
                                    </li>
                                </ul>

                            </div>
                        </thead>
                        {/* Order Products */}
                        <tbody>
                            <div className="">
                                {props?.order && (
                                    <table className="mt-5 w-full text-sm font-mono border border-dashed border-gray-900">
                                        <thead>
                                            <tr className="border-b border-gray-900 border-dashed">

                                                <th className="pl-2 text-left">Bon de commande N°</th>
                                                <th className="pl-2 text-left">Client</th>
                                                <th className="pl-2 text-left">Nombre de produits</th>
                                                <th className="pl-2 text-left">Total</th>
                                                <th className="pl-2 text-left">Benefice</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* create n array of same object order.order_products */}
                                            {data.map((order, index) => (
                                                <tr className="border-b border-gray-900 border-dashed" key={index}>
                                                    <td className="pl-2 text-left">{order.id}</td>
                                                    <td className="pl-2 text-left">{order.user.first_name} {order.user.last_name}</td>
                                                    <td className="pl-2 text-left">{order.order_products.length}</td>
                                                    <td className="pl-2 text-left">{order.total} DA</td>
                                                    <td className="pl-2 text-left">{order.profit} DA</td>
                                                </tr>
                                            ))}
                                            <tr className="border-b border-gray-900 border-dashed">
                                                <td colSpan={2} className="pl-2 text-left">Total</td>
                                                <td className="pl-2 text-left">{data.reduce((a, b) => a + b.order_products.length, 0)}</td>
                                                <td className="pl-2 text-left">{data.reduce((a, b) => a + b.total, 0)} DA</td>
                                                <td className="pl-2 text-left">{data.reduce((a, b) => a + b.profit, 0)} DA</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                                {props?.days && (
                                    <table className="mt-5 w-full text-sm font-mono border border-dashed border-gray-900">
                                        <thead>
                                            <tr className="border-b border-gray-900 border-dashed">

                                                <th className="pl-2 text-left">Date</th>
                                                <th className="pl-2 text-left">Nombre de commandes</th>
                                                <th className="pl-2 text-left">Nombre de produits</th>
                                                <th className="pl-2 text-left">Total</th>
                                                <th className="pl-2 text-left">Benefice</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* create n array of same object order.order_products */}
                                            {data.map((order, index) => (
                                                <tr className="border-b border-gray-900 border-dashed" key={index}>
                                                    <td className="pl-2 text-left">{order.order_date}</td>
                                                    <td className="pl-2 text-left">{order.total_orders}</td>
                                                    <td className="pl-2 text-left">{order.total_order_products}</td>
                                                    <td className="pl-2 text-left">{order.total_sum} DA</td>
                                                    <td className="pl-2 text-left">{order.total_profit} DA</td>
                                                </tr>
                                            ))}
                                            <tr className="border-b border-gray-900 border-dashed">
                                                <td colSpan={1} className="pl-2 text-left">Total</td>
                                                <td className="pl-2 text-left">{data.reduce((a, b) => a + b.total_orders, 0)}</td>
                                                <td className="pl-2 text-left">{data.reduce((a, b) => a + parseInt(b.total_order_products), 0)}</td>
                                                <td className="pl-2 text-left">{data.reduce((a, b) => a + parseInt(b.total_sum), 0)} DA</td>
                                                <td className="pl-2 text-left">{data.reduce((a, b) => a + parseInt(b.total_profit), 0)} DA</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default PrintOrder;
