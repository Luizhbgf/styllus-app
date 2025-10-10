"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Download, CreditCard, User, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function StaffFinanceiro() {
  const [period, setPeriod] = useState("mensal")

  // Dados simulados para diferentes períodos
  const periodData = {
    diario: {
      faturamento: "R$ 640,00",
      comissao: "R$ 320,00",
      atendimentos: 8,
      ticketMedio: "R$ 80,00",
      percentualMeta: 85,
      comparativo: "+12.5%",
      servicos: [
        { nome: "Corte de Cabelo", valor: "R$ 320,00", quantidade: 4, percentual: 50 },
        { nome: "Coloração", valor: "R$ 150,00", quantidade: 1, percentual: 23 },
        { nome: "Hidratação", valor: "R$ 120,00", quantidade: 1, percentual: 19 },
        { nome: "Escova", valor: "R$ 50,00", quantidade: 1, percentual: 8 },
      ],
      clientes: [
        { nome: "Maria Silva", servico: "Corte de Cabelo", valor: "R$ 80,00" },
        { nome: "Carla Santos", servico: "Coloração", valor: "R$ 150,00" },
        { nome: "Fernanda Lima", servico: "Hidratação", valor: "R$ 120,00" },
        { nome: "Juliana Martins", servico: "Corte de Cabelo", valor: "R$ 80,00" },
        { nome: "Amanda Souza", servico: "Corte de Cabelo", valor: "R$ 80,00" },
        { nome: "Patrícia Oliveira", servico: "Corte de Cabelo", valor: "R$ 80,00" },
        { nome: "Roberta Alves", servico: "Escova", valor: "R$ 50,00" },
      ],
    },
    semanal: {
      faturamento: "R$ 2.450,00",
      comissao: "R$ 1.225,00",
      atendimentos: 32,
      ticketMedio: "R$ 76,56",
      percentualMeta: 70,
      comparativo: "+8.2%",
      servicos: [
        { nome: "Corte de Cabelo", valor: "R$ 1.120,00", quantidade: 14, percentual: 46 },
        { nome: "Coloração", valor: "R$ 600,00", quantidade: 4, percentual: 24 },
        { nome: "Hidratação", valor: "R$ 480,00", quantidade: 4, percentual: 20 },
        { nome: "Escova", valor: "R$ 250,00", quantidade: 5, percentual: 10 },
      ],
      clientes: [
        { nome: "Maria Silva", servico: "Corte de Cabelo", valor: "R$ 80,00" },
        { nome: "Carla Santos", servico: "Coloração", valor: "R$ 150,00" },
        { nome: "Fernanda Lima", servico: "Hidratação", valor: "R$ 120,00" },
        { nome: "Juliana Martins", servico: "Corte de Cabelo", valor: "R$ 80,00" },
        { nome: "Amanda Souza", servico: "Corte de Cabelo", valor: "R$ 80,00" },
      ],
    },
    quinzenal: {
      faturamento: "R$ 4.850,00",
      comissao: "R$ 2.425,00",
      atendimentos: 62,
      ticketMedio: "R$ 78,23",
      percentualMeta: 65,
      comparativo: "+5.3%",
      servicos: [
        { nome: "Corte de Cabelo", valor: "R$ 2.240,00", quantidade: 28, percentual: 46 },
        { nome: "Coloração", valor: "R$ 1.200,00", quantidade: 8, percentual: 25 },
        { nome: "Hidratação", valor: "R$ 960,00", quantidade: 8, percentual: 20 },
        { nome: "Escova", valor: "R$ 450,00", quantidade: 9, percentual: 9 },
      ],
      clientes: [
        { nome: "Maria Silva", servico: "Corte de Cabelo", valor: "R$ 80,00" },
        { nome: "Carla Santos", servico: "Coloração", valor: "R$ 150,00" },
        { nome: "Fernanda Lima", servico: "Hidratação", valor: "R$ 120,00" },
      ],
    },
    mensal: {
      faturamento: "R$ 8.500,00",
      comissao: "R$ 4.250,00",
      atendimentos: 110,
      ticketMedio: "R$ 77,27",
      percentualMeta: 85,
      comparativo: "+15.2%",
      servicos: [
        { nome: "Corte de Cabelo", valor: "R$ 3.840,00", quantidade: 48, percentual: 45 },
        { nome: "Coloração", valor: "R$ 2.250,00", quantidade: 15, percentual: 26 },
        { nome: "Hidratação", valor: "R$ 1.560,00", quantidade: 13, percentual: 18 },
        { nome: "Escova", valor: "R$ 850,00", quantidade: 17, percentual: 10 },
      ],
      clientes: [
        { nome: "Maria Silva", servico: "Corte de Cabelo", valor: "R$ 80,00" },
        { nome: "Carla Santos", servico: "Coloração", valor: "R$ 150,00" },
      ],
    },
  }

  const data = periodData[period as keyof typeof periodData]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">Acompanhe seu desempenho financeiro</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diario">Diário</SelectItem>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="quinzenal">Quinzenal</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.faturamento}</div>
            <p className="text-xs text-green-500">{data.comparativo} em relação ao período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comissão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.comissao}</div>
            <p className="text-xs text-muted-foreground">50% do faturamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atendimentos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.atendimentos}</div>
            <p className="text-xs text-muted-foreground">Ticket médio: {data.ticketMedio}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.percentualMeta}%</div>
            <Progress value={data.percentualMeta} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="resumo">
        <TabsList>
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
        </TabsList>
        <TabsContent value="resumo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Visão geral do seu desempenho no período selecionado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Meta do Período</h3>
                  <span className="text-sm font-medium">
                    {data.faturamento} / R${" "}
                    {(((Number.parseInt(data.faturamento.replace(/\D/g, "")) / data.percentualMeta) * 100) / 100)
                      .toFixed(2)
                      .replace(".", ",")}
                  </span>
                </div>
                <Progress value={data.percentualMeta} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">{data.percentualMeta}% da meta atingida</p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Serviços Mais Realizados</h3>
                <div className="space-y-4">
                  {data.servicos.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{item.nome}</span>
                        <span>{item.valor}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentual}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{item.quantidade} atendimentos</span>
                        <span>{item.percentual}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="servicos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Serviços Realizados</CardTitle>
              <CardDescription>Detalhamento dos serviços realizados no período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>Serviço</div>
                  <div className="text-center">Quantidade</div>
                  <div className="text-center">Valor Unitário</div>
                  <div className="text-right">Valor Total</div>
                </div>
                <div className="divide-y">
                  {data.servicos.map((servico, index) => (
                    <div key={index} className="grid grid-cols-4 p-4">
                      <div>{servico.nome}</div>
                      <div className="text-center">{servico.quantidade}</div>
                      <div className="text-center">
                        R${" "}
                        {(Number.parseInt(servico.valor.replace(/\D/g, "")) / servico.quantidade / 100)
                          .toFixed(2)
                          .replace(".", ",")}
                      </div>
                      <div className="text-right">{servico.valor}</div>
                    </div>
                  ))}
                  <div className="grid grid-cols-4 p-4 font-medium bg-muted/50">
                    <div>Total</div>
                    <div className="text-center">{data.atendimentos}</div>
                    <div className="text-center"></div>
                    <div className="text-right">{data.faturamento}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="clientes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Atendidos</CardTitle>
              <CardDescription>Detalhamento dos clientes atendidos no período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-3 p-4 font-medium border-b">
                  <div>Cliente</div>
                  <div>Serviço</div>
                  <div className="text-right">Valor</div>
                </div>
                <div className="divide-y">
                  {data.clientes.map((cliente, index) => (
                    <div key={index} className="grid grid-cols-3 p-4">
                      <div>{cliente.nome}</div>
                      <div>{cliente.servico}</div>
                      <div className="text-right">{cliente.valor}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
