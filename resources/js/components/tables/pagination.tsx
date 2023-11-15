import { Button } from "@/shadcn/ui/button"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import { Link, router } from "@inertiajs/react";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Pagination = ({ meta }) => {


    const visitPage = (page_url) => {
        router.visit(page_url)
    };
    return (
        <div className="flex flex-row justify-between items-center gap-2 mb-5">
            <div className="flex flex-row justify-start items-center gap-2">
                <p className="text-sm font-medium text-gray-600 uppercase">Total: {meta.total}</p>
            </div>
            <div className="flex flex-row justify-end items-center gap-2">
                <Link href={meta?.first_page_url} preserveScroll={false}>
                    <Button
                        variant="outline"
                        className="hidden h-10 w-10 p-0 lg:flex"
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                </Link>
                <Link href={meta?.prev_page_url} preserveScroll={false}>
                    <Button
                        variant="outline"
                        className="h-10 w-10 p-0"
                        disabled={!meta?.prev_page_url}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                </Link>
                {/* {meta.current_page != 1 && meta.current_page != 2 && (
                <div className="flex">
                    <Button> 1 </Button>
                    {meta.current_page != 3 && (<p className="mx-5">...</p>)}
                </div>
            )}
            {meta.current_page != 1 && (
                <Button> {(meta.current_page - 1)} </Button>
            )} */}
                {/* <Input type='number' defaultValue={meta.current_page} onKeyDown={handleKeyPress} w='100px' textAlign='center' /> */}
                {meta.last_page == 1 ? (
                    <Button disabled> {meta.current_page} </Button>
                ) : (
                    <Select onValueChange={(value) => visitPage(value)}>
                        <SelectTrigger className="w-20 h-10">
                            <SelectValue placeholder={meta.current_page.toString()} />
                        </SelectTrigger>
                        <SelectContent>
                            {meta?.links.filter((value,index)=>(index != 0 && index != (meta?.links.length - 1))).map((link,index) => (
                                <SelectItem key={index} value={link?.url}>
                                    {link?.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
                {/* {meta.current_page != meta.last_page && (
                <Button> {(meta.current_page + 1)} </Button>
            )}

            {meta.current_page != meta.last_page && meta.current_page != (meta.last_page - 1) && (
                <div className="flex gap-2">
                    {meta.current_page != (meta.last_page - 2) && (<p className="mx-2 text-xl font-bold">...</p>)}
                    <Button> {meta.last_page} </Button>
                </div>
            )} */}
                <div className="flex items-center space-x-2">
                    <Link href={meta?.next_page_url} preserveScroll={false}>
                        <Button
                            variant="outline"
                            className="h-10 w-10 p-0"
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={meta?.last_page_url} preserveScroll={false}>
                        <Button
                            variant="outline"
                            className="hidden h-10 w-10 p-0 lg:flex"
                        >
                            <span className="sr-only">Go to last page</span>
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Pagination;