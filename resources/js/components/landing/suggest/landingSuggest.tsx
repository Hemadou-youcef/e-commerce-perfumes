import Product from "@/components/Products/Product/product";
import Products from "@/components/Products/products";
import { Link } from "@inertiajs/react";

// Icons
import { RiArrowRightSLine } from "react-icons/ri";


const LandingSuggest = ({ title }: { title?: string }) => {
    return (
        <>
            <div className="container mx-auto pt-2 py-0 bg-white ">
                <div className="flex items-end justify-between pr-5 py-3">
                    <p className="pb-2 inline text-gray-600 font-bold text-3xl font-serif border-b-2 border-gray-600">
                        {title}
                    </p>
                    <Link href="#"
                        className="inline text-sm font-bold text-gray-600 hover:text-gray-400 transition-colors">
                        See More
                        <RiArrowRightSLine className="inline w-4 h-4 ml-1" />
                    </Link>
                    {/* <div className="w-24 h-0.5 rounded-full mt-2 bg-gray-600"></div> */}
                </div>
                <div>
                    <Products />
                </div>
            </div>
        </>
    );
}

export default LandingSuggest;