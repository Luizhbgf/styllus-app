import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CreditCard, Users, TrendingUp, TrendingDown, CalendarIcon } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo ao painel administrativo do Styllus</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Hoje
          </Button>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Esta Semana
          </Button>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Este Mês
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+2.5% em relação a ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento do Dia</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.850,00</div>
            <p className="text-xs text-muted-foreground">+18.2% em relação a ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+12.5% em relação a ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5.1% em relação a ontem</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="agendamentos">
        <TabsList>
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
        </TabsList>
        <TabsContent value="agendamentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
              <CardDescription>Visualize e gerencie os próximos agendamentos do dia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "09:00",
                    client: "Maria Silva",
                    service: "Corte de Cabelo",
                    professional: "Ana Silva",
                    status: "confirmado",
                  },
                  {
                    time: "09:30",
                    client: "João Oliveira",
                    service: "Barba",
                    professional: "Carlos Oliveira",
                    status: "pendente",
                  },
                  {
                    time: "10:00",
                    client: "Carla Santos",
                    service: "Manicure",
                    professional: "Juliana Santos",
                    status: "confirmado",
                  },
                  {
                    time: "11:00",
                    client: "Pedro Costa",
                    service: "Corte Masculino",
                    professional: "Rafael Costa",
                    status: "confirmado",
                  },
                  {
                    time: "13:30",
                    client: "Fernanda Lima",
                    service: "Maquiagem",
                    professional: "Mariana Costa",
                    status: "pendente",
                  },
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-md">
                        {appointment.time}
                      </div>
                      <div>
                        <p className="font-medium">{appointment.client}</p>
                        <p className="text-sm text-muted-foreground">{appointment.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <p className="font-medium">{appointment.professional}</p>
                        <p
                          className={`text-xs ${appointment.status === "confirmado" ? "text-green-500" : "text-amber-500"}`}
                        >
                          {appointment.status === "confirmado" ? "Confirmado" : "Pendente"}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/admin/agendamentos">Ver Todos os Agendamentos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profissionais" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Profissionais</CardTitle>
              <CardDescription>Visualize o desempenho dos profissionais no período selecionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Ana Silva", role: "Cabeleireira", appointments: 28, revenue: "R$ 2.240,00", rating: 4.9 },
                  { name: "Carlos Oliveira", role: "Barbeiro", appointments: 32, revenue: "R$ 1.920,00", rating: 4.8 },
                  { name: "Juliana Santos", role: "Manicure", appointments: 25, revenue: "R$ 1.750,00", rating: 4.7 },
                  { name: "Rafael Costa", role: "Cabeleireiro", appointments: 22, revenue: "R$ 1.980,00", rating: 4.9 },
                  { name: "Fernanda Lima", role: "Maquiadora", appointments: 18, revenue: "R$ 1.620,00", rating: 4.8 },
                ].map((professional, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                        {professional.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{professional.name}</p>
                        <p className="text-sm text-muted-foreground">{professional.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Agendamentos</p>
                        <p className="font-medium">{professional.appointments}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Faturamento</p>
                        <p className="font-medium">{professional.revenue}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Avaliação</p>
                        <p className="font-medium flex items-center">
                          {professional.rating}
                          <svg className="w-4 h-4 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/admin/profissionais">Ver Todos os Profissionais</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="financeiro" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Visualize o resumo financeiro do período selecionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Faturamento Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 12.850,00</div>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15.2% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Ticket Médio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 95,20</div>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3.5% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Despesas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 4.320,00</div>
                    <p className="text-xs text-red-500 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      +8.1% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Lucro Líquido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 8.530,00</div>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +18.7% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>Serviço</span>
                  <span>Faturamento</span>
                </div>
                {[
                  { service: "Corte de Cabelo", revenue: "R$ 4.320,00", percentage: 33.6 },
                  { service: "Coloração", revenue: "R$ 3.150,00", percentage: 24.5 },
                  { service: "Manicure e Pedicure", revenue: "R$ 1.980,00", percentage: 15.4 },
                  { service: "Barba", revenue: "R$ 1.280,00", percentage: 10.0 },
                  { service: "Maquiagem", revenue: "R$ 1.120,00", percentage: 8.7 },
                  { service: "Outros", revenue: "R$ 1.000,00", percentage: 7.8 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{item.service}</span>
                      <span>{item.revenue}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground text-right">{item.percentage}%</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/admin/financeiro">Ver Relatório Completo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
