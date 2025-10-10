"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Instagram, Star } from "lucide-react"

export function ProfissionaisList() {
  const [category, setCategory] = useState("todos")

  const profissionais = [
    {
      id: 1,
      name: "Ana Silva",
      role: "Cabeleireira",
      category: "cabelo",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 127,
      specialties: ["Cortes Femininos", "Coloração", "Mechas"],
      bio: "Especialista em coloração e mechas, com mais de 10 anos de experiência no mercado.",
      instagram: "@anasilva.hair",
    },
    {
      id: 2,
      name: "Carlos Oliveira",
      role: "Barbeiro",
      category: "barba",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 98,
      specialties: ["Cortes Masculinos", "Barba", "Degradê"],
      bio: "Barbeiro especializado em cortes modernos e técnicas de barbear tradicionais.",
      instagram: "@carlosoliveira.barber",
    },
    {
      id: 3,
      name: "Juliana Santos",
      role: "Manicure",
      category: "manicure",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 85,
      specialties: ["Unhas em Gel", "Nail Art", "Alongamento"],
      bio: "Especialista em unhas em gel e nail art, sempre atualizada com as últimas tendências.",
      instagram: "@juliana.nails",
    },
    {
      id: 4,
      name: "Rafael Costa",
      role: "Cabeleireiro",
      category: "cabelo",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 112,
      specialties: ["Tratamentos Capilares", "Cortes", "Penteados"],
      bio: "Especialista em tratamentos capilares e recuperação de cabelos danificados.",
      instagram: "@rafael.hair",
    },
    {
      id: 5,
      name: "Fernanda Lima",
      role: "Maquiadora",
      category: "maquiagem",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 76,
      specialties: ["Maquiagem Social", "Maquiagem para Noivas", "Automaquiagem"],
      bio: "Maquiadora profissional especializada em realçar a beleza natural de cada cliente.",
      instagram: "@fernanda.makeup",
    },
    {
      id: 6,
      name: "Mariana Costa",
      role: "Esteticista",
      category: "estetica",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 92,
      specialties: ["Limpeza de Pele", "Massagem", "Tratamentos Faciais"],
      bio: "Esteticista com formação internacional e especialização em tratamentos faciais avançados.",
      instagram: "@mariana.estetica",
    },
  ]

  const filteredProfissionais =
    category === "todos" ? profissionais : profissionais.filter((p) => p.category === category)

  return (
    <div className="space-y-8">
      <Tabs defaultValue="todos" onValueChange={setCategory}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="cabelo">Cabelo</TabsTrigger>
          <TabsTrigger value="barba">Barba</TabsTrigger>
          <TabsTrigger value="manicure">Manicure</TabsTrigger>
          <TabsTrigger value="maquiagem">Maquiagem</TabsTrigger>
          <TabsTrigger value="estetica">Estética</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfissionais.map((profissional) => (
          <Card key={profissional.id} className="overflow-hidden">
            <div className="relative h-64">
              <Image
                src={profissional.image || "/placeholder.svg"}
                alt={profissional.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{profissional.name}</CardTitle>
                  <CardDescription>{profissional.role}</CardDescription>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="ml-1 font-medium">{profissional.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">({profissional.reviews})</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profissional.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{profissional.bio}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Instagram className="h-4 w-4 mr-1" />
                {profissional.instagram}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/profissionais/${profissional.id}`}>Ver Perfil</Link>
              </Button>
              <Button asChild>
                <Link href={`/agendamento?profissional=${profissional.id}`}>Agendar</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
