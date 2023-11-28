import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { Button } from "@/shadcn/ui/button";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Bookmarks = ({ ...props }) => {
    console.log(props)
    const [bookmarks, setCartItems] = useState(props?.bookmarks);

    useEffect(() => {
        setCartItems(props?.bookmarks)
    }, [props])
    const handleDeleteBookmark = (id) => {
        router.delete(route("bookmark.destroy", id), {
            preserveScroll: true,
        });
    }
    return (
        <>

            <div className="container border-2 mx-auto px-4 my-5 bg-white">
                <div className="flex items-center justify-center gap-5 py-5 px-8 border-b border-gray-300">
                    <FaRegBookmark className="h-8 w-8 text-gray-900" />
                    <h1 className="text-2xl font-bold text-gray-900 uppercase">
                        Mon Signets
                    </h1>
                </div>
                <div className="rounded-lg sticky">

                    <div className="px-8 w-full">
                        {bookmarks.map((item, index) => (
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
                                </div>
                                <div>
                                    <Button
                                        variant="outline"
                                        className="text-sm text-gray-500 hover:text-gray-700 border-0 hover:bg-transparent"
                                        onClick={() => handleDeleteBookmark(item.id)}
                                    >
                                        <MdDeleteOutline className="h-8 w-8" />
                                    </Button>
                                </div>

                            </div>
                        ))}
                    </div>
                    {bookmarks.length === 0 && (
                        <p className="text-gray-600 text-center my-8">Notre liste de signets est vide</p>
                    )}

                </div>
            </div>
        </>
    );
}

Bookmarks.layout = (page) => <LandingMainLayout children={page} />;
export default Bookmarks;