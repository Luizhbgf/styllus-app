"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Search, Star, User } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function ClienteHistorico() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("todos")
  const [filterService, setFilterService] = useState("todos")
  const [filterProfessional, setFilterProfessional] = useState("todos")

  const historico = [
    {
      id: 1,
      date: new Date("2024-05-10"),
      service: "Corte de Cabelo",
      professional: "Ana Silva",
      price: "R$ 80,00",
      status: "concluido",
      rating: 5,
      review: "Excelente atendimento! Adorei o corte.",
      duration: "45 min",
      photos: ["/placeholder.svg?height=100&width=100"],
    },
    {
      id: 2,
      date: new Date("2024-04-28"),
      service: "Manicure",
      professional: "Juliana Santos",
      price: "R$ 60,00",
      status: "concluido",
      rating: 4,
      review: "Muito bom, mas demorou um pouco mais que o esperado.",
      duration: "1h",
      photos: [],
    },
    {
      id: 3,
      date: new Date("2024-04-15"),
      service: "Hidratação",
      professional: "Rafael Costa",
      price: "R$ 120,00",
      status: "concluido",
      rating: 5,
      review: "Meu cabelo ficou incrível! Super recomendo.",
      duration: "1h 30min",
      photos: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    },
    {
      id: 4,
      date: new Date("2024-03-20"),
      service: "Coloração",
      professional: "Ana Silva",
      price: "R$ 150,00",
      status: "concluido",
      rating: 5,
      review: "Perfeito! A cor ficou exatamente como eu queria.",
      duration: "2h",
      photos: ["/placeholder.svg?height=100&width=100"],
    },
    {
      id: 5,
      date: new Date("2024-03-05"),
      service: "Escova",
      professional: "Rafael Costa",
      price: "R$ 70,00",
      status: "concluido",
      rating: 4,
      review: "Bom resultado, cabelo ficou bem liso.",
      duration: "45 min",
      photos: [],
    },
    {
      id: 6,
      date: new Date("2024-02-18"),
      service: "Penteado",
      professional: "Ana Silva",
      price: "R$ 130,00",
      status: "concluido",
      rating: 5,
      review: "Penteado lindo para o casamento da minha amiga!",
      duration: "1h 30min",
      photos: ["/placeholder.svg?height=100&width=100"],
    },
  ]

  // Filtrar histórico
  const filteredHistory = historico.filter((item) => {
    // Filtro por termo de busca
    if (
      searchTerm &&
      !item.service.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.professional.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filtro por período
    if (filterPeriod !== "todos") {
      const now = new Date()
      const itemDate = item.date

      if (filterPeriod === "30dias") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        if (itemDate < thirtyDaysAgo) return false
      } else if (filterPeriod === "3meses") {
        const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        if (itemDate < threeMonthsAgo) return false
      } else if (filterPeriod === "6meses") {
        const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
        if (itemDate < sixMonthsAgo) return false
      }
    }

    // Filtro por serviço
    if (filterService !== "todos" && item.service !== filterService) return false

    // Filtro por profissional
    if (filterProfessional !== "todos" && item.professional !== filterProfessional) return false

    return true
  })

  const totalGasto = historico.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace("R$ ", "").replace(",", "."))
    return total + price
  }, 0)

  const servicosFavoritos = historico.reduce(
    (acc, item) => {
      acc[item.service] = (acc[item.service] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const servicoMaisFrequente = Object.entries(servicosFavoritos).sort(([, a], [, b]) => b - a)[0]

  const profissionaisFavoritos = historico.reduce(
    (acc, item) => {
      acc[item.professional] = (acc[item.professional] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const profissionalMaisFrequente = Object.entries(profissionaisFavoritos).sort(([, a], [, b]) => b - a)[0]

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
      ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Serviços</h1>
        <p className="text-muted-foreground">Acompanhe todos os serviços que você já realizou</p>
      </div>

      <Tabs defaultValue="historico">
        <TabsList>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="historico" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar serviço ou profissional..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os períodos</SelectItem>
                    <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                    <SelectItem value="3meses">Últimos 3 meses</SelectItem>
                    <SelectItem value="6meses">Últimos 6 meses</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os serviços</SelectItem>
                    {Array.from(new Set(historico.map((item) => item.service))).map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterProfessional} onValueChange={setFilterProfessional}>
                  <SelectTrigger>
                    <SelectValue placeholder="Profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os profissionais</SelectItem>
                    {Array.from(new Set(historico.map((item) => item.professional))).map((professional) => (
                      <SelectItem key={professional} value={professional}>
                        {professional}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista do histórico */}
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-medium text-lg">{item.service}</h3>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {item.status === "concluido" ? "Concluído" : "Pendente"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(item.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {item.professional}
                        </div>
                        <span>Duração: {item.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{renderStars(item.rating)}</div>
                        <span className="text-sm text-muted-foreground">({item.rating}/5)</span>
                      </div>
                      {item.review && <p className="text-sm text-muted-foreground italic">"{item.review}"</p>}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-lg font-bold">{item.price}</span>
                      {item.photos.length > 0 && (
                        <div className="flex gap-2">
                          {item.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo || "/placeholder.svg"}
                              alt={`Resultado ${index + 1}`}
                              className="w-12 h-12 rounded-md object-cover border"
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reagendar
                        </Button>
                        <Button variant="outline" size="sm">
                          Avaliar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum serviço encontrado com os filtros selecionados.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setFilterPeriod("todos")
                  setFilterService("todos")
                  setFilterProfessional("todos")
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="estatisticas" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{historico.length}</div>
                <p className="text-xs text-muted-foreground">Serviços realizados</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalGasto.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">Em cuidados pessoais</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Serviço Favorito</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{servicoMaisFrequente?.[0] || "N/A"}</div>
                <p className="text-xs text-muted-foreground">{servicoMaisFrequente?.[1] || 0} vezes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profissional Favorito</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{profissionalMaisFrequente?.[0] || "N/A"}</div>
                <p className="text-xs text-muted-foreground">{profissionalMaisFrequente?.[1] || 0} atendimentos</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Serviços por Categoria</CardTitle>
                <CardDescription>Distribuição dos seus serviços realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(servicosFavoritos)
                    .sort(([, a], [, b]) => b - a)
                    .map(([service, count]) => (
                      <div key={service} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{service}</span>
                          <span>{count} vezes</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(count / historico.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profissionais Mais Procurados</CardTitle>
                <CardDescription>Seus profissionais de confiança</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(profissionaisFavoritos)
                    .sort(([, a], [, b]) => b - a)
                    .map(([professional, count]) => (
                      <div key={professional} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                            {professional.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{professional}</p>
                            <p className="text-sm text-muted-foreground">{count} atendimentos</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Agendar
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
