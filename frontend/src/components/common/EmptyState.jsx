export const EmptyState = ({ icon: Icon, message }) => (
  <div className="relative mt-12">
    {/* Shadow Layer */}
    <div
      aria-hidden="true"
      className="absolute inset-0 translate-x-2 translate-y-2 bg-[#2a2d35] dark:bg-[#0f1419] transition-transform"
    />

    {/* Main Card */}
    <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-10 text-center flex flex-col items-center justify-center transition-all">
        <Icon className="w-10 h-10 text-[#1a1f2e]" />
      <p className=" text-xl font-bold text-[#1a1f2e] dark:text-white">
        {message}
      </p>
    </div>
  </div>
);
