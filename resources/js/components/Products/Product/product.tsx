
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { TbBookmark } from "react-icons/tb";

const getMinPrice = (prices: any) => {
    let min = Math.min(...prices.map((price: any) => price.quantity));
    return prices.find((price: any) => price.quantity === min);
}

const Product = ({ product }) => {
    const [currectPrice, setCurrectPrice] = useState(getMinPrice(product?.product_prices));
    return (
        <>
            {/* Link href="/product/5"  */}
            <div className="group w-full md:w-[248px] flex flex-col items-center justify-center border overflow-hidden shadow-md">
                <div className="w-full h-72  relative bg-cover bg-center border-b"
                    style={{ backgroundImage: "url(/storage/" + product.main_image + ")" }}
                >
                    <Link href={`/products/${product.id}`} className="absolute inset-0 w-full h-full flex items-center justify-center">
                    </Link>
                    <div className="hidden absolute right-1 top-1 group-hover:flex flex-col gap-2 group-hover:transition-all group-hover:delay-150 group-hover:duration-300">
                        <Button variant="ghost" className="flex items-center justify-center gap-2 p-2 bg-gray-100 bg-opacity-50 rounded-full shadow-md border">
                            <TbBookmark className="w-6 h-6 text-gray-900" />
                        </Button>
                        {/* <div className="flex items-center justify-center gap-2 p-2 bg-gray-100 bg-opacity-50 rounded-full shadow-md border">
                            <AiFillEye className="w-6 h-6 text-gray-900" />
                        </div> */}
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-3 py-3">
                    <p className="px-2 text-black font-serif text-center text-xs md:text-base lg:text-lg uppercase">
                        {product.name.length > 16 ? product.name.substring(0, 16) + "..." : product.name}
                    </p>
                    <p className="text-gray-600 text-center font-bold text-xs md:text-sm lg:text-base ">
                        {currectPrice?.price} DA/{currectPrice?.unit}
                    </p>
                    {/* ADD REVIEW STARS */}
                    {/* <div className="flex items-center justify-center">
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                    </div> */}
                    <Link href="/product/5">
                        <Button
                            variant="outline"
                            className="w-28 bg-transparent border-2 h-8 text-xs border-gray-900 hover:bg-gray-800 active:bg-gray-300 text-gray-900 hover:text-gray-100 active:text-gray-700"
                        >
                            ACHETER
                        </Button>
                    </Link>
                </div>

            </div>
        </>
    );
}

export default Product;