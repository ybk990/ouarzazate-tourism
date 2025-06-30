"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail, Calendar } from "lucide-react"

interface PaymentSuccessProps {
  reservationId: string
  customerName: string
  accommodationName: string
  amount: number
  onClose: () => void
}

export default function PaymentSuccess({
  reservationId,
  customerName,
  accommodationName,
  amount,
  onClose,
}: PaymentSuccessProps) {
  const handleDownloadReceipt = () => {
    // Logique pour télécharger le reçu
    console.log("Téléchargement du reçu...")
  }

  const handleSendEmail = () => {
    // Logique pour renvoyer l'email de confirmation
    console.log("Envoi de l'email de confirmation...")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Animation de succès */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Paiement réussi !</h2>
        <p className="text-gray-600">Votre réservation a été confirmée et le paiement a été traité avec succès.</p>
      </div>

      {/* Détails de la transaction */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="text-center pb-4 border-b">
            <h3 className="text-xl font-semibold text-green-600">Réservation confirmée</h3>
            <p className="text-sm text-gray-500">Référence: #{reservationId.slice(-8).toUpperCase()}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Client:</span>
              <span className="font-medium">{customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hébergement:</span>
              <span className="font-medium">{accommodationName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Montant payé:</span>
              <span className="font-bold text-green-600">{amount.toLocaleString()} DH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Statut:</span>
              <span className="text-green-600 font-medium">✓ Confirmé</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prochaines étapes */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Prochaines étapes
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Email de confirmation envoyé</p>
                <p className="text-gray-600">Vérifiez votre boîte mail pour les détails complets</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Contact dans les 24h</p>
                <p className="text-gray-600">Notre équipe vous contactera pour finaliser les détails</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Informations de transport</p>
                <p className="text-gray-600">Vous recevrez les détails d'accès et de transport</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleDownloadReceipt} variant="outline" className="flex-1 bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Télécharger le reçu
        </Button>
        <Button onClick={handleSendEmail} variant="outline" className="flex-1 bg-transparent">
          <Mail className="mr-2 h-4 w-4" />
          Renvoyer l'email
        </Button>
        <Button onClick={onClose} className="flex-1 bg-orange-600 hover:bg-orange-700">
          Retour à l'accueil
        </Button>
      </div>

      {/* Support */}
      <div className="text-center text-sm text-gray-500 space-y-1">
        <p>Besoin d'aide ? Contactez-nous :</p>
        <p>📞 +212 524 XX XX XX | ✉️ contact@ouarzazate-tourism.com</p>
      </div>
    </div>
  )
}
