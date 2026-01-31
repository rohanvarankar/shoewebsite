export default function StatCard({ title, value }) {
  return (
    <div
      className="
        group
        relative
        bg-white
        rounded-2xl
        p-5 sm:p-6
        shadow-md
        hover:shadow-xl
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Gradient Accent */}
      <div
        className="
          absolute inset-x-0 top-0 h-1
          bg-gradient-to-r from-indigo-600 to-purple-600
        "
      />

      {/* Content */}
      <p className="text-sm sm:text-base text-gray-500 font-medium">
        {title}
      </p>

      <h2
        className="
          mt-3
          text-2xl sm:text-3xl lg:text-4xl
          font-bold
          text-gray-800
          tracking-tight
        "
      >
        {value}
      </h2>

      {/* Hover Glow */}
      <div
        className="
          pointer-events-none
          absolute -bottom-10 -right-10
          w-32 h-32
          bg-indigo-500/10
          rounded-full
          blur-2xl
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
        "
      />
    </div>
  );
}
