import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#C1502E] border-4 border-black p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-[#F5E6D3] text-[#F5E6D3]" />
              ))}
            </div>
            <h3 className="text-5xl md:text-6xl font-black text-[#F5E6D3] mb-6">
              READY TO ANSWER<br />THE CALL?
            </h3>
            <p className="text-2xl font-bold text-[#F5E6D3]/90 mb-10 max-w-2xl mx-auto">
              Join hundreds of creative minds building the future, one line of code at a time.
            </p>
            <button onClick={ () => ( navigate('/signup'))}
            className="px-16 py-6 bg-[#F5E6D3] text-[#2C1810] text-2xl font-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all inline-flex items-center gap-4">
              JOIN CALL OF CODE
              <ArrowRight className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
