"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, DollarSign, Search, Download, Eye, Edit, Trash2, UserPlus, Star } from "lucide-react"
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

export default function AdminClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedCliente, setSelectedCliente] = useState<any>(null)

  // Mock data
  const clientes = [
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      telefone: "(11) 99999-1111",
      endereco: "São Paulo, SP",
      dataRegistro: "2023-01-15",
      ultimoServico: "2024-01-10",
      totalServicos: 15,
      gastoTotal: 1200,
      status: "ativo",
      avaliacaoMedia: 4.8,
      foto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao@email.com",
      telefone: "(11) 99999-2222",
      endereco: "Rio de Janeiro, RJ",
      dataRegistro: "2023-02-20",
      ultimoServico: "2024-01-08",
      totalServicos: 8,
      gastoTotal: 960,
      status: "ativo",
      avaliacaoMedia: 4.9,
      foto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      nome: "Ana Paula",
      email: "ana.paula@email.com",
      telefone: "(11) 99999-3333",
      endereco: "Belo Horizonte, MG",
      dataRegistro: "2023-03-10",
      ultimoServico: "2023-12-15",
      totalServicos: 22,
      gastoTotal: 1760,
      status: "inativo",
      avaliacaoMedia: 4.7,
      foto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      nome: "Pedro Costa",
      email: "pedro@email.com",
      telefone: "(11) 99999-4444",
      endereco: "Salvador, BA",
      dataRegistro: "2024-01-05",
      ultimoServico: "2024-01-12",
      totalServicos: 3,
      gastoTotal: 240,
      status: "novo",
      avaliacaoMedia: 5.0,
      foto: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "inativo":
        return "bg-red-100 text-red-800"
      case "novo":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch =
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.endereco.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || cliente.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalClientes = clientes.length
  const clientesAtivos = clientes.filter((c) => c.status === "ativo").length
  const ticketMedio = clientes.reduce((sum, c) => sum + c.gastoTotal, 0) / totalClientes
  const faturamentoTotal = clientes.reduce((sum, c) => sum + c.gastoTotal, 0)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Gerencie todos os clientes cadastrados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClientes}</div>
            <p className="text-xs text-muted-foreground">Cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientesAtivos}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {ticketMedio.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Por cliente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {faturamentoTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Todos os clientes</p>
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
                  placeholder="Buscar por nome, email ou localização..."
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
                <SelectItem value="novo">Novo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>{filteredClientes.length} cliente(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Serviços</TableHead>
                <TableHead>Gasto Total</TableHead>
                <TableHead>Último Serviço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={cliente.foto || "/placeholder.svg"} />
                        <AvatarFallback>
                          {cliente.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{cliente.nome}</div>
                        <div className="text-sm text-muted-foreground">{cliente.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{cliente.endereco}</TableCell>
                  <TableCell>{cliente.totalServicos}</TableCell>
                  <TableCell>R$ {cliente.gastoTotal}</TableCell>
                  <TableCell>{new Date(cliente.ultimoServico).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(cliente.status)}>{cliente.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCliente(cliente)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalhes do Cliente</DialogTitle>
                            <DialogDescription>Informações completas do cliente</DialogDescription>
                          </DialogHeader>
                          {selectedCliente && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={selectedCliente.foto || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {selectedCliente.nome
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-semibold">{selectedCliente.nome}</h3>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{selectedCliente.avaliacaoMedia}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Email</Label>
                                  <p className="font-medium">{selectedCliente.email}</p>
                                </div>
                                <div>
                                  <Label>Telefone</Label>
                                  <p className="font-medium">{selectedCliente.telefone}</p>
                                </div>
                                <div>
                                  <Label>Endereço</Label>
                                  <p className="font-medium">{selectedCliente.endereco}</p>
                                </div>
                                <div>
                                  <Label>Data de Registro</Label>
                                  <p className="font-medium">
                                    {new Date(selectedCliente.dataRegistro).toLocaleDateString("pt-BR")}
                                  </p>
                                </div>
                                <div>
                                  <Label>Total de Serviços</Label>
                                  <p className="font-medium">{selectedCliente.totalServicos}</p>
                                </div>
                                <div>
                                  <Label>Gasto Total</Label>
                                  <p className="font-medium">R$ {selectedCliente.gastoTotal}</p>
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
