

// Components
import LandingNav from "@/components/landing/landingNav";
import LandingFooter from "./footer/footer";

const LandingMainLayout = ({ children }: { children: React.ReactNode}) => {

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="navElements bg-gray-50 sticky top-0 border-b-2 border-b-gray-500 z-10 shadow-md">
                    <LandingNav />
                </div>

                {/* <div className="h-auto"></div> */}
                <div className="flex-grow">
                    {children}
                </div>
                <LandingFooter />
            </div>
        </>
    );
}

export default LandingMainLayout;