"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { Minus, Plus, Trash2, X } from "lucide-react"

export default function Cart() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const sendToWhatsApp = () => {
    if (state.items.length === 0) return

    const whatsappNumber = "+5491112345678" // Reemplaza con tu número
    let message = "¡Hola! Me gustaría realizar el siguiente pedido:\n\n"

    state.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio unitario: ${item.price}\n\n`
    })

    message += "¡Gracias!"

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  if (!state.isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-primary">Carrito de Compras</CardTitle>
          <Button variant="ghost" size="sm" onClick={toggleCart}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[50vh]">
          {state.items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Tu carrito está vacío</p>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-contain bg-white rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-primary font-bold">{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {state.items.length > 0 && (
          <div className="p-4 border-t space-y-2">
            <Button onClick={sendToWhatsApp} className="w-full bg-green-600 hover:bg-green-700">
              Realizar Pedido por WhatsApp
            </Button>
            <Button onClick={clearCart} variant="outline" className="w-full bg-transparent">
              Vaciar Carrito
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
