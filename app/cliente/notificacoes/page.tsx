"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Calendar,
  CreditCard,
  Heart,
  MessageSquare,
  Star,
  Gift,
  Check,
  Trash2,
  Settings,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
} from "lucide-react"

export default function ClienteNotificacoes() {
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      type: "agendamento",
      title: "Agendamento Confirmado",
      message: "Seu agendamento com Ana Silva foi confirmado para amanhã às 14:30",
      time: "2 horas atrás",
      read: false,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "promocao",
      title: "Promoção Especial",
      message: "20% de desconto em todos os tratamentos capilares até o final do mês!",
      time: "1 dia atrás",
      read: false,
      icon: Gift,
      color: "text-green-600",
    },
    {
      id: 3,
      type: "avaliacao",
      title: "Avalie seu último serviço",
      message: "Como foi sua experiência com o corte de cabelo da Ana Silva?",
      time: "2 dias atrás",
      read: true,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      id: 4,
      type: "pagamento",
      title: "Pagamento Processado",
      message: "Seu pagamento de R$ 80,00 foi processado com sucesso",
      time: "3 dias atrás",
      read: true,
      icon: CreditCard,
      color: "text-green-600",
    },
    {
      id: 5,
      type: "lembrete",
      title: "Lembrete de Agendamento",
      message: "Você tem um agendamento amanhã às 14:30 com Ana Silva",
      time: "1 semana atrás",
      read: true,
      icon: Bell,
      color: "text-blue-600",
    },
    {
      id: 6,
      type: "favorito",
      title: "Profissional Favorito Disponível",
      message: "Ana Silva tem horários disponíveis para esta semana",
      time: "1 semana atrás",
      read: true,
      icon: Heart,
      color: "text-red-600",
    },
    {
      id: 7,
      type: "mensagem",
      title: "Nova Mensagem",
      message: "Ana Silva enviou uma mensagem sobre seu próximo agendamento",
      time: "2 semanas atrás",
      read: true,
      icon: MessageSquare,
      color: "text-purple-600",
    },
  ])

  const [configuracoes, setConfiguracoes] = useState({
    agendamentos: {
      push: true,
      email: true,
      sms: false,
    },
    promocoes: {
      push: true,
      email: true,
      sms: false,
    },
    lembretes: {
      push: true,
      email: false,
      sms: true,
    },
    avaliacoes: {
      push: true,
      email: false,
      sms: false,
    },
    pagamentos: {
      push: true,
      email: true,
      sms: false,
    },
    mensagens: {
      push: true,
      email: true,
      sms: false,
    },
    geral: {
      silencioso: false,
      naoPerturbar: false,
      horarioInicio: "22:00",
      horarioFim: "08:00",
    },
  })

  const marcarComoLida = (id: number) => {
    setNotificacoes((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const excluirNotificacao = (id: number) => {
    setNotificacoes((prev) => prev.filter((notif) => notif.id !== id))
  }

  const notificacaosPorTipo = {
    todas: notificacoes,
    naoLidas: notificacoes.filter((n) => !n.read),
    agendamentos: notificacoes.filter((n) => n.type === "agendamento" || n.type === "lembrete"),
    promocoes: notificacoes.filter((n) => n.type === "promocao"),
    pagamentos: notificacoes.filter((n) => n.type === "pagamento"),
  }

  const updateConfiguracao = (categoria: string, tipo: string, valor: boolean) => {
    setConfiguracoes((prev) => ({
      ...prev,
      [categoria]: {
        ...prev[categoria as keyof typeof prev],
        [tipo]: valor,
      },
    }))
  }

  const updateConfiguracaoGeral = (campo: string, valor: boolean | string) => {
    setConfiguracoes((prev) => ({
      ...prev,
      geral: {
        ...prev.geral,
        [campo]: valor,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
          <p className="text-muted-foreground">Gerencie suas notificações e preferências</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={marcarTodasComoLidas}>
            <Check className="h-4 w-4 mr-2" />
            Marcar Todas como Lidas
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="todas">
        <TabsList>
          <TabsTrigger value="todas">Todas ({notificacoes.length})</TabsTrigger>
          <TabsTrigger value="naoLidas">Não Lidas ({notificacaosPorTipo.naoLidas.length})</TabsTrigger>
          <TabsTrigger value="agendamentos">Agendamentos ({notificacaosPorTipo.agendamentos.length})</TabsTrigger>
          <TabsTrigger value="promocoes">Promoções ({notificacaosPorTipo.promocoes.length})</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        {Object.entries(notificacaosPorTipo).map(([tipo, lista]) => (
          <TabsContent key={tipo} value={tipo} className="space-y-4">
            {lista.length > 0 ? (
              <div className="space-y-3">
                {lista.map((notificacao) => {
                  const IconComponent = notificacao.icon
                  return (
                    <Card
                      key={notificacao.id}
                      className={`cursor-pointer transition-colors ${
                        !notificacao.read ? "bg-blue-50 border-blue-200" : ""
                      }`}
                      onClick={() => marcarComoLida(notificacao.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full bg-gray-100 ${notificacao.color}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{notificacao.title}</h3>
                              {!notificacao.read && (
                                <Badge variant="default" className="text-xs">
                                  Nova
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notificacao.message}</p>
                            <p className="text-xs text-muted-foreground">{notificacao.time}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              excluirNotificacao(notificacao.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma notificação</h3>
                <p className="text-muted-foreground">
                  {tipo === "naoLidas"
                    ? "Você está em dia! Não há notificações não lidas."
                    : "Não há notificações nesta categoria."}
                </p>
              </div>
            )}
          </TabsContent>
        ))}

        <TabsContent value="configuracoes" className="space-y-6">
          {/* Configurações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configure as preferências gerais de notificação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Modo Silencioso</Label>
                  <p className="text-sm text-muted-foreground">Desabilita todas as notificações sonoras</p>
                </div>
                <div className="flex items-center gap-2">
                  {configuracoes.geral.silencioso ? (
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Switch
                    checked={configuracoes.geral.silencioso}
                    onCheckedChange={(checked) => updateConfiguracaoGeral("silencioso", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Não Perturbar</Label>
                  <p className="text-sm text-muted-foreground">Silencia notificações durante o horário especificado</p>
                </div>
                <Switch
                  checked={configuracoes.geral.naoPerturbar}
                  onCheckedChange={(checked) => updateConfiguracaoGeral("naoPerturbar", checked)}
                />
              </div>

              {configuracoes.geral.naoPerturbar && (
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div className="space-y-2">
                    <Label htmlFor="horario-inicio">Das</Label>
                    <input
                      id="horario-inicio"
                      type="time"
                      value={configuracoes.geral.horarioInicio}
                      onChange={(e) => updateConfiguracaoGeral("horarioInicio", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="horario-fim">Até</Label>
                    <input
                      id="horario-fim"
                      type="time"
                      value={configuracoes.geral.horarioFim}
                      onChange={(e) => updateConfiguracaoGeral("horarioFim", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configurações por Categoria */}
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Notificação</CardTitle>
              <CardDescription>Configure como você quer receber cada tipo de notificação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: "agendamentos", label: "Agendamentos", desc: "Confirmações e alterações de agendamentos" },
                { key: "lembretes", label: "Lembretes", desc: "Lembretes de agendamentos próximos" },
                { key: "promocoes", label: "Promoções", desc: "Ofertas especiais e descontos" },
                { key: "avaliacoes", label: "Avaliações", desc: "Solicitações para avaliar serviços" },
                { key: "pagamentos", label: "Pagamentos", desc: "Confirmações e cobranças de pagamento" },
                { key: "mensagens", label: "Mensagens", desc: "Mensagens de profissionais" },
              ].map((categoria) => (
                <div key={categoria.key} className="space-y-3">
                  <div>
                    <h4 className="font-medium">{categoria.label}</h4>
                    <p className="text-sm text-muted-foreground">{categoria.desc}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 ml-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <Label className="text-sm">Push</Label>
                      </div>
                      <Switch
                        checked={configuracoes[categoria.key as keyof typeof configuracoes]?.push || false}
                        onCheckedChange={(checked) => updateConfiguracao(categoria.key, "push", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Label className="text-sm">Email</Label>
                      </div>
                      <Switch
                        checked={configuracoes[categoria.key as keyof typeof configuracoes]?.email || false}
                        onCheckedChange={(checked) => updateConfiguracao(categoria.key, "email", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <Label className="text-sm">SMS</Label>
                      </div>
                      <Switch
                        checked={configuracoes[categoria.key as keyof typeof configuracoes]?.sms || false}
                        onCheckedChange={(checked) => updateConfiguracao(categoria.key, "sms", checked)}
                      />
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
