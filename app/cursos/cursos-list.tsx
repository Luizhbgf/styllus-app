"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from "lucide-react"

export function CursosList() {
  const [category, setCategory] = useState("todos")

  const cursos = [
    {
      id: 1,
      title: "Técnicas Avançadas de Coloração",
      category: "cabelo",
      image: "/placeholder.svg?height=300&width=500",
      instructor: "Ana Silva",
      duration: "20 horas",
      date: "15/06/2025 a 20/06/2025",
      price: "R$ 1.200,00",
      spots: 12,
      spotsAvailable: 5,
      level: "Avançado",
      description:
        "Aprenda técnicas avançadas de coloração, incluindo balayage, ombré e mechas. Curso prático com materiais inclusos.",
    },
    {
      id: 2,
      title: "Corte Masculino Moderno",
      category: "barba",
      image: "/placeholder.svg?height=300&width=500",
      instructor: "Carlos Oliveira",
      duration: "16 horas",
      date: "10/07/2025 a 12/07/2025",
      price: "R$ 980,00",
      spots: 10,
      spotsAvailable: 3,
      level: "Intermediário",
      description:
        "Domine as técnicas de corte masculino moderno, incluindo fade, pompadour e texturas. Curso prático com certificado.",
    },
    {
      id: 3,
      title: "Nail Art Profissional",
      category: "manicure",
      image: "/placeholder.svg?height=300&width=500",
      instructor: "Juliana Santos",
      duration: "24 horas",
      date: "05/08/2025 a 10/08/2025",
      price: "R$ 1.450,00",
      spots: 8,
      spotsAvailable: 2,
      level: "Avançado",
      description:
        "Aprenda técnicas avançadas de nail art, incluindo desenhos, adesivos e efeitos especiais. Kit de materiais incluso.",
    },
    {
      id: 4,
      title: "Tratamentos Capilares Avançados",
      category: "cabelo",
      image: "/placeholder.svg?height=300&width=500",
      instructor: "Rafael Costa",
      duration: "12 horas",
      date: "20/06/2025 a 22/06/2025",
      price: "R$ 850,00",
      spots: 15,
      spotsAvailable: 8,
      level: "Intermediário",
      description:
        "Aprenda a identificar e tratar problemas capilares como queda, ressecamento e danos químicos com técnicas avançadas.",
    },
    {
      id: 5,
      title: "Maquiagem Profissional para Eventos",
      category: "maquiagem",
      image: "/placeholder.svg?height=300&width=500",
      instructor: "Fernanda Lima",
      duration: "18 horas",
      date: "15/07/2025 a 18/07/2025",
      price: "R$ 1.100,00",
      spots: 12,
      spotsAvailable: 6,
      level: "Intermediário",
      description:
        "Aprenda técnicas de maquiagem profissional para eventos, casamentos e festas. Inclui kit básico de produtos.",
    },
    {
      id: 6,
      title: "Estética Facial Avançada",
      category: "estetica",
      image: "/placeholder.svg?height=300&width=500",
      instructor: "Mariana Costa",
      duration: "30 horas",
      date: "01/09/2025 a 10/09/2025",
      price: "R$ 1.800,00",
      spots: 8,
      spotsAvailable: 4,
      level: "Avançado",
      description:
        "Curso completo de estética facial com técnicas avançadas de limpeza, hidratação e rejuvenescimento. Certificação internacional.",
    },
  ]

  const filteredCursos = category === "todos" ? cursos : cursos.filter((c) => c.category === category)

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
        {filteredCursos.map((curso) => (
          <Card key={curso.id} className="flex flex-col">
            <div className="relative h-48">
              <Image src={curso.image || "/placeholder.svg"} alt={curso.title} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  {curso.level}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-1">{curso.title}</CardTitle>
              <CardDescription>Instrutor: {curso.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-2">{curso.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{curso.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{curso.date}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{curso.spotsAvailable} vagas disponíveis</span>
                </div>
                <div className="flex items-center font-medium text-primary">{curso.price}</div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full" asChild>
                <Link href={`/cursos/${curso.id}`}>Inscrever-se</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
