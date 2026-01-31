export default function PageHeader({ title, action }) {
  return (
    <div
      className="
        flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between
        mb-6
      "
    >
      {/* TITLE */}
      <div>
        <h1
          className="
            text-2xl sm:text-3xl font-bold
            text-gray-800
            tracking-tight
          "
        >
          {title}
        </h1>

        {/* subtle underline accent */}
        <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600" />
      </div>

      {/* ACTION (Button / Controls) */}
      {action && (
        <div
          className="
            flex items-center gap-3
            self-start sm:self-auto
          "
        >
          {action}
        </div>
      )}
    </div>
  );
}
