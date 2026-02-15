import { NextResponse } from "next/server";
import { getBookingData } from "@/actions/booking";

export async function GET() {
    try {
        console.log("Debug route called");
        const data = await getBookingData();
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Debug route error:", error);
        return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 });
    }
}
