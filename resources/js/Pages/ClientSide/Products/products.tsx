import { useState } from "react";

// Component
import LandingMainLayout from "@/Layouts/landing/mainLayout";
import Product from "@/components/Products/Product/product";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Separator } from "@/shadcn/ui/separator";
import { Slider } from "@/shadcn/ui/slider";
import { BsSnow2, BsSunFill } from "react-icons/bs";
import { FaCanadianMapleLeaf, FaLeaf } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { WiDayHaze } from "react-icons/wi";
import Pagination from "@/components/tables/pagination";
import { Label } from "@/shadcn/ui/label";
import { router, usePage } from "@inertiajs/react";


const Products = ({ ...props }) => {
    console.log(props)
    const [data, setData] = useState(props?.products?.data)
    const pageProps = usePage().props
    const [minMaxPrice, setMinMaxPrice] = useState<number[]>([0, 1000]);

    const handleUrlChangeParams = (params: any) => {
        // I USE INERTIAJS TO CHANGE URL PARAMS
        
        router.get(route('client_products', params))
    }

    return (
        <>
            <div className="container grid grid-cols-1 md:grid-cols-12 gap-5 mx-auto px-5 pt-2 py-0 bg-white mt-10">
                {/* FILTER SECTION */}
                <div className="md:col-span-3 lg:col-span-2 py-5">
                    <div className="flex md:hidden flex-col items-start justify-start gap-5">

                    </div>
                    <div className="hidden md:flex flex-col items-start justify-start gap-5">
                        <div className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-gray-800 font-semibold font-sans text-sm md:text-lg">
                                Catégorie
                            </p>
                            <p className="text-gray-800 font-semibold font-sans text-sm md:text-lg pl-2">
                                Parfums
                            </p>
                            <div className="flex justify-center font-semibold items-center gap-2 pl-6">
                                <Checkbox id="homme" onCheckedChange={() => handleUrlChangeParams({})} />
                                <Label
                                    htmlFor="homme"
                                    className="text-sm md:text-lg cursor-pointer"
                                >
                                    Homme
                                </Label>
                            </div>
                            <div className="flex justify-center font-semibold items-center gap-2 pl-6">
                                <Checkbox id="femme"/>
                                <Label
                                    htmlFor="femme"
                                    className="text-sm md:text-lg cursor-pointer"
                                >
                                    Femme
                                </Label>
                            </div>
                            <div className="flex justify-center font-semibold items-center gap-2 pl-6">
                                <Checkbox id="unisexe" />
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
                            <p className="text-gray-800 font-semibold font-sans text-sm md:text-lg">
                                Prix
                            </p>
                            <div className="flex justify-center font-semibold items-center gap-2 pl-2 mb-3">
                                {minMaxPrice[0]} - {minMaxPrice[1]} DA/G
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
                            <p className="text-gray-800 font-semibold font-sans text-sm md:text-lg">
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
                            <p className="text-gray-800 font-semibold font-sans text-sm md:text-lg">
                                Étiquette
                            </p>
                            <div className="w-full flex flex-col justify-start overflow-y-auto max-h-96 py-2">
                                <div className="flex justify-start font-semibold items-center gap-2 pl-2">
                                    <Checkbox />
                                    Agrumes
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                {/* PRODUCTS SECTION */}
                <div className="md:col-span-9 lg:col-span-10 p-5  border-gray-300 rounded-sm">
                    <p className="text-gray-800 font-semibold font-sans text-sm md:text-lg">
                        Produits ({props?.products?.total})
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5 justify-items-center">
                        {data.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}

                    </div>
                    <Pagination meta={props?.products} />
                </div>
            </div>
        </>
    );
}

Products.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Products;