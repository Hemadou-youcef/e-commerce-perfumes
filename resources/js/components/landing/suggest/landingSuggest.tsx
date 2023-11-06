import Product from "@/components/Products/Product/product";
import Products from "@/components/Products/products";


const LandingSuggest = ({ title }: { title?: string }) => {
    return (
        <>
            <div className="container mx-auto pt-2 py-0 bg-white ">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-600 text-center font-bold text-2xl">
                        {title}
                    </p>
                    <div className="w-24 h-1 rounded-full mt-2 bg-slate-800"></div>
                </div>
                <div>
                    <Products />
                </div>
            </div>
        </>
    );
}

export default LandingSuggest;