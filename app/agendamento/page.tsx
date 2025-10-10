import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AgendamentoForm } from "./agendamento-form"

export default function AgendamentoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Agendamento</h1>
            <p className="text-muted-foreground mb-8">
              Agende seu horário com nossos profissionais de forma rápida e fácil
            </p>
            <AgendamentoForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
