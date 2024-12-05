"use client";

import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import { ReactNode, useEffect, useState } from 'react';

interface UiProps {
    children: ReactNode
}


const UiLayout = ({ children }: UiProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);


    return (
        loading ? (
            <Loader />
        ) : (
            <div className="min-h-screen h-max bg-white overflow-scroll">
                <Navbar />
                <div>{children}</div>
                <div className="bg-black w-full h-7  z-50 text-white text-center">Footer</div>
            </div>
            // <div className="bg-white flex flex-col min-h-screen">
            //     <Navbar />
            //     {/* Content area that will grow based on children */}
            //     <div className="flex-1">{children}</div>
            //     {/* Footer will always appear after content */}
            //     <div className="bg-black w-full h-7 text-white text-center">Footer</div>
            // </div>
        )
    );

}

export default UiLayout