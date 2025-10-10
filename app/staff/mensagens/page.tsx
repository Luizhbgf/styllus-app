"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MessageSquare, Send, Plus, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"

export default function StaffMensagens() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const conversas = [
    {
      id: 1,
      clientName: "Maria Silva",
      clientAvatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Obrigada pelo excelente atendimento!",
      lastMessageTime: "10:30",
      unreadCount: 0,
      isOnline: true,
      phone: "(11) 98765-4321",
      lastService: "Corte de Cabelo",
      nextAppointment: "2024-05-22",
    },
    {
      id: 2,
      clientName: "Carla Santos",
      clientAvatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Posso remarcar para quinta-feira?",
      lastMessageTime: "09:15",
      unreadCount: 2,
      isOnline: false,
      phone: "(11) 98765-4322",
      lastService: "Coloração",
      nextAppointment: null,
    },
    {
      id: 3,
      clientName: "Fernanda Lima",
      clientAvatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Qual produto você recomenda?",
      lastMessageTime: "Ontem",
      unreadCount: 1,
      isOnline: false,
      phone: "(11) 98765-4323",
      lastService: "Hidratação",
      nextAppointment: "2024-05-20",
    },
    {
      id: 4,
      clientName: "Juliana Martins",
      clientAvatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Perfeito! Até amanhã então.",
      lastMessageTime: "Ontem",
      unreadCount: 0,
      isOnline: true,
      phone: "(11) 98765-4324",
      lastService: "Corte e Escova",
      nextAppointment: "2024-05-21",
    },
  ]

  const mensagens = [
    {
      id: 1,
      conversationId: 1,
      sender: "client",
      message: "Oi Ana! Tudo bem?",
      time: "10:25",
      date: "Hoje",
      type: "text",
    },
    {
      id: 2,
      conversationId: 1,
      sender: "me",
      message: "Oi Maria! Tudo ótimo, e você?",
      time: "10:26",
      date: "Hoje",
      type: "text",
    },
    {
      id: 3,
      conversationId: 1,
      sender: "client",
      message: "Muito bem! Queria agradecer pelo corte de ontem, ficou perfeito!",
      time: "10:27",
      date: "Hoje",
      type: "text",
    },
    {
      id: 4,
      conversationId: 1,
      sender: "me",
      message: "Fico muito feliz que tenha gostado! 😊",
      time: "10:28",
      date: "Hoje",
      type: "text",
    },
    {
      id: 5,
      conversationId: 1,
      sender: "client",
      message: "Obrigada pelo excelente atendimento!",
      time: "10:30",
      date: "Hoje",
      type: "text",
    },
  ]

  const filteredConversas = conversas.filter((conversa) =>
    conversa.clientName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedConversationData = conversas.find((c) => c.id === selectedConversation)
  const conversationMessages = mensagens.filter((m) => m.conversationId === selectedConversation)

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Lógica para enviar mensagem
      console.log("Enviando mensagem:", newMessage)
      setNewMessage("")
    }
  }

  const totalUnread = conversas.reduce((acc, conversa) => acc + conversa.unreadCount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
          <p className="text-muted-foreground">Converse com seus clientes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Conversa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Conversa</DialogTitle>
              <DialogDescription>Inicie uma conversa com um cliente</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cliente-select">Selecionar Cliente</Label>
                <Select>
                  <SelectTrigger id="cliente-select">
                    <SelectValue placeholder="Escolha um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {conversas.map((conversa) => (
                      <SelectItem key={conversa.id} value={conversa.id.toString()}>
                        {conversa.clientName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primeira-mensagem">Primeira Mensagem</Label>
                <Textarea id="primeira-mensagem" placeholder="Digite sua mensagem..." className="min-h-[100px]" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Enviar Mensagem</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de resumo */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Conversas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversas.length}</div>
            <p className="text-xs text-muted-foreground">Conversas ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Não Lidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnread}</div>
            <p className="text-xs text-muted-foreground">Mensagens pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes Online</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversas.filter((c) => c.isOnline).length}</div>
            <p className="text-xs text-muted-foreground">Disponíveis agora</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5min</div>
            <p className="text-xs text-muted-foreground">Tempo médio</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="conversas">
        <TabsList>
          <TabsTrigger value="conversas">Conversas ({conversas.length})</TabsTrigger>
          <TabsTrigger value="arquivadas">Arquivadas</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="conversas" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6 h-[600px]">
            {/* Lista de conversas */}
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar conversas..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {filteredConversas.map((conversa) => (
                    <div
                      key={conversa.id}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                        selectedConversation === conversa.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversa.id)}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                          {conversa.clientName.charAt(0)}
                        </div>
                        {conversa.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">{conversa.clientName}</h4>
                          <span className="text-xs text-muted-foreground">{conversa.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversa.lastMessage}</p>
                      </div>
                      {conversa.unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground min-w-[20px] h-5 text-xs">
                          {conversa.unreadCount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Área de conversa */}
            <Card className="md:col-span-2">
              {selectedConversationData ? (
                <>
                  {/* Header da conversa */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                            {selectedConversationData.clientName.charAt(0)}
                          </div>
                          {selectedConversationData.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{selectedConversationData.clientName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedConversationData.isOnline ? "Online" : "Offline"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Mensagens */}
                  <CardContent className="p-4 h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      {conversationMessages.map((mensagem) => (
                        <div
                          key={mensagem.id}
                          className={`flex ${mensagem.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              mensagem.sender === "me"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{mensagem.message}</p>
                            <p
                              className={`text-xs mt-1 ${
                                mensagem.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {mensagem.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Input de mensagem */}
                  <div className="border-t p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
                    <p className="text-muted-foreground">Escolha uma conversa para começar a conversar</p>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Informações do cliente selecionado */}
          {selectedConversationData && (
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Telefone:</span>
                    <p className="font-medium">{selectedConversationData.phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Último serviço:</span>
                    <p className="font-medium">{selectedConversationData.lastService}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Próximo agendamento:</span>
                    <p className="font-medium">
                      {selectedConversationData.nextAppointment
                        ? new Date(selectedConversationData.nextAppointment).toLocaleDateString("pt-BR")
                        : "Nenhum"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="arquivadas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversas Arquivadas</CardTitle>
              <CardDescription>Conversas que foram arquivadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma conversa arquivada</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Mensagens</CardTitle>
              <CardDescription>Configure suas preferências de mensagens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificações de Mensagem</Label>
                  <p className="text-sm text-muted-foreground">Receba notificações quando receber mensagens</p>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Som de Notificação</Label>
                  <p className="text-sm text-muted-foreground">Reproduzir som ao receber mensagens</p>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Resposta Automática</Label>
                  <p className="text-sm text-muted-foreground">Enviar resposta automática fora do horário</p>
                </div>
                <input type="checkbox" className="h-4 w-4" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resposta-automatica">Mensagem de Resposta Automática</Label>
                <Textarea
                  id="resposta-automatica"
                  placeholder="Obrigada pela sua mensagem! Retornarei assim que possível."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardContent className="pt-0">
              <Button>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
