import { Button } from "@/shadcn/ui/button";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";

const BookmarkProduct = ({ product }) => {
    console.log(product)
    const [deleteLoading, setDeleteLoading] = useState(false);
    const handleDeleteBookmark = (id) => {
        setDeleteLoading(true);
        router.delete(route("bookmark.destroy", id), {
            preserveScroll: true,
            preserveState: false,
            onFinish: () => setDeleteLoading(false)
        });
    }
    return (
        <>
            <div className="flex ltr:items-start items-end md:items-center flex-col md:flex-row-reverse gap-5 border-b border-gray-300 py-4">
                <div className="flex rtl:flex-row-reverse md:flex-row items-center justify-between w-full md:w-auto">
                    <img
                        alt=""
                        src={product?.product?.main_image?.path}
                        className="h-14 w-14 object-cover mr-4 border-2 border-gray-700 shadow-md rounded-md bg-gray-300"
                    />
                    <Button
                        variant="outline"
                        className="md:hidden text-sm text-gray-900 hover:text-gray-700 border-0 hover:bg-transparent"
                        onClick={() => handleDeleteBookmark(product?.product?.id)}
                    >
                        {deleteLoading ? <AiOutlineLoading3Quarters className="animate-spin h-8 w-8" /> : <TiDeleteOutline className="h-8 w-8" />}
                    </Button>
                </div>
                <div className="w-full flex md:flex-1 flex-col items-start md:items-start rtl:items-end">
                    <Link
                        href={`/products/${product.product?.id}`}>
                        <h2 className="text-left text-sm md:text-xl text-gray-600 font-semibold mb-2">{product?.product?.name}</h2>
                    </Link>
                </div>
                <div>
                    <Button
                        variant="outline"
                        className="hidden md:block text-sm text-gray-900 hover:text-gray-700 border-0 hover:bg-transparent p-1"
                        onClick={() => handleDeleteBookmark(product?.product?.id)}
                    >
                        {deleteLoading ? <AiOutlineLoading3Quarters className="animate-spin h-8 w-8" /> : <TiDeleteOutline className="h-8 w-8" />}
                    </Button>
                </div>

            </div>
        </>
    );
}

export default BookmarkProduct;