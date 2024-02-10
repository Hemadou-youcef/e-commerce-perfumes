
import { Button } from "@/shadcn/ui/button";
import { useToast } from "@/shadcn/ui/use-toast";
import { Link, router } from "@inertiajs/react";
import { useState, useContext } from "react";
import { LoadingContext } from "@/Layouts/landing/mainLayout";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

const getMinPrice = (prices: any) => {
    let min = Math.min(...prices.map((price: any) => price.quantity));
    return prices.find((price: any) => price.quantity == min);
}

const Product = ({ product }) => {
    const { handleVisit } = useContext(LoadingContext);
    const [currectPrice, setCurrectPrice] = useState(getMinPrice(product?.active_product_prices));
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const { t } = useLaravelReactI18n();

    const handleBookmark = () => {
        setBookmarkLoading(true);
        if (product?.isProductBookmarked) {
            router.delete(route("bookmark.destroy", product?.id), {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    toast({
                        title: t("custom.product_page.bookmark_removed"),
                        description: t("custom.product_page.bookmark_removed_description"),
                        duration: 5000,
                    })
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: t("custom.global.error"),
                        description: t("custom.global.error_description"),
                        duration: 5000,
                    })
                },
                onFinish: () => setBookmarkLoading(false),
            });
        } else {
            router.post(route("bookmark.store"), {
                product_id: product.id
            }, {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    toast({
                        title: t("custom.product_page.bookmark_added"),
                        description: t("custom.product_page.bookmark_added_description"),
                        duration: 5000,
                    })
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: t("custom.global.error"),
                        description: t("custom.global.error_description"),
                        duration: 5000,
                    })
                },
                onFinish: () => setBookmarkLoading(false),
            })
        }
    }
    return (
        <>
            {/* Link href="/product/5"  */}
            <div className="group w-full md:w-[248px] flex flex-col items-center justify-center border overflow-hidden shadow-md rounded-md">
                <div className="w-full h-40 md:h-72  relative bg-cover bg-center border-b"
                    style={{ backgroundImage: "url(" + (product.main_image?.path || product?.images?.filter((image: any) => product?.main_image_id == image.id)[0]?.path || "/image/no-image.jpg") + ")" }}
                >
                    <div
                        onClick={() => handleVisit(`/products/${product.id}`)}
                        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer">
                    </div>
                    <div className="hidden absolute right-1 top-1 group-hover:flex flex-col gap-2 group-hover:transition-all group-hover:delay-150 group-hover:duration-300">
                        <Button
                            variant="ghost"
                            className="flex items-center justify-center gap-2 p-2 w-6 h-6 md:w-10 md:h-10 bg-gray-50 rounded-full shadow-md border"
                            onClick={handleBookmark}
                            disabled={bookmarkLoading}

                        >

                            {bookmarkLoading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : product?.isProductBookmarked ? <RiBookmarkFill className="w-3 h-3 md:w-4 md:h-4 text-gray-900" /> : <RiBookmarkLine className="w-3 h-3 md:w-4 md:h-4 text-gray-900" />}
                        </Button>
                        {/* <div className="flex items-center justify-center gap-2 p-2 bg-gray-100 bg-opacity-50 rounded-full shadow-md border">
                            <AiFillEye className="w-6 h-6 text-gray-900" />
                        </div> */}
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-1 md:gap-3 py-3">
                    <p dir="ltr" className="px-2 text-black font-serif text-center text-[10px] md:text-base lg:text-lg uppercase">
                        {product.name.length > 16 ? product.name.substring(0, 16) + "..." : product.name}
                    </p>
                    <p className="text-gray-600 text-center font-bold text-[10px] md:text-sm lg:text-base ">
                        {currectPrice?.price} {t("custom.global.da")}
                    </p>
                    {/* ADD REVIEW STARS */}
                    {/* <div className="flex items-center justify-center">
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                    </div> */}
                    <Link href={`/products/${product.id}`} onClick={() => setLoading(true)}>
                        <Button
                            variant="outline"
                            className="w-20 md:w-28 bg-transparent border-2 h-7 sm:h-8 text-[8px] sm:text-xs border-gray-900 hover:bg-gray-800 active:bg-gray-300 text-gray-900 hover:text-gray-100 active:text-gray-700"
                        >
                            {loading ? <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" /> : t('custom.product_page.view_product')}
                        </Button>
                    </Link>
                </div>

            </div>
        </>
    );
}

export default Product;
