import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section id="empresa" className="py-20 px-4 md:px-6 bg-secondary/50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Lumar</h1>
          <p className="text-muted-foreground md:text-xl">
            Nos especializamos en la fabricación de botiquines de alta calidad para baños. Nuestros productos combinan
            funcionalidad, durabilidad y diseño elegante para transformar su espacio.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <a href="#catalogo">Ver Catálogo</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10">
              <a href="#contacto">Contáctenos</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
