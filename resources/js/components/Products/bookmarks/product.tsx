import { Button } from "@/shadcn/ui/button";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

const BookmarkProduct = ({ product }) => {
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
            <div className="flex items-center flex-col md:flex-row gap-5 border-b border-gray-300 py-4">
                <img
                    alt=""
                    src={product?.product?.main_image?.path}
                    className="h-14 w-14 object-cover mr-4  border-gray-700 shadow-md rounded-md bg-gray-300"
                />
                <div className="flex md:flex-1 flex-col items-center md:items-start justify-center">
                    <Link
                        href={`/products/${product.product?.id}`}>
                        <h2 className="text-xl text-gray-600 font-semibold mb-2">{product?.product?.name}</h2>
                    </Link>
                </div>
                <div>
                    <Button
                        variant="outline"
                        className="text-sm text-gray-500 hover:text-gray-700 border-0 hover:bg-transparent"
                        onClick={() => handleDeleteBookmark(product.id)}
                    >
                        {deleteLoading ? <AiOutlineLoading3Quarters className="animate-spin h-8 w-8" /> : <MdDeleteOutline className="h-8 w-8" />}
                    </Button>
                </div>

            </div>
        </>
    );
}

export default BookmarkProduct;