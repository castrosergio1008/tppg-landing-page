// Importa el componente Image de Next.js
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    // La etiqueta <header> es el elemento raíz del componente
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Image
              src="/logotppg.png"
              alt="The Pro Paint Group Logo"
              width={100}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#home" className="text-gray-600 hover:text-[#7ED957] transition-colors font-medium">
                Home
            </Link>
            <Link href="#services" className="text-gray-600 hover:text-[#7ED957] transition-colors font-medium">
                Services
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-[#7ED957] transition-colors font-medium">
                Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
//la clase Header se encarga de renderizar el encabezado de la página, incluyendo el logotipo y la navegación principal.
