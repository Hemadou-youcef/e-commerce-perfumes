
// React 
import { useEffect, useState } from "react";

// Shadcn Components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog"
import { Progress } from "@/shadcn/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/ui/table"
import { Button } from "@/shadcn/ui/button"


const OrderReceptionsSelector = ({ open, setOpen, receptions, setReceptions, reservations, setReservations, productSelected }) => {
    console.log(receptions)
    const [vertualReservations, setVertualReservations] = useState(reservations);
    const [quantityTotalSelected, setQuantityTotalSelected] = useState(vertualReservations.filter((reservation) => reservation?.order_product_id == productSelected?.id).reduce((a, b) => a + b?.quantity, 0));

    console.log("quantityTotalSelected : ", quantityTotalSelected);
    useEffect(() => {
        handleFillQuantityTotalSelected();
        handleFillUsedReceptionsQuantity();
    }, [productSelected, vertualReservations, reservations])

    const handleCompleteReception = (reception) => {
        // FIRST STEP EMPTY THE RECEPTION BY CALLING THE HANDLEEMPTYRECEPTION FUNCTION
        const newReservations = handleEmptyReception(reception);

        // SECOND STEP CALCULATE THE NEEDED QUANTITY AND THE REST QUANTITY
        const needed = productSelected?.total_quantity - quantityTotalSelected;

        console.log('needed', needed, ' and Selected', newReservations.filter((reservation) => reservation?.order_product_id == productSelected?.id).reduce((a, b) => a + b?.quantity, 0), ' and total', productSelected?.total_quantity)
        const rest = reception?.rest_quantity - newReservations.filter((reservation) => reservation?.reception_id == reception?.reception_id).reduce((a, b) => a + b?.quantity, 0);

        // THIRD STEP FILL THE RESERVATIONS WITH THE NEEDED QUANTITY AND CALL THE HANDLEFILLUSEDRECEPTIONSQUANTITY FUNCTION
        if (rest > needed && needed > 0) {
            setVertualReservations([...newReservations, {
                reception_id: reception?.reception_id,
                order_product_id: productSelected?.id,
                quantity: needed,
            }])
        } else if (rest < needed && needed > 0) {
            setVertualReservations([...newReservations, {
                reception_id: reception?.reception_id,
                order_product_id: productSelected?.id,
                quantity: rest,
            }])
        }
        handleFillUsedReceptionsQuantity();
    }

    const handleEmptyReception = (reception) => {
        // EMPTY THE RECEPTION BY DELETING THE RESERVATIONS AND CALLING THE HANDLEFILLUSEDRECEPTIONSQUANTITY FUNCTION
        const newReservations = vertualReservations.filter((reservation) => reservation?.reception_id != reception?.reception_id || reservation?.order_product_id != productSelected?.id);
        setVertualReservations(newReservations);
        handleFillUsedReceptionsQuantity(newReservations);
        console.log('newReservations', newReservations)
        return newReservations;
    }

    const handleFillQuantityTotalSelected = () => {
        // FILL THE QUANTITY TOTAL SELECTED BY SUMMING THE RESERVATIONS QUANTITY OF THE PRODUCT SELECTED
        setQuantityTotalSelected(vertualReservations.filter((reservation) => reservation?.order_product_id == productSelected?.id).reduce((a, b) => a + b?.quantity, 0));
    }

    const handleFillUsedReceptionsQuantity = (newReservations = null) => {
        setReceptions(receptions.map((item) => {
            // IF THE RECEPTION ID IS IN THE RESERVATIONS
            const reservationOfCurrentReception = (newReservations || vertualReservations).filter((reservation) => reservation?.reception_id == item?.reception_id);
            console.log(reservationOfCurrentReception)
            if (reservationOfCurrentReception.length > 0) {
                return {
                    ...item,
                    used_quantity: reservationOfCurrentReception.reduce((a, b) => a + b?.quantity, 0),
                }
            } else {
                return {
                    ...item,
                    used_quantity: 0,
                }
            }
            return item;
        }))
    }

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }



    const handleSaveReceptions = () => {
        setOpen(false);
        setReceptions(receptions.map((item) => {
            return {
                ...item,
                quantity: item?.used_quantity,
                used_quantity: 0,
            }
        }))
        setReservations(vertualReservations);
        // setVertualReservations();
        setQuantityTotalSelected(0);
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className=" sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle>Sélectionner la quantité En Stock</DialogTitle>
                        {/* <DialogDescription>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <AiOutlineCalendar className="text-xl text-gray-800" />
                                <p className="text-sm font-bold text-gray-500">{formatDate(order?.created_at)}</p>
                            </div>
                        </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {productSelected && (
                            <div className="flex flex-row justify-start items-center gap-2 relative">
                                <Progress value={(quantityTotalSelected * 100) / productSelected?.total_quantity} className="h-7 col-span-3 rounded-md bg-gray-300" />
                                <p className="w-full text-sm text-center font-bold text-white px-3 p-1 rounded-md absolute top-0"
                                    style={{
                                        textShadow: "0px 0px 5px rgba(0,0,0,0.5)"
                                    }}
                                >
                                    {quantityTotalSelected}/{productSelected?.total_quantity} {productSelected?.product?.unit}
                                </p>
                                {/* <p className="text-sm font-bold text-gray-500">{quantityTotalSelected} {productSelected?.product?.unit}</p> */}
                            </div>
                        )}
                        <div className="w-full overflow-x-auto">
                            <Table className="min-w-[900px]">
                                <TableHeader>
                                    <TableRow className="bg-gray-100 hover:bg-gray-100 text-center">
                                        <TableHead className="w-20">Reception</TableHead>
                                        <TableHead className="w-48">Date</TableHead>
                                        <TableHead className="w-64">Quantité Sélectionnée</TableHead>
                                        <TableHead className="text-center w-52">Utilisé Stock</TableHead>
                                        <TableHead className="text-center w-52">action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {receptions.filter((reception) => reception?.order_product_id == productSelected?.id).map((reception, index) => (
                                        <TableRow key={index} className="hover:bg-gray-100">
                                            <TableCell className="font-medium text-xs">{reception?.reception_name}</TableCell>
                                            <TableCell className="font-bold text-xs">{formatDate(reception?.reception_date)}</TableCell>
                                            <TableCell className="font-bold text-xs">
                                                <Progress
                                                    className="bg-gray-300"
                                                    value={(reception?.used_quantity * 100) / reception?.rest_quantity}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <p className="col-span-2 min-w-[100px] text-sm text-center font-bold text-white bg-gray-900 px-3 p-1 rounded-md">
                                                    {reception?.used_quantity}/{reception?.rest_quantity}
                                                </p>
                                            </TableCell>
                                            <TableCell className="text-center flex  justify-center items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    className="w-36 col-span-1 p-0 px-5 h-8 font-bold border-gray-400 uppercase"
                                                    onClick={() => handleEmptyReception(reception)}
                                                    disabled={reception?.used_quantity == 0}
                                                >
                                                    Vider
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-36 col-span-1 p-0 px-5 h-8 font-bold border-gray-400 uppercase"
                                                    onClick={() => handleCompleteReception(reception)}
                                                    disabled={(reception?.quantity == reception?.rest_quantity) || (reception?.used_quantity == reception?.rest_quantity) || quantityTotalSelected == productSelected?.total_quantity}
                                                >
                                                    Compléter
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </div>
                    </div>
                    <DialogFooter className="flex  gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => handleSaveReceptions()}

                        >
                            Sauvegarder
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default OrderReceptionsSelector;