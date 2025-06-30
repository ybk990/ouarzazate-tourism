"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, ExternalLink, Copy, Github, Globe, Zap } from "lucide-react"

interface Step {
  id: string
  title: string
  description: string
  completed: boolean
  action?: string
  link?: string
}

export default function DeploymentGuide() {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "github",
      title: "1. Créer Repository GitHub",
      description: "Créez un nouveau repository et poussez votre code",
      completed: false,
      action: "Aller sur GitHub",
      link: "https://github.com/new",
    },
    {
      id: "vercel",
      title: "2. Déployer sur Vercel",
      description: "Connectez votre repository GitHub à Vercel",
      completed: false,
      action: "Déployer sur Vercel",
      link: "https://vercel.com/new",
    },
    {
      id: "env",
      title: "3. Configurer Variables d'Environnement",
      description: "Ajoutez vos clés Supabase dans Vercel",
      completed: false,
    },
    {
      id: "domain",
      title: "4. Domaine Personnalisé (Optionnel)",
      description: "Configurez un nom de domaine personnalisé",
      completed: false,
    },
    {
      id: "test",
      title: "5. Tester en Production",
      description: "Vérifiez que tout fonctionne en ligne",
      completed: false,
    },
  ])

  const toggleStep = (id: string) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step)))
  }

  const completedSteps = steps.filter((step) => step.completed).length
  const progress = (completedSteps / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Zap className="h-6 w-6" />
            Guide de Déploiement - Ouarzazate Tourism
          </CardTitle>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                Progression: {completedSteps}/{steps.length} étapes
              </span>
              <span className="font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`transition-all duration-300 ${
              step.completed ? "border-green-200 bg-green-50" : "border-gray-200 hover:shadow-md"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <button onClick={() => toggleStep(step.id)} className="mt-1 transition-colors">
                  {step.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400 hover:text-orange-600" />
                  )}
                </button>

                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 ${step.completed ? "text-green-800" : "text-gray-900"}`}>
                    {step.title}
                  </h3>
                  <p className={`mb-4 ${step.completed ? "text-green-700" : "text-gray-600"}`}>{step.description}</p>

                  {step.action && step.link && (
                    <Button
                      asChild
                      size="sm"
                      className={
                        step.completed ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"
                      }
                    >
                      <a href={step.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {step.action}
                      </a>
                    </Button>
                  )}
                </div>

                {step.completed && <Badge className="bg-green-100 text-green-800">Terminé</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Environment Variables Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Variables d'Environnement pour Vercel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Ajoutez ces variables dans les paramètres de votre projet Vercel :</p>

          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-sm">NEXT_PUBLIC_SUPABASE_URL</code>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">URL de votre projet Supabase</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Clé publique Supabase</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-sm">SUPABASE_SERVICE_ROLE_KEY</code>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Clé service role (pour l'admin)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Deploy Button */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-4">🚀 Déploiement Rapide</h3>
          <p className="text-blue-700 mb-6">Cliquez sur le bouton ci-dessous pour déployer directement sur Vercel</p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <a
              href="https://vercel.com/new/clone?repository-url=https://github.com/your-username/ouarzazate-tourism"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5 mr-2" />
              Deploy to Vercel
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Success Message */}
      {completedSteps === steps.length && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-900 mb-2">🎉 Félicitations !</h3>
            <p className="text-green-700 mb-4">Votre site Ouarzazate Tourism est maintenant en ligne !</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <a href="https://your-site.vercel.app" target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Voir le Site en Ligne
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
