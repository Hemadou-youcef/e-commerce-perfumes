

// Components
import LandingNav from "@/components/landing/landingNav";
import LandingFooter from "./footer/footer";
import { Button } from "@/shadcn/ui/button";



const LandingMainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex-col md:flex min-h-screen">
                <div className="" style={{ backgroundColor: "#f5f5f5" }}>
                    <div className="navElements border-b-2 border-b-gray-500">
                        <LandingNav />
                    </div>
                    {/* Wallpaper For Information */}
                    <div className="py-10 mx-full bg-cover bg-center font-serif"
                    >
                        <div className="h-96 container flex items-center justify-around">
                            <div className="flex flex-col ">
                                <h1 className="md:text-6xl pl-4  text-primary">COCO EAU DE PARFUM</h1>
                                <p className="md:text-base text-primary mt-5 text-gray-400">
                                    CHANEL has always entrust black with an essentrial role: to highlight a women
                                </p>
                                <Button variant="outline" className="mt-5 w-44 bg-transparent border-2 border-gray-900 hover:bg-gray-200 active:bg-gray-300 text-gray-900 hover:text-gray-900 active:text-gray-900">
                                    BUY NOW
                                </Button>
                            </div>
                            <div className=" ">
                                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/370087658_1076648240174958_48487877131900853_n.png?_nc_cat=104&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHLbGn477Zo-tECgQyfMXCwLHXfZBQUaAUsdd9kFBRoBct3-rb67M-StzTG2xp-VH4EOPHv2xvaYsBJ1h9hCG7_&_nc_ohc=XLk9N66zFuYAX8iuxkD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSHigKSY5Wr1xqC7zyLN-aeZWOmtKk8OXmtqeRmaMjF1A&oe=65721E0B"
                                className="landingImageRadius p-5 h-80 w-5h-80 object-cover shadow-md"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                <div>

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