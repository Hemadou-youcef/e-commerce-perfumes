
import React, { useState, useEffect } from "react";
import { Payment, columns } from "@/components/orders/columns"
import { DataTable } from "../components/orders/data-table"
import DashboardMainLayout from "@/Layouts/dashboard/mainLayout";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "123abc45",
            amount: 75,
            status: "processing",
            email: "john@example.com",
        },
        {
            id: "987xyz01",
            amount: 50,
            status: "failed",
            email: "susan@example.com",
        },
        {
            id: "555lmn88",
            amount: 125,
            status: "pending",
            email: "jane@example.com",
        },
        {
            id: "abc789xyz",
            amount: 30,
            status: "success",
            email: "peter@example.com",
        },
        // Add more entries as needed
    ]

}


// Define a placeholder loading state while data is being fetched.
const LoadingComponent = () => (
    <div className="container mx-auto py-10">Loading...</div>
);

export default function Orders() {
    const [data, setData] = useState<Payment[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch data from your API here.
                const result = await getData();
                setData(result);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setData([]); // Set data to an empty array or handle the error as needed.
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <DashboardMainLayout>
                {data === null ? (
                    <LoadingComponent />
                ) : data.length > 0 ? (
                    <div className="container mx-auto py-10">
                        <DataTable columns={columns} data={data} />
                    </div>
                ) : (
                    <div className="container mx-auto py-10">No data available.</div>
                )}
            </DashboardMainLayout>
        </div>
    );
}