export default function InfoSection() {
  return (
    <div className="bg-gray-50 rounded-2xl p-12">
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Why Choose The Pro Paint Group?
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-[#7ED957] text-4xl mb-4">✓</div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">
            Quality Guarantee
          </h4>
          <p className="text-gray-600">
            All our work includes a warranty.
          </p>
        </div>
        <div className="text-center">
          <div className="text-[#7ED957] text-4xl mb-4">⭐</div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">
            Experience
          </h4>
          <p className="text-gray-600">Years of experience in the market.</p>
        </div>
        <div className="text-center">
          <div className="text-[#7ED957] text-4xl mb-4">🎨</div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">
            Premium Materials
          </h4>
          <p className="text-gray-600">
            We use the best paints on the market.
          </p>
        </div>
        <div className="text-center">
          <div className="text-[#7ED957] text-4xl mb-4">💰</div>
          <h4 className="font-semibold text-gray-900 text-lg mb-2">
            Fair Prices
          </h4>
          <p className="text-gray-600">
            Free quote and competitive prices.
          </p>
        </div>
      </div>
    </div>
  );
}