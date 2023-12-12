import LandingMainLayout from "@/Layouts/landing/mainLayout";

const Order = ({ ...props }) => {
    return (
        <>
            <div className="container mx-auto py-10">
                {/* ORDER INFORMATION */}
                <div className="flex flex-row justify-between items-center mb-5">
                    <div className="flex flex-row justify-start items-center gap-2">
                        <p className="text-2xl font-bold text-gray-700">Commande #{props?.order?.id}</p>
                        <p className="text-sm font-medium text-gray-500">({props?.order?.status})</p>
                    </div>
                    <div className="flex flex-row justify-end items-center gap-2">
                        <p className="text-sm font-medium text-gray-500">{props?.order?.created_at}</p>
                    </div>
                </div>
            </div>
        </>
    );
}


Order.layout = (page: React.ReactNode) => <LandingMainLayout children={page} />;
export default Order;