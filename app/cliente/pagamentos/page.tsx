"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Download, Search, Plus, Trash2, Eye, EyeOff, CheckCircle, Clock, XCircle } from "lucide-react"

export default function ClientePagamentos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("todos")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [showCardNumber, setShowCardNumber] = useState(false)

  const historicoTransacoes = [
    {
      id: 1,
      date: new Date("2024-05-10"),
      description: "Corte de Cabelo - Ana Silva",
      amount: 80.0,
      status: "pago",
      method: "Cartão de Crédito",
      invoice: "INV-2024-001",
      professional: "Ana Silva",
      service: "Corte de Cabelo",
    },
    {
      id: 2,
      date: new Date("2024-04-28"),
      description: "Manicure - Juliana Santos",
      amount: 60.0,
      status: "pago",
      method: "PIX",
      invoice: "INV-2024-002",
      professional: "Juliana Santos",
      service: "Manicure",
    },
    {
      id: 3,
      date: new Date("2024-04-15"),
      description: "Hidratação - Rafael Costa",
      amount: 120.0,
      status: "pago",
      method: "Cartão de Débito",
      invoice: "INV-2024-003",
      professional: "Rafael Costa",
      service: "Hidratação",
    },
    {
      id: 4,
      date: new Date("2024-05-22"),
      description: "Coloração - Ana Silva",
      amount: 150.0,
      status: "pendente",
      method: "Cartão de Crédito",
      invoice: "INV-2024-004",
      professional: "Ana Silva",
      service: "Coloração",
    },
    {
      id: 5,
      date: new Date("2024-03-20"),
      description: "Curso: Técnicas de Automaquiagem",
      amount: 150.0,
      status: "pago",
      method: "PIX",
      invoice: "INV-2024-005",
      professional: "Fernanda Lima",
      service: "Curso",
    },
  ]

  const metodosPagemento = [
    {
      id: 1,
      type: "credit",
      brand: "Visa",
      lastFour: "4532",
      expiryMonth: "12",
      expiryYear: "2026",
      holderName: "Maria Silva",
      isDefault: true,
    },
    {
      id: 2,
      type: "credit",
      brand: "Mastercard",
      lastFour: "8765",
      expiryMonth: "08",
      expiryYear: "2025",
      holderName: "Maria Silva",
      isDefault: false,
    },
  ]

  const filteredTransactions = historicoTransacoes.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.professional.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPeriod =
      filterPeriod === "todos" ||
      (() => {
        const now = new Date()
        const transactionDate = transaction.date

        if (filterPeriod === "30dias") {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          return transactionDate >= thirtyDaysAgo
        } else if (filterPeriod === "3meses") {
          const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          return transactionDate >= threeMonthsAgo
        }
        return true
      })()

    const matchesStatus = filterStatus === "todos" || transaction.status === filterStatus

    return matchesSearch && matchesPeriod && matchesStatus
  })

  const totalGasto = historicoTransacoes
    .filter((t) => t.status === "pago")
    .reduce((total, transaction) => total + transaction.amount, 0)

  const transacoesPendentes = historicoTransacoes.filter((t) => t.status === "pendente").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pago":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Pago
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      case "cancelado":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCardIcon = (brand: string) => {
    // Aqui você poderia usar ícones específicos para cada bandeira
    return <CreditCard className="h-6 w-6" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pagamentos</h1>
        <p className="text-muted-foreground">Gerencie seus métodos de pagamento e histórico de transações</p>
      </div>

      {/* Cards de resumo */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalGasto.toFixed(2).replace(".", ",")}</div>
            <p className="text-xs text-muted-foreground">Em serviços e cursos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{historicoTransacoes.length}</div>
            <p className="text-xs text-muted-foreground">Total de transações</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transacoesPendentes}</div>
            <p className="text-xs text-muted-foreground">Pagamentos pendentes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="historico">
        <TabsList>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="metodos">Métodos de Pagamento</TabsTrigger>
        </TabsList>

        <TabsContent value="historico" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar transação..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os períodos</SelectItem>
                    <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                    <SelectItem value="3meses">Últimos 3 meses</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de transações */}
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-medium">{transaction.service}</h3>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Profissional: {transaction.professional}</p>
                        <p>Data: {transaction.date.toLocaleDateString("pt-BR")}</p>
                        <p>Método: {transaction.method}</p>
                        <p>Nota fiscal: {transaction.invoice}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-lg font-bold">R$ {transaction.amount.toFixed(2).replace(".", ",")}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Recibo
                        </Button>
                        {transaction.status === "pendente" && <Button size="sm">Pagar</Button>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma transação encontrada com os filtros selecionados.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="metodos" className="space-y-4">
          {/* Métodos de pagamento salvos */}
          <Card>
            <CardHeader>
              <CardTitle>Cartões Salvos</CardTitle>
              <CardDescription>Gerencie seus métodos de pagamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {metodosPagemento.map((metodo) => (
                <div key={metodo.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getCardIcon(metodo.brand)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{metodo.brand}</span>
                        <span>•••• {metodo.lastFour}</span>
                        {metodo.isDefault && (
                          <Badge variant="outline" className="text-xs">
                            Padrão
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expira em {metodo.expiryMonth}/{metodo.expiryYear}
                      </p>
                      <p className="text-sm text-muted-foreground">{metodo.holderName}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!metodo.isDefault && (
                      <Button variant="outline" size="sm">
                        Tornar Padrão
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Novo Cartão
              </Button>
            </CardContent>
          </Card>

          {/* Adicionar novo método de pagamento */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Cartão</CardTitle>
              <CardDescription>Adicione um novo método de pagamento à sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Número do Cartão</Label>
                  <div className="relative">
                    <Input
                      id="card-number"
                      type={showCardNumber ? "text" : "password"}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowCardNumber(!showCardNumber)}
                    >
                      {showCardNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-name">Nome no Cartão</Label>
                  <Input id="card-name" placeholder="Maria Silva" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Validade</Label>
                  <Input id="expiry" placeholder="MM/AA" maxLength={5} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" type="password" placeholder="123" maxLength={4} />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="set-default" className="h-4 w-4" />
                <Label htmlFor="set-default" className="text-sm">
                  Definir como método de pagamento padrão
                </Label>
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Adicionar Cartão</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
