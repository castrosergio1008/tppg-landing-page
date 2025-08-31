export default function InfoSection() {
  return (
    <div className="bg-gray-50 rounded-2xl p-12">
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
        ¿Por qué elegir The Pro Paint Group?
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-[#7ED957] text-4xl mb-4">✓</div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">
            Garantía de Calidad
          </h4>
          <p className="text-gray-600">
            Todos nuestros trabajos incluyen garantía
          </p>
        </div>
        <div className="text-center">
          <div className="text-[#7ED957] text-4xl mb-4">⭐</div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">
            Experiencia
          </h4>
          <p className="text-gray-600">Años de experiencia en el mercado</p>
        </div>
        <div className="text-center">
          <div className="text-[#7ED957] text-4xl mb-4">🎨</div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">
            Materiales Premium
          </h4>
          <p className="text-gray-600">
            Utilizamos las mejores pinturas del mercado
          </p>
        </div>
        <div className="text-center">
          <div className="text-[#7ED957] text-4xl mb-4">💰</div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">
            Precios Justos
          </h4>
          <p className="text-gray-600">
            Cotización gratuita y precios competitivos
          </p>
        </div>
      </div>
    </div>
  );
}
