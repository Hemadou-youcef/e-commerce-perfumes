import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { TiMessage } from "react-icons/ti";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/shadcn/ui/button";
import { FiMapPin } from "react-icons/fi";


const shopListMap = [
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25756.8289076338!2d5.423713313769527!3d36.20052091184015!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f3159e3376f43d%3A0x176433fb1ab3deb5!2sRumah%20parfum!5e0!3m2!1sen!2sdz!4v1702723973662!5m2!1sen!2sdz",
]

const AboutUs = ({ ...props }) => {
    const { t, i18n } = useTranslation();
    const [currentShopMap, setCurrentShopMap] = useState<string>(shopListMap[0]);
    return (
        <>

            <div className="w-full md:container md:px-0  font-sans rtl:font-arabic rounded-lg">
                <div className="grid grid-cols-1 items-center">
                    <div className="px-8 w-full  ltr:font-sans rtl:font-arabic">
                        <div className="flex items-center justify-center gap-5 py-5 px-8">
                            <TiMessage className="h-8 w-8 text-gray-900" />
                            <h1 className="text-2xl font-bold text-gray-900 uppercase">
                                {t('about_us_page.title')}
                            </h1>
                        </div>
                        {i18n.language === "fr" ? (
                            <div className="text-gray-900 text-lg font-sans">

                            </div>
                        ) : (
                            <div className="flex justify-center items-center  text-gray-900 text-lg font-arabic text-center">
                                <p className="md:w-1/2">
                                </p>
                            </div>
                        )}
                    </div>
                    {/* LIST OF SHOP LOCATION MAP  */}
                    <div>
                        <div>
                            <div className="flex items-center justify-center gap-5 py-5 px-8 ">
                                <FiMapPin className="h-8 w-8 text-gray-900" />
                                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                                    {t('about_us_page.shop_location')}
                                </h1>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-5 px-8 py-2">
                                <div className="flex items-center justify-center gap-5">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentShopMap(shopListMap[0])}
                                        className={`text-xl border-gray-900 border-b-2  font-sans rtl:font-arabic rounded-none  focus:outline-none focus:ring-0 focus:border-transparent ${currentShopMap === shopListMap[0] ? "text-gray-900 border-gray-900" : "text-gray-400 border-gray-400"}`}
                                    >
                                        {t('about_us_page.shop_1')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <iframe src={currentShopMap} width='100%' height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer"></iframe>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

AboutUs.layout = (page) => <LandingMainLayout children={page} />;
export default AboutUs;
