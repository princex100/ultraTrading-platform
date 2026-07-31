import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axiosInstance from "../services/axios";

export default function VerifyEmail() {

    const [searchParams] = useSearchParams();

    const [status, setStatus] = useState("loading"); // loading, success, failed


    useEffect(() => {


        const verifyEmail = async () => {

            try {

                const token = searchParams.get("token");
                const email = searchParams.get("email");

                if (!token || !email) {
                    setStatus("failed");
                    return;
                }


                await axiosInstance.post(`/users/verify-email?token=${token}&email=${email}`);
                setStatus("success");


            } catch (error) {

                console.log("Verification error:", error);
                setStatus("failed");

            }
        };

        // Added a slight delay so user can see the loading state if they wish
        const timeoutId = setTimeout(() => {
            verifyEmail();
        }, 1000);


        return () => clearTimeout(timeoutId);

    }, [searchParams]);
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#111111]">
            <div className="max-w-md w-full bg-white dark:bg-[#1e1e2d] p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
                <div className="text-center mb-6">
                    {status === "loading" && (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Verifying Email...</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Please wait while we verify your email address.
                            </p>
                        </>
                    )}
                    {status === "success" && (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Email Verified</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Your email has been verified successfully. You can now login to your account.
                            </p>
                        </>
                    )}
                    {status === "failed" && (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Verification Failed</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Your email verification link is invalid or has expired.
                            </p>
                        </>
                    )}
                </div>

                {status !== "loading" && (
                    <div className="text-center mt-6">
                        {status === "success" ? (
                            <Link
                                to="/login"
                                className="px-6 py-3 bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold rounded-full transition-colors duration-200 inline-block"
                            >
                                Login Now
                            </Link>
                        ) : (
                            <Link
                                to="/register"
                                className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 inline-block"
                            >
                                Register Again
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}