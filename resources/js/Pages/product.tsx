
import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';

// Layouts
import LandingMainLayout from '@/Layouts/landing/mainLayout';

// Components
import { Button } from '@/shadcn/ui/button';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineZoomIn } from 'react-icons/ai';
import { TbBookmark } from 'react-icons/tb';
import LandingSuggest from '@/components/landing/suggest/landingSuggest';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
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

const Product = () => {
    const [qte, setQte] = useState(1);

    return (
        <>
            <Head title="Perfurms Online" />
            <div className="container mx-auto px-5 pt-2 py-0 bg-white mt-10">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row justify-center items-start gap-6">
                        <div className="grid grid-cols-1 ">
                            <div className="flex flex-col items-center justify-center relative">
                                <img
                                    className="w-full md:w-96 md:h-96  border-2 border-gray-200 "
                                    src="https://scontent.xx.fbcdn.net/v/t1.15752-9/386827449_3477862682473986_2860239670855941125_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHi-EhS0ArWAV7WS5lYCJubNO4oP-Rsnfg07ig_5Gyd-N2yrq0QtPLKW4SH1e39DjXYnIy45L3XnSjNnxzIxDiF&_nc_ohc=HOVgfuCwnaYAX8T0wvj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTkQRgxTO1KetFHr1iEvqD-kKF1KU9NLLyeLvtcKc3__w&oe=657220ED"
                                    alt="Workflow"
                                />
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
                                    {[0, 1, 2, 3, 4, 5, 6].map((item: number, index: number) => (
                                        <SwiperSlide key={index}>
                                            <div className="shrink-0 snap-center flex flex-col items-center justify-start ">
                                                <img
                                                    className="border-2 border-gray-200 "
                                                    src="https://scontent.xx.fbcdn.net/v/t1.15752-9/386827449_3477862682473986_2860239670855941125_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHi-EhS0ArWAV7WS5lYCJubNO4oP-Rsnfg07ig_5Gyd-N2yrq0QtPLKW4SH1e39DjXYnIy45L3XnSjNnxzIxDiF&_nc_ohc=HOVgfuCwnaYAX8T0wvj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTkQRgxTO1KetFHr1iEvqD-kKF1KU9NLLyeLvtcKc3__w&oe=657220ED"
                                                    alt="Workflow"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                            <div className="flex justify-between w-full font-bold mb-2">
                                <p className="text-gray-900 text-center text-sm lg:tex">
                                    Magnolia dreams come true
                                </p>
                                <p className="text-gray-900 text-center text-sm lg:tex">
                                    10.00 DA/G
                                </p>
                            </div>
                            <hr className="w-full rounded-sm border-gray-400" />
                            {/* ADD REVIEW STARS */}
                            <div className="w-full flex items-center justify-start mt-3">
                                <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                                <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                                <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                                <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                                <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                                <p className='text-gray-700 text-sm ml-2'>
                                    (0) Reviews
                                </p>
                            </div>
                            <div className="flex justify-between w-full mt-2">
                                <p className="text-gray-700 text-sm lg:tex">
                                    Vestibulum tortor quam<br />
                                    Imported<br />
                                    Art.No. 06-7680
                                </p>
                            </div>
                            <div className='flex justify-between items-center w-full mt-6'>
                                <p className="text-gray-900 text-xs font-bold md:text-sm lg:tex">
                                    Add To bookmarks
                                </p>
                                <TbBookmark className="w-7 h-7 text-gray-600 mr-2 cursor-pointer" />
                            </div>
                            <Separator className="w-full mt-2" />
                            <div className="flex  md:flex-col lg:flex-row justify-start items-center w-full gap-3 mt-3">
                                <div className="w-52 flex justify-between gap-1 items-center border-2 overflow-hidden">
                                    <AiOutlineMinus className="w-4 h-4 text-gray-600 ml-2 cursor-pointer" onClick={() => (qte > 1) ? setQte(qte - 1) : setQte(0)} />
                                    <div className="w-10 h-10 flex justify-center items-center text-gray-600 font-bold gap-1">
                                        <input
                                            value={qte}
                                            onChange={(e) => (parseInt(e.target.value) > 0) ? setQte(parseInt(e.target.value)) : setQte(0)}
                                            className="outline-none w-10 h-10 text-right text-gray-700 font-bold text-xs md:text-sm lg:tex"
                                        />
                                        <p className="text-sm text-gray-400 font-bold">
                                            G
                                        </p>
                                    </div>
                                    <AiOutlinePlus className="w-4 h-4 text-gray-600 mr-2 cursor-pointer" onClick={() => setQte(qte + 1)} />
                                </div>
                                <Button
                                    variant="default"
                                    className="w-full bg-primary text-white rounded-none font-bold text-xs flex justify-between"
                                >
                                    <p className="text-xs font-bold md:text-sm lg:tex">
                                        ADD TO CART
                                    </p>
                                    <p className="text-xs text-gray-400 font-bold">
                                        {qte * 10}.00 DA
                                    </p>
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
                    <div className="w-full flex flex-col mt-5">
                        <p className="pb-1 inline text-center text-gray-600 font-bold text-base md:text-3xl font-serif border-b-2 border-gray-600">
                            REVIEWS
                        </p>

                        <div className="flex flex-col mt-4">
                            <div className="text-center text-gray-600 text-xs md:text-sm lg:text-lg">
                                There are no reviews yet.
                            </div>
                        </div>
                    </div>
                    {/* YOU MAY ALSO LIKE */}

                </div>
                <LandingSuggest title="You May Also Like" />
            </div>

        </>
    );
}

Product.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Product;