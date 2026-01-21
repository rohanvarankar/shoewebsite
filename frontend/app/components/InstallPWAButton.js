"use client";

import { useEffect, useState } from "react";

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // prevent auto prompt
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  // Hide if not installable or already installed
  if (!deferredPrompt || isInstalled) return null;

  return (
    <button
      onClick={handleInstall}
      className="
        flex items-center gap-2
        px-4 py-2
        rounded-lg
        bg-indigo-600
        text-white text-sm font-semibold
        shadow-md
        hover:bg-indigo-700
        hover:shadow-lg
        active:scale-95
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-indigo-500
      "
      aria-label="Install App"
      title="Install this app"
    >
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
        />
      </svg>

      <span className="hidden sm:inline">Install App</span>
    </button>
  );
}
