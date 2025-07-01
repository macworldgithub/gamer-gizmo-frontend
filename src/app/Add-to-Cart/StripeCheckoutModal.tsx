"use client";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const StripeCheckoutForm = ({ onClose }: { onClose: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-success`,
            },
        });

        if (error) {
            console.error(error.message);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="mt-4 w-full bg-purple-600 text-white py-2 rounded"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

export default function StripeCheckoutModal({
    open,
    onClose,
    clientSecret,
}: {
    open: boolean;
    onClose: () => void;
    clientSecret: string;
}) {
    const options = { clientSecret };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogContent>
                {clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                        <StripeCheckoutForm onClose={onClose} />
                    </Elements>
                )}
            </DialogContent>
        </Dialog>
    );
}
