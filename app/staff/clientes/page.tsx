"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, User, Phone, Calendar, Star, MessageSquare, Plus, Eye } from "lucide-react"

export default function StaffClientes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("todos")
  const [sortBy, setSortBy] = useState("nome")

  const clientes = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@email.com",
      phone: "(11) 98765-4321",
      avatar: "/placeholder.svg?height=100&width=100",
      totalServices: 15,
      totalSpent: 1200.0,
      lastService: "Corte de Cabelo",
      lastServiceDate: "2024-05-10",
      averageRating: 4.8,
      clientSince: "2023-01-15",
      type: "vip",
      notes: "Cliente muito pontual, prefere horários da manhã",
      preferences: ["Produtos naturais", "Cortes modernos"],
      nextAppointment: "2024-05-22",
      status: "ativo",
    },
    {
      id: 2,
      name: "Carla Santos",
      email: "carla@email.com",
      phone: "(11) 98765-4322",
      avatar: "/placeholder.svg?height=100&width=100",
      totalServices: 8,
      totalSpent: 640.0,
      lastService: "Coloração",
      lastServiceDate: "2024-04-28",
      averageRating: 4.9,
      clientSince: "2023-06-20",
      type: "regular",
      notes: "Gosta de experimentar cores diferentes",
      preferences: ["Coloração", "Tratamentos"],
      nextAppointment: null,
      status: "ativo",
    },
    {
      id: 3,
      name: "Fernanda Lima",
      email: "fernanda@email.com",
      phone: "(11) 98765-4323",
      avatar: "/placeholder.svg?height=100&width=100",
      totalServices: 1,
      totalSpent: 120.0,
      lastService: "Hidratação",
      lastServiceDate: "2024-05-01",
      averageRating: 5.0,
      clientSince: "2024-05-01",
      type: "novo",
      notes: "Primeira vez no salão, cabelo muito ressecado",
      preferences: ["Tratamentos capilares"],
      nextAppointment: "2024-05-15",
      status: "ativo",
    },
    {
      id: 4,
      name: "Juliana Martins",
      email: "juliana@email.com",
      phone: "(11) 98765-4324",
      avatar: "/placeholder.svg?height=100&width=100",
      totalServices: 12,
      totalSpent: 960.0,
      lastService: "Corte e Escova",
      lastServiceDate: "2024-04-15",
      averageRating: 4.7,
      clientSince: "2023-03-10",
      type: "regular",
      notes: "Sempre agenda com antecedência",
      preferences: ["Cortes clássicos", "Escova"],
      nextAppointment: null,
      status: "inativo",
    },
    {
      id: 5,
      name: "Amanda Souza",
      email: "amanda@email.com",
      phone: "(11) 98765-4325",
      avatar: "/placeholder.svg?height=100&width=100",
      totalServices: 6,
      totalSpent: 480.0,
      lastService: "Corte de Cabelo",
      lastServiceDate: "2024-03-20",
      averageRating: 4.6,
      clientSince: "2023-08-05",
      type: "regular",
      notes: "Prefere manter sempre o mesmo corte",
      preferences: ["Cortes simples"],
      nextAppointment: null,
      status: "ativo",
    },
  ]

  const filteredClientes = clientes
    .filter((cliente) => {
      const matchesSearch =
        cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.phone.includes(searchTerm)

      const matchesFilter =
        filterType === "todos" ||
        cliente.type === filterType ||
        (filterType === "ativos" && cliente.status === "ativo") ||
        (filterType === "inativos" && cliente.status === "inativo")

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "nome":
          return a.name.localeCompare(b.name)
        case "gastos":
          return b.totalSpent - a.totalSpent
        case "servicos":
          return b.totalServices - a.totalServices
        case "ultimo-servico":
          return new Date(b.lastServiceDate).getTime() - new Date(a.lastServiceDate).getTime()
        default:
          return 0
      }
    })

  const getClientTypeBadge = (type: string) => {
    switch (type) {
      case "vip":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">VIP</Badge>
      case "regular":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Regular</Badge>
      case "novo":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Novo</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
      case "inativo":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inativo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
      ))
  }

  const estatisticas = {
    totalClientes: clientes.length,
    clientesAtivos: clientes.filter((c) => c.status === "ativo").length,
    clientesVIP: clientes.filter((c) => c.type === "vip").length,
    ticketMedio: clientes.reduce((acc, c) => acc + c.totalSpent, 0) / clientes.length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Clientes</h1>
          <p className="text-muted-foreground">Gerencie seu relacionamento com os clientes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
              <DialogDescription>Adicione um novo cliente à sua base</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome-cliente">Nome Completo</Label>
                <Input id="nome-cliente" placeholder="Nome do cliente" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-cliente">E-mail</Label>
                <Input id="email-cliente" type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone-cliente">Telefone</Label>
                <Input id="telefone-cliente" placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes-cliente">Observações</Label>
                <Textarea id="observacoes-cliente" placeholder="Preferências, alergias, etc." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Adicionar Cliente</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.totalClientes}</div>
            <p className="text-xs text-muted-foreground">Na sua base</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.clientesAtivos}</div>
            <p className="text-xs text-muted-foreground">Com agendamentos recentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes VIP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.clientesVIP}</div>
            <p className="text-xs text-muted-foreground">Clientes especiais</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {estatisticas.ticketMedio.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Por cliente</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lista">
        <TabsList>
          <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="aniversarios">Aniversários</TabsTrigger>
          <TabsTrigger value="inativos">Clientes Inativos</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email ou telefone..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filtrar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="ativos">Ativos</SelectItem>
                    <SelectItem value="inativos">Inativos</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nome">Nome</SelectItem>
                    <SelectItem value="gastos">Gastos</SelectItem>
                    <SelectItem value="servicos">Serviços</SelectItem>
                    <SelectItem value="ultimo-servico">Último Serviço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de clientes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClientes.map((cliente) => (
              <Card key={cliente.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                        {cliente.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{cliente.name}</CardTitle>
                        <CardDescription>{cliente.email}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {getClientTypeBadge(cliente.type)}
                      {getStatusBadge(cliente.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Serviços:</span>
                      <p className="font-medium">{cliente.totalServices}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total gasto:</span>
                      <p className="font-medium">R$ {cliente.totalSpent.toFixed(2).replace(".", ",")}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Último serviço:</span>
                      <p className="font-medium">{cliente.lastService}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Data:</span>
                      <p className="font-medium">{new Date(cliente.lastServiceDate).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Avaliação:</span>
                    <div className="flex">{renderStars(cliente.averageRating)}</div>
                    <span className="text-sm">{cliente.averageRating}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{cliente.phone}</span>
                  </div>

                  {cliente.nextAppointment && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Próximo: {new Date(cliente.nextAppointment).toLocaleDateString("pt-BR")}</span>
                    </div>
                  )}

                  {cliente.notes && <p className="text-sm text-muted-foreground italic">"{cliente.notes}"</p>}
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Mensagem
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Perfil do Cliente - {cliente.name}</DialogTitle>
                          <DialogDescription>Informações detalhadas do cliente</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Informações Pessoais</h4>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <span className="text-muted-foreground">Nome:</span> {cliente.name}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Email:</span> {cliente.email}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Telefone:</span> {cliente.phone}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Cliente desde:</span>{" "}
                                  {new Date(cliente.clientSince).toLocaleDateString("pt-BR")}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Estatísticas</h4>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <span className="text-muted-foreground">Total de serviços:</span>{" "}
                                  {cliente.totalServices}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Total gasto:</span> R${" "}
                                  {cliente.totalSpent.toFixed(2).replace(".", ",")}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Ticket médio:</span> R${" "}
                                  {(cliente.totalSpent / cliente.totalServices).toFixed(2).replace(".", ",")}
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">Avaliação média:</span>
                                  <div className="flex">{renderStars(cliente.averageRating)}</div>
                                  <span>{cliente.averageRating}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Preferências</h4>
                            <div className="flex flex-wrap gap-2">
                              {cliente.preferences.map((pref, index) => (
                                <Badge key={index} variant="secondary">
                                  {pref}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {cliente.notes && (
                            <div>
                              <h4 className="font-medium mb-2">Observações</h4>
                              <p className="text-sm text-muted-foreground">{cliente.notes}</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClientes.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum cliente encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Tente buscar por outro termo" : "Você ainda não tem clientes cadastrados"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Adicionar Primeiro Cliente</Button>
                </DialogTrigger>
              </Dialog>
            </div>
          )}
        </TabsContent>

        <TabsContent value="aniversarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aniversários do Mês</CardTitle>
              <CardDescription>Clientes que fazem aniversário este mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum aniversário este mês</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inativos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Inativos</CardTitle>
              <CardDescription>Clientes que não agendam há mais de 3 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientes
                  .filter((c) => c.status === "inativo")
                  .map((cliente) => (
                    <div key={cliente.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                          {cliente.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium">{cliente.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Último serviço: {new Date(cliente.lastServiceDate).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Reativar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Agendar
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
