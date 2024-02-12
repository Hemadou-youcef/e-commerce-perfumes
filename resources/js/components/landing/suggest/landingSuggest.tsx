import Product from "@/components/Products/Product/product";
import ProductsSwiper from "@/components/Products/products";
import Products from "@/components/Products/products";
import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';

// Icons
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";


const LandingSuggest = ({ title, products, url }) => {

    const { t, currentLocale } = useLaravelReactI18n();
    return (
        <>
            <div className="mx-auto px-2 pt-2 py-5 bg-white ltr:font-sans rtl:font-arabic">
                <div className="md:container">
                    <div className="flex items-center justify-between ltr:pl-5 rtl:pr-5 py-3">
                        <p className="pb-1 inline text-gray-600 font-bold text-sm md:text-3xl font-serif border-b-2 border-gray-600  ltr:font-sans rtl:font-arabic">
                            {title}
                        </p>
                        <Link href={url}
                            className="inline text-xs md:text-base font-bold text-gray-600 hover:text-gray-400 transition-colors">
                            {t('custom.layout.navbar.see_all')}
                            {currentLocale() === "fr" ? <RiArrowRightSLine className="inline text-xs md:text-sm font-bold text-gray-600 hover:text-gray-400 transition-colors" /> : <RiArrowLeftSLine className="inline text-xs md:text-sm font-bold text-gray-600 hover:text-gray-400 transition-colors" />}
                        </Link>
                        {/* <div className="w-24 h-0.5 rounded-full mt-2 bg-gray-600"></div> */}
                    </div>
                    <div className=" w-full flex justify-center">
                        {products?.length > 0 ? (
                            <ProductsSwiper products={products} />
                        ) : (
                            <div className="h-20 w-full flex justify-center items-center">
                                <p className="text-gray-600 font-bold text-sm md:text-xl ltr:font-sans rtl:font-arabic">
                                    {t('custom.layout.navbar.no_products')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingSuggest;