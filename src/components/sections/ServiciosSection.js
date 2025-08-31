export default function ServiciosSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Nuestros Servicios de Pintura
        </h2>
        <p className="text-xl text-gray-600">
          Ofrecemos servicios completos de pintura para transformar cualquier
          espacio
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
          <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
            <span className="text-[#082A37] text-3xl font-bold">🏠</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Pintura Interior
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Transformamos tus espacios interiores con colores que reflejan tu
            personalidad y estilo de vida
          </p>
        </div>

        <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
          <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
            <span className="text-[#082A37] text-3xl font-bold">🏢</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Pintura Exterior
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Protegemos y embellecemos el exterior de tu propiedad con pinturas
            de alta resistencia
          </p>
        </div>

        <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
          <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
            <span className="text-[#082A37] text-3xl font-bold">🔧</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Mantenimiento
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Servicios de mantenimiento preventivo y correctivo para mantener tu
            propiedad como nueva
          </p>
        </div>
      </div>
    </div>
  );
}
