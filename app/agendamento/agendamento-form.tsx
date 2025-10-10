"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Check, Clock } from "lucide-react"

export function AgendamentoForm() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedProfessional, setSelectedProfessional] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria a lógica para enviar o agendamento
    alert("Agendamento realizado com sucesso!")
  }

  const availableTimes = [
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
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Agende seu horário</CardTitle>
        <CardDescription>Siga os passos abaixo para agendar seu horário com nossos profissionais</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                    ${step >= i ? "bg-primary border-primary text-primary-foreground" : "bg-background border-muted-foreground text-muted-foreground"}`}
                >
                  {step > i ? <Check className="h-5 w-5" /> : i}
                </div>
                <span className={`text-xs mt-2 ${step >= i ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {i === 1 ? "Serviço" : i === 2 ? "Profissional" : i === 3 ? "Data e Hora" : "Confirmação"}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 w-full h-[2px] bg-muted -z-0">
              <div className="h-full bg-primary transition-all" style={{ width: `${(step - 1) * 33.33}%` }} />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="service-category">Categoria de Serviço</Label>
                <Select onValueChange={(value) => console.log(value)}>
                  <SelectTrigger id="service-category" className="mt-1.5">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cabelo">Cabelo</SelectItem>
                    <SelectItem value="barba">Barba</SelectItem>
                    <SelectItem value="manicure">Manicure e Pedicure</SelectItem>
                    <SelectItem value="maquiagem">Maquiagem</SelectItem>
                    <SelectItem value="depilacao">Depilação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Selecione o Serviço</Label>
                <RadioGroup
                  defaultValue={selectedService}
                  onValueChange={setSelectedService}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {[
                    { id: "corte", label: "Corte de Cabelo", price: "R$ 80,00", duration: "45 min" },
                    { id: "coloracao", label: "Coloração", price: "R$ 150,00", duration: "2h" },
                    { id: "hidratacao", label: "Hidratação", price: "R$ 120,00", duration: "1h" },
                    { id: "escova", label: "Escova", price: "R$ 70,00", duration: "45 min" },
                    { id: "penteado", label: "Penteado", price: "R$ 130,00", duration: "1h 30min" },
                    { id: "progressiva", label: "Progressiva", price: "R$ 250,00", duration: "2h 30min" },
                  ].map((service) => (
                    <div key={service.id} className="relative">
                      <RadioGroupItem value={service.id} id={service.id} className="peer sr-only" />
                      <Label
                        htmlFor={service.id}
                        className="flex flex-col p-4 border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted"
                      >
                        <span className="font-medium">{service.label}</span>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-muted-foreground">{service.price}</span>
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {service.duration}
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Selecione o Profissional</Label>
                <RadioGroup
                  defaultValue={selectedProfessional}
                  onValueChange={setSelectedProfessional}
                  className="grid gap-4 mt-3"
                >
                  {[
                    { id: "ana", name: "Ana Silva", specialty: "Colorista", rating: 4.9 },
                    { id: "carlos", name: "Carlos Oliveira", specialty: "Corte Masculino", rating: 4.8 },
                    { id: "juliana", name: "Juliana Santos", specialty: "Penteados", rating: 4.7 },
                    { id: "rafael", name: "Rafael Costa", specialty: "Tratamentos Capilares", rating: 4.9 },
                  ].map((professional) => (
                    <div key={professional.id} className="relative">
                      <RadioGroupItem value={professional.id} id={professional.id} className="peer sr-only" />
                      <Label
                        htmlFor={professional.id}
                        className="flex items-center p-4 border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted"
                      >
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold mr-4">
                          {professional.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{professional.name}</div>
                          <div className="text-sm text-muted-foreground">{professional.specialty}</div>
                          <div className="flex items-center mt-1">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(professional.rating) ? "text-primary" : "text-muted"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            <span className="ml-1 text-sm text-muted-foreground">{professional.rating}</span>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Selecione a Data</Label>
                  <div className="mt-3 border rounded-md p-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="mx-auto"
                      disabled={(date) => {
                        const day = date.getDay()
                        // Desabilita domingos (0) e datas passadas
                        return day === 0 || date < new Date(new Date().setHours(0, 0, 0, 0))
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label>Selecione o Horário</Label>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`${selectedTime === time ? "" : "hover:bg-muted"}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Resumo do Agendamento</h3>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Serviço</p>
                      <p className="font-medium">Corte de Cabelo</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Profissional</p>
                      <p className="font-medium">Ana Silva</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data</p>
                      <p className="font-medium">{date ? date.toLocaleDateString("pt-BR") : "Não selecionada"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Horário</p>
                      <p className="font-medium">{selectedTime || "Não selecionado"}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="text-lg font-bold">R$ 80,00</p>
                  </div>

                  <div className="pt-4">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Input id="notes" className="mt-1.5" placeholder="Alguma observação para o profissional?" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            Voltar
          </Button>
        ) : (
          <div></div>
        )}
        {step < 4 ? (
          <Button type="button" onClick={handleNext}>
            Próximo
          </Button>
        ) : (
          <Button type="submit" onClick={handleSubmit}>
            Confirmar Agendamento
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
