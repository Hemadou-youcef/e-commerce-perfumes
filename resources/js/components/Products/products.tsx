import Product from "./Product/product";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ProductsSwiper = ({ products }) => {
    
    return (
        <>
            {products?.length > 1 ? (
            <Swiper
                modules={[Pagination]}
                spaceBetween={5}
                slidesPerView={products?.length > 2 ? 2 : products?.length}
                pagination={{ clickable: true }}
                className="h-[300px] md:h-[460px] lg:h-[470px]"
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        slidesPerView: products?.length > 2 ? 2 : products?.length,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: products?.length > 3 ? 3 : products?.length,
                    },
                    // when window width is >= 1200px
                    1200: {
                        slidesPerView: products?.length > 5 ? 5 : products?.length,
                    },
                }}
            >
                {products?.map((product, index) => (
                    <SwiperSlide key={index}>
                        <Product product={product} />
                    </SwiperSlide>
                ))}
            </Swiper >
            ) : (
                <div className="w-full">
                    <Product product={products[0]} />
                </div>
            )}
        </>
    );
}

export default ProductsSwiper;