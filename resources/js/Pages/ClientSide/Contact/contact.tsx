import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { TiMessage } from "react-icons/ti";
import { useTranslation } from "react-i18next";
import ContactUsForm from "@/components/landing/contanct/contact";

const Contact = ({ ...props }) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="flex items-center justify-center gap-5 py-5 px-8 border-b border-gray-300">
                <TiMessage className="h-8 w-8 text-gray-900" />
                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                    {t('contact_page.title')}
                </h1>
            </div>
            <div className="w-full md:container md:px-0 border-2 my-5 bg-gray-50 font-sans rtl:font-arabic rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
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
        </>
    );
}

Contact.layout = (page) => <LandingMainLayout children={page} />;
export default Contact;
