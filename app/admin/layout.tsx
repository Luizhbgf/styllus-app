import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  UserCog,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Home,
  DollarSign,
  Crown,
  ShieldCheck,
} from "lucide-react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-muted/40 border-r">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Styllus</span>
            <span className="text-xs bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/agendamentos"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <Calendar className="h-5 w-5" />
            Agendamentos
          </Link>
          <Link
            href="/admin/profissionais"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <UserCog className="h-5 w-5" />
            Profissionais
          </Link>
          <Link
            href="/admin/clientes"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <Users className="h-5 w-5" />
            Clientes
          </Link>
          <Link
            href="/admin/usuarios"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <ShieldCheck className="h-5 w-5" />
            Usuários e Acessos
          </Link>
          <Link
            href="/admin/assinaturas"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <Crown className="h-5 w-5" />
            Assinaturas
          </Link>
          <Link
            href="/admin/cursos"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <BookOpen className="h-5 w-5" />
            Cursos
          </Link>
          <Link
            href="/admin/financeiro"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <DollarSign className="h-5 w-5" />
            Financeiro
          </Link>
          <Link
            href="/admin/relatorios"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <BarChart3 className="h-5 w-5" />
            Relatórios
          </Link>
          <Link
            href="/admin/configuracoes"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          >
            <Settings className="h-5 w-5" />
            Configurações
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm" asChild>
            <Link href="/login">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
