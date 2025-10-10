"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Users, DollarSign, Clock, Search, Download, Eye, Edit, Trash2, Plus, Star, Play } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function AdminCursosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedCurso, setSelectedCurso] = useState<any>(null)

  // Mock data
  const cursos = [
    {
      id: 1,
      titulo: "Técnicas Avançadas de Corte",
      instrutor: "Ana Costa",
      categoria: "Cabelo",
      preco: 299,
      duracao: "8 horas",
      alunos: 45,
      avaliacao: 4.8,
      totalAvaliacoes: 32,
      status: "ativo",
      dataLancamento: "2023-01-15",
      faturamento: 13455,
      descricao: "Aprenda as técnicas mais modernas de corte de cabelo",
      imagem: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      titulo: "Massagem Terapêutica Completa",
      instrutor: "Carlos Lima",
      categoria: "Massagem",
      preco: 399,
      duracao: "12 horas",
      alunos: 28,
      avaliacao: 4.9,
      totalAvaliacoes: 21,
      status: "ativo",
      dataLancamento: "2023-02-20",
      faturamento: 11172,
      descricao: "Curso completo de massagem terapêutica e relaxante",
      imagem: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      titulo: "Arte em Unhas Decoradas",
      instrutor: "Beatriz Oliveira",
      categoria: "Unhas",
      preco: 199,
      duracao: "6 horas",
      alunos: 67,
      avaliacao: 4.7,
      totalAvaliacoes: 54,
      status: "pausado",
      dataLancamento: "2023-03-10",
      faturamento: 13333,
      descricao: "Técnicas de decoração e nail art profissional",
      imagem: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 4,
      titulo: "Estética Facial Avançada",
      instrutor: "Diego Santos",
      categoria: "Estética",
      preco: 499,
      duracao: "16 horas",
      alunos: 15,
      avaliacao: 4.6,
      totalAvaliacoes: 12,
      status: "rascunho",
      dataLancamento: "2024-01-05",
      faturamento: 7485,
      descricao: "Procedimentos avançados em estética facial",
      imagem: "/placeholder.svg?height=100&width=150",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "pausado":
        return "bg-yellow-100 text-yellow-800"
      case "rascunho":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredCursos = cursos.filter((curso) => {
    const matchesSearch =
      curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.instrutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || curso.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalCursos = cursos.length
  const cursosAtivos = cursos.filter((c) => c.status === "ativo").length
  const totalAlunos = cursos.reduce((sum, c) => sum + c.alunos, 0)
  const faturamentoTotal = cursos.reduce((sum, c) => sum + c.faturamento, 0)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cursos</h1>
          <p className="text-muted-foreground">Gerencie todos os cursos da plataforma</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Curso
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cursos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCursos}</div>
            <p className="text-xs text-muted-foreground">Cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cursosAtivos}</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlunos}</div>
            <p className="text-xs text-muted-foreground">Inscritos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {faturamentoTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total arrecadado</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título, instrutor ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Cursos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Cursos</CardTitle>
          <CardDescription>{filteredCursos.length} curso(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead>Instrutor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Alunos</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCursos.map((curso) => (
                <TableRow key={curso.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={curso.imagem || "/placeholder.svg"}
                        alt={curso.titulo}
                        className="w-12 h-8 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{curso.titulo}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {curso.duracao}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{curso.instrutor}</TableCell>
                  <TableCell>{curso.categoria}</TableCell>
                  <TableCell>R$ {curso.preco}</TableCell>
                  <TableCell>{curso.alunos}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{curso.avaliacao}</span>
                      <span className="text-sm text-muted-foreground">({curso.totalAvaliacoes})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(curso.status)}>{curso.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCurso(curso)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalhes do Curso</DialogTitle>
                            <DialogDescription>Informações completas do curso</DialogDescription>
                          </DialogHeader>
                          {selectedCurso && (
                            <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <img
                                  src={selectedCurso.imagem || "/placeholder.svg"}
                                  alt={selectedCurso.titulo}
                                  className="w-24 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold">{selectedCurso.titulo}</h3>
                                  <p className="text-muted-foreground">{selectedCurso.descricao}</p>
                                  <div className="flex items-center gap-1 mt-2">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{selectedCurso.avaliacao}</span>
                                    <span className="text-sm text-muted-foreground">
                                      ({selectedCurso.totalAvaliacoes} avaliações)
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Instrutor</Label>
                                  <p className="font-medium">{selectedCurso.instrutor}</p>
                                </div>
                                <div>
                                  <Label>Categoria</Label>
                                  <p className="font-medium">{selectedCurso.categoria}</p>
                                </div>
                                <div>
                                  <Label>Preço</Label>
                                  <p className="font-medium">R$ {selectedCurso.preco}</p>
                                </div>
                                <div>
                                  <Label>Duração</Label>
                                  <p className="font-medium">{selectedCurso.duracao}</p>
                                </div>
                                <div>
                                  <Label>Alunos Inscritos</Label>
                                  <p className="font-medium">{selectedCurso.alunos}</p>
                                </div>
                                <div>
                                  <Label>Faturamento</Label>
                                  <p className="font-medium">R$ {selectedCurso.faturamento.toLocaleString()}</p>
                                </div>
                                <div>
                                  <Label>Data de Lançamento</Label>
                                  <p className="font-medium">
                                    {new Date(selectedCurso.dataLancamento).toLocaleDateString("pt-BR")}
                                  </p>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <Badge className={getStatusColor(selectedCurso.status)}>{selectedCurso.status}</Badge>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
