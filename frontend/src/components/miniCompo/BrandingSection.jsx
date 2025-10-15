export default function BrandingSection() {
  return (
    <div className="relative isolate w-full">
      {/* Shadow block */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full bg-[#1a1c1e] border-2 border-[#1a1c1eCC] max-h-98"
        style={{ transform: "translate(14px, 14px)" }}
      />

      {/* Content */}
      <section className="relative z-10 bg-[#ffffff] border-0 p-6 md:p-8">
        <div className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-pretty text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1c1e] font-serif">
              <span className="mr-2 text-[#2fbe84]">{">_"}</span>
              Access the Arena
            </h2>
            <p className="text-sm md:text-base text-[#5f6b72] pb-27.5">Authenticate and engage</p>
          </div>

          <ul className="space-y-4 text-[#1a1c1e]">
            {["Secure sessions", "Weekly challenges", "Project collabs"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-block h-2.5 w-2.5 rotate-45 bg-[#2fbe84]" aria-hidden="true" />
                <span className="text-sm md:text-base font-mono">{item}</span>
              </li>
            ))}
          </ul>

          <div className="h-1 w-28 bg-[#2fbe84]" aria-hidden="true" />
        </div>
      </section>
    </div>
  )
}