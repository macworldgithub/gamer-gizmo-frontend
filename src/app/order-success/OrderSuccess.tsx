'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrderSuccessPage = () => {
    const searchParams = useSearchParams();
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const paymentIntent = searchParams.get('payment_intent');
    const clientSecret = searchParams.get('payment_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');

    useEffect(() => {
        if (redirectStatus === 'succeeded') {
            setStatusMessage('🎉 Payment successful! Thank you for your order.');
        } else if (redirectStatus === 'failed') {
            setStatusMessage('❌ Payment failed. Please try again.');
        } else {
            setStatusMessage('⚠️ Payment status unknown.');
        }

        setLoading(false);
    }, [redirectStatus]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg shadow-md text-center max-w-md w-full">
                <h1 className="text-2xl font-bold mb-2">Order Status</h1>
                <p className="text-base">{statusMessage}</p>

                {paymentIntent && (
                    <div className="mt-4 text-sm text-gray-600">
                        <p><span className="font-medium">Payment Intent:</span> {paymentIntent}</p>
                        <p><span className="font-medium">Client Secret:</span> {clientSecret?.slice(0, 10)}...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSuccessPage;
