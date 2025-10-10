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
import { Clock, Users, Search, Download, BookOpen, Plus, Edit, Eye, MessageSquare } from "lucide-react"

export default function StaffCursos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")

  const meusCursos = [
    {
      id: 1,
      title: "Técnicas Avançadas de Coloração",
      description: "Aprenda técnicas modernas de coloração e mechas",
      image: "/placeholder.svg?height=200&width=300",
      status: "ministrado",
      students: 25,
      totalEarnings: 3750.0,
      price: 150.0,
      duration: "20 horas",
      lessons: 15,
      rating: 4.8,
      reviews: 18,
      category: "Coloração",
      level: "Avançado",
      createdDate: "2024-01-15",
      lastUpdate: "2024-04-20",
    },
    {
      id: 2,
      title: "Cortes Modernos Femininos",
      description: "Domine os cortes mais modernos e tendências atuais",
      image: "/placeholder.svg?height=200&width=300",
      status: "ativo",
      students: 18,
      totalEarnings: 2160.0,
      price: 120.0,
      duration: "16 horas",
      lessons: 12,
      rating: 4.9,
      reviews: 15,
      category: "Cortes",
      level: "Intermediário",
      createdDate: "2024-02-10",
      lastUpdate: "2024-05-01",
    },
    {
      id: 3,
      title: "Tratamentos Capilares Naturais",
      description: "Aprenda a fazer tratamentos com produtos naturais",
      image: "/placeholder.svg?height=200&width=300",
      status: "rascunho",
      students: 0,
      totalEarnings: 0,
      price: 100.0,
      duration: "12 horas",
      lessons: 10,
      rating: 0,
      reviews: 0,
      category: "Tratamentos",
      level: "Iniciante",
      createdDate: "2024-05-01",
      lastUpdate: "2024-05-10",
    },
  ]

  const cursosDisponiveis = [
    {
      id: 4,
      title: "Marketing Digital para Profissionais de Beleza",
      instructor: "Especialista em Marketing",
      image: "/placeholder.svg?height=200&width=300",
      duration: "8 horas",
      lessons: 12,
      price: "R$ 200,00",
      rating: 4.7,
      students: 156,
      category: "Marketing",
      description: "Aprenda a promover seus serviços nas redes sociais",
      level: "Iniciante",
    },
    {
      id: 5,
      title: "Gestão Financeira para Salões",
      instructor: "Consultor Financeiro",
      image: "/placeholder.svg?height=200&width=300",
      duration: "10 horas",
      lessons: 15,
      price: "R$ 250,00",
      rating: 4.8,
      students: 89,
      category: "Gestão",
      description: "Organize as finanças do seu negócio",
      level: "Intermediário",
    },
    {
      id: 6,
      title: "Atendimento ao Cliente de Excelência",
      instructor: "Especialista em Atendimento",
      image: "/placeholder.svg?height=200&width=300",
      duration: "6 horas",
      lessons: 8,
      price: "R$ 150,00",
      rating: 4.9,
      students: 234,
      category: "Atendimento",
      description: "Técnicas para fidelizar clientes",
      level: "Iniciante",
    },
  ]

  const filteredMeusCursos = meusCursos.filter((curso) => {
    const matchesSearch =
      curso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "todos" || curso.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
      case "ministrado":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Ministrado</Badge>
      case "rascunho":
        return <Badge variant="outline">Rascunho</Badge>
      case "pausado":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pausado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? "text-primary" : "text-muted"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))
  }

  const estatisticas = {
    totalCursos: meusCursos.length,
    cursosAtivos: meusCursos.filter((c) => c.status === "ativo" || c.status === "ministrado").length,
    totalAlunos: meusCursos.reduce((acc, c) => acc + c.students, 0),
    totalFaturamento: meusCursos.reduce((acc, c) => acc + c.totalEarnings, 0),
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Cursos</h1>
          <p className="text-muted-foreground">Gerencie seus cursos e compartilhe conhecimento</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar Novo Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Curso</DialogTitle>
              <DialogDescription>Compartilhe seu conhecimento criando um novo curso</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo-curso">Título do Curso</Label>
                <Input id="titulo-curso" placeholder="Ex: Técnicas de Coloração Avançada" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao-curso">Descrição</Label>
                <Textarea
                  id="descricao-curso"
                  placeholder="Descreva o que os alunos aprenderão..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria-curso">Categoria</Label>
                  <Select>
                    <SelectTrigger id="categoria-curso">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cortes">Cortes</SelectItem>
                      <SelectItem value="coloracao">Coloração</SelectItem>
                      <SelectItem value="tratamentos">Tratamentos</SelectItem>
                      <SelectItem value="penteados">Penteados</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="gestao">Gestão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nivel-curso">Nível</Label>
                  <Select>
                    <SelectTrigger id="nivel-curso">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iniciante">Iniciante</SelectItem>
                      <SelectItem value="intermediario">Intermediário</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preco-curso">Preço (R$)</Label>
                  <Input id="preco-curso" type="number" placeholder="150.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duracao-curso">Duração</Label>
                  <Input id="duracao-curso" placeholder="Ex: 20 horas" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Criar Curso</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Cursos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.totalCursos}</div>
            <p className="text-xs text-muted-foreground">Cursos criados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.cursosAtivos}</div>
            <p className="text-xs text-muted-foreground">Disponíveis para venda</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.totalAlunos}</div>
            <p className="text-xs text-muted-foreground">Inscritos nos cursos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {estatisticas.totalFaturamento.toFixed(2).replace(".", ",")}</div>
            <p className="text-xs text-muted-foreground">Com cursos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="meus-cursos">
        <TabsList>
          <TabsTrigger value="meus-cursos">Meus Cursos ({meusCursos.length})</TabsTrigger>
          <TabsTrigger value="disponiveis">Cursos Disponíveis</TabsTrigger>
          <TabsTrigger value="alunos">Meus Alunos</TabsTrigger>
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
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="ministrado">Ministrado</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
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
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-semibold">{curso.title}</h3>
                            <p className="text-muted-foreground">{curso.description}</p>
                          </div>
                          {getStatusBadge(curso.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Alunos:</span>
                            <p className="font-medium">{curso.students}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Faturamento:</span>
                            <p className="font-medium">R$ {curso.totalEarnings.toFixed(2).replace(".", ",")}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Preço:</span>
                            <p className="font-medium">R$ {curso.price.toFixed(2).replace(".", ",")}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Duração:</span>
                            <p className="font-medium">{curso.duration}</p>
                          </div>
                        </div>

                        {curso.rating > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderStars(curso.rating)}</div>
                            <span className="text-sm">{curso.rating}</span>
                            <span className="text-sm text-muted-foreground">({curso.reviews} avaliações)</span>
                          </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="text-sm text-muted-foreground">
                            <p>
                              Categoria: {curso.category} • Nível: {curso.level}
                            </p>
                            <p>Criado em: {new Date(curso.createdDate).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Ver
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                            {curso.status === "ativo" && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Relatório
                              </Button>
                            )}
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
                {searchTerm ? "Tente buscar por outro termo" : "Você ainda não criou nenhum curso"}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Criar Seu Primeiro Curso</Button>
                </DialogTrigger>
              </Dialog>
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
                    <div className="flex">{renderStars(curso.rating)}</div>
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

        <TabsContent value="alunos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meus Alunos</CardTitle>
              <CardDescription>Alunos inscritos nos seus cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Maria Silva",
                    course: "Técnicas Avançadas de Coloração",
                    progress: 75,
                    joinDate: "2024-03-15",
                  },
                  { name: "Carla Santos", course: "Cortes Modernos Femininos", progress: 45, joinDate: "2024-04-01" },
                  {
                    name: "Fernanda Lima",
                    course: "Técnicas Avançadas de Coloração",
                    progress: 90,
                    joinDate: "2024-02-20",
                  },
                  {
                    name: "Juliana Martins",
                    course: "Cortes Modernos Femininos",
                    progress: 60,
                    joinDate: "2024-03-28",
                  },
                ].map((aluno, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                        {aluno.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium">{aluno.name}</h4>
                        <p className="text-sm text-muted-foreground">{aluno.course}</p>
                        <p className="text-xs text-muted-foreground">
                          Inscrito em: {new Date(aluno.joinDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={aluno.progress} className="w-20 h-2" />
                        <span className="text-sm font-medium">{aluno.progress}%</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Mensagem
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
