export default function ServiciosSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Our Painting Services
        </h2>
        <p className="text-xl text-gray-600">
          We offer complete painting services to transform any space.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
          <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
            <span className="text-[#082A37] text-3xl font-bold">🏠</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Interior Painting
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We transform your interior spaces with colors that reflect your
            personality and lifestyle.
          </p>
        </div>

        <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
          <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
            <span className="text-[#082A37] text-3xl font-bold">🏢</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Exterior Painting
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We protect and beautify the exterior of your property with
            high-resistance paints.
          </p>
        </div>

        <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
          <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
            <span className="text-[#082A37] text-3xl font-bold">🔧</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Maintenance
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Preventive and corrective maintenance services to keep your
            property like new.
          </p>
        </div>
      </div>
    </div>
  );
}