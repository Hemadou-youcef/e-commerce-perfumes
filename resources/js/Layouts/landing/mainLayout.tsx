

// Components
import LandingNav from "@/components/landing/landingNav";
import LandingFooter from "./footer/footer";



const LandingMainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex-col md:flex">
                <div className="">
                    <div className="flex items-center">
                        <div className="md:flex items-center justify-center container mx-auto px-0 md:px-6">
                            <LandingNav />
                        </div>
                    </div>
                </div>
                {/* Wallpaper For Information */}
                <div className="h-96 mx-full bg-cover bg-center bg-orange-100"
                    >
                    <div className="h-96 container flex items-center justify-between">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="md:text-4xl font-bold text-primary">Perfurms Online</h1>
                            <p className="md:text-2xl font-bold text-primary">Perfumes, Cosmetics, and more...</p>
                        </div>
                    </div>
                </div>
                {children}

                <div>
                    <LandingFooter />
                </div>
            </div>
        </>
    );
}

export default LandingMainLayout;