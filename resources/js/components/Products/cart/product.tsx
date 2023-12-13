import { Button } from "@/shadcn/ui/button";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

const CartProduct = ({ product }) => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const { t } = useTranslation()

    const handleDeleteCartItem = (id) => {
        setDeleteLoading(true);
        router.delete(route('cart_item.destroy', id), {
            onSuccess: () => {
                console.log('success');
            },
            onError: () => {
                console.log('error');
            },
            onFinish: () => {
                setDeleteLoading(false);
            }
        });
    }

    return (
        <>
            <div className="flex items-center flex-col md:flex-row gap-5 border-b border-gray-300 py-4">
                <img
                    alt=""
                    src={product?.product?.main_image?.path}
                    className="h-14 w-14 object-cover mr-4 border-2 border-gray-700 shadow-md rounded-md bg-gray-300"
                />
                <div className="flex md:flex-1 flex-col items-center md:items-start justify-center">
                    <Link
                        href={`/products/${product.product?.id}`}>
                        <h2 className="text-xl text-gray-600 font-semibold mb-2">{product?.product?.name}</h2>
                    </Link>
                    <p className="flex gap-2 text-gray-600 mb-2">
                        <span className="text-gray-600 mr-1">
                            {product.quantity * product.product_price?.quantity} {product.product_price?.unit} =
                        </span>
                        <span className="text-gray-900 font-semibold">
                            {product.quantity * product.product_price?.price} {t("global.da")}
                        </span>
                    </p>

                </div>
                <div>
                    <Button
                        variant="outline"
                        className="text-sm text-gray-500 hover:text-gray-700 border-0 hover:bg-transparent"
                        onClick={() => handleDeleteCartItem(product.id)}
                    >
                        {deleteLoading ? <AiOutlineLoading3Quarters className="animate-spin h-8 w-8" /> : <MdDeleteOutline className="h-8 w-8" />}
                    </Button>
                </div>

            </div>
        </>
    );
}

export default CartProduct;