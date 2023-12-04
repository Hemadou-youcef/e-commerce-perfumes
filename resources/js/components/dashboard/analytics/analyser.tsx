
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select"
import { Button } from "@/shadcn/ui/button"
import { CalendarDateRangePicker } from "../date-range-picker";

const Analyser = () => {
    return (
        <>
            <div className="w-full flex justify-between">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker />
                    <Button>
                        Export
                    </Button>
                </div>

            </div>

            <div>


            </div>
        </>
    );
}

export default Analyser;