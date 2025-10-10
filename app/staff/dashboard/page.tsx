import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, CreditCard, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Olá, Ana!</h1>
        <p className="text-muted-foreground">Bem-vinda ao seu painel de profissional Styllus</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 pendentes, 6 confirmados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento do Dia</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 640,00</div>
            <p className="text-xs text-green-500">+12.5% em relação a ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">2 novos clientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-green-500">+5% em relação a ontem</p>
          </CardContent>
        </Card>
      </div>

      {/* Próximos Agendamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Agendamentos</CardTitle>
          <CardDescription>Seus próximos atendimentos para hoje</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "09:00",
                client: "Maria Silva",
                service: "Corte de Cabelo",
                price: "R$ 80,00",
                status: "confirmado",
              },
              {
                time: "10:30",
                client: "Carla Santos",
                service: "Coloração",
                price: "R$ 150,00",
                status: "confirmado",
              },
              {
                time: "13:00",
                client: "Fernanda Lima",
                service: "Hidratação",
                price: "R$ 120,00",
                status: "pendente",
              },
              {
                time: "14:30",
                client: "Juliana Martins",
                service: "Corte e Escova",
                price: "R$ 120,00",
                status: "confirmado",
              },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-md">{appointment.time}</div>
                  <div>
                    <p className="font-medium">{appointment.client}</p>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-right">
                    <p className="font-medium">{appointment.price}</p>
                    <Badge
                      variant="outline"
                      className={
                        appointment.status === "confirmado"
                          ? "text-green-500 border-green-200"
                          : "text-amber-500 border-amber-200"
                      }
                    >
                      {appointment.status === "confirmado" ? "Confirmado" : "Pendente"}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/staff/agenda">Ver Agenda Completa</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Financeiro */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
          <CardDescription>Seu desempenho financeiro</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Meta Mensal</h3>
              <span className="text-sm font-medium">R$ 8.500 / R$ 10.000</span>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-right text-muted-foreground">85% da meta atingida</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Faturamento Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 2.450,00</div>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% em relação à semana anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Comissão Estimada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.225,00</div>
                <p className="text-xs text-muted-foreground">50% do faturamento</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-3">Serviços Mais Realizados</h3>
            <div className="space-y-4">
              {[
                { service: "Corte de Cabelo", count: 18, revenue: "R$ 1.440,00", percentage: 40 },
                { service: "Coloração", count: 12, revenue: "R$ 1.800,00", percentage: 30 },
                { service: "Hidratação", count: 8, revenue: "R$ 960,00", percentage: 20 },
                { service: "Escova", count: 4, revenue: "R$ 280,00", percentage: 10 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{item.service}</span>
                    <span>{item.revenue}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.count} atendimentos</span>
                    <span>{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/staff/financeiro">Ver Relatório Completo</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Clientes Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes Recentes</CardTitle>
          <CardDescription>Últimos clientes atendidos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Maria Silva", service: "Corte de Cabelo", date: "Hoje, 09:00", returning: true },
              { name: "Carla Santos", service: "Coloração", date: "Hoje, 10:30", returning: true },
              { name: "Fernanda Lima", service: "Hidratação", date: "Hoje, 13:00", returning: false },
              { name: "Juliana Martins", service: "Corte e Escova", date: "Hoje, 14:30", returning: true },
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{client.name}</p>
                      {client.returning && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Recorrente
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{client.service}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{client.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/staff/clientes">Ver Todos os Clientes</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
