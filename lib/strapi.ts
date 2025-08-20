// Configuración de Strapi
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

export interface StrapiProduct {
  id: number
  documentId: string
  nombre: string
  descripcion: string
  precio: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  imagen: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
      thumbnail?: {
        name: string
        hash: string
        ext: string
        mime: string
        path: string | null
        width: number
        height: number
        size: number
        sizeInBytes: number
        url: string
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
}

// Función para obtener productos desde Strapi
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/productos?populate=*`, {
      next: { revalidate: 60 }, // Revalidar cada 60 segundos
    })

    if (!response.ok) {
      throw new Error("Error al obtener productos")
    }

    const data = await response.json()

    // Transformar datos de Strapi v5 al formato que usa nuestro sitio
    return data.data.map(
      (item: StrapiProduct): Product => ({
        id: item.id,
        name: item.nombre,
        description: item.descripcion,
        price: `$${item.precio}`,
        image: item.imagen ? `${STRAPI_URL}${item.imagen.url}` : "/placeholder.svg?height=300&width=300",
      }),
    )
  } catch (error) {
    console.error("Error fetching products:", error)

    // Fallback: devolver productos de ejemplo si Strapi no está disponible
    return [
      {
        id: 1,
        name: "Botiquín Minimalista",
        description: "Diseño compacto con espejo y estante inferior, ideal para espacios pequeños.",
        price: "$7,500",
        image: "/images/botiquin-1.png",
      },
      {
        id: 2,
        name: "Botiquín Triple Espejo",
        description: "Amplio botiquín con tres espejos y luces LED integradas para mayor funcionalidad.",
        price: "$14,900",
        image: "/images/botiquin-2.png",
      },
      {
        id: 3,
        name: "Botiquín Clásico",
        description: "Diseño tradicional con espejo central y gabinete lateral para mayor almacenamiento.",
        price: "$9,800",
        image: "/images/botiquin-3.png",
      },
    ]
  }
}
