"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Settings, CheckCircle } from "lucide-react"

export default function AdminNotice() {
  const [isVisible, setIsVisible] = useState(false)
  const [strapiStatus, setStrapiStatus] = useState<"checking" | "online" | "offline">("checking")
  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    // Verificar si Strapi está funcionando
    const checkStrapi = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/productos?populate=*")
        if (response.ok) {
          const data = await response.json()
          setStrapiStatus("online")
          setProductCount(data.data.length)
          setIsVisible(true) // Mostrar notificación de éxito

          // Ocultar después de 5 segundos
          setTimeout(() => setIsVisible(false), 5000)
        } else {
          setStrapiStatus("offline")
          setIsVisible(true)
        }
      } catch (error) {
        setStrapiStatus("offline")
        setIsVisible(true)
      }
    }

    checkStrapi()
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <Card
        className={`${strapiStatus === "online" ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {strapiStatus === "online" ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            ) : (
              <Settings className="h-5 w-5 text-orange-600 mt-0.5" />
            )}
            <div className="flex-1">
              {strapiStatus === "online" ? (
                <>
                  <h3 className="font-medium text-green-800">¡Strapi conectado!</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Se cargaron {productCount} productos desde tu CMS. Los cambios que hagas en Strapi se reflejarán
                    automáticamente.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-medium text-orange-800">Modo de desarrollo</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    Los productos se están cargando desde datos de ejemplo. Para ver productos reales, asegúrate de que
                    Strapi esté funcionando en localhost:1337
                  </p>
                  <Button
                    variant="link"
                    className="text-orange-600 p-0 h-auto mt-2"
                    onClick={() => window.open("http://localhost:1337/admin", "_blank")}
                  >
                    Abrir panel de Strapi
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className={`${
                strapiStatus === "online"
                  ? "text-green-600 hover:text-green-800"
                  : "text-orange-600 hover:text-orange-800"
              }`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
