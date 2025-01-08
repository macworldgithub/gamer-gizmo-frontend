"use client";
import { useState, useRef, FormEvent } from "react";

export default function OtpScreen() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Handle input change
  const handleChange = (value: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move focus to the next input automatically
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keydown for backspace navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length === otp.length) {
      alert(`Entered OTP: ${enteredOtp}`);
    } else {
      alert("Please complete the OTP.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div
        className="bg-white shadow-lg rounded-lg p-8 max-w-3xl
       w-full"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Enter OTP
        </h1>
        <p className="text-center text-gray-500 mb-8">
          We've sent a verification code to your phone.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center gap-3">
            {otp.map((value, index) => (
              <input
                key={index}
                //@ts-ignore
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-custom-gradient text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
