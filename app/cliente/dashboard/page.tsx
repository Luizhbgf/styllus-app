import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Star, Scissors, User, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ClienteDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Olá, Maria!</h1>
        <p className="text-muted-foreground">Bem-vinda ao seu painel de cliente Styllus</p>
      </div>

      {/* Próximo Agendamento */}
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Seu Próximo Agendamento</CardTitle>
          <CardDescription>Detalhes do seu próximo serviço agendado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Scissors className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Corte de Cabelo</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  Ana Silva
                </div>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm">Quinta-feira, 22 de Maio</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm">14:30</span>
              </div>
              <Badge className="mt-1 md:ml-auto" variant="outline">
                Confirmado
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            Reagendar
          </Button>
          <Button size="sm">Ver Detalhes</Button>
        </CardFooter>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 p-3 rounded-full mb-3">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-1">Agendar</h3>
          <p className="text-xs text-muted-foreground mb-3">Novo serviço</p>
          <Button variant="outline" size="sm" className="mt-auto w-full" asChild>
            <Link href="/agendamento">Agendar</Link>
          </Button>
        </Card>
        <Card className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 p-3 rounded-full mb-3">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-1">Histórico</h3>
          <p className="text-xs text-muted-foreground mb-3">Seus serviços</p>
          <Button variant="outline" size="sm" className="mt-auto w-full" asChild>
            <Link href="/cliente/historico">Ver</Link>
          </Button>
        </Card>
        <Card className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 p-3 rounded-full mb-3">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-1">Cursos</h3>
          <p className="text-xs text-muted-foreground mb-3">Seus cursos</p>
          <Button variant="outline" size="sm" className="mt-auto w-full" asChild>
            <Link href="/cliente/cursos">Ver</Link>
          </Button>
        </Card>
        <Card className="flex flex-col items-center text-center p-4">
          <div className="bg-primary/10 p-3 rounded-full mb-3">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-1">Perfil</h3>
          <p className="text-xs text-muted-foreground mb-3">Suas informações</p>
          <Button variant="outline" size="sm" className="mt-auto w-full" asChild>
            <Link href="/cliente/perfil">Editar</Link>
          </Button>
        </Card>
      </div>

      {/* Profissionais Favoritos */}
      <div>
        <h2 className="text-xl font-bold mb-4">Seus Profissionais Favoritos</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              name: "Ana Silva",
              role: "Cabeleireira",
              rating: 4.9,
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Carlos Oliveira",
              role: "Barbeiro",
              rating: 4.8,
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Juliana Santos",
              role: "Manicure",
              rating: 4.7,
              image: "/placeholder.svg?height=100&width=100",
            },
          ].map((pro, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                    {pro.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{pro.name}</h3>
                    <p className="text-sm text-muted-foreground">{pro.role}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-primary fill-primary" />
                      <span className="text-xs ml-1">{pro.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/agendamento?profissional=${index + 1}`}>Agendar</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Histórico Recente */}
      <div>
        <h2 className="text-xl font-bold mb-4">Histórico Recente</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {[
                {
                  service: "Corte de Cabelo",
                  professional: "Ana Silva",
                  date: "10/05/2025",
                  price: "R$ 80,00",
                },
                {
                  service: "Manicure",
                  professional: "Juliana Santos",
                  date: "28/04/2025",
                  price: "R$ 60,00",
                },
                {
                  service: "Hidratação",
                  professional: "Rafael Costa",
                  date: "15/04/2025",
                  price: "R$ 120,00",
                },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.service}</h3>
                    <p className="text-sm text-muted-foreground">{item.professional}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{item.date}</p>
                    <p className="font-medium">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/cliente/historico">Ver Histórico Completo</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
