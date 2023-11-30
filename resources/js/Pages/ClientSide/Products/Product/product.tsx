
import { Link, Head, router } from '@inertiajs/react';

import { useState } from 'react';

// Layouts
import LandingMainLayout from '@/Layouts/landing/mainLayout';

// Components
import { Button } from '@/shadcn/ui/button';
import { AiOutlineLoading3Quarters, AiOutlineMinus, AiOutlinePlus, AiOutlineZoomIn } from 'react-icons/ai';
import { TbBookmark } from 'react-icons/tb';
import LandingSuggest from '@/components/landing/suggest/landingSuggest';
import { ReloadIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { Separator } from '@/shadcn/ui/separator';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { BsZoomIn } from 'react-icons/bs';


const getMinPrice = (prices: any) => {
    let min = Math.min(...prices.map((price: any) => price.quantity));
    return prices.find((price: any) => price.quantity === min);
}

const Product = ({ ...props }) => {
    console.log(props)
    const [product, setProduct] = useState(props?.product);
    const [selectedImage, setSelectedImage] = useState(product?.images.filter((item: any) => product?.main_image_id === item.id)[0]?.path);
    const [currectPrice, setCurrectPrice] = useState(getMinPrice(product?.product_prices));
    const [qte, setQte] = useState(1);
    const [addingToCartLoading, setAddingToCartLoading] = useState(false);

    const addToCart = () => {
        setAddingToCartLoading(true);
        router.post(route('cart_item.store'), {
            product_id: product?.id,
            quantity: qte,
            product_price_id: currectPrice?.id,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Success')
            },
            onError: () => {
                console.log('Error')
            }
            , onFinish: () => {
                setAddingToCartLoading(false);
            }
        });
    }

    return (
        <>
            <Head title="Perfurms Online" />
            <div className="container mx-auto px-5 pt-2 py-0 bg-white mt-10">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row justify-center items-start gap-6">
                        <div className="grid grid-cols-1 ">
                            <div
                                className="w-full md:w-96 h-96 flex flex-col items-center justify-center relative border-2 border-gray-200 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(/storage/${selectedImage})`,
                                }}
                            >
                                {/* <img
                                    className="w-full md:w-96 md:h-96  border-2 border-gray-200 "
                                    src={`/storage/${selectedImage}`}
                                    alt="Workflow"
                                /> */}
                                <div className="absolute top-0 right-0 flex items-center justify-center gap-2">
                                    <button className="flex items-center justify-center gap-2 p-2 ">
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
                                    className=" md:h-[136px]"
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
                                                        backgroundImage: `url(/storage/${item.path})`,
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
                        <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                            <div className="flex justify-between w-full font-bold mb-2">
                                <p className="text-gray-900 text-center md:text-left text-sm lg:tex">
                                    {product?.name}
                                </p>
                                <p className="text-gray-900 text-center text-sm lg:tex">
                                    {currectPrice?.price} DA/{currectPrice?.unit}
                                </p>
                            </div>
                            <hr className="w-full rounded-sm border-gray-400" />
                            <div className="flex justify-between w-full mt-2">
                                <div className="text-gray-700 text-sm lg:tex">
                                    {product?.description.split('\n').map((item: any, index: number) => (
                                        <p key={index}>{item}</p>
                                    ))}
                                </div>
                            </div>
                            <div className='flex justify-between items-center w-full mt-6'>
                                <p className="text-gray-900 text-xs font-bold md:text-sm lg:tex">
                                    Add To bookmarks
                                </p>
                                <TbBookmark className="w-7 h-7 text-gray-600 mr-2 cursor-pointer" />
                            </div>
                            <Separator className="w-full mt-2" />
                            <p className="w-full mt-2 text-gray-800 text-left text-xs font-bold md:text-sm lg:text-base">
                                Produit Prix :
                            </p>
                            <div className="w-full  grid grid-cols-3 my-2 gap-2">
                                {product?.product_prices.sort((a: any, b: any) => a.quantity - b.quantity).map((price: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col gap-1 border-2 py-1 px-5 text-left cursor-pointer ${currectPrice?.quantity === price.quantity ? 'border-primary' : 'border-gray-300'}`}
                                        onClick={() => setCurrectPrice(price)}
                                    >
                                        <p className="text-gray-900 text-xs font-medium md:text-sm ">
                                            {price.quantity} {price.unit}
                                        </p>
                                        <p className="text-gray-400 text-xs font-bold md:text-sm">
                                            {price.price} DA
                                        </p>
                                    </div>
                                ))}

                            </div>
                            <div className="flex  md:flex-col lg:flex-row justify-start items-center w-full gap-3 mt-3">
                                <div className="w-52 flex justify-between gap-1 items-center border-2 overflow-hidden">
                                    <AiOutlineMinus className="w-4 h-4 text-gray-600 ml-2 cursor-pointer" onClick={() => (qte > 1) ? setQte(qte - 1) : setQte(0)} />
                                    <div className="w-10 h-10 flex justify-center items-center text-gray-600 font-bold gap-1">
                                        <input
                                            value={qte}
                                            onChange={(e) => (parseInt(e.target.value) > 0) ? setQte(parseInt(e.target.value)) : setQte(0)}
                                            className="outline-none w-10 h-10 text-center text-gray-700 font-bold text-xs md:text-sm lg:tex"
                                        />
                                    </div>
                                    <AiOutlinePlus className="w-4 h-4 text-gray-600 mr-2 cursor-pointer" onClick={() => setQte(qte + 1)} />
                                </div>
                                <Button
                                    variant="default"
                                    className="w-full bg-primary text-white rounded-none font-bold text-xs flex justify-between"
                                    onClick={addToCart}
                                >
                                    <p className="text-xs font-bold md:text-sm lg:tex">
                                        ADD TO CART
                                    </p>
                                    {addingToCartLoading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : (
                                        <p className="text-xs text-gray-400 font-bold">
                                            {currectPrice?.price * qte} DA
                                        </p>
                                    )}
                                </Button>
                                {/* <p className="text-gray-700 text-xs font-bold md:text-sm lg:tex">
                                    =
                                </p>
                                <p className="text-lg text-gray-400 font-bold">
                                    100.00 DZD
                                </p> */}
                            </div>

                        </div>
                    </div>
                    {/* REVIEW */}
                    {/* <div className="w-full flex flex-col mt-5">
                        <p className="pb-1 inline text-center text-gray-600 font-bold text-base md:text-3xl font-serif border-b-2 border-gray-600">
                            REVIEWS
                        </p>

                        <div className="flex flex-col mt-4">
                            <div className="text-center text-gray-600 text-xs md:text-sm lg:text-lg">
                                There are no reviews yet.
                            </div>
                        </div>
                    </div> */}
                    {/* YOU MAY ALSO LIKE */}

                </div>
                <LandingSuggest title="You May Also Like" />
            </div>

        </>
    );
}

Product.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Product;