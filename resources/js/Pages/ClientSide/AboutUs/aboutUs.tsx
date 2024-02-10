import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { TiMessage } from "react-icons/ti";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/shadcn/ui/button";
import { FiMapPin } from "react-icons/fi";
import { Head } from "@inertiajs/react";
import { FaMapMarkedAlt } from "react-icons/fa";

const shopListMap = [
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25756.8289076338!2d5.423713313769527!3d36.20052091184015!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f3159e3376f43d%3A0x176433fb1ab3deb5!2sRumah%20parfum!5e0!3m2!1sen!2sdz!4v1702723973662!5m2!1sen!2sdz",
];

const AboutUs = ({ ...props }) => {
    const { t, i18n } = useTranslation();
    const [currentShopMap, setCurrentShopMap] = useState<string>(shopListMap[0]);
    const title = t('about_us_page.title') + " | " + t('layout.navbar.title');
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={
                    i18n?.language === "fr"
                        ? "Découvrez l'histoire captivante de Remah Perfum, une destination de choix pour des parfums exquis et des montres élégantes. Explorez notre passion pour l'élégance et la qualité, et plongez dans un monde de senteurs et de style."
                        : "Explore the captivating story of Remah Perfum, a premier destination for exquisite perfumes and elegant watches. Discover our commitment to elegance and quality, and immerse yourself in a world of scents and style."
                } />
                <meta name="keywords" content={
                    i18n?.language === "fr"
                        ? "parfum, montres, histoire de la marque, parfums de luxe, montres élégantes, qualité, passion, élégance, style, senteurs"
                        : "perfume, watches, brand history, luxury fragrances, elegant watches, quality, passion, elegance, style, scents"
                } />
            </Head>
            <div
                style={{
                    backgroundImage: "url('/image/wallpaper.png')"
                }}
                className="w-full bg-cover bg-center bg-fixed py-5 flex flex-col justify-center items-center text-white"
            >
                <span className="text-white text-xl md:text-3xl font-bold font-sans rtl:font-arabic" style={{ textShadow: "0 0 10px #000" }}>
                    {t('about_us_page.title')}
                </span>
                <div className="container mx-auto text-center font-bold text-sm md:text-lg lg:text-xl leading-8 md:leading-8 lg:leading-10 py-5 rtl:font-arabic ltr:font-sans">
                    {i18n.language === "fr" ? (
                        <span>
                            Le monde des parfums est un monde qui incarne la sophistication, la beauté et la joie, et les parfums de luxe témoignent du caractère unique d'excellents produits.  Rumah  Perfume est une entreprise passionnée qui a été créée, grâce à Dieu, en 2019  , à l'époque de la renaissance des parfums modernes. Depuis les hauts plateaux du nord de mon pays, l'Algérie, nous prenons un chemin pionnier dans le domaine de la vente de l'extrait de parfums et de la fabrication de cosmétiques et d'entretien physique du corps.
                        </span>
                    ) : (
                        <span>
                            عالم العطور ، عالم يجسد الرقي و الجمال والبهجة ، والعطور الفاخرة تدل على تفرد المنتجات الممتازة ؛ الرماح للعطور شركة شغوفة تأسست بفضل الله عام 2019 م في وقت نهضة العطور الحديثة  . من الهضاب العليا شمال بلدي الجزائر نأخذ طريقا رائدا في في مجال بيع العطور الزيتية و صناعة مواد التجميل و التنظيف البدني
                        </span>
                    )}
                </div>
            </div>
            <div className="w-full md:container md:px-0 font-sans rtl:font-arabic rounded-lg bg-white p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    {/* CONTACT INFO */}
                    <div className="md:border-r border-gray-300">
                        <div className="flex items-center justify-center gap-5 py-5 px-8">
                            <TiMessage className="md:h-8 md:w-8 text-gray-900" />
                            <h1 className="text-xs md:text-base lg:text-lg font-bold text-gray-900 uppercase">
                                {t('about_us_page.contact_info')}
                            </h1>

                        </div>
                        <div className="grid grid-cols-1 gap-5 px-2 md:px-8 py-4">
                            {/* FAX */}
                            <div className="flex gap-5">
                                <span className="text-[10px] md:text-xs lg:text-lg font-bold text-gray-900 uppercase w-20 md:w-52">
                                    {t('about_us_page.fax')}
                                </span>
                                <span dir="ltr" className="text-[10px] md:text-xs lg:text-lg font-medium text-gray-900 uppercase">
                                    052 51 93 78
                                </span>
                            </div>
                            {/* PHONE */}
                            <div className="flex gap-5">
                                <span className="text-[10px] md:text-xs lg:text-lg font-bold text-gray-900 uppercase w-20 md:w-52">
                                    {t('about_us_page.phone')}
                                </span>
                                <div dir="ltr" className="flex flex-col gap-2 text-[10px] md:text-xs lg:text-lg font-medium text-gray-900 uppercase">
                                    <span>06 62 07 13 94</span>
                                    <span>06 62 54 13 94</span>
                                    <span>06 62 46 12 94</span>
                                </div>
                            </div>
                            {/* EMAIL */}
                            <div className="flex gap-5">
                                <span className="text-[10px] md:text-xs lg:text-lg font-bold text-gray-900 uppercase w-20 md:w-52">
                                    {t('about_us_page.email')}
                                </span>
                                <span className="text-[10px] md:text-xs lg:text-lg font-medium text-gray-900 uppercase">
                                    parisvip19000@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* LIST OF SHOP LOCATION MAP */}
                    <div>
                        <div className="flex items-center justify-center gap-5 py-5 px-8">
                            <FiMapPin className="md:h-8 md:w-8 text-gray-900" />
                            <h1 className="text-xs md:text-base lg:text-lg font-bold text-gray-900 uppercase">
                                {t('about_us_page.shop_location')}
                            </h1>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-5 px-8 py-2">
                            <div className="flex items-center justify-center gap-5">
                                {shopListMap.map((shop, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        onClick={() => setCurrentShopMap(shop)}
                                        className={`px-2 py-0 text-xs md:text-base lg:p-2 lg:text-xl gap-2 font-sans rtl:font-arabic border border-transparent focus:outline-none focus:ring-0 rounded-md focus:border-transparent ${currentShopMap === shop ? "text-gray-900 border-gray-900" : "text-gray-400 border-gray-400"}`}
                                    >
                                        <FaMapMarkedAlt className="md:h-8 md:w-8" />
                                        <span>
                                            {t('about_us_page.shop')} {index + 1}
                                        </span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-5 md:px-8 py-2">
                            <iframe
                                src={currentShopMap}
                                width="90%"
                                height="450"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className=" rounded-md overflow-hidden"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

AboutUs.layout = (page) => <LandingMainLayout children={page} />;
export default AboutUs;
