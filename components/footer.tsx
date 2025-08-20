import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-10 bg-white">
      <div className="container flex flex-col items-center gap-4 text-center">
        <Link href="/" className="font-bold text-lg text-primary">
          Lumar
        </Link>
        <p className="text-sm text-muted-foreground">© 2025 Lumar. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
