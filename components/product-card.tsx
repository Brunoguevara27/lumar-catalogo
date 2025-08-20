"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-0 bg-muted">
      <div className="aspect-square overflow-hidden bg-white p-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-contain w-full h-full transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground">{product.description}</p>
        <p className="mt-2 text-xl font-bold text-primary">{product.price}</p>
      </CardContent>
      <CardFooter className="p-4 gap-2">
        <Button onClick={addToCart} className="flex-1 bg-primary hover:bg-primary/90">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
