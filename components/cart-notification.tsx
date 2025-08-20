"use client"

import { useCart } from "@/contexts/cart-context"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartNotification() {
  const { state, dispatch } = useCart()

  if (!state.showNotification || !state.lastAddedItem) return null

  const hideNotification = () => {
    dispatch({ type: "HIDE_NOTIFICATION" })
  }

  const openCart = () => {
    dispatch({ type: "TOGGLE_CART" })
    dispatch({ type: "HIDE_NOTIFICATION" })
  }

  return (
    <div className="fixed top-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 animate-in slide-in-from-top-2 duration-300">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <img
                src={state.lastAddedItem.image || "/placeholder.svg"}
                alt={state.lastAddedItem.name}
                className="w-12 h-12 object-contain bg-muted rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-green-800 text-sm">¡Agregado al carrito!</h3>
                <p className="text-sm text-gray-600 truncate">{state.lastAddedItem.name}</p>
                <p className="text-xs text-gray-500">Cantidad: {state.lastAddedItem.quantity}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button onClick={openCart} size="sm" className="bg-primary hover:bg-primary/90 text-xs h-8">
                Ver Carrito
              </Button>
              <Button onClick={hideNotification} variant="outline" size="sm" className="text-xs h-8 bg-transparent">
                Continuar
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={hideNotification}
            className="text-gray-400 hover:text-gray-600 p-1 h-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
