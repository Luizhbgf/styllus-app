"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Search, Play, Download, CheckCircle, BookOpen } from "lucide-react"

export default function ClienteCursos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")

  const meusCursos = [
    {
      id: 1,
      title: "Técnicas Básicas de Automaquiagem",
      instructor: "Fernanda Lima",
      image: "/placeholder.svg?height=200&width=300",
      status: "em-andamento",
      progress: 65,
      totalLessons: 12,
      completedLessons: 8,
      duration: "8 horas",
      enrollDate: "15/04/2024",
      completionDate: null,
      certificate: null,
      category: "Maquiagem",
      description: "Aprenda técnicas básicas para se maquiar no dia a dia",
      nextLesson: "Maquiagem para o trabalho",
      price: "R$ 150,00",
    },
    {
      id: 2,
      title: "Cuidados Capilares em Casa",
      instructor: "Rafael Costa",
      image: "/placeholder.svg?height=200&width=300",
      status: "concluido",
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
      duration: "6 horas",
      enrollDate: "01/03/2024",
      completionDate: "25/03/2024",
      certificate: "certificado-cuidados-capilares.pdf",
      category: "Cabelo",
      description: "Aprenda a cuidar dos seus cabelos em casa com produtos naturais",
      nextLesson: null,
      price: "R$ 120,00",
    },
    {
      id: 3,
      title: "Nail Art para Iniciantes",
      instructor: "Juliana Santos",
      image: "/placeholder.svg?height=200&width=300",
      status: "nao-iniciado",
      progress: 0,
      totalLessons: 10,
      completedLessons: 0,
      duration: "12 horas",
      enrollDate: "20/05/2024",
      completionDate: null,
      certificate: null,
      category: "Unhas",
      description: "Técnicas básicas de nail art para fazer em casa",
      nextLesson: "Introdução ao nail art",
      price: "R$ 180,00",
    },
  ]

  const cursosDisponiveis = [
    {
      id: 4,
      title: "Penteados para Ocasiões Especiais",
      instructor: "Ana Silva",
      image: "/placeholder.svg?height=200&width=300",
      duration: "10 horas",
      lessons: 15,
      price: "R$ 200,00",
      rating: 4.8,
      students: 234,
      category: "Cabelo",
      description: "Aprenda a fazer penteados elegantes para festas e eventos",
      level: "Intermediário",
    },
    {
      id: 5,
      title: "Coloração Caseira Segura",
      instructor: "Ana Silva",
      image: "/placeholder.svg?height=200&width=300",
      duration: "8 horas",
      lessons: 12,
      price: "R$ 160,00",
      rating: 4.9,
      students: 189,
      category: "Cabelo",
      description: "Técnicas seguras para colorir o cabelo em casa",
      level: "Iniciante",
    },
    {
      id: 6,
      title: "Massagem Relaxante",
      instructor: "Mariana Costa",
      image: "/placeholder.svg?height=200&width=300",
      duration: "6 horas",
      lessons: 8,
      price: "R$ 140,00",
      rating: 4.7,
      students: 156,
      category: "Bem-estar",
      description: "Aprenda técnicas de massagem para relaxamento",
      level: "Iniciante",
    },
  ]

  const filteredMeusCursos = meusCursos.filter((curso) => {
    const matchesSearch =
      curso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "todos" || curso.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Concluído</Badge>
      case "em-andamento":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Em Andamento</Badge>
      case "nao-iniciado":
        return <Badge variant="outline">Não Iniciado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "em-andamento":
        return <Play className="h-5 w-5 text-blue-600" />
      case "nao-iniciado":
        return <BookOpen className="h-5 w-5 text-muted-foreground" />
      default:
        return <BookOpen className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meus Cursos</h1>
        <p className="text-muted-foreground">Acompanhe seu progresso e continue aprendendo</p>
      </div>

      <Tabs defaultValue="meus-cursos">
        <TabsList>
          <TabsTrigger value="meus-cursos">Meus Cursos ({meusCursos.length})</TabsTrigger>
          <TabsTrigger value="disponiveis">Cursos Disponíveis</TabsTrigger>
        </TabsList>

        <TabsContent value="meus-cursos" className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar nos meus cursos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status do curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="em-andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="nao-iniciado">Não Iniciado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lista de cursos */}
          {filteredMeusCursos.length > 0 ? (
            <div className="space-y-4">
              {filteredMeusCursos.map((curso) => (
                <Card key={curso.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative w-full md:w-48 h-32">
                        <Image
                          src={curso.image || "/placeholder.svg"}
                          alt={curso.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute top-2 left-2">{getStatusIcon(curso.status)}</div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-semibold">{curso.title}</h3>
                            <p className="text-muted-foreground">Instrutor: {curso.instructor}</p>
                            <p className="text-sm text-muted-foreground mt-1">{curso.description}</p>
                          </div>
                          {getStatusBadge(curso.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Progresso:</span>
                            <p className="font-medium">{curso.progress}%</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Aulas:</span>
                            <p className="font-medium">
                              {curso.completedLessons}/{curso.totalLessons}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Duração:</span>
                            <p className="font-medium">{curso.duration}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Categoria:</span>
                            <p className="font-medium">{curso.category}</p>
                          </div>
                        </div>

                        {curso.status !== "nao-iniciado" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progresso do curso</span>
                              <span>{curso.progress}%</span>
                            </div>
                            <Progress value={curso.progress} className="h-2" />
                          </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="text-sm text-muted-foreground">
                            {curso.status === "em-andamento" && curso.nextLesson && (
                              <p>Próxima aula: {curso.nextLesson}</p>
                            )}
                            {curso.status === "concluido" && curso.completionDate && (
                              <p>Concluído em: {curso.completionDate}</p>
                            )}
                            {curso.status === "nao-iniciado" && <p>Inscrito em: {curso.enrollDate}</p>}
                          </div>
                          <div className="flex gap-2">
                            {curso.status === "concluido" && curso.certificate && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Certificado
                              </Button>
                            )}
                            <Button size="sm">{curso.status === "nao-iniciado" ? "Iniciar Curso" : "Continuar"}</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum curso encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Tente buscar por outro termo" : "Você ainda não se inscreveu em nenhum curso"}
              </p>
              <Button onClick={() => document.querySelector('[value="disponiveis"]')?.click()}>
                Explorar Cursos Disponíveis
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="disponiveis" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosDisponiveis.map((curso) => (
              <Card key={curso.id}>
                <div className="relative h-48">
                  <Image
                    src={curso.image || "/placeholder.svg"}
                    alt={curso.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">{curso.level}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{curso.title}</CardTitle>
                  <CardDescription>Instrutor: {curso.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{curso.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{curso.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{curso.lessons} aulas</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{curso.students} alunos</span>
                    </div>
                    <div className="flex items-center font-medium text-primary">{curso.price}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(curso.rating) ? "text-primary" : "text-muted"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                    <span className="ml-2 text-sm">{curso.rating}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/cursos/${curso.id}`}>Ver Detalhes</Link>
                  </Button>
                  <Button>Inscrever-se</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
