

// Libs
import { useLaravelReactI18n } from 'laravel-react-i18n';

// Components
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Label } from "@/shadcn/ui/label";
import { Separator } from "@/shadcn/ui/separator";
import { Slider } from "@/shadcn/ui/slider";


// Icons
import { BsSnow2, BsSunFill } from "react-icons/bs";
import { FaCanadianMapleLeaf, FaLeaf } from "react-icons/fa";
import { WiDayHaze } from "react-icons/wi";
import { GiNightSleep, GiWorld } from "react-icons/gi";
import { Button } from "@/shadcn/ui/button";
import { IoMdOptions } from "react-icons/io";
import { Input } from "@/shadcn/ui/input";
import { useState } from "react";

const FiltersOptions = ({ type = "all", categoriesList, categories, alreadyUsedCategories, setCategories, minMaxPrice, setMinMaxPrice }: any) => {
    const [minMaxPriceLocal, setMinMaxPriceLocal] = useState<(string | undefined)[]>([undefined, undefined]);

    const { t, currentLocale } = useLaravelReactI18n();

    return (
        <div className="md:w-full flex flex-col items-start justify-start gap-5 font-sans rtl:font-arabic ">
            <div className="w-full flex flex-col items-start justify-start gap-5">
                <p className="text-gray-800 font-semibold text-base md:text-xl">
                    {t("custom.products_page.categories")}
                </p>
                {(type === "all" || type === "perfumes") && (
                    <div className="flex flex-col items-start justify-start gap-2">
                        <p className="text-gray-800 font-semibold text-sm md:text-lg ltr:pl-2 rtl:pr-2">
                            {t('custom.products_page.perfumes')}
                        </p>
                        <div className="flex justify-center font-semibold items-center gap-2 ltr:pl-6 rtl:pr-6">
                            <Checkbox id="homme"
                                className="rounded-none"
                                onCheckedChange={(checked) => {
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
                                {t("custom.categories.male")}
                            </Label>
                        </div>
                        <div className="flex justify-center font-semibold items-center gap-2 ltr:pl-6 rtl:pr-6">
                            <Checkbox id="femme"
                                className="rounded-none"
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
                                {t("custom.categories.female")}
                            </Label>
                        </div>
                        <div className="flex justify-center font-semibold items-center gap-2 ltr:pl-6 rtl:pr-6">
                            <Checkbox id="unisexe"
                                className="rounded-none"
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
                                {t("custom.categories.unisex")}
                            </Label>
                        </div>
                        <div className="flex justify-center font-semibold items-center gap-2 ltr:pl-6 rtl:pr-6">
                            <Checkbox id="musc"
                                className="rounded-none"
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setCategories((data) => [...data, "musc"])
                                    } else {
                                        setCategories((data) => data?.filter((item) => item !== "musc"));
                                    }
                                }}
                                checked={categories?.includes("musc") ? true : false} />
                            <Label
                                htmlFor="musc"
                                className="text-sm md:text-lg cursor-pointer"
                            >
                                {t("custom.categories.musc")}
                            </Label>
                        </div>
                    </div>
                )}
                {(type === "all" || type === "aromatic_oils") && (
                    <div className="flex flex-col items-start justify-start gap-2">
                        <p className="text-gray-800 font-semibold text-sm md:text-lg ltr:pl-2 rtl:pr-2">
                            {t('custom.products_page.aromatic_oils')}
                        </p>
                        <div className="flex justify-center font-semibold items-center gap-2 ltr:pl-6 rtl:pr-6">
                            <Checkbox id="homme"
                                className="rounded-none"
                                onCheckedChange={(checked) => {
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
                                {t("custom.categories.male")}
                            </Label>
                        </div>
                        <div className="flex justify-center font-semibold items-center gap-2 ltr:pl-6 rtl:pr-6">
                            <Checkbox id="femme"
                                className="rounded-none"
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
                                {t("custom.categories.female")}
                            </Label>
                        </div>
                        <div className="flex justify-center font-semibold items-center gap-2 ltr:pl-6 rtl:pr-6">
                            <Checkbox id="unisexe"
                                className="rounded-none"
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
                                {t("custom.categories.unisex")}
                            </Label>
                        </div>
                    </div>
                )}
                {(type === "all" || type === "accessories") && (
                    <div className="flex flex-col justify-start items-start gap-2">
                        <p className="text-gray-800 font-semibold text-sm md:text-lg ltr:pl-2 rtl:pr-2">
                            {t('custom.products_page.accessories')}
                        </p>
                        <div className="flex justify-center font-semibold items-center gap-2  ltr:pl-6 rtl:pr-6">
                            <Checkbox id="bouteille"
                                className="rounded-none"
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setCategories((data) => [...data, "bouteille"])
                                    } else {
                                        setCategories((data) => data?.filter((item) => item !== "bouteille"));
                                    }
                                }}
                                checked={categories?.includes("bouteille") ? true : false} />
                            <Label
                                htmlFor="bouteille"
                                className="text-sm md:text-lg cursor-pointer"
                            >
                                {t('custom.categories.bottle')}
                            </Label>
                        </div>
                        {/* بخارات */}
                        <div className="flex justify-center font-semibold items-center gap-2  ltr:pl-6 rtl:pr-6">
                            <Checkbox id="vapeurs"
                                className="rounded-none"
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setCategories((data) => [...data, "vapeurs"])
                                    } else {
                                        setCategories((data) => data?.filter((item) => item !== "vapeurs"));
                                    }
                                }}
                                checked={categories?.includes("vapeurs") ? true : false} />
                            <Label
                                htmlFor="vapeurs"
                                className="text-sm md:text-lg cursor-pointer"
                            >
                                {t('custom.categories.vapors')}
                            </Label>
                        </div>

                        {/* الساعات */}
                        <div className="flex justify-center font-semibold items-center gap-2  ltr:pl-6 rtl:pr-6">
                            <Checkbox id="montres"
                                className="rounded-none"
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setCategories((data) => [...data, "montres"])
                                    } else {
                                        setCategories((data) => data?.filter((item) => item !== "montres"));
                                    }
                                }}
                                checked={categories?.includes("montres") ? true : false} />
                            <Label
                                htmlFor="montres"
                                className="text-sm md:text-lg cursor-pointer"
                            >
                                {t('custom.categories.watches')}
                            </Label>
                        </div>
                        {/* نظارات */}
                        <div className="flex justify-center font-semibold items-center gap-2  ltr:pl-6 rtl:pr-6">
                            <Checkbox id="lunettes"
                                className="rounded-none"
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setCategories((data) => [...data, "lunettes"])
                                    } else {
                                        setCategories((data) => data?.filter((item) => item !== "lunettes"));
                                    }
                                }}
                                checked={categories?.includes("lunettes") ? true : false} />
                            <Label
                                htmlFor="lunettes"
                                className="text-sm md:text-lg cursor-pointer"
                            >
                                {t('custom.categories.glasses')}
                            </Label>
                        </div>
                    </div>
                )}


            </div>
            <Separator className="w-full my-2" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-gray-800 font-semibold text-sm md:text-xl">
                    {t("custom.products_page.price")}
                </p>
                <div className="text-sm md:text-base flex justify-center font-semibold items-center gap-2 pl-2 mb-3">
                    {minMaxPriceLocal[0] ? minMaxPriceLocal[0] : 0} - {minMaxPriceLocal[1] ? minMaxPriceLocal[1] : t("custom.global.top_limit")} {t("custom.global.da")}
                </div>
                {/* <Slider
                    defaultValue={[0, 1000]}
                    min={0}
                    max={1000}
                    step={1}
                    onValueChange={(value) => setMinMaxPrice(value)}
                /> */}
                <Input
                    dir="ltr"
                    type="number"
                    placeholder={t("custom.products_page.min_price")}
                    value={minMaxPriceLocal[0]}
                    onChange={(e) => setMinMaxPriceLocal([e.target.value == "" ? undefined : e.target.value, minMaxPriceLocal[1]])}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <Input
                    dir="ltr"
                    type="number"
                    placeholder={t("custom.products_page.max_price")}
                    value={minMaxPriceLocal[1]}
                    onChange={(e) => setMinMaxPriceLocal([minMaxPriceLocal[0], e.target.value == "" ? undefined : e.target.value])}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <Button
                    className="text-sm text-gray-50 hover:text-gray-700 border-0 hover:bg-transparent"
                    onClick={() => setMinMaxPrice(minMaxPriceLocal)}
                >
                    {t("custom.global.apply")}
                </Button>
            </div>
            <Separator className="w-full my-2" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-gray-800 font-semibold text-sm md:text-xl">
                    {t("custom.products_page.seasons")}
                </p>
                {/* ALL THE SESIONS */}
                <div className="flex justify-start font-semibold items-center gap-2 ltr:pl-2 rtl:pr-2">
                    <Checkbox id="all_seasons"
                        className="rounded-none"
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setCategories((data) => [...data, "toutes_saisons"])
                            } else {
                                setCategories((data) => data?.filter((item) => item !== "toutes_saisons"));
                            }
                        }}
                        checked={categories?.includes("toutes_saisons") ? true : false} />
                    <GiWorld className="w-5 h-5" />
                    <Label
                        htmlFor="all_seasons"
                        className="text-sm md:text-lg cursor-pointer"
                    >
                        {t("custom.categories.all_seasons")}
                    </Label>
                </div>
                <div className="flex justify-start font-semibold items-center gap-2 ltr:pl-2 rtl:pr-2">
                    <Checkbox id="hiver"
                        className="rounded-none"
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setCategories((data) => [...data, "hiver"])
                            } else {
                                setCategories((data) => data?.filter((item) => item !== "hiver"));
                            }
                        }}
                        checked={categories?.includes("hiver") ? true : false} />
                    <BsSnow2 className="w-5 h-5" />
                    <Label
                        htmlFor="hiver"
                        className="text-sm md:text-lg cursor-pointer"
                    >
                        {t("custom.categories.winter")}
                    </Label>
                </div>
                <div className="flex justify-start font-semibold items-center gap-2 ltr:pl-2 rtl:pr-2">
                    <Checkbox id="ete"
                        className="rounded-none"
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setCategories((data) => [...data, "ete"])
                            } else {
                                setCategories((data) => data?.filter((item) => item !== "ete"));
                            }
                        }}
                        checked={categories?.includes("ete") ? true : false} />
                    <BsSunFill className="w-5 h-5" />
                    <Label
                        htmlFor="ete"
                        className="text-sm md:text-lg cursor-pointer"
                    >
                        {t("custom.categories.summer")}
                    </Label>
                </div>
                <div className="flex justify-start font-semibold items-center gap-2 ltr:pl-2 rtl:pr-2">
                    <Checkbox id="printemps"
                        className="rounded-none"
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setCategories((data) => [...data, "printemps"])
                            } else {
                                setCategories((data) => data?.filter((item) => item !== "printemps"));
                            }
                        }}
                        checked={categories?.includes("printemps") ? true : false} />
                    <FaLeaf className="w-5 h-5" />
                    <Label
                        htmlFor="printemps"
                        className="text-sm md:text-lg cursor-pointer"
                    >
                        {t("custom.categories.spring")}
                    </Label>
                </div>
                <div className="flex justify-start font-semibold items-center gap-2 ltr:pl-2 rtl:pr-2">
                    <Checkbox id="automne"
                        className="rounded-none"
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setCategories((data) => [...data, "automne"])
                            } else {
                                setCategories((data) => data?.filter((item) => item !== "automne"));
                            }
                        }}
                        checked={categories?.includes("automne") ? true : false} />
                    <FaCanadianMapleLeaf className="w-5 h-5" />
                    <Label
                        htmlFor="automne"
                        className="text-sm md:text-lg cursor-pointer"
                    >
                        {t("custom.categories.autumn")}
                    </Label>
                </div>
            </div>
            <Separator className="w-full my-2" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-gray-800 font-semibold text-sm md:text-xl">
                    {t("custom.products_page.labels")}
                </p>
                <div className="w-full flex flex-col justify-start overflow-y-auto max-h-96 py-2 pb-10 md:pb-2">
                    {categoriesList.filter((category) => !alreadyUsedCategories.includes(category.name.toLowerCase())).map((category, index) => (
                        <div key={index} className="flex justify-start font-semibold items-center gap-2 ltr:pl-2 rtl:pr-2">
                            <Checkbox id={category.name}
                                className="rounded-none"
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
                                {currentLocale() === "fr" ? category.name : category.name_ar}
                            </Label>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default FiltersOptions