"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitContact } from "@/app/actions"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage("")
    setIsSuccess(false)

    const result = await submitContact(formData)

    if (result.success) {
      setMessage(result.message || "Message envoyé avec succès!")
      setIsSuccess(true)
      const form = document.getElementById("contact-form") as HTMLFormElement
      form?.reset()
    } else {
      setMessage(result.error || "Erreur lors de l'envoi")
      setIsSuccess(false)
    }

    setIsSubmitting(false)
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-orange-600">
          <Mail className="inline mr-2 h-6 w-6" />
          Contactez-nous
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="contact-form" action={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-nom">Nom *</Label>
              <Input id="contact-nom" name="nom" required placeholder="Votre nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email *</Label>
              <Input id="contact-email" name="email" type="email" required placeholder="votre@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sujet">Sujet *</Label>
            <Input id="sujet" name="sujet" required placeholder="Objet de votre message" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message *</Label>
            <Textarea id="contact-message" name="message" required placeholder="Votre message..." rows={5} />
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Envoi..." : "Envoyer le message"}
          </Button>

          {message && (
            <div
              className={`p-4 rounded-lg text-center flex items-center justify-center gap-2 ${
                isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {isSuccess ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              {message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
