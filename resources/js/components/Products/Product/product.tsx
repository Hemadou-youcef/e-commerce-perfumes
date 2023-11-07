
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

const Product = () => {
    return (
        <>
            <div className="w-full flex flex-col items-center justify-center border-2 overflow-hidden cursor-pointer rounded-md shadow-md">
                <div className="w-full h-36 md:h-52  relative bg-cover bg-center"
                    style={{ backgroundImage: "url(https://odour-demo.myshopify.com/cdn/shop/products/product_15_6ee97ac4-83ee-4d04-9b4f-dd32b1c4175a_large.png?v=1561608533)" }}
                >
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-3 py-3">
                    <p className="text-gray-600 text-center text-xs md:text-base lg:tex">
                        Product Name
                    </p>
                    <p className="text-rose-600 text-center font-bold text-xs md:text-base lg:text-lg">
                        100.00 DZD/G
                    </p>
                    {/* ADD REVIEW STARS */}
                    <div className="flex items-center justify-center">
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                    </div>

                </div>

            </div>
        </>
    );
}

export default Product;