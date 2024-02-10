import LandingMainLayout from "@/Layouts/landing/mainLayout";
import BookmarkProduct from "@/components/Products/bookmarks/product";
import { Button } from "@/shadcn/ui/button";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FaRegBookmark } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Bookmarks = ({ ...props }) => {
    const [bookmarks, setCartItems] = useState(props?.bookmarks);

    const { t, currentLocale } = useLaravelReactI18n();

    useEffect(() => {
        setCartItems(props?.bookmarks)
    }, [props])
    return (
        <>
            <Head>
                <title>{t('custom.bookmarks_page.title')}</title>
                <meta name="description" content={
                    currentLocale() === "fr" ?
                        "Découvrez notre liste de signets"
                        :
                        "تعرف على قائمة إشاراتك المرجعية"
                } />
            </Head>
            <div className="flex items-center justify-center gap-5 py-5 px-8 border-b border-gray-300 font-sans rtl:font-arabic">
                <FaRegBookmark className="h-8 w-8 text-gray-900" />
                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                    {t('custom.bookmarks_page.title')}
                    {/* Mon Signets */}
                </h1>
            </div>
            <div className="container border-2 mx-auto px-4 my-5 bg-white font-sans rtl:font-arabic">

                <div className="rounded-lg sticky">

                    <div className="px-8 w-full">
                        {bookmarks.map((item, index) => (
                            <BookmarkProduct key={index} product={item} />
                        ))}
                    </div>
                    {bookmarks.length === 0 && (
                        <p className="text-gray-600 text-2xl text-center my-8">
                            {t('custom.bookmarks_page.empty_bookmarks')}
                            {/* Notre liste de signets est vide */}
                        </p>
                    )}

                </div>
            </div>
        </>
    );
}

Bookmarks.layout = (page) => <LandingMainLayout children={page} />;
export default Bookmarks;
