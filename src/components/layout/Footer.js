import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/logotppg.png"
                alt="The Pro Paint Group Logo"  
                width={100}
                height={80}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-500 mb-6">
              Transformando hogares y negocios con pintura profesional desde 2024
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="#" className="text-gray-500 hover:text-[#7ED957] transition-colors">
              Facebook
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#7ED957] transition-colors">Instagram
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#7ED957] transition-colors">
              Google
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-500">
              © 2024 The Pro Paint Group. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
  );
}