"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Download, CreditCard, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminFinanceiro() {
  const [period, setPeriod] = useState("mensal")
  const [staffView, setStaffView] = useState("geral")

  // Dados simulados para diferentes períodos
  const periodData = {
    diario: {
      faturamento: "R$ 1.850,00",
      despesas: "R$ 620,00",
      lucro: "R$ 1.230,00",
      atendimentos: 18,
      ticketMedio: "R$ 102,78",
      percentualMeta: 92,
      comparativo: "+18.2%",
      servicos: [
        { nome: "Corte de Cabelo", valor: "R$ 720,00", quantidade: 9, percentual: 38.9 },
        { nome: "Coloração", valor: "R$ 450,00", quantidade: 3, percentual: 24.3 },
        { nome: "Hidratação", valor: "R$ 240,00", quantidade: 2, percentual: 13.0 },
        { nome: "Barba", valor: "R$ 160,00", quantidade: 2, percentual: 8.6 },
        { nome: "Manicure", valor: "R$ 180,00", quantidade: 3, percentual: 9.7 },
        { nome: "Outros", valor: "R$ 100,00", quantidade: 2, percentual: 5.4 },
      ],
      profissionais: [
        { nome: "Ana Silva", cargo: "Cabeleireira", atendimentos: 8, faturamento: "R$ 640,00", comissao: "R$ 320,00" },
        {
          nome: "Carlos Oliveira",
          cargo: "Barbeiro",
          atendimentos: 4,
          faturamento: "R$ 320,00",
          comissao: "R$ 160,00",
        },
        { nome: "Juliana Santos", cargo: "Manicure", atendimentos: 3, faturamento: "R$ 180,00", comissao: "R$ 90,00" },
        {
          nome: "Rafael Costa",
          cargo: "Cabeleireiro",
          atendimentos: 3,
          faturamento: "R$ 270,00",
          comissao: "R$ 135,00",
        },
        {
          nome: "Fernanda Lima",
          cargo: "Maquiadora",
          atendimentos: 2,
          faturamento: "R$ 240,00",
          comissao: "R$ 120,00",
        },
      ],
    },
    semanal: {
      faturamento: "R$ 8.450,00",
      despesas: "R$ 2.850,00",
      lucro: "R$ 5.600,00",
      atendimentos: 82,
      ticketMedio: "R$ 103,05",
      percentualMeta: 84,
      comparativo: "+12.3%",
      servicos: [
        { nome: "Corte de Cabelo", valor: "R$ 3.120,00", quantidade: 39, percentual: 36.9 },
        { nome: "Coloração", valor: "R$ 2.100,00", quantidade: 14, percentual: 24.9 },
        { nome: "Hidratação", valor: "R$ 1.080,00", quantidade: 9, percentual: 12.8 },
        { nome: "Barba", valor: "R$ 720,00", quantidade: 9, percentual: 8.5 },
        { nome: "Manicure", valor: "R$ 840,00", quantidade: 14, percentual: 9.9 },
        { nome: "Outros", valor: "R$ 590,00", quantidade: 8, percentual: 7.0 },
      ],
      profissionais: [
        {
          nome: "Ana Silva",
          cargo: "Cabeleireira",
          atendimentos: 32,
          faturamento: "R$ 2.450,00",
          comissao: "R$ 1.225,00",
        },
        {
          nome: "Carlos Oliveira",
          cargo: "Barbeiro",
          atendimentos: 18,
          faturamento: "R$ 1.440,00",
          comissao: "R$ 720,00",
        },
        {
          nome: "Juliana Santos",
          cargo: "Manicure",
          atendimentos: 14,
          faturamento: "R$ 840,00",
          comissao: "R$ 420,00",
        },
        {
          nome: "Rafael Costa",
          cargo: "Cabeleireiro",
          atendimentos: 12,
          faturamento: "R$ 1.080,00",
          comissao: "R$ 540,00",
        },
        {
          nome: "Fernanda Lima",
          cargo: "Maquiadora",
          atendimentos: 10,
          faturamento: "R$ 1.200,00",
          comissao: "R$ 600,00",
        },
      ],
    },
    quinzenal: {
      faturamento: "R$ 16.250,00",
      despesas: "R$ 5.450,00",
      lucro: "R$ 10.800,00",
      atendimentos: 158,
      ticketMedio: "R$ 102,85",
      percentualMeta: 81,
      comparativo: "+8.5%",
      servicos: [
        { nome: "Corte de Cabelo", valor: "R$ 5.920,00", quantidade: 74, percentual: 36.4 },
        { nome: "Coloração", valor: "R$ 4.050,00", quantidade: 27, percentual: 24.9 },
        { nome: "Hidratação", valor: "R$ 2.160,00", quantidade: 18, percentual: 13.3 },
        { nome: "Barba", valor: "R$ 1.360,00", quantidade: 17, percentual: 8.4 },
        { nome: "Manicure", valor: "R$ 1.560,00", quantidade: 26, percentual: 9.6 },
        { nome: "Outros", valor: "R$ 1.200,00", quantidade: 15, percentual: 7.4 },
      ],
      profissionais: [
        {
          nome: "Ana Silva",
          cargo: "Cabeleireira",
          atendimentos: 62,
          faturamento: "R$ 4.850,00",
          comissao: "R$ 2.425,00",
        },
        {
          nome: "Carlos Oliveira",
          cargo: "Barbeiro",
          atendimentos: 34,
          faturamento: "R$ 2.720,00",
          comissao: "R$ 1.360,00",
        },
        {
          nome: "Juliana Santos",
          cargo: "Manicure",
          atendimentos: 26,
          faturamento: "R$ 1.560,00",
          comissao: "R$ 780,00",
        },
        {
          nome: "Rafael Costa",
          cargo: "Cabeleireiro",
          atendimentos: 24,
          faturamento: "R$ 2.160,00",
          comissao: "R$ 1.080,00",
        },
        {
          nome: "Fernanda Lima",
          cargo: "Maquiadora",
          atendimentos: 18,
          faturamento: "R$ 2.160,00",
          comissao: "R$ 1.080,00",
        },
      ],
    },
    mensal: {
      faturamento: "R$ 32.500,00",
      despesas: "R$ 10.900,00",
      lucro: "R$ 21.600,00",
      atendimentos: 316,
      ticketMedio: "R$ 102,85",
      percentualMeta: 92,
      comparativo: "+15.2%",
      servicos: [
        { nome: "Corte de Cabelo", valor: "R$ 11.840,00", quantidade: 148, percentual: 36.4 },
        { nome: "Coloração", valor: "R$ 8.100,00", quantidade: 54, percentual: 24.9 },
        { nome: "Hidratação", valor: "R$ 4.320,00", quantidade: 36, percentual: 13.3 },
        { nome: "Barba", valor: "R$ 2.720,00", quantidade: 34, percentual: 8.4 },
        { nome: "Manicure", valor: "R$ 3.120,00", quantidade: 52, percentual: 9.6 },
        { nome: "Outros", valor: "R$ 2.400,00", quantidade: 30, percentual: 7.4 },
      ],
      profissionais: [
        {
          nome: "Ana Silva",
          cargo: "Cabeleireira",
          atendimentos: 124,
          faturamento: "R$ 9.700,00",
          comissao: "R$ 4.850,00",
        },
        {
          nome: "Carlos Oliveira",
          cargo: "Barbeiro",
          atendimentos: 68,
          faturamento: "R$ 5.440,00",
          comissao: "R$ 2.720,00",
        },
        {
          nome: "Juliana Santos",
          cargo: "Manicure",
          atendimentos: 52,
          faturamento: "R$ 3.120,00",
          comissao: "R$ 1.560,00",
        },
        {
          nome: "Rafael Costa",
          cargo: "Cabeleireiro",
          atendimentos: 48,
          faturamento: "R$ 4.320,00",
          comissao: "R$ 2.160,00",
        },
        {
          nome: "Fernanda Lima",
          cargo: "Maquiadora",
          atendimentos: 36,
          faturamento: "R$ 4.320,00",
          comissao: "R$ 2.160,00",
        },
      ],
    },
  }

  const data = periodData[period as keyof typeof periodData]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">Acompanhe o desempenho financeiro do salão</p>
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
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.despesas}</div>
            <p className="text-xs text-muted-foreground">33.5% do faturamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.lucro}</div>
            <p className="text-xs text-muted-foreground">66.5% do faturamento</p>
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
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
        </TabsList>
        <TabsContent value="resumo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Visão geral do desempenho no período selecionado</CardDescription>
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
        <TabsContent value="profissionais" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Desempenho dos Profissionais</CardTitle>
                <CardDescription>Detalhamento do desempenho financeiro por profissional</CardDescription>
              </div>
              <Select value={staffView} onValueChange={setStaffView}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione a visualização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Visão Geral</SelectItem>
                  {data.profissionais.map((pro, index) => (
                    <SelectItem key={index} value={pro.nome.toLowerCase().replace(" ", "-")}>
                      {pro.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {staffView === "geral" ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium border-b">
                    <div>Profissional</div>
                    <div className="text-center">Cargo</div>
                    <div className="text-center">Atendimentos</div>
                    <div className="text-center">Faturamento</div>
                    <div className="text-right">Comissão</div>
                  </div>
                  <div className="divide-y">
                    {data.profissionais.map((pro, index) => (
                      <div key={index} className="grid grid-cols-5 p-4">
                        <div>{pro.nome}</div>
                        <div className="text-center">{pro.cargo}</div>
                        <div className="text-center">{pro.atendimentos}</div>
                        <div className="text-center">{pro.faturamento}</div>
                        <div className="text-right">{pro.comissao}</div>
                      </div>
                    ))}
                    <div className="grid grid-cols-5 p-4 font-medium bg-muted/50">
                      <div>Total</div>
                      <div className="text-center"></div>
                      <div className="text-center">{data.atendimentos}</div>
                      <div className="text-center">{data.faturamento}</div>
                      <div className="text-right">
                        R${" "}
                        {(Number.parseInt(data.faturamento.replace(/\D/g, "")) / 2 / 100).toFixed(2).replace(".", ",")}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Visão individual do profissional
                (() => {
                  const selectedPro = data.profissionais.find(
                    (p) => p.nome.toLowerCase().replace(" ", "-") === staffView,
                  )
                  if (!selectedPro) return null

                  return (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                          {selectedPro.nome.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{selectedPro.nome}</h3>
                          <p className="text-muted-foreground">{selectedPro.cargo}</p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Atendimentos</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{selectedPro.atendimentos}</div>
                            <p className="text-xs text-muted-foreground">
                              {((selectedPro.atendimentos / data.atendimentos) * 100).toFixed(1)}% do total
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Faturamento</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{selectedPro.faturamento}</div>
                            <p className="text-xs text-muted-foreground">
                              Ticket médio: R${" "}
                              {(
                                Number.parseInt(selectedPro.faturamento.replace(/\D/g, "")) /
                                selectedPro.atendimentos /
                                100
                              )
                                .toFixed(2)
                                .replace(".", ",")}
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Comissão</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{selectedPro.comissao}</div>
                            <p className="text-xs text-muted-foreground">50% do faturamento</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Participação no Faturamento Total</h3>
                        <Progress
                          value={
                            (Number.parseInt(selectedPro.faturamento.replace(/\D/g, "")) /
                              Number.parseInt(data.faturamento.replace(/\D/g, ""))) *
                            100
                          }
                          className="h-2"
                        />
                        <p className="text-xs text-right text-muted-foreground">
                          {(
                            (Number.parseInt(selectedPro.faturamento.replace(/\D/g, "")) /
                              Number.parseInt(data.faturamento.replace(/\D/g, ""))) *
                            100
                          ).toFixed(1)}
                          % do faturamento total
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3">Histórico de Desempenho</h3>
                        <div className="h-64 border rounded-md p-4 flex items-center justify-center">
                          <p className="text-muted-foreground">Gráfico de desempenho ao longo do tempo</p>
                        </div>
                      </div>
                    </div>
                  )
                })()
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
