"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Users, BookOpen, DollarSign, MessageSquare, Bell, User, Briefcase } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/staff/dashboard", icon: Home },
    { name: "Agenda", href: "/staff/agenda", icon: Calendar },
    { name: "Clientes", href: "/staff/clientes", icon: Users },
    { name: "Serviços", href: "/staff/servicos", icon: Briefcase },
    { name: "Financeiro", href: "/staff/financeiro", icon: DollarSign },
    { name: "Cursos", href: "/staff/cursos", icon: BookOpen },
    { name: "Mensagens", href: "/staff/mensagens", icon: MessageSquare },
    { name: "Notificações", href: "/staff/notificacoes", icon: Bell },
    { name: "Perfil", href: "/staff/perfil", icon: User },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-muted/10">
        <div className="flex items-center h-16 px-6 border-b">
          <Link href="/staff/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="font-semibold">Styllus Staff</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tema</span>
            <ModeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Área do Profissional</h2>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
