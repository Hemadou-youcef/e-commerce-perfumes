
import { Link } from "@inertiajs/react";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

const Product = () => {
    return (
        <>
            <Link href="/product/5" className="w-full flex flex-col items-center justify-center border overflow-hidden cursor-pointer shadow-md">
                <div className="w-full h-40 md:h-60  relative bg-cover bg-center border-b"
                    style={{ backgroundImage: "url(https://scontent.xx.fbcdn.net/v/t1.15752-9/370087658_1076648240174958_48487877131900853_n.png?_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHLbGn477Zo-tECgQyfMXCwLHXfZBQUaAUsdd9kFBRoBct3-rb67M-StzTG2xp-VH4EOPHv2xvaYsBJ1h9hCG7_&_nc_ohc=XLk9N66zFuYAX8iuxkD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSHigKSY5Wr1xqC7zyLN-aeZWOmtKk8OXmtqeRmaMjF1A&oe=65721E0B)" }}
                >
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-3 py-3">
                    <p className="text-gray-600 text-center text-xs md:text-base lg:tex">
                        Product Name
                    </p>
                    <p className="text-gray-600 text-center font-bold text-xs md:text-sm lg:text-smd">
                        100.00 DZD/G
                    </p>
                    {/* ADD REVIEW STARS */}
                    {/* <div className="flex items-center justify-center">
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarFilledIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                    </div> */}

                </div>

            </Link>
        </>
    );
}

export default Product;