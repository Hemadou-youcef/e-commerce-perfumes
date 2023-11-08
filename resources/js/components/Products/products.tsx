import Product from "./Product/product";

const Products = () => {
    return (
        <>
            <div className="grid grid-cols-2 gap-0  sm:grid-cols-4 px-0 lg:px-7 xl:px-36 content-center">
                <div className="flex flex-col items-center justify-center p-2">
                    <Product />
                </div>
                <div className="flex flex-col items-center justify-center p-2">
                    <Product />
                </div>
                <div className="flex flex-col items-center justify-center p-2">
                    <Product />
                </div>
                <div className="flex flex-col items-center justify-center p-2">
                    <Product />
                </div>
            </div>


        </>
    );
}

export default Products;