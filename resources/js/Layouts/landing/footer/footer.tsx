const LandingFooter = () => {
    return (
        <>
            {/* FOOTER FOR PERFUME LANDING PAGE */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold">Perfume Store</h2>
                        <p className="text-sm mt-2">Your destination for the finest fragrances.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="mt-2">
                            <li className="mb-2"><a href="#">Home</a></li>
                            <li className="mb-2"><a href="#">Shop</a></li>
                            <li className="mb-2"><a href="#">About Us</a></li>
                            <li className="mb-2"><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p className="mt-2">
                            123 Perfume Street<br />
                            New York, NY 10001<br />
                            Email: info@perfumestore.com<br />
                            Phone: (123) 456-7890
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 p-2 text-center">
                    &copy; {new Date().getFullYear()} Perfume Store. All rights reserved.
                </div>
            </footer>
        </>
    );
}

export default LandingFooter;