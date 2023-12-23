import { Link, Head } from '@inertiajs/react';
import { useContext } from 'react';
import { LoadingContext } from "@/Layouts/landing/mainLayout";
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
import ContactUsForm from '@/components/landing/contanct/contact';


// export default function Welcome(Props: PageProps<{ laravelVersion: string, phpVersion: string }>) {

const Home = ({ ...props }) => {
    const { handleVisit } = useContext(LoadingContext);
    const { t, i18n } = useTranslation()
    const title = t('layout.navbar.home') + " | " + t('layout.navbar.title');
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={
                    i18n.language === "fr" ?
                        "Découvrez un monde de parfums exquis et de montres élégantes chez Rumah Perfum. Explorez notre collection soigneusement sélectionnée de fragrances de luxe et de montres élégantes. Faites vos achats en toute confiance avec une livraison à temps, une couverture étendue sur 58 wilayas et un support client dédié."
                        :
                        "اكتشف عالمًا من العطور الفاخرة والساعات الأنيقة في Rumah Perfum. استكشف مجموعتنا المختارة بعناية من العطور الفاخرة والأوقات الأنيقة. تسوق بثقة مع التوصيل في الوقت المناسب، وتغطية واسعة عبر 58 ولاية، ودعم العملاء المخصص."
                } />
                <meta name="keywords" content={
                    i18n.language === "fr" ?
                        "parfums, montres, fragrances de luxe, montres élégantes, livraison à temps, 58 wilayas, support client, achats en ligne, Rumah Perfum"
                        :
                        "عطور، ساعات، عطور فاخرة، ساعات أنيقة، توصيل في الوقت المناسب، 58 ولاية، دعم العملاء، تسوق عبر الإنترنت، Rumah Perfum"
                } />
                <meta property="og:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
                <meta property="twitter:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
            </Head>

            <div
                className="w-full h-full bg-cover bg-fixed bg-center bg-no-repeat text-gray-50 font-serif"
                style={{ backgroundImage: "url(/image/main-wallpaper.jpg)" }}
            >
                <div className="w-full md:h-128 text-gray-50 font-serif"
                >
                    {props?.pinned_products?.length != 0 && (
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 10000 }}
                            className="h-full"
                        >
                            {props?.pinned_products?.map((product, index) => (
                                <SwiperSlide key={index} className="h-full">
                                    {/* Wallpaper For Information */}
                                    <div className="h-128 flex justify-center items-center py-10 bg-cover bg-fixed bg-center text-gray-50 font-serif "
                                    >
                                        <div className="w-full py-10 h-128 md:h-fit bg-[#11182770]">
                                            <div className="container flex flex-col md:flex-row  items-center justify-center md:justify-around gap-5 select-none z-10">
                                                <div className="flex flex-col md:justify-centers items-center  text-center">
                                                    <h1 className="text-xl md:text-5xl md:pl-4  text-white" style={{ textShadow: "0 0 10px #000" }}>
                                                        {product.name}
                                                    </h1>
                                                    <p className="text-xs md:text-sm font-sans rtl:font-arabic mt-5 text-gray-100 text-center" style={{ textShadow: "0 0 10px #000" }}>
                                                        {i18n.language === "fr" ? product.description : product.description_ar}
                                                    </p>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleVisit(`/products/${product.id}`)}
                                                        className="cursor-pointer mt-5 w-44 text-gray-900 bg-prime border-2 border-prime font-sans rtl:font-arabic uppercase text-xs font-bold py-2 px-4 rounded-full  hover:bg-prime hover:text-gray-500 active:bg-yellow-300 active:text-gray-900"
                                                    >
                                                        {t('product_page.view_product')}
                                                    </Button>
                                                </div>
                                                <div className=" ">
                                                    <img src={product?.main_image?.path} alt=""
                                                        className="landingImageRadius p-5 h-52 md:h-60 lg:h-60 xl:h-80  object-cover shadow-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
                <div className="w-full p-1 px-5 sm:px-1 h-32 flex md:hidden justify-center items-center bg-forth uppercase ">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay={{ delay: 5000 }}
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
                        className="ltr:font-sans rtl:font-arabic"
                    >
                        <SwiperSlide>
                            <div className='flex items-center px-2 gap-2'>
                                <div className=' bg-white rounded-full p-2'>
                                    <GiReceiveMoney className="w-7 h-7 text-gray-900" />
                                </div>
                                <p className="text-gray-100 text-xs font-medium ">
                                    {t('layout.navbar.payment')} <br />
                                    {t('layout.navbar.on_delivery')}
                                </p>
                            </div>
                            <Separator orientation="vertical" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='flex items-center px-2 gap-2'>
                                <div className=' bg-white rounded-full p-2'>
                                    <TbTruckDelivery className="w-7 h-7 text-gray-900" />
                                </div>
                                <p className="text-gray-100 text-xs font-medium ">
                                    {t('layout.navbar.delivery')} <br />
                                    {t('layout.navbar.58_wilayas')}
                                </p>
                            </div>
                            <Separator orientation="vertical" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='flex items-center px-2 gap-2'>
                                <div className='bg-white rounded-full p-2'>
                                    <BiSupport className="w-7 h-7 text-gray-900" />
                                </div>
                                <p className="text-gray-100 text-xs font-medium ">
                                    {t('layout.navbar.support')} <br />
                                    {t('layout.navbar.listening')}
                                </p>
                            </div>
                            <Separator orientation="vertical" />
                        </SwiperSlide>
                    </Swiper >
                </div>
                <div className='w-full p-1 h-32 hidden md:flex justify-center items-center bg-forth uppercase ltr:font-sans rtl:font-arabic'>
                    <div className="container h-10 md:flex justify-center items-center space-x-4 text-sm ">
                        <div className='flex items-center px-2 gap-2'>
                            <div className=' bg-third rounded-full p-2'>
                                <GiReceiveMoney className="w-7 h-7 text-gray-900" />
                            </div>
                            <p className="text-third text-xs font-medium ">
                                {t('layout.navbar.payment')} <br />
                                {t('layout.navbar.on_delivery')}
                            </p>
                        </div>
                        <Separator orientation="vertical" />
                        <div className='flex items-center px-2 gap-2'>
                            <div className=' bg-third rounded-full p-2'>
                                <TbTruckDelivery className="w-7 h-7 text-gray-900" />
                            </div>
                            <p className="text-third text-xs font-medium ">
                                {t('layout.navbar.delivery')} <br />
                                {t('layout.navbar.58_wilayas')}
                            </p>
                        </div>
                        <Separator orientation="vertical" />
                        <div className='flex items-center px-2 gap-2'>
                            <div className='bg-third rounded-full p-2'>
                                <BiSupport className="w-7 h-7 text-gray-900" />
                            </div>
                            <p className="text-third text-xs font-medium ">
                                {t('layout.navbar.support')} <br />
                                {t('layout.navbar.listening')}
                            </p>
                        </div>
                    </div>
                </div >
                {/* <LandingSuggest title={t('layout.navbar.for_you')} url="/products" products={props?.for_you_products} /> */}
                <LandingSuggest title={t('layout.navbar.for_you_perfumes')} url="/products/perfumes" products={props?.for_you_perfumes} />
                <LandingSuggest title={t('layout.navbar.for_you_oils')} url="/products/cosmetics" products={props?.for_you_oils} />
                <LandingSuggest title={t('layout.navbar.for_you_accessories')} url="/products/accessories" products={props?.for_you_accessories} />
                {/* CONTACT US FORM */}
                <div className="w-full bg-white py-10">
                    <div className="px-2 md:container">
                        <p className="ltr:ml-5 rtl:mr-5 pb-1 inline text-gray-600 font-bold text-sm md:text-3xl font-serif border-b-2 border-gray-600  ltr:font-sans rtl:font-arabic">
                            {t('contact_page.title')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 my-5 bg-gray-50 font-sans rtl:font-arabic rounded-lg gap-5 border-2">
                            <div className="hidden w-full h-full md:flex flex-col justify-center overflow-hidden">
                                <img
                                    src="/image/contact-us.png"
                                    className="w-full h-full object-cover"
                                    alt="contact us"
                                />
                            </div>
                            <div className="px-8 w-full py-5 ltr:font-sans rtl:font-arabic">
                                <ContactUsForm />
                            </div>
                        </div>
                    </div>
                </div>
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

            </div>
        </>
    );
}

Home.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Home;
