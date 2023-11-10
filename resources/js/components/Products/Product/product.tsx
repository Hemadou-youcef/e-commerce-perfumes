
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { AiFillEye } from "react-icons/ai";
import { TbBookmark } from "react-icons/tb";

const Product = () => {
    return (
        <>
            {/* Link href="/product/5"  */}
            <div className="group w-full flex flex-col items-center justify-center border overflow-hidden shadow-md">
                <div className="w-full h-72  relative bg-cover bg-center border-b"
                    style={{ backgroundImage: "url(https://scontent.xx.fbcdn.net/v/t1.15752-9/370087658_1076648240174958_48487877131900853_n.png?_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHLbGn477Zo-tECgQyfMXCwLHXfZBQUaAUsdd9kFBRoBct3-rb67M-StzTG2xp-VH4EOPHv2xvaYsBJ1h9hCG7_&_nc_ohc=XLk9N66zFuYAX8iuxkD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSHigKSY5Wr1xqC7zyLN-aeZWOmtKk8OXmtqeRmaMjF1A&oe=65721E0B)" }}
                >
                    <Link href="/product/5" className="absolute inset-0 w-full h-full flex items-center justify-center">
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
                    <p className="text-black font-serif text-center text-xs md:text-base lg:text-lg ">
                        COCO CHANEL
                    </p>
                    <p className="text-gray-600 text-center font-bold text-xs md:text-sm lg:text-base ">
                        10.00 DA/G
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