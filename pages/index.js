export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-2xl font-bold text-gray-900">
              TPPG
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-600 hover:text-blue-600">Inicio</a>
              <a href="#servicios" className="text-gray-600 hover:text-blue-600">Servicios</a>
              <a href="#contacto" className="text-gray-600 hover:text-blue-600">Contacto</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transformamos tu negocio
            <span className="text-blue-600 block">con tecnología</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ayudamos a empresas como la tuya a crecer con soluciones digitales 
            innovadoras y estrategias que generan resultados reales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Solicita una consulta gratuita
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Ver nuestros casos de éxito
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}