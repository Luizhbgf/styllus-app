import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard, Home, LogOut, Settings, User, BookOpen, Clock, Heart, Bell } from "lucide-react"

export default function ClienteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-muted/40 border-r">
        <div className="p-6">
          <Link href="/cliente/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Styllus</span>
            <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Cliente</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link
            href="/cliente/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/cliente/agendamentos"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted"
          >
            <Calendar className="h-5 w-5" />
            Meus Agendamentos
          </Link>
          <Link
            href="/cliente/historico"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted"
          >
            <Clock className="h-5 w-5" />
            Histórico
          </Link>
          <Link
            href="/cliente/favoritos"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted"
          >
            <Heart className="h-5 w-5" />
            Favoritos
          </Link>
          <Link
            href="/cliente/cursos"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted"
          >
            <BookOpen className="h-5 w-5" />
            Meus Cursos
          </Link>
          <Link
            href="/cliente/pagamentos"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted"
          >
            <CreditCard className="h-5 w-5" />
            Pagamentos
          </Link>
          <Link
            href="/cliente/notificacoes"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted"
          >
            <Bell className="h-5 w-5" />
            Notificações
          </Link>
          <Link
            href="/cliente/perfil"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted"
          >
            <Settings className="h-5 w-5" />
            Meu Perfil
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Maria Silva</p>
              <p className="text-xs text-muted-foreground">maria@email.com</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start" size="sm" asChild>
            <Link href="/login">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Link>
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-col flex-1">
        <header className="md:hidden flex items-center justify-between p-4 border-b">
          <Link href="/cliente/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Styllus</span>
            <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Cliente</span>
          </Link>
          <Button variant="outline" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>

        {/* Mobile navigation */}
        <nav className="md:hidden flex items-center justify-around border-t p-2 bg-background">
          <Link href="/cliente/dashboard" className="flex flex-col items-center p-2">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/cliente/agendamentos" className="flex flex-col items-center p-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs mt-1">Agenda</span>
          </Link>
          <Link href="/cliente/favoritos" className="flex flex-col items-center p-2">
            <Heart className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs mt-1">Favoritos</span>
          </Link>
          <Link href="/cliente/pagamentos" className="flex flex-col items-center p-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs mt-1">Pagamentos</span>
          </Link>
          <Link href="/cliente/perfil" className="flex flex-col items-center p-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs mt-1">Perfil</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
