

// Libs
import { useTranslation } from "react-i18next";

// Components
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Label } from "@/shadcn/ui/label";
import { Separator } from "@/shadcn/ui/separator";
import { Slider } from "@/shadcn/ui/slider";


// Icons
import { BsSnow2, BsSunFill } from "react-icons/bs";
import { FaCanadianMapleLeaf, FaLeaf } from "react-icons/fa";
import { WiDayHaze } from "react-icons/wi";
import { GiNightSleep } from "react-icons/gi";
import { Button } from "@/shadcn/ui/button";
import { IoMdOptions } from "react-icons/io";

const FiltersOptions = ({ categoriesList, categories, alreadyUsedCategories, setCategories, minMaxPrice, setMinMaxPrice }: any) => {
    const { t, i18n } = useTranslation()
    return (
        <div className="md:w-full flex flex-col items-start justify-start gap-5 font-sans rtl:font-arabic ">
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-gray-800 font-semibold text-xl md:text-xl">
                    {t("products_page.categories")}
                </p>
                <p className="text-gray-800 font-semibold text-base md:text-lg ltr:pl-2 rtl:pr-2">
                    {t('products_page.perfumes')}
                </p>
                <div className="flex justify-center font-semibold items-center gap-2 ltr:pl-6 rtl:pr-6">
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
                        className="text-base md:text-lg cursor-pointer"
                    >
                        Homme
                    </Label>
                </div>
                <div className="flex justify-center font-semibold items-center gap-2  ltr:pl-6 rtl:pr-6">
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
                        className="text-base md:text-lg cursor-pointer"
                    >
                        Femme
                    </Label>
                </div>
                <div className="flex justify-center font-semibold items-center gap-2  ltr:pl-6 rtl:pr-6">
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
                        className="text-base md:text-lg cursor-pointer"
                    >
                        Unisexe
                    </Label>
                </div>

            </div>
            <Separator className="w-full my-2" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-gray-800 font-semibold text-xl md:text-xl">
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
                <p className="text-gray-800 font-semibold text-xl md:text-xl">
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
                <p className="text-gray-800 font-semibold text-xl md:text-xl">
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
                                className="text-base md:text-lg cursor-pointer"
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

export default FiltersOptions