export const EmptyState = ({ icon: Icon, message }) => (
  <div className="relative mt-16 max-w-xl mx-auto">
    {/* Shadow Layer */}
    <div
      aria-hidden="true"
      className="absolute inset-0 translate-x-3 translate-y-3 bg-[#2b1e1a] border-2 border-black transition-transform"
    />

    {/* Main Card */}
    <div
      className="relative border-4 border-black bg-[#FFF7ED] dark:bg-white 
      text-center p-12 flex flex-col items-center justify-center 
      shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 
      hover:shadow-[10px_10px_0_0_rgba(193,80,46,1)] transition-all duration-200"
    >
      <Icon className="w-14 h-14 text-[#C1502E] mb-4" />
      <p className="text-2xl font-extrabold text-[#1a1f2e] dark:text-[#2b1e1a]">
        {message}
      </p>
    </div>

    {/* Label */}
    <div className="absolute -top-6 left-3 bg-[#C1502E] text-white text-sm font-extrabold px-4 py-1 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      EMPTY STATE
    </div>
  </div>
);
