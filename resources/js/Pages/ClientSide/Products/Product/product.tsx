
import { Link, Head, router } from '@inertiajs/react';

import { useEffect, useState } from 'react';

// Layouts
import LandingMainLayout from '@/Layouts/landing/mainLayout';

// Components
import { Button } from '@/shadcn/ui/button';
import { useToast } from "@/shadcn/ui/use-toast"
import { AiOutlineLoading3Quarters, AiOutlineMinus, AiOutlinePlus, AiOutlineZoomIn } from 'react-icons/ai';
import LandingSuggest from '@/components/landing/suggest/landingSuggest';
import { Separator } from '@/shadcn/ui/separator';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { TbExternalLink } from "react-icons/tb"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { is } from 'date-fns/locale';
import { MdEdit } from 'react-icons/md';


const getMinPrice = (prices: any) => {
    if (!prices) return null;
    let min = Math.min(...prices?.map((price: any) => price.quantity));
    return prices.find((price: any) => price.quantity === min);
}

const Product = ({ ...props }) => {
    const [product, setProduct] = useState(props?.product);
    const [selectedImage, setSelectedImage] = useState(product?.images.filter((item: any) => product?.main_image_id === item.id)[0]?.path);
    const [currectPrice, setCurrectPrice] = useState(getMinPrice(product?.active_product_prices));
    const [qte, setQte] = useState(1);

    const [addingToCartLoading, setAddingToCartLoading] = useState(false);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    const [showImageSlider, setShowImageSlider] = useState(false);

    const { t, i18n } = useTranslation();
    const title = product?.name + " | " + t("layout.navbar.title");

    const { toast } = useToast()

    useEffect(() => {
        const onChangeImage = (e: any) => {
            if (!showImageSlider && e.key === 'Escape') {
                setShowImageSlider(false)
            }
        }

        window.addEventListener('keydown', onChangeImage);

        return () => {
            window.removeEventListener('keydown', onChangeImage);
        }
    }, []);

    useEffect(() => {
        setProduct(props?.product);
    }, [props?.product]);


    const isAdmin = () => {
        return [3, 4].includes(props?.auth?.user?.role);
    }

    const isEmployee = () => {
        return [2].includes(props?.auth?.user?.role);
    }

    const isClient = () => {
        return [0, 1].includes(props?.auth?.user?.role);
    }

    const handleBookmark = () => {
        setBookmarkLoading(true);
        if (product?.isProductBookmarked) {
            router.delete(route("bookmark.destroy", product?.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: t("product_page.product_removed_from_bookmarks"),
                        description: t("product_page.you_can_now_see_your_bookmarks"),
                        duration: 5000,
                    })
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: t("global.error"),
                        description: t("global.error_occured"),
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
                onSuccess: () => {
                    toast({
                        title: t("product_page.product_added_to_bookmarks"),
                        description: t("product_page.you_can_now_see_your_bookmarks"),
                        duration: 5000,
                    })
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: t("global.error"),
                        description: t("global.error_occured"),
                        duration: 5000,
                    })
                },
                onFinish: () => setBookmarkLoading(false),
            })
        }
    }

    const addToCart = () => {
        setAddingToCartLoading(true);
        router.post(route('cart_item.store'), {
            product_id: product?.id,
            quantity: qte,
            product_price_id: currectPrice?.id,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: t("product_page.product_added_to_cart"),
                    description: t("product_page.you_can_now_see_your_cart"),
                    duration: 5000,
                    action: <Link href="/cart"><Button variant="outline" className="hover:bg-gray-50"><TbExternalLink className="w-5 h-5" /></Button></Link>
                })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: t("global.error"),
                    description: t("global.error_occured"),
                    duration: 5000,
                })
            }
            , onFinish: () => {
                setAddingToCartLoading(false);
            }
        });
    }


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={product?.name + " | " + t("layout.navbar.title")} />
                <meta name="description" content={
                    i18n.language === "fr" ?
                        product?.description
                        :
                        product?.description_ar
                } />
                <meta property="og:description" content={
                    i18n.language === "fr" ?
                        product?.description
                        :
                        product?.description_ar
                } />
                <meta property="og:image" content={selectedImage} />
                <meta property="og:title" content={product?.name} />

                <meta property="twitter:description" content={
                    i18n.language === "fr" ?
                        product?.description
                        :
                        product?.description_ar
                } />
                <meta property="twitter:image" content={selectedImage} />
                <meta property="twitter:title" content={product?.name} />

            </Head>
            <div className="container mx-auto px-5 pt-2 py-0 bg-white mt-10 font-sans rtl:font-arabic">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row justify-center items-start gap-6">
                        <div className="w-full md:w-auto">
                            <div
                                className="w-full md:w-96 h-96 flex flex-col items-center justify-center relative border-2 border-gray-200 bg-cover bg-center cursor-pointer"
                                style={{
                                    backgroundImage: `url(${selectedImage})`,
                                }}
                                onClick={() => setShowImageSlider(!showImageSlider)}
                            >
                                {/* <img
                                    className="w-full md:w-96 md:h-96  border-2 border-gray-200 "
                                    src={`/storage/${selectedImage}`}
                                    alt="Workflow"
                                /> */}
                                <div className="absolute top-0 right-0 flex items-center justify-center gap-2">
                                    <button className="flex items-center justify-center gap-2 p-2 " onClick={() => setShowImageSlider(!showImageSlider)}>
                                        <AiOutlineZoomIn className="w-6 h-6 text-gray-900" />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-96 my-1">
                                <Swiper
                                    modules={[Scrollbar]}
                                    spaceBetween={5}
                                    slidesPerView={3}
                                    scrollbar={{ draggable: true }}
                                    className=" md:h-[140px]"
                                >
                                    {product?.images
                                        .map((item: any, index: number) => (
                                            <SwiperSlide
                                                key={index}
                                                className="flex justify-center items-center cursor-pointer"
                                                onClick={() => setSelectedImage(item.path)}
                                            >
                                                <div
                                                    className={`h-32 shrink-0 snap-center flex flex-col items-center justify-start bg-cover bg-center ${selectedImage === item.path ? 'border-2 border-primary' : 'border-2 border-gray-200'}`}
                                                    style={{
                                                        backgroundImage: `url(${item.path})`,
                                                    }}
                                                >
                                                    {/* <img
                                                        className="border-2 border-gray-200 "
                                                        src={`/storage/${item.path}`}
                                                        alt="Workflow"
                                                    /> */}
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full md:w-[600px]">
                            <div className="flex justify-between w-full font-bold mb-2">
                                <p className="text-gray-900 text-center md:text-left text-sm lg:tex">
                                    {product?.name}
                                </p>
                                <p className="w-20 text-gray-900 text-center text-sm lg:tex">
                                    {getMinPrice(product?.active_product_prices)?.price} {t("global.da")}
                                </p>
                            </div>
                            <hr className="w-full rounded-sm border-gray-400" />
                            <div className="flex justify-between w-full mt-2">
                                <div className="text-gray-700 text-sm lg:tex">
                                    {(i18n.language === "fr") ? product?.description : product?.description_ar
                                        .split('\n').map((item: any, index: number) => (
                                            <p key={index}>{item}</p>
                                        ))}
                                </div>

                            </div>
                            {/* CATEGORY */}
                            <div className="w-full flex flex-row justify-start items-center mt-5 gap-2">
                                {product?.categories.map((category: any, index) => (
                                    <p key={index} className="px-2 py-1 rounded-sm text-xs font-medium text-white uppercase bg-gray-600">{i18n.language === "fr" ? category.name : category.name_ar}</p>
                                ))}
                            </div>
                            {isClient() && (
                                <div className='flex justify-between items-center w-full'>
                                    <p className="text-gray-900 text-xs font-bold md:text-sm lg:tex">
                                        {t("product_page.add_to_bookmarks")}
                                        {/* Ajouter aux Signets */}
                                    </p>
                                    <Button
                                        variant="ghost"
                                        className="hover:bg-gray-50"
                                        onClick={() => handleBookmark()}
                                    >
                                        {bookmarkLoading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : product?.isProductBookmarked ? <RiBookmarkFill className="w-4 h-4 text-gray-900" /> : <RiBookmarkLine className="w-4 h-4 text-gray-900" />}
                                    </Button>
                                </div>
                            )}
                            <Separator className="w-full mt-2" />
                            <p className="w-full mt-2 text-gray-800 text-left rtl:text-right text-xs font-bold md:text-sm lg:text-base">
                                {t("product_page.product_price")}:
                            </p>
                            <div className="w-full  grid grid-cols-3 my-2 gap-2">
                                {product?.active_product_prices.sort((a: any, b: any) => a.quantity - b.quantity).map((price: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col gap-1 border-2 py-1 px-5  cursor-pointer ${currectPrice?.quantity === price.quantity ? 'border-primary' : 'border-gray-300'}`}
                                        onClick={() => setCurrectPrice(price)}
                                    >
                                        <p className="text-gray-900 text-xs font-medium md:text-sm ">
                                            {price.quantity} {t("units." + price.unit.toLowerCase())}
                                        </p>
                                        <p className="text-gray-400 text-xs font-bold md:text-sm">
                                            {price.price} {t("global.da")}
                                        </p>
                                    </div>
                                ))}

                            </div>

                            {isClient() && (
                                <div className="flex md:flex-col lg:flex-row justify-start items-center w-full gap-3 mt-3">
                                    <div dir="ltr" className="w-52 flex justify-between gap-1 items-center  overflow-hidden">
                                        <div className="w-10 h-10 flex justify-center items-center text-gray-600 border-2 font-bold gap-1 select-none cursor-pointer"
                                            onClick={() => (qte > 1) ? setQte(qte - 1) : setQte(0)} >
                                            <AiOutlineMinus className="w-4 h-4 text-gray-600 select-none cursor-pointer" />
                                        </div>
                                        <div className="w-10 h-10 flex justify-center border-2 items-center text-gray-600 font-bold gap-1">
                                            <input
                                                value={qte}
                                                onChange={(e) => (parseInt(e.target.value) > 0) ? setQte(parseInt(e.target.value)) : setQte(0)}
                                                className="outline-none w-10 h-10 text-center text-gray-700 font-bold text-xs md:text-sm lg:tex"
                                            />
                                        </div>
                                        <div
                                            className="w-10 h-10 flex justify-center items-center text-gray-600 font-bold border-2 gap-1 select-none cursor-pointer"
                                            onClick={() => setQte(qte + 1)} >
                                            <AiOutlinePlus className="w-4 h-4 text-gray-600 " />
                                        </div>
                                    </div>
                                    <Button
                                        variant="default"
                                        className="w-full bg-primary text-white rounded-none font-bold text-xs flex justify-between"
                                        onClick={addToCart}
                                    >
                                        <p className="text-xs font-bold md:text-sm lg:tex">
                                            {t("product_page.add_to_cart")}
                                            {/* AJOUTER AU PANIER */}
                                        </p>
                                        {addingToCartLoading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : (
                                            <div className="flex gap-1 text-xs text-gray-300 font-bold">
                                                {currectPrice?.price * qte} {t("global.da")}
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            )}
                            {/* PRODUCT ALREADY IN CART */}
                            {isClient() && product?.isProductInCart && (
                                <div className="flex justify-start items-center w-full">
                                    <p className="text-gray-900 text-xs font-bold md:text-sm lg:tex">
                                        {t("product_page.product_already_in_cart")}
                                        {/* Produit déjà dans le panier */}
                                    </p>
                                    <Link
                                        href="/cart"
                                        className="flex justify-center items-center gap-2"
                                    >
                                        <Button
                                            variant="ghost"
                                            className="hover:bg-gray-50"
                                        >
                                            <TbExternalLink className="w-5 h-5 text-gray-900" />
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {(isAdmin() || isEmployee()) && (
                                <div className="flex justify-start items-center w-full">
                                    {/* EDIT PRODUCT */}
                                    <Link
                                        href={route("product.edit", product?.id)}
                                        className="flex justify-center items-center gap-2"
                                    >
                                        <Button
                                            variant="outline"
                                            className="hover:bg-gray-50 gap-2"
                                        >
                                            <MdEdit className="w-5 h-5 text-gray-900" />
                                            {t("global.edit")}
                                            {/* Modifier */}
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {/* PRODUCT ALREADY IN BOOKMARKS */}

                        </div>
                    </div>

                </div>

            </div>
            <LandingSuggest title={t("product_page.you_may_also_like")} url="/products"
                products={props?.product?.suggestedProducts} />

            {showImageSlider && (
                <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
                    {/* overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" onClick={() => setShowImageSlider(false)}></div>
                    <div className="flex justify-center items-center w-full h-full">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={0}
                            slidesPerView={1}
                            initialSlide={product?.images?.findIndex((item: any) => selectedImage === item.path)}
                            navigation

                        >
                            {product?.images?.map((item: any, index: number) => (
                                <SwiperSlide key={index} className="my-auto">
                                    <div
                                        className="w-full h-full flex justify-center items-center"
                                    >
                                        <img
                                            src={item.path}
                                            alt="Workflow"
                                            className="w-full md:w-auto my-auto md:h-128 object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>
            )}
        </>
    );
}

Product.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Product;
