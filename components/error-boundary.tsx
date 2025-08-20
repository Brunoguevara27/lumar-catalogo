"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto py-20 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-red-600">Error al cargar productos</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            No se pudieron cargar los productos. Verifica que Strapi esté funcionando.
          </p>
          <Button onClick={reset} className="bg-primary hover:bg-primary/90">
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
