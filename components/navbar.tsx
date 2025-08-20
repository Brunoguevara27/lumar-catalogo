"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl text-primary">
            Lumar
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#empresa" className="text-sm font-medium transition-colors hover:text-primary">
            Nuestra Empresa
          </a>
          <a href="#catalogo" className="text-sm font-medium transition-colors hover:text-primary">
            Catálogo
          </a>
          <a href="#contacto" className="text-sm font-medium transition-colors hover:text-primary">
            Contacto
          </a>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="flex flex-col p-4">
              <a
                href="#empresa"
                className="py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={handleLinkClick}
              >
                Nuestra Empresa
              </a>
              <a
                href="#catalogo"
                className="py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={handleLinkClick}
              >
                Catálogo
              </a>
              <a
                href="#contacto"
                className="py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={handleLinkClick}
              >
                Contacto
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
