
export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#C1502E] border-4 border-[#2C1810] dark:border-[#F5E6D3] rotate-12 opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#2C1810] dark:bg-[#F5E6D3] border-4 border-[#2C1810] dark:border-[#F5E6D3] -rotate-12 opacity-10"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#C1502E] border-4 border-[#2C1810] dark:border-[#F5E6D3] rotate-45 opacity-15"></div>
      <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-[#C1502E] -rotate-6 opacity-10"></div>
      <div className="absolute top-10 right-1/3 w-20 h-20 bg-[#C1502E] border-4 border-[#2C1810] dark:border-[#F5E6D3] rotate-[30deg] opacity-10"></div>
    </div>
  );
}
