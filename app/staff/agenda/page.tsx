"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, User, Phone, MessageSquare, Check, X, Plus, Edit } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function StaffAgenda() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState("dia")

  const agendamentos = [
    {
      id: 1,
      date: new Date(),
      time: "09:00",
      duration: "45 min",
      client: {
        name: "Maria Silva",
        phone: "(11) 98765-4321",
        email: "maria@email.com",
        isNew: false,
      },
      service: "Corte de Cabelo",
      price: "R$ 80,00",
      status: "confirmado",
      notes: "Cliente prefere corte mais curto",
      paymentMethod: "Cartão de Crédito",
    },
    {
      id: 2,
      date: new Date(),
      time: "10:30",
      duration: "2h",
      client: {
        name: "Carla Santos",
        phone: "(11) 98765-4322",
        email: "carla@email.com",
        isNew: false,
      },
      service: "Coloração",
      price: "R$ 150,00",
      status: "confirmado",
      notes: "Quer um tom mais claro",
      paymentMethod: "PIX",
    },
    {
      id: 3,
      date: new Date(),
      time: "13:00",
      duration: "1h",
      client: {
        name: "Fernanda Lima",
        phone: "(11) 98765-4323",
        email: "fernanda@email.com",
        isNew: true,
      },
      service: "Hidratação",
      price: "R$ 120,00",
      status: "pendente",
      notes: "Primeira vez no salão",
      paymentMethod: "Dinheiro",
    },
    {
      id: 4,
      date: new Date(),
      time: "14:30",
      duration: "1h 30min",
      client: {
        name: "Juliana Martins",
        phone: "(11) 98765-4324",
        email: "juliana@email.com",
        isNew: false,
      },
      service: "Corte e Escova",
      price: "R$ 120,00",
      status: "confirmado",
      notes: "",
      paymentMethod: "Cartão de Débito",
    },
    {
      id: 5,
      date: new Date(),
      time: "16:00",
      duration: "45 min",
      client: {
        name: "Amanda Souza",
        phone: "(11) 98765-4325",
        email: "amanda@email.com",
        isNew: false,
      },
      service: "Corte de Cabelo",
      price: "R$ 80,00",
      status: "confirmado",
      notes: "Manter o mesmo corte",
      paymentMethod: "PIX",
    },
  ]

  const horariosDisponiveis = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmado</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendente</Badge>
      case "cancelado":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelado</Badge>
      case "concluido":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Concluído</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const confirmarAgendamento = (id: number) => {
    // Lógica para confirmar agendamento
    console.log("Confirmando agendamento:", id)
  }

  const cancelarAgendamento = (id: number) => {
    // Lógica para cancelar agendamento
    console.log("Cancelando agendamento:", id)
  }

  const concluirAgendamento = (id: number) => {
    // Lógica para concluir agendamento
    console.log("Concluindo agendamento:", id)
  }

  const agendamentosHoje = agendamentos.filter(
    (agendamento) => agendamento.date.toDateString() === new Date().toDateString(),
  )

  const totalFaturamentoHoje = agendamentosHoje
    .filter((a) => a.status === "confirmado" || a.status === "concluido")
    .reduce((total, agendamento) => {
      const price = Number.parseFloat(agendamento.price.replace("R$ ", "").replace(",", "."))
      return total + price
    }, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minha Agenda</h1>
          <p className="text-muted-foreground">Gerencie seus agendamentos e horários</p>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dia">Dia</SelectItem>
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="mes">Mês</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogDescription>Adicione um novo agendamento à sua agenda</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input id="cliente" placeholder="Nome do cliente" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servico">Serviço</Label>
                  <Select>
                    <SelectTrigger id="servico">
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corte">Corte de Cabelo</SelectItem>
                      <SelectItem value="coloracao">Coloração</SelectItem>
                      <SelectItem value="hidratacao">Hidratação</SelectItem>
                      <SelectItem value="escova">Escova</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <Input id="data" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="horario">Horário</Label>
                    <Select>
                      <SelectTrigger id="horario">
                        <SelectValue placeholder="Horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {horariosDisponiveis.map((horario) => (
                          <SelectItem key={horario} value={horario}>
                            {horario}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea id="observacoes" placeholder="Observações sobre o agendamento" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Agendar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agendamentosHoje.length}</div>
            <p className="text-xs text-muted-foreground">
              {agendamentosHoje.filter((a) => a.status === "pendente").length} pendentes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalFaturamentoHoje.toFixed(2).replace(".", ",")}</div>
            <p className="text-xs text-muted-foreground">Agendamentos confirmados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Próximo Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {agendamentosHoje.length > 0 ? agendamentosHoje[0].client.name : "Nenhum"}
            </div>
            <p className="text-xs text-muted-foreground">
              {agendamentosHoje.length > 0 ? `às ${agendamentosHoje[0].time}` : "agendamento hoje"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">Do horário disponível</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agenda">
        <TabsList>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="disponibilidade">Disponibilidade</TabsTrigger>
        </TabsList>

        <TabsContent value="agenda" className="space-y-4">
          <div className="space-y-4">
            {agendamentosHoje.map((agendamento) => (
              <Card key={agendamento.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-md">
                          {agendamento.time}
                        </div>
                        <h3 className="font-medium text-lg">{agendamento.service}</h3>
                        {getStatusBadge(agendamento.status)}
                        {agendamento.client.isNew && (
                          <Badge variant="outline" className="text-blue-600 border-blue-200">
                            Novo Cliente
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{agendamento.client.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{agendamento.client.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Duração: {agendamento.duration}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p>
                            <span className="text-muted-foreground">Valor:</span> {agendamento.price}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Pagamento:</span> {agendamento.paymentMethod}
                          </p>
                          {agendamento.notes && (
                            <p>
                              <span className="text-muted-foreground">Obs:</span> {agendamento.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Mensagem
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        {agendamento.status === "pendente" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => confirmarAgendamento(agendamento.id)}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Confirmar
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => cancelarAgendamento(agendamento.id)}>
                              <X className="h-4 w-4 mr-2" />
                              Cancelar
                            </Button>
                          </>
                        )}
                        {agendamento.status === "confirmado" && (
                          <Button size="sm" onClick={() => concluirAgendamento(agendamento.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Concluir
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {agendamentosHoje.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum agendamento hoje</h3>
              <p className="text-muted-foreground mb-4">Você não tem agendamentos para hoje.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Adicionar Agendamento</Button>
                </DialogTrigger>
              </Dialog>
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendario" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendário</CardTitle>
                <CardDescription>Selecione uma data para ver os agendamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => {
                    const day = date.getDay()
                    return day === 0 // Desabilita domingos
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Agendamentos - {selectedDate ? format(selectedDate, "dd 'de' MMMM", { locale: ptBR }) : "Hoje"}
                </CardTitle>
                <CardDescription>Agendamentos para o dia selecionado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agendamentosHoje.map((agendamento) => (
                    <div key={agendamento.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{agendamento.time}</span>
                          <span>{agendamento.client.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{agendamento.service}</p>
                      </div>
                      {getStatusBadge(agendamento.status)}
                    </div>
                  ))}
                  {agendamentosHoje.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">Nenhum agendamento para este dia</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disponibilidade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurar Disponibilidade</CardTitle>
              <CardDescription>Defina seus horários de trabalho e bloqueios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Horários de Trabalho</h4>
                {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"].map(
                  (dia) => (
                    <div key={dia} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id={dia} className="h-4 w-4" defaultChecked />
                        <Label htmlFor={dia}>{dia}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="time" defaultValue="08:00" className="w-24" />
                        <span>às</span>
                        <Input type="time" defaultValue="18:00" className="w-24" />
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Intervalo para Almoço</h4>
                <div className="flex items-center gap-2">
                  <Input type="time" defaultValue="12:00" className="w-24" />
                  <span>às</span>
                  <Input type="time" defaultValue="13:00" className="w-24" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Bloqueios Especiais</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input type="date" />
                    <Input type="time" placeholder="Das" />
                    <Input type="time" placeholder="Até" />
                    <Input placeholder="Motivo" />
                    <Button variant="outline" size="sm">
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
