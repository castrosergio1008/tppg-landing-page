import Link from "next/link";


export default function HeroSection() {
  return (
          <section
            id="home"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          >
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                We transform your home with
                <span className="text-[#7ED957] block">
                  professional painting
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Specialists in residential and commercial painting. We guarantee
                high-quality finishes that exceed your expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#contact"
                  className="bg-[#082A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Request Your Free Quote
                </Link>
                <button className="border-2 border-[#7ED957] text-[#082A37] px-8 py-4 rounded-lg font-semibold hover:bg-[#7ED957] hover:text-white transition-all">
                  See Our Work
                </button>
              </div>
            </div>
          </section>
  );
}
