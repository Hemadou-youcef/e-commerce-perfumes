import Product from "@/components/Products/Product/product";
import ProductsSwiper from "@/components/Products/products";
import Products from "@/components/Products/products";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

// Icons
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";


const LandingSuggest = ({ title, products }) => {

    const { t, i18n } = useTranslation()
    return (
        <>
            <div className="mx-auto px-2 pt-2 py-0 bg-white ltr:font-sans rtl:font-arabic">
                <div className="md:container">
                    <div className="flex items-center  justify-between pr-5 py-3">
                        <p className="pb-1 inline text-gray-600 font-bold text-sm md:text-3xl font-serif border-b-2 border-gray-600  ltr:font-sans rtl:font-arabic">
                            {title}
                        </p>
                        <Link href="#"
                            className="inline text-xs md:text-base font-bold text-gray-600 hover:text-gray-400 transition-colors">
                            {t('layout.navbar.see_all')}
                            {i18n.language === "fr" ? <RiArrowRightSLine className="inline text-xs md:text-sm font-bold text-gray-600 hover:text-gray-400 transition-colors" /> : <RiArrowLeftSLine className="inline text-xs md:text-sm font-bold text-gray-600 hover:text-gray-400 transition-colors" />}
                        </Link>
                        {/* <div className="w-24 h-0.5 rounded-full mt-2 bg-gray-600"></div> */}
                    </div>
                    <div className=" w-full flex justify-center">
                        <ProductsSwiper products={products} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingSuggest;