import { Link, Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/shadcn/ui/button'
import LandingMainLayout from '@/Layouts/landing/mainLayout';
import { Separator } from '@/shadcn/ui/separator';
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

// Icons
import { TbTruckDelivery } from 'react-icons/tb';
import { GiReceiveMoney, GiReturnArrow } from 'react-icons/gi';
import { BiSupport } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';


// export default function Welcome(Props: PageProps<{ laravelVersion: string, phpVersion: string }>) {

const Home = ({ ...props }) => {
    console.log(props)

    const { t, i18n } = useTranslation()
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
            <div className="w-full md:h-128" >
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                >
                    {props?.pinned_products?.map((product, index) => (
                        <SwiperSlide key={index}>
                            {/* Wallpaper For Information */}
                            <div className="md:h-128 py-10 bg-cover bg-center text-gray-50 font-serif" style={{ backgroundImage: "url(/image/wallpaper.avif)" }}
                            >
                                <div className="container flex flex-col md:flex-row items-center justify-center md:justify-around gap-5 select-none">
                                    <div className="flex flex-col md:justify-centers items-center  text-center">
                                        <h1 className="text-2xl md:text-5xl md:pl-4 text-white" style={{ textShadow: "0 0 10px #000" }}>
                                            {product.name}
                                        </h1>
                                        <p className="text-sm font-sans rtl:font-arabic mt-5 text-gray-100 text-center" style={{ textShadow: "0 0 10px #000" }}>
                                            {i18n.language === "fr" ? product.description : product.description_ar}
                                        </p>
                                        <Link href={`/products/${product.id}`}>
                                            <Button variant="default" className="mt-5 w-44 text-gray-900 hover:text-third bg-prime border-2 border-prime font-sans rtl:font-arabic  ">
                                                {t('product_page.view_product')}
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className=" ">
                                        <img src={product.main_image.path} alt=""
                                            className="landingImageRadius p-5 h-52 md:h-80  object-cover shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="w-full p-1 px-5 sm:px-1 h-32 flex md:hidden justify-center items-center bg-forth uppercase">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    breakpoints={
                        {
                            320: {
                                slidesPerView: 2,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }
                    }
                >
                    <SwiperSlide>
                        <div className='flex items-center px-2 gap-2'>
                            <div className=' bg-white rounded-full p-2'>
                                <GiReceiveMoney className="w-7 h-7 text-gray-900" />
                            </div>
                            <p className="text-gray-100 text-xs font-medium font-sans">
                                Paiement <br />à la livraison
                            </p>
                        </div>
                        <Separator orientation="vertical" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex items-center px-2 gap-2'>
                            <div className=' bg-white rounded-full p-2'>
                                <TbTruckDelivery className="w-7 h-7 text-gray-900" />
                            </div>
                            <p className="text-gray-100 text-xs font-medium font-sans">
                                LIVRAISON <br />
                                58 WILAYAS
                            </p>
                        </div>
                        <Separator orientation="vertical" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex items-center px-2 gap-2'>
                            <div className='bg-white rounded-full p-2'>
                                <BiSupport className="w-7 h-7 text-gray-900" />
                            </div>
                            <p className="text-gray-100 text-xs font-medium font-sans">
                                Service Client <br />
                                A L'ECOUTE
                            </p>
                        </div>
                        <Separator orientation="vertical" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='flex items-center px-2 gap-2'>
                            <div className='bg-white rounded-full p-2'>
                                {/* Add an icon related to your additional information */}
                                <GiReturnArrow className="w-7 h-7 text-gray-900" />
                            </div>
                            <p className="text-gray-100 text-xs font-medium font-sans">
                                {/* Add your return policy information here */}
                                Politique de Retour <br />
                                Retours faciles sous 30 jours
                            </p>
                        </div>
                    </SwiperSlide >
                </Swiper >
            </div>
            <div className='w-full p-1 h-32 hidden md:flex justify-center items-center bg-forth uppercase'>
                <div className="container h-10 md:flex justify-center items-center space-x-4 text-sm">
                    <div className='flex items-center px-2 gap-2'>
                        <div className=' bg-third rounded-full p-2'>
                            <GiReceiveMoney className="w-7 h-7 text-gray-900" />
                        </div>
                        <p className="text-third text-xs font-medium font-sans">
                            Paiement <br />à la livraison
                        </p>
                    </div>
                    <Separator orientation="vertical" />
                    <div className='flex items-center px-2 gap-2'>
                        <div className=' bg-third rounded-full p-2'>
                            <TbTruckDelivery className="w-7 h-7 text-gray-900" />
                        </div>
                        <p className="text-third text-xs font-medium font-sans">
                            LIVRAISON <br />
                            58 WILAYAS
                        </p>
                    </div>
                    <Separator orientation="vertical" />
                    <div className='flex items-center px-2 gap-2'>
                        <div className='bg-third rounded-full p-2'>
                            <BiSupport className="w-7 h-7 text-gray-900" />
                        </div>
                        <p className="text-third text-xs font-medium font-sans">
                            Service Client <br />
                            A L'ECOUTE
                        </p>
                    </div>
                    <Separator orientation="vertical" />
                    <div className='flex items-center px-2 gap-2'>
                        <div className='bg-third rounded-full p-2'>
                            {/* Add an icon related to your additional information */}
                            <GiReturnArrow className="w-7 h-7 text-gray-900" />
                        </div>
                        <p className="text-third text-xs font-medium font-sans">
                            {/* Add your return policy information here */}
                            Politique de Retour <br />
                            Retours faciles sous 30 jours
                        </p>
                    </div>
                </div>
            </div >
            {/* <LandingSuggest title="Pour vous" /> */}
            <div className="w-full h-128 bg-black bg-contain bg-right bg-no-repeat text-gray-50 font-serif"
                style={{ backgroundImage: "url(/image/about-us/french.png)" }}>
                <div className="container flex flex-col items-start justify-center h-full">
                    <p className="text-2xl md:text-5xl font-bold text-left pt-10">
                        A PROPOS
                    </p>
                    <p className="text-sm md:text-xl text-left pt-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Quisquam, voluptatibus.
                    </p>
                    <Button
                        variant="outline"
                        className="mt-5 w-44 bg-transparent border-2 border-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-100 hover:text-gray-100 active:text-gray-100"
                    >
                        EN SAVOIR PLUS
                    </Button>
                </div>
            </div>

        </>
    );
}

Home.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Home;
