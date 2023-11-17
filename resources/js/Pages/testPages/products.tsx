import { useState } from "react";

// Component
import LandingMainLayout from "@/Layouts/landing/mainLayout";
import { usePage } from '@inertiajs/react'

import Product from "@/components/Products/Product/product";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Separator } from "@/shadcn/ui/separator";
import { Slider } from "@/shadcn/ui/slider";
import { BsSnow2, BsSunFill } from "react-icons/bs";
import { FaCanadianMapleLeaf, FaLeaf } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { WiDayHaze } from "react-icons/wi";


const Products = () => {
    console.log(usePage().props)

    return (
        <div>

        </div>
    );
}

Products.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Products;
