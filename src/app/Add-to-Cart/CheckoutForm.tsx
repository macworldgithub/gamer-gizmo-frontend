import { useState, useEffect } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
    AddressElement
} from '@stripe/react-stripe-js';

interface CheckoutFormProps {
    onSuccess: () => void;
}

const CheckoutForm = ({ onSuccess }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!stripe || !elements) {
            return;
        }
        setIsReady(true);
    }, [stripe, elements]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/order`,
                },
                redirect: 'if_required',
            });

            if (error) {
                setErrorMessage(error.message || 'An error occurred during payment.');
            } else {
                onSuccess();
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred.');
        }

        setIsProcessing(false);
    };

    if (!isReady) {
        return <div>Loading payment form...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
                <PaymentElement
                    options={{
                        layout: 'tabs',
                        defaultValues: {
                            billingDetails: {
                                name: '',
                                email: '',
                                phone: ''
                            }
                        }
                    }}
                />
            </div>

            {errorMessage && (
                <div className="text-red-500 mt-4 text-sm">{errorMessage}</div>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={`w-full mt-4 py-2 px-4 rounded text-white ${isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#6345ED] hover:bg-purple-600'
                    }`}
            >
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default CheckoutForm; 