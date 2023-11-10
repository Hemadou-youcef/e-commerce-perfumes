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

const Products = () => {
    return (
        <>
            <Swiper
                modules={[Pagination]}
                spaceBetween={5}
                slidesPerView={2}
                pagination={{ clickable: true }}
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 1200px
                    1200: {
                        slidesPerView: 4,
                    },
                }}
            >
                {[0, 1, 2, 3, 4, 5, 6].map((item: number, index: number) => (
                    <SwiperSlide key={index}>
                        <div className="h-96 md:h-112 flex flex-col items-center justify-center p-2">
                            <Product />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper >


        </>
    );
}

export default Products;