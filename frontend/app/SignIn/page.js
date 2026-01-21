"use client";

export default function SignIn() {
  /**
   * WHY normal <a> tag?
   * - OAuth needs full page redirect
   * - fetch / axios WILL NOT WORK
   */
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center">
        {/* LOGO / BRAND */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-slate-600">
            Sign in to continue shopping premium footwear
          </p>
        </div>

        {/* GOOGLE LOGIN */}
        <a
          href="http://localhost:5000/auth/google"
          className="
            flex items-center justify-center gap-3
            w-full px-6 py-3
            rounded-lg
            bg-indigo-600 text-white
            font-semibold text-lg
            hover:bg-indigo-700
            transition-all duration-200
            shadow-md hover:shadow-lg
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        >
          {/* Google Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.1H42V20H24v8h11.3C33.6 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.2 6.2 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 16.1 19 12 24 12c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.2 6.2 29.4 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.2C29.4 35.4 26.8 36 24 36c-5.2 0-9.5-3.3-11.1-7.9l-6.5 5C9.7 39.7 16.3 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.1H42V20H24v8h11.3c-1.1 3-3.3 5.4-6 7l6.3 5.2C38.8 36.7 44 31.7 44 24c0-1.3-.1-2.6-.4-3.9z"
            />
          </svg>

          <span>Continue with Google</span>
        </a>

        {/* FOOT NOTE */}
        <p className="mt-6 text-sm text-slate-500">
          Secure login powered by Google OAuth
        </p>
      </div>
    </div>
  );
}
