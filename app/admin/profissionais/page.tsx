"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Star, Search, Download, Eye, Edit, Trash2, UserPlus, CheckCircle } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminProfissionaisPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedProfissional, setSelectedProfissional] = useState<any>(null)

  // Mock data
  const profissionais = [
    {
      id: 1,
      nome: "Ana Costa",
      email: "ana@email.com",
      telefone: "(11) 99999-1111",
      especialidade: "Cabelo",
      avaliacao: 4.8,
      totalAvaliacoes: 156,
      status: "ativo",
      dataRegistro: "2023-01-15",
      totalServicos: 234,
      faturamento: 15600,
      endereco: "São Paulo, SP",
      foto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      nome: "Carlos Lima",
      email: "carlos@email.com",
      telefone: "(11) 99999-2222",
      especialidade: "Massagem",
      avaliacao: 4.9,
      totalAvaliacoes: 89,
      status: "ativo",
      dataRegistro: "2023-02-20",
      totalServicos: 167,
      faturamento: 20100,
      endereco: "Rio de Janeiro, RJ",
      foto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      nome: "Beatriz Oliveira",
      email: "beatriz@email.com",
      telefone: "(11) 99999-3333",
      especialidade: "Unhas",
      avaliacao: 4.7,
      totalAvaliacoes: 203,
      status: "inativo",
      dataRegistro: "2023-03-10",
      totalServicos: 145,
      faturamento: 8700,
      endereco: "Belo Horizonte, MG",
      foto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      nome: "Diego Santos",
      email: "diego@email.com",
      telefone: "(11) 99999-4444",
      especialidade: "Estética",
      avaliacao: 4.6,
      totalAvaliacoes: 78,
      status: "pendente",
      dataRegistro: "2024-01-05",
      totalServicos: 23,
      faturamento: 2300,
      endereco: "Salvador, BA",
      foto: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "inativo":
        return "bg-red-100 text-red-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredProfissionais = profissionais.filter((profissional) => {
    const matchesSearch =
      profissional.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profissional.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profissional.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || profissional.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalProfissionais = profissionais.length
  const profissionaisAtivos = profissionais.filter((p) => p.status === "ativo").length
  const avaliacaoMedia = (profissionais.reduce((sum, p) => sum + p.avaliacao, 0) / totalProfissionais).toFixed(1)
  const faturamentoTotal = profissionais.reduce((sum, p) => sum + p.faturamento, 0)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profissionais</h1>
          <p className="text-muted-foreground">Gerencie todos os profissionais cadastrados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Profissional
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Profissionais</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProfissionais}</div>
            <p className="text-xs text-muted-foreground">Cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profissionais Ativos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profissionaisAtivos}</div>
            <p className="text-xs text-muted-foreground">Em atividade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avaliacaoMedia}</div>
            <p className="text-xs text-muted-foreground">De 5 estrelas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {faturamentoTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
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
                  placeholder="Buscar por nome, especialidade ou email..."
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
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Profissionais */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Profissionais</CardTitle>
          <CardDescription>{filteredProfissionais.length} profissional(is) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profissional</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Serviços</TableHead>
                <TableHead>Faturamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfissionais.map((profissional) => (
                <TableRow key={profissional.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={profissional.foto || "/placeholder.svg"} />
                        <AvatarFallback>
                          {profissional.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{profissional.nome}</div>
                        <div className="text-sm text-muted-foreground">{profissional.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{profissional.especialidade}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{profissional.avaliacao}</span>
                      <span className="text-sm text-muted-foreground">({profissional.totalAvaliacoes})</span>
                    </div>
                  </TableCell>
                  <TableCell>{profissional.totalServicos}</TableCell>
                  <TableCell>R$ {profissional.faturamento.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(profissional.status)}>{profissional.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedProfissional(profissional)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalhes do Profissional</DialogTitle>
                            <DialogDescription>Informações completas do profissional</DialogDescription>
                          </DialogHeader>
                          {selectedProfissional && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={selectedProfissional.foto || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {selectedProfissional.nome
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-semibold">{selectedProfissional.nome}</h3>
                                  <p className="text-muted-foreground">{selectedProfissional.especialidade}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Email</Label>
                                  <p className="font-medium">{selectedProfissional.email}</p>
                                </div>
                                <div>
                                  <Label>Telefone</Label>
                                  <p className="font-medium">{selectedProfissional.telefone}</p>
                                </div>
                                <div>
                                  <Label>Localização</Label>
                                  <p className="font-medium">{selectedProfissional.endereco}</p>
                                </div>
                                <div>
                                  <Label>Data de Registro</Label>
                                  <p className="font-medium">
                                    {new Date(selectedProfissional.dataRegistro).toLocaleDateString("pt-BR")}
                                  </p>
                                </div>
                                <div>
                                  <Label>Total de Serviços</Label>
                                  <p className="font-medium">{selectedProfissional.totalServicos}</p>
                                </div>
                                <div>
                                  <Label>Faturamento</Label>
                                  <p className="font-medium">R$ {selectedProfissional.faturamento.toLocaleString()}</p>
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
