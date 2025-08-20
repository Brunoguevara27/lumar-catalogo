"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"

export default function CartButton() {
  const { state, dispatch } = useCart()

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg z-40"
      size="sm"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  )
}
