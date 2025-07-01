// pages/privacy-policy.tsx
import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4">
                By signing up, you agree to abide by our terms and conditions. Please read the
                following carefully:
            </p>

            <ul className="list-disc list-inside mb-6 space-y-2">
                <li>You must be at least 18 years old to use our services.</li>
                <li>All personal information provided must be accurate and up to date.</li>
                <li>Users are responsible for maintaining the confidentiality of their account details.</li>
                <li>Any misuse, fraud, or violation of our policies may result in termination of your account.</li>
                <li>We reserve the right to update these terms at any time without prior notice.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Product images uploaded by users</li>
                <li>Camera access when capturing or uploading photos</li>
                <li>Location data (with permission) to enable location-based features</li>
                <li>Basic account details: name, email, and login credentials</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
            <p className="mb-4">
                We use your information to provide and improve our services, personalize your experience,
                and ensure security. We do not sell your personal information to third parties.
            </p>

            <h2 className="text-xl font-semibold mb-2">Permissions</h2>
            <p className="mb-4">
                We request camera and location access only when necessary. You can manage or revoke
                permissions anytime through your device settings.
            </p>

            <h2 className="text-xl font-semibold mb-2">Security</h2>
            <p className="mb-4">
                We take appropriate steps to protect your data, but we cannot guarantee complete security
                over the internet.
            </p>

            <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
            <p className="mb-4">
                We may update this policy from time to time. Any changes will be posted on this page
                with an updated effective date.
            </p>

            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p>
                If you have questions about this Privacy Policy, you can contact us at:{" "}
                <span className="font-medium">support@example.com</span>
            </p>
        </div>
    );
};

export default PrivacyPolicy;
