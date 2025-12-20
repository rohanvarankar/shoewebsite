"use client";

export default function SignIn() {
  /**
   * WHY normal <a> tag?
   * - OAuth needs full page redirect
   * - fetch / axios WILL NOT WORK
   */
  return (
    <div className="flex min-h-screen items-center justify-center">
      <a
        href="http://localhost:5000/auth/google"
        className="px-6 py-3 bg-black text-white rounded-lg text-lg"
      >
        Login with Google
      </a>
    </div>
  );
}
