import { useLayoutEffect, useRef, useState } from "react";


// Component
import LandingMainLayout from "@/Layouts/landing/mainLayout";
import Product from "@/components/Products/Product/product";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Separator } from "@/shadcn/ui/separator";
import { Slider } from "@/shadcn/ui/slider";
import Pagination from "@/components/tables/pagination";
import { Label } from "@/shadcn/ui/label";
import { router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Input } from "@/shadcn/ui/input";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/shadcn/ui/sheet"

// Icons
import { BsSnow2, BsSunFill } from "react-icons/bs";
import { FaCanadianMapleLeaf, FaLeaf } from "react-icons/fa";
import { WiDayHaze } from "react-icons/wi";
import { GiNightSleep } from "react-icons/gi";
import { Button } from "@/shadcn/ui/button";
import { IoMdOptions } from "react-icons/io";
import FiltersOptions from "@/components/Products/filtersOptions";


const Products = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState(props?.products?.data)
    const [categoriesList, setCategoriesList] = useState(props?.categories || []);

    const [minMaxPrice, setMinMaxPrice] = useState<number[]>([0, 10000]);
    const [search, setSearch] = useState<string | undefined>(props?.filters?.q || undefined);
    const [delayedSearch, setDelayedSearch] = useState<string | undefined>(props?.filters?.q || undefined);
    const [categories, setCategories] = useState<string[]>(props?.filters?.category.split(","));

    const [loading, setLoading] = useState(false);
    const firstUpdate = useRef(true);

    const { t, i18n } = useTranslation()

    const alreadyUsedCategories = [
        "homme",
        "femme",
        "unisexe",
        "bouteille"
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
        router.get(route("client_products"), {
            q: delayedSearch,
            category: categories?.join(","),
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
            <div className="container grid grid-cols-1 md:grid-cols-12 md:gap-5 mx-auto px-5 pt-2 py-0 bg-white mt-10">
                {/* FILTER SECTION */}
                <div className="md:col-span-3 lg:col-span-2 py-0">
                    <div className="flex md:hidden flex-col items-start justify-start">
                        <Sheet>
                            <SheetTrigger
                                className="flex md:hidden w-52 mx-auto items-center p-0 px-5 h-12  md:h-10 gap-2 rounded-md font-sans rtl:font-arabic border bg-white border-gray-300 shadow-sm"
                            >
                                <IoMdOptions className="h-5 w-5" />
                                <span className="ml-2">{t("products_page.filter")}</span>
                            </SheetTrigger>
                            <SheetContent dir={i18n.dir()} side={i18n.language === "fr" ? "left" : "right"}>
                                <div className="h-[calc(100dvh)] bg-white rounded-tl-md rounded-tr-md overflow-y-auto flex flex-col items-start justify-start gap-5 font-sans rtl:font-arabic  ">

                                    <FiltersOptions
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
                                {t("products_page.search")}
                            </Label> */}
                        <Input
                            id="search"
                            type="text"
                            placeholder={t("products_page.search_placeholder")}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value || undefined);
                            }}
                            className="w-full h-8 sm:h-12 px-2 rounded-md border border-gray-300  py-1 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                        />
                    </div>

                    <div className="text-gray-800 font-semibold text-sm md:text-lg flex items-center gap-1">
                        <span>{t("products_page.products")} (</span>
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
                                {t("products_page.empty")}
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

const filtersOptions = ({ categoriesList, categories, alreadyUsedCategories, setCategories, minMaxPrice, setMinMaxPrice }: any) => {
    const { t, i18n } = useTranslation()
    return (
        <div className="h-screen overflow-y-auto ltr:pr-5 rtl:pl-5 py-7 flex flex-col items-start justify-start gap-5 font-sans rtl:font-arabic">
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-gray-800 font-semibold text-sm md:text-lg">
                    {t("products_page.categories")}
                </p>
                <p className="text-gray-800 font-semibold text-sm md:text-lg pl-2">
                    {t('products_page.perfumes')}
                </p>
                <div className="flex justify-center font-semibold items-center gap-2 pl-6">
                    <Checkbox id="homme" onCheckedChange={(checked) => {
                        if (checked) {
                            setCategories((data) => [...data, "homme"])
                        } else {
                            setCategories((data) => data?.filter((item) => item !== "homme"));
                        }
                    }}
                        checked={categories?.includes("homme") ? true : false} />

                    <Label
                        htmlFor="homme"
                        className="text-sm md:text-lg cursor-pointer"
                    >
                        Homme
                    </Label>
                </div>
                <div className="flex justify-center font-semibold items-center gap-2 pl-6">
                    <Checkbox id="femme"
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setCategories((data) => [...data, "femme"])
                            } else {
                                setCategories((data) => data?.filter((item) => item !== "femme"));
                            }
                        }}
                        checked={categories?.includes("femme") ? true : false} />
                    <Label
                        htmlFor="femme"
                        className="text-sm md:text-lg cursor-pointer"
                    >
                        Femme
                    </Label>
                </div>
                <div className="flex justify-center font-semibold items-center gap-2 pl-6">
                    <Checkbox id="unisexe"
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setCategories((data) => [...data, "unisexe"])
                            } else {
                                setCategories((data) => data?.filter((item) => item !== "unisexe"));
                            }
                        }}
                        checked={categories?.includes("unisexe") ? true : false} />
                    <Label
                        htmlFor="unisexe"
                        className="text-sm md:text-lg cursor-pointer"
                    >
                        Unisexe
                    </Label>
                </div>

            </div>
            <Separator className="w-full my-2" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-gray-800 font-semibold text-sm md:text-lg">
                    {t("products_page.price")}
                </p>
                <div className="flex justify-center font-semibold items-center gap-2 pl-2 mb-3">
                    {minMaxPrice[0]} - {minMaxPrice[1]} {t("global.da")}
                </div>
                <Slider
                    defaultValue={[0, 1000]}
                    min={0}
                    max={1000}
                    step={1}
                    onValueChange={(value) => setMinMaxPrice(value)}
                />
            </div>
            <Separator className="w-full my-2" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-gray-800 font-semibold  text-sm md:text-lg">
                    Saison/jour
                </p>
                <div className="flex justify-start font-semibold items-center gap-2 pl-2">
                    <Checkbox />
                    <BsSnow2 className="w-5 h-5" />
                    Hiver
                </div>
                <div className="flex justify-start font-semibold items-center gap-2 pl-2">
                    <Checkbox />
                    <BsSunFill className="w-5 h-5" />
                    Été
                </div>
                <div className="flex justify-start font-semibold items-center gap-2 pl-2">
                    <Checkbox />
                    <FaLeaf className="w-5 h-5" />
                    Printemps
                </div>
                <div className="flex justify-start font-semibold items-center gap-2 pl-2">
                    <Checkbox />
                    <FaCanadianMapleLeaf className="w-5 h-5" />
                    Automne
                </div>
                <div className="flex justify-start font-semibold items-center gap-2 pl-2">
                    <Checkbox />
                    <WiDayHaze className="w-5 h-5" />
                    Jour
                </div>
                <div className="flex justify-start font-semibold items-center gap-2 pl-2">
                    <Checkbox />
                    <GiNightSleep className="w-5 h-5" />
                    Nuit
                </div>
            </div>
            <Separator className="w-full my-2" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-gray-800 font-semibold text-sm md:text-lg">
                    Étiquette
                </p>
                <div className="w-full flex flex-col justify-start overflow-y-auto max-h-96 py-2">
                    {categoriesList.filter((category) => !alreadyUsedCategories.includes(category.name.toLowerCase())).map((category, index) => (
                        <div key={index} className="flex justify-start font-semibold items-center gap-2 pl-2">
                            <Checkbox id={category.name}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setCategories((data) => [...data, category.name])
                                    } else {
                                        setCategories((data) => data?.filter((item) => item !== category.name));
                                    }
                                }}
                                checked={categories?.includes(category.name) ? true : false} />
                            <Label
                                htmlFor={category.name}
                                className="text-sm md:text-lg cursor-pointer"
                            >
                                {i18n.language === "fr" ? category.name : category.name_ar}
                            </Label>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

Products.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Products;