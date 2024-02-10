import { useLayoutEffect, useRef, useState } from "react";

// Component
import LandingMainLayout from "@/Layouts/landing/mainLayout";
import Product from "@/components/Products/Product/product";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/shadcn/ui/sheet"
import Pagination from "@/components/tables/pagination";
import { Head, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Input } from "@/shadcn/ui/input";
import { IoMdOptions } from "react-icons/io";
import FiltersOptions from "@/components/Products/filtersOptions";


const Accessories = ({ ...props }) => {
    const [data, setData] = useState(props?.products?.data)
    const [categoriesList, setCategoriesList] = useState(props?.categories || []);

    const [minMaxPrice, setMinMaxPrice] = useState<(number | undefined)[]>([undefined, undefined]);
    const [search, setSearch] = useState<string | undefined>(props?.filters?.q || undefined);
    const [delayedSearch, setDelayedSearch] = useState<string | undefined>(props?.filters?.q || undefined);
    const [categories, setCategories] = useState<string[]>(props?.filters?.category.split("custom.,"));

    const [loading, setLoading] = useState(false);
    const firstUpdate = useRef(true);

    const { t, currentLocale } = useLaravelReactI18n();
    const languageDir = currentLocale() === "ar" ? "rtl" : "ltr";

    const alreadyUsedCategories = [
        "bouteille",
        "hiver",
        "ete",
        "printemps",
        "automne",
    ]

    // CHECK IF THERE IS CHANGE IN DATA


    // MAKE A DELAYED SEARCH
    useLayoutEffect(() => {
        const getData = setTimeout(() => {
            setDelayedSearch(search);
        }, 500);
        return () => clearTimeout(getData);
    }, [search]);

    // HANDLE FILTERS
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        handleFilter();
    }, [categories, delayedSearch, minMaxPrice]);



    const handleFilter = () => {
        setLoading(true);
        router.get(route("client_accessories"), {
            q: delayedSearch,
            category: categories.join(",").length > 0 ? categories.join(",") : undefined,
            startPrice: minMaxPrice[0],
            endPrice: minMaxPrice[1],
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page: any) => {
                setData(page.props?.products?.data || []);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            }
        });
    }

    return (
        <>
            <Head>
                <title>
                    {t("custom.layout.navbar.accessories") + " | " + t("custom.layout.navbar.title")}
                </title>
                <meta property="og:title" content={t("custom.layout.navbar.accessories") + " | " + t("custom.layout.navbar.title")} />
                <meta name="description" content={
                    currentLocale() === "fr"
                        ? "Explorez la vaste collection de produits de Remah Perfum, allant des parfums exquis aux montres élégantes et bien plus encore. Découvrez la quintessence du raffinement et de la qualité."
                        : "استكشف مجموعة واسعة من منتجات ريما برفيوم، بدءًا من العطور الرائعة إلى الساعات الأنيقة وأكثر. اكتشف جوهر الترف والجودة."
                } />
                <meta name="keywords" content={
                    currentLocale() === "fr"
                        ? "parfum, montres, accessoires, parfums de luxe, montres élégantes, qualité, passion, élégance, style, senteurs"
                        : "عطور, ساعات, اكسسوارات, عطور فاخرة, ساعات أنيقة, جودة, شغف, أناقة, أسلوب, روائح"
                } />
                <meta property="og:description" content={
                    currentLocale() === "fr"
                        ? "Explorez la vaste collection de produits de Remah Perfum, allant des parfums exquis aux montres élégantes et bien plus encore. Découvrez la quintessence du raffinement et de la qualité."
                        : "استكشف مجموعة واسعة من منتجات ريما برفيوم، بدءًا من العطور الرائعة إلى الساعات الأنيقة وأكثر. اكتشف جوهر الترف والجودة."
                } />
                <meta property="twitter:description" content={
                    currentLocale() === "fr"
                        ? "Explorez la vaste collection de produits de Remah Perfum, allant des parfums exquis aux montres élégantes et bien plus encore. Découvrez la quintessence du raffinement et de la qualité."
                        : "استكشف مجموعة واسعة من منتجات ريما برفيوم، بدءًا من العطور الرائعة إلى الساعات الأنيقة وأكثر. اكتشف جوهر الترف والجودة."
                } />
            </Head>
            <div
                style={{
                    backgroundImage: "url('/image/perfumes-page.jpg')"
                }}
                className="w-full bg-cover bg-center bg-fixed h-32 md:h-52 flex justify-center items-center"
            >
                <span className="text-white text-3xl md:text-5xl font-bold font-sans rtl:font-arabic" style={{ textShadow: "0 0 10px #000" }}>
                    {t('custom.layout.navbar.accessories')}
                </span>
            </div>
            <div className="container grid grid-cols-1 md:grid-cols-12 md:gap-5 mx-auto px-5 pt-2 py-0 bg-white mt-10">
                {/* FILTER SECTION */}
                <div className="md:col-span-3 lg:col-span-2 py-0">
                    <div className="flex md:hidden flex-col items-start justify-start">
                        <Sheet>
                            <SheetTrigger
                                className="flex md:hidden w-52 mx-auto items-center p-0 px-5 h-12  md:h-10 gap-2 rounded-md font-sans rtl:font-arabic border bg-white border-gray-300 shadow-sm"
                            >
                                <IoMdOptions className="h-5 w-5" />
                                <span className="ml-2">{t("custom.products_page.filter")}</span>
                            </SheetTrigger>
                            <SheetContent dir={languageDir} side={currentLocale() === "fr" ? "left" : "right"}>
                                <div className="h-[calc(100dvh)] bg-white rounded-tl-md rounded-tr-md overflow-y-auto flex flex-col items-start justify-start gap-5 font-sans rtl:font-arabic  ">

                                    <FiltersOptions
                                        type="accessories"
                                        categoriesList={categoriesList}
                                        categories={categories}
                                        alreadyUsedCategories={alreadyUsedCategories}
                                        setCategories={setCategories}
                                        minMaxPrice={minMaxPrice}
                                        setMinMaxPrice={setMinMaxPrice}
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden md:flex flex-col items-start justify-start gap-5 font-sans rtl:font-arabic mb-5">
                        <FiltersOptions
                            type="accessories"
                            categoriesList={categoriesList}
                            categories={categories}
                            alreadyUsedCategories={alreadyUsedCategories}
                            setCategories={setCategories}
                            minMaxPrice={minMaxPrice}
                            setMinMaxPrice={setMinMaxPrice}
                        />
                    </div>
                </div>
                {/* PRODUCTS SECTION */}
                <div className="md:col-span-9 lg:col-span-10 py-5 flex flex-col gap-3 border-gray-300  rounded-sm font-sans rtl:font-arabic" >
                    {/* SEARCH SECTION */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                        {/* <Label
                                htmlFor="search"
                                className="text-sm md:text-lg cursor-pointer"
                            >
                                {t("custom.products_page.search")}
                            </Label> */}
                        <Input
                            id="search"
                            type="text"
                            placeholder={t("custom.products_page.search_placeholder")}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value || undefined);
                            }}
                            className="w-full h-12 px-2 rounded-md border border-gray-300  py-1 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                        />
                    </div>
                    <div className="text-gray-800 font-semibold text-sm md:text-lg flex items-center gap-1">
                        <span>{t("custom.products_page.products")} (</span>
                        <span>{loading ? <AiOutlineLoading3Quarters className="h-3 w-3 animate-spin" /> : props?.products?.total}</span>
                        <span>)</span>
                    </div>
                    {data.length === 0 ? (
                        <div className="flex flex-col justify-center mb-5">
                            <img
                                src="/image/empty.png"
                                alt="empty"
                                className="w-32 md:w-52 mx-auto"
                            />
                            <p className="text-gray-800 font-semibold text-sm md:text-lg text-center">
                                {t("custom.products_page.empty")}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5 justify-items-center">
                            {data.map((product, index) => (
                                <Product key={index} product={product} />
                            ))}

                        </div>
                    )}
                    <Pagination meta={props?.products} />
                </div>
            </div>
        </>
    );
}

Accessories.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Accessories;