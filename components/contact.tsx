"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail } from "lucide-react"

export default function Contact() {
  // WhatsApp number - replace with your actual number
  const whatsappNumber = "+5491112345678"
  const emailAddress = "info@lumar.com"

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank")
  }

  const sendEmail = () => {
    window.location.href = `mailto:${emailAddress}`
  }

  return (
    <section id="contacto" className="py-20 px-4 md:px-6 bg-secondary/50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Contáctenos</h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Estamos aquí para responder a sus preguntas y ayudarle a encontrar el botiquín perfecto para su baño.
          </p>
        </div>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-center text-primary">Información de contacto</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium">WhatsApp</span>
              </div>
              <Button onClick={openWhatsApp} className="w-full md:w-auto bg-primary hover:bg-primary/90">
                Contactar por WhatsApp
              </Button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium">Correo electrónico</span>
              </div>
              <Button
                onClick={sendEmail}
                variant="outline"
                className="w-full md:w-auto border-primary text-primary hover:bg-primary/10"
              >
                {emailAddress}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
