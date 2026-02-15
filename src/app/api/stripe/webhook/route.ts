import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            console.error("Stripe webhook secret missing");
            return new NextResponse("Webhook Secret Missing", { status: 500 });
        }
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error: any) {
        console.error("Webhook signature verification failed:", error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const appointmentId = session.metadata?.appointmentId;

        if (appointmentId) {
            try {
                await prisma.appointment.update({
                    where: { id: appointmentId },
                    data: { status: "CONFIRMED" },
                });
                console.log(`Appointment ${appointmentId} confirmed`);
            } catch (error) {
                console.error("Error updating appointment:", error);
                return new NextResponse("Database Error", { status: 500 });
            }
        }
    }

    return new NextResponse(null, { status: 200 });
}
