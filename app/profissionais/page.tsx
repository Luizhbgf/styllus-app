import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProfissionaisList } from "./profissionais-list"

export default function ProfissionaisPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Nossos Profissionais</h1>
            <p className="text-muted-foreground mb-8">Conheça nossa equipe de profissionais altamente qualificados</p>
            <ProfissionaisList />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
