

// Components
import LandingNav from "@/components/landing/landingNav";
import LandingFooter from "./footer/footer";
import { Button } from "@/shadcn/ui/button";



const LandingMainLayout = ({ children, showCoverPart }: { children: React.ReactNode, showCoverPart?: boolean }) => {

    return (
        <>
            <div className="flex-col md:flex">
                <div className="" style={{ backgroundColor: "#f5f5f5" }}>
                    <div className="navElements border-b-2 border-b-gray-500">
                        <LandingNav />
                    </div>
                    {/* Wallpaper For Information */}
                    {showCoverPart && <div className="py-10 mx-full bg-cover bg-center font-serif"
                    >
                        <div className="h-96 container flex flex-col md:flex-row items-center justify-center md:justify-around gap-5">
                            <div className="flex flex-col justify-start md:justify-centers items-center md:items-start text-center">
                                <h1 className="text-2xl md:text-6xl md:pl-4  text-primary">COCO EAU DE PARFUM</h1>
                                <p className="text-xs md:text-base text-primary mt-5 text-gray-400 text-center">
                                    CHANEL has always entrust black with an essentrial role: to highlight a women
                                </p>
                                <Button variant="outline" className="mt-5 w-44 bg-transparent border-2 border-gray-900 hover:bg-gray-200 active:bg-gray-300 text-gray-900 hover:text-gray-900 active:text-gray-900">
                                    BUY NOW
                                </Button>
                            </div>
                            <div className=" ">
                                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/370087658_1076648240174958_48487877131900853_n.png?_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHLbGn477Zo-tECgQyfMXCwLHXfZBQUaAUsdd9kFBRoBct3-rb67M-StzTG2xp-VH4EOPHv2xvaYsBJ1h9hCG7_&_nc_ohc=XLk9N66zFuYAX8iuxkD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSHigKSY5Wr1xqC7zyLN-aeZWOmtKk8OXmtqeRmaMjF1A&oe=65721E0B"
                                    className="landingImageRadius p-5 h-52 md:h-80  object-cover shadow-md"
                                />
                            </div>

                        </div>
                    </div>}
                </div>

                {/* <div className="h-auto"></div> */}
                {children}
                <div>
                    <LandingFooter />
                </div>
            </div>
        </>
    );
}

export default LandingMainLayout;