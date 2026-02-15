import React from "react";
import { getBookingData } from "@/actions/booking";
import ContactContent from "./ContactContent";

export default async function ContactPage() {
    // Fetch data on the server
    const { doctors, specialties } = await getBookingData();

    // Pass data to the client component
    return (
        <ContactContent doctors={doctors} specialties={specialties} />
    );
}
