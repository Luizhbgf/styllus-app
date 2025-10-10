"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Star, Clock, Check } from "lucide-react"

export default function ClienteSolicitacao() {
  const searchParams = useSearchParams()
  const profissionalId = searchParams.get("profissional")

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedService, setSelectedService] = useState("")
  const [preferredTime, setPreferredTime] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  // Dados simulados do profissional
  const profissional = {
    id: profissionalId || "1",
    name: "Ana Silva",
    role: "Cabeleireira",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 127,
    services: [
      { id: "corte", name: "Corte de Cabelo", price: "R$ 80,00", duration: "45 min" },
      { id: "coloracao", name: "Coloração", price: "R$ 150,00", duration: "2h" },
      { id: "hidratacao", name: "Hidratação", price: "R$ 120,00", duration: "1h" },
      { id: "escova", name: "Escova", price: "R$ 70,00", duration: "45 min" },
      { id: "penteado", name: "Penteado", price: "R$ 130,00", duration: "1h 30min" },
      { id: "progressiva", name: "Progressiva", price: "R$ 250,00", duration: "2h 30min" },
    ],
    availability: ["Manhã", "Tarde"],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria a lógica para enviar a solicitação
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Solicitação Enviada com Sucesso!</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          Sua solicitação foi enviada para {profissional.name}. Você receberá uma confirmação assim que o profissional
          analisar sua solicitação.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/cliente/profissionais">Voltar para Profissionais</Link>
          </Button>
          <Button asChild>
            <Link href="/cliente/dashboard">Ir para Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Solicitar Horário</h1>
        <p className="text-muted-foreground">Preencha os detalhes para solicitar um horário com o profissional</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profissional</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={profissional.image || "/placeholder.svg"}
                alt={profissional.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="font-medium text-lg">{profissional.name}</h3>
            <p className="text-muted-foreground">{profissional.role}</p>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="ml-1">{profissional.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({profissional.reviews} avaliações)</span>
            </div>
            <div className="mt-4 w-full">
              <h4 className="font-medium text-sm mb-2">Disponibilidade</h4>
              <div className="flex gap-2 justify-center">
                {profissional.availability.map((time) => (
                  <Badge key={time} variant="secondary">
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detalhes da Solicitação</CardTitle>
            <CardDescription>Informe o serviço e horário desejados</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service">Serviço Desejado</Label>
                <Select value={selectedService} onValueChange={setSelectedService} required>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {profissional.services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{service.name}</span>
                          <div className="flex items-center text-muted-foreground text-xs">
                            <span>{service.price}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data Preferencial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        const day = date.getDay()
                        // Desabilita domingos (0) e datas passadas
                        return day === 0 || date < new Date(new Date().setHours(0, 0, 0, 0))
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred-time">Horário Preferencial</Label>
                <Select value={preferredTime} onValueChange={setPreferredTime} required>
                  <SelectTrigger id="preferred-time">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manha">Período da Manhã (8h às 12h)</SelectItem>
                    <SelectItem value="tarde">Período da Tarde (13h às 18h)</SelectItem>
                    <SelectItem value="noite">Período da Noite (18h às 21h)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações (opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Alguma observação ou preferência específica?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Enviar Solicitação
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
            <p>
              Esta é uma solicitação de horário. O profissional irá analisar sua disponibilidade e confirmar o
              agendamento.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Componente Badge para disponibilidade
function Badge({ children, variant }: { children: React.ReactNode; variant: string }) {
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${
        variant === "secondary" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
      }`}
    >
      {children}
    </span>
  )
}
