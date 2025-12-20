'use client'
import { useEffect, useState } from 'react';

export const Splash = () => {
    const [showSecondDiv, setShowSecondDiv] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSecondDiv(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const slideInStyles = {
        transition: 'transform 1s ease-out, opacity 1s ease-out',
        opacity: showSecondDiv ? 1 : 0,
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center space-y-4">
            <div
                style={{
                    ...slideInStyles,
                    transform: showSecondDiv ? 'translateX(0)' : 'translateX(-100%)',
                }}
                className="text-blue-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl antialiased"
            >
                <span className="text-white">Professional </span>
                Shoe-selling
                <span className="text-white"> platform</span>
            </div>
            <div
                style={{
                    ...slideInStyles,
                    transform: showSecondDiv ? 'translateX(0)' : 'translateX(100%)',
                    transitionDelay: '1s',
                }}
                className="text-blue-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium antialiased"
            >
                @ Shoe Store
            </div>
        </div>
    );
}
