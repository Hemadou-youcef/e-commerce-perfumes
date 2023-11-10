import { Link, Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/shadcn/ui/button'
import LandingMainLayout from '@/Layouts/landing/mainLayout';
import { Search } from '@/components/dashboard/search';
import LandingSuggest from '@/components/landing/suggest/landingSuggest';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

// export default function Welcome(Props: PageProps<{ laravelVersion: string, phpVersion: string }>) {

const Home = () => {
    const handleTest = () => {
        router.post('/test', {
            name: 'test'
        }, {
            onSuccess: () => {
                console.log('success');
            }
        })
    }
    return (
        <>
            <Head title="Perfurms Online" />
            <div className="w-full md:h-144" >
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                >
                    <SwiperSlide>
                        {/* Wallpaper For Information */}
                        <div className="md:h-144 py-10 bg-cover bg-center text-gray-50 font-serif" style={{ backgroundImage: "url(https://www.gph.com.dz/gph-assets/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9JYTJWNVNTSWhkalZzTUdobGJtUndiM04xWW1FMmN6Tm1aRGh2TW5CcmFUVnNhd1k2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpQWVKcGJteHBibVU3SUdacGJHVnVZVzFsUFNKemJHbGtaWEl0WW1GamEyZHliM1Z1WkMxd2NtOWtkV04wTFRGbE5EUXdOemhoWldZNVlUZ3pNREEyWXpNNFpHUXhOMk0wWW1ReE1tSmhaakV6WmpReFkyTXdZbUZsT0RneU1UbGtaVEZrTVdRNU56Qm1Zak5qT1RNdWFuQm5JanNnWm1sc1pXNWhiV1VxUFZWVVJpMDRKeWR6Ykdsa1pYSXRZbUZqYTJkeWIzVnVaQzF3Y205a2RXTjBMVEZsTkRRd056aGhaV1k1WVRnek1EQTJZek00WkdReE4yTTBZbVF4TW1KaFpqRXpaalF4WTJNd1ltRmxPRGd5TVRsa1pURmtNV1E1TnpCbVlqTmpPVE11YW5CbkJqc0dWRG9SWTI5dWRHVnVkRjkwZVhCbFNTSVBhVzFoWjJVdmFuQmxad1k3QmxRNkVYTmxjblpwWTJWZmJtRnRaVG9LYkc5allXdz0iLCJleHAiOm51bGwsInB1ciI6ImJsb2Jfa2V5In19--de990537cf82107a3b8f388eb4156c85d96ce753/slider-background-product-1e44078aef9a83006c38dd17c4bd12baf13f41cc0bae88219de1d1d970fb3c93.jpg)" }}
                        >
                            <div className="container flex flex-col md:flex-row items-center justify-center md:justify-around gap-5">
                                <div className="flex flex-col md:justify-centers items-center  text-center">
                                    <h1 className="text-2xl md:text-5xl md:pl-4 text-white">COCO EAU DE PARFUM</h1>
                                    <p className="text-xs sans mt-5 text-gray-100 text-center">
                                        CHANEL has always entrust black with an essentrial role: to highlight a women
                                    </p>
                                    <Button variant="outline" className="mt-5 w-44 bg-transparent border-2 border-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-100 hover:text-gray-100 active:text-gray-100">
                                        BUY NOW
                                    </Button>
                                </div>
                                <div className=" ">
                                    <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/370087658_1076648240174958_48487877131900853_n.png?_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHLbGn477Zo-tECgQyfMXCwLHXfZBQUaAUsdd9kFBRoBct3-rb67M-StzTG2xp-VH4EOPHv2xvaYsBJ1h9hCG7_&_nc_ohc=XLk9N66zFuYAX8iuxkD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSHigKSY5Wr1xqC7zyLN-aeZWOmtKk8OXmtqeRmaMjF1A&oe=65721E0B"
                                        className="landingImageRadius p-5 h-52 md:h-80  object-cover shadow-md"
                                    />
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        {/* Wallpaper For Information */}
                        <div className="md:h-144 py-10 bg-cover bg-center text-gray-50 font-serif" style={{ backgroundImage: "url(https://bestwallpapers.in/wp-content/uploads/2018/05/leaves-black-blue-drops-4k-wallpaper-3840x2160.jpg)" }}
                        >
                            <div className="container flex flex-col md:flex-row items-center justify-center md:justify-around gap-5">
                                <div className="flex flex-col justify-start md:justify-centers items-center md:items-start text-center">
                                    <h1 className="text-2xl md:text-6xl md:pl-4 text-white">COCO EAU DE PARFUM</h1>
                                    <p className="text-xs md:text-base mt-5 text-gray-100 text-center">
                                        CHANEL has always entrust black with an essentrial role: to highlight a women
                                    </p>
                                    <Button variant="outline" className="mt-5 w-44 bg-transparent border-2 border-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-100 hover:text-gray-100 active:text-gray-100">
                                        BUY NOW
                                    </Button>
                                </div>
                                <div className=" ">
                                    <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/370087658_1076648240174958_48487877131900853_n.png?_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHLbGn477Zo-tECgQyfMXCwLHXfZBQUaAUsdd9kFBRoBct3-rb67M-StzTG2xp-VH4EOPHv2xvaYsBJ1h9hCG7_&_nc_ohc=XLk9N66zFuYAX8iuxkD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSHigKSY5Wr1xqC7zyLN-aeZWOmtKk8OXmtqeRmaMjF1A&oe=65721E0B"
                                        className="landingImageRadius p-5 h-52 md:h-80  object-cover shadow-md"
                                    />
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <LandingSuggest title="For You" />
            <LandingSuggest title="Best Sellers" />
            <LandingSuggest title="New Arrivals" />
        </>
    );
}

Home.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Home;
