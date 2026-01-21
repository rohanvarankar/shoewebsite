"use client";
import { useEffect, useState } from "react";

export const Splash = () => {
  const [showSecondDiv, setShowSecondDiv] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondDiv(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const slideInStyles = {
    transition: "transform 1s ease-out, opacity 1s ease-out",
    opacity: showSecondDiv ? 1 : 0,
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 text-center space-y-4 overflow-hidden">
      {/* LINE 1 */}
      <div
        style={{
          ...slideInStyles,
          transform: showSecondDiv
            ? "translateX(0)"
            : "translateX(-100%)",
        }}
        className="
          text-blue-400
          text-xl
          sm:text-2xl
          md:text-4xl
          lg:text-5xl
          xl:text-6xl
          antialiased
          leading-snug
        "
      >
        <span className="text-white">Professional </span>
        Shoe-selling
        <span className="text-white"> platform</span>
      </div>

      {/* LINE 2 */}
      <div
        style={{
          ...slideInStyles,
          transform: showSecondDiv
            ? "translateX(0)"
            : "translateX(100%)",
          transitionDelay: "1s",
        }}
        className="
          text-blue-400
          text-lg
          sm:text-xl
          md:text-3xl
          lg:text-4xl
          xl:text-5xl
          font-medium
          antialiased
        "
      >
        @ Shoe Store
      </div>
    </div>
  );
};
