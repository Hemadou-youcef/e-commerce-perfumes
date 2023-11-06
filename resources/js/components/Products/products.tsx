import Product from "./Product/product";

const Products = () => {
    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 p-7 content-center">
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