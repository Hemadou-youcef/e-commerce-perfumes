
import { Link, Head, router } from '@inertiajs/react';

// Layouts
import LandingMainLayout from '@/Layouts/landing/mainLayout';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TbBookmark } from 'react-icons/tb';
import LandingSuggest from '@/components/landing/suggest/landingSuggest';

const Product = () => {
    return (
        <>
            <Head title="Perfurms Online" />
            <div className="container mx-auto px-5 pt-2 py-0 bg-white mt-10">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row justify-center items-start gap-6">
                        <div className="grid grid-cols-1 ">
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    className="w-96 h-96  border-2 border-gray-200 "
                                    src="https://scontent.xx.fbcdn.net/v/t1.15752-9/386827449_3477862682473986_2860239670855941125_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHi-EhS0ArWAV7WS5lYCJubNO4oP-Rsnfg07ig_5Gyd-N2yrq0QtPLKW4SH1e39DjXYnIy45L3XnSjNnxzIxDiF&_nc_ohc=HOVgfuCwnaYAX8T0wvj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTkQRgxTO1KetFHr1iEvqD-kKF1KU9NLLyeLvtcKc3__w&oe=657220ED"
                                    alt="Workflow"
                                />
                            </div>
                            <div className="grid grid-cols-3 w-96 h-32 my-1 gap-2">
                                <div className="flex flex-col items-center justify-center ">
                                    <img
                                        className="border-2 border-gray-200 "
                                        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/386827449_3477862682473986_2860239670855941125_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHi-EhS0ArWAV7WS5lYCJubNO4oP-Rsnfg07ig_5Gyd-N2yrq0QtPLKW4SH1e39DjXYnIy45L3XnSjNnxzIxDiF&_nc_ohc=HOVgfuCwnaYAX8T0wvj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTkQRgxTO1KetFHr1iEvqD-kKF1KU9NLLyeLvtcKc3__w&oe=657220ED"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <img
                                        className="border-2 border-gray-200 "
                                        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/386827449_3477862682473986_2860239670855941125_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHi-EhS0ArWAV7WS5lYCJubNO4oP-Rsnfg07ig_5Gyd-N2yrq0QtPLKW4SH1e39DjXYnIy45L3XnSjNnxzIxDiF&_nc_ohc=HOVgfuCwnaYAX8T0wvj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTkQRgxTO1KetFHr1iEvqD-kKF1KU9NLLyeLvtcKc3__w&oe=657220ED"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <img
                                        className="border-2 border-gray-200 "
                                        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/386827449_3477862682473986_2860239670855941125_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHi-EhS0ArWAV7WS5lYCJubNO4oP-Rsnfg07ig_5Gyd-N2yrq0QtPLKW4SH1e39DjXYnIy45L3XnSjNnxzIxDiF&_nc_ohc=HOVgfuCwnaYAX8T0wvj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTkQRgxTO1KetFHr1iEvqD-kKF1KU9NLLyeLvtcKc3__w&oe=657220ED"
                                        alt="Workflow"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                            <div className="flex justify-between w-full font-bold mb-2">
                                <p className="text-gray-900 text-center text-sm lg:tex">
                                    Product Name
                                </p>
                                <p className="text-gray-900 text-center text-sm lg:tex">
                                    100.00 DZD/G
                                </p>
                            </div>
                            <hr className="w-full rounded-sm border-gray-400" />
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
                            <div className="flex justify-start items-center w-full gap-3 mt-3">
                                <div className="flex justify-center gap-1 items-center border-2 rounded-full overflow-hidden">
                                    <input

                                        className="outline-none w-14 h-10 text-right text-gray-700 font-bold text-xs md:text-sm lg:tex"
                                    />
                                    <p className="text-lg text-gray-400 font-bold">
                                        G
                                    </p>
                                    <AiOutlinePlus className="w-4 h-4 text-gray-600 mr-2 cursor-pointer" />
                                </div>
                                <p className="text-gray-700 text-xs font-bold md:text-sm lg:tex">
                                    =
                                </p>
                                <p className="text-lg text-gray-400 font-bold">
                                    100.00 DZD
                                </p>
                            </div>
                            <Button
                                variant="default"
                                className="w-full bg-primary text-white font-bold rounded-full text-xs mt-3"
                            >
                                ADD TO CART
                            </Button>
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
                    <LandingSuggest title="You May Also Like" />
                </div>
            </div>

        </>
    );
}

Product.layout = (page: React.ReactNode) => <LandingMainLayout children={page} showCoverPart={false} />;
export default Product;