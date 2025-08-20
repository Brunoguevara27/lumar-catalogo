import { Suspense } from "react"
import ProductGrid from "./product-grid"
import ProductGridSkeleton from "./product-grid-skeleton"

export default function ProductCatalog() {
  return (
    <section id="catalogo" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Nuestro Catálogo</h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Explore nuestra selección de botiquines para baño, diseñados para combinar funcionalidad y estética en
            cualquier espacio.
          </p>
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </div>
    </section>
  )
}
