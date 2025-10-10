import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CursosList } from "./cursos-list"

export default function CursosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Cursos e Workshops</h1>
            <p className="text-muted-foreground mb-8">
              Aprimore suas habilidades com nossos cursos exclusivos ministrados por profissionais renomados
            </p>
            <CursosList />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
