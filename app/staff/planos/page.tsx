"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Copy, Check, X, Calendar, Scissors, Brush, Sparkles } from "lucide-react"

export default function StaffPlanos() {
  const [planos, setPlanos] = useState([
    {
      id: 1,
      nome: "Plano Básico de Cortes",
      descricao: "Acesso a cortes mensais com desconto especial",
      preco: 120,
      servicos: ["Corte de Cabelo", "Finalização"],
      frequencia: "Mensal",
      sessoes: 1,
      ativo: true,
      destaque: false,
    },
    {
      id: 2,
      nome: "Plano Premium de Coloração",
      descricao: "Coloração mensal com tratamento incluído",
      preco: 250,
      servicos: ["Coloração", "Tratamento Capilar", "Finalização"],
      frequencia: "Mensal",
      sessoes: 1,
      ativo: true,
      destaque: true,
    },
    {
      id: 3,
      nome: "Plano Trimestral de Hidratação",
      descricao: "Hidratação profunda a cada 30 dias",
      preco: 300,
      servicos: ["Hidratação Profunda", "Finalização"],
      frequencia: "Trimestral",
      sessoes: 3,
      ativo: false,
      destaque: false,
    },
  ])

  const [novoServico, setNovoServico] = useState("")
  const [servicosPlano, setServicosPlano] = useState<string[]>([])
  const [editandoPlano, setEditandoPlano] = useState<number | null>(null)

  const adicionarServico = () => {
    if (novoServico && !servicosPlano.includes(novoServico)) {
      setServicosPlano([...servicosPlano, novoServico])
      setNovoServico("")
    }
  }

  const removerServico = (servico: string) => {
    setServicosPlano(servicosPlano.filter((s) => s !== servico))
  }

  const editarPlano = (id: number) => {
    const plano = planos.find((p) => p.id === id)
    if (plano) {
      setServicosPlano([...plano.servicos])
      setEditandoPlano(id)
    }
  }

  const duplicarPlano = (id: number) => {
    const plano = planos.find((p) => p.id === id)
    if (plano) {
      const novoPlano = {
        ...plano,
        id: Math.max(...planos.map((p) => p.id)) + 1,
        nome: `${plano.nome} (Cópia)`,
      }
      setPlanos([...planos, novoPlano])
    }
  }

  const excluirPlano = (id: number) => {
    setPlanos(planos.filter((p) => p.id !== id))
  }

  const toggleAtivo = (id: number) => {
    setPlanos(
      planos.map((p) => {
        if (p.id === id) {
          return { ...p, ativo: !p.ativo }
        }
        return p
      }),
    )
  }

  const toggleDestaque = (id: number) => {
    setPlanos(
      planos.map((p) => {
        if (p.id === id) {
          return { ...p, destaque: !p.destaque }
        }
        return p
      }),
    )
  }

  const getIconForService = (service: string) => {
    if (service.toLowerCase().includes("corte")) return <Scissors className="h-4 w-4" />
    if (service.toLowerCase().includes("color")) return <Brush className="h-4 w-4" />
    return <Sparkles className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Planos de Serviços</h1>
        <p className="text-muted-foreground">Crie e gerencie planos mensais para fidelizar seus clientes</p>
      </div>

      <Tabs defaultValue="meus-planos">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="meus-planos">Meus Planos</TabsTrigger>
          <TabsTrigger value="novo-plano">Criar Novo Plano</TabsTrigger>
        </TabsList>

        <TabsContent value="meus-planos" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planos.map((plano) => (
              <Card key={plano.id} className={plano.destaque ? "border-primary" : ""}>
                {plano.destaque && (
                  <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 absolute right-4 top-0 rounded-b-md">
                    Destaque
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={plano.ativo ? "default" : "outline"} className="mb-2">
                      {plano.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => editarPlano(plano.id)}>
                        <span className="sr-only">Editar</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-pencil"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => duplicarPlano(plano.id)}>
                        <span className="sr-only">Duplicar</span>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle>{plano.nome}</CardTitle>
                  <CardDescription>{plano.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">
                      R$ {plano.preco.toFixed(2).replace(".", ",")}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{plano.frequencia.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {plano.sessoes} {plano.sessoes > 1 ? "sessões" : "sessão"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Serviços Incluídos:</h4>
                    <ul className="space-y-1">
                      {plano.servicos.map((servico, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          {servico}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`ativo-${plano.id}`}
                      checked={plano.ativo}
                      onCheckedChange={() => toggleAtivo(plano.id)}
                    />
                    <Label htmlFor={`ativo-${plano.id}`} className="text-sm">
                      {plano.ativo ? "Ativo" : "Inativo"}
                    </Label>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => excluirPlano(plano.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Excluir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {planos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Você ainda não criou nenhum plano.</p>
              <Button className="mt-4" onClick={() => document.getElementById("novo-plano-tab")?.click()}>
                Criar Seu Primeiro Plano
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="novo-plano" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{editandoPlano ? "Editar Plano" : "Criar Novo Plano"}</CardTitle>
              <CardDescription>
                {editandoPlano
                  ? "Atualize as informações do plano existente"
                  : "Configure um novo plano para oferecer aos seus clientes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome-plano">Nome do Plano</Label>
                  <Input
                    id="nome-plano"
                    placeholder="Ex: Plano Mensal de Cortes"
                    defaultValue={editandoPlano ? planos.find((p) => p.id === editandoPlano)?.nome : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequencia">Frequência</Label>
                  <Select
                    defaultValue={
                      editandoPlano ? planos.find((p) => p.id === editandoPlano)?.frequencia.toLowerCase() : "mensal"
                    }
                  >
                    <SelectTrigger id="frequencia">
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensal">Mensal</SelectItem>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                      <SelectItem value="semestral">Semestral</SelectItem>
                      <SelectItem value="anual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao-plano">Descrição</Label>
                <Textarea
                  id="descricao-plano"
                  placeholder="Descreva os benefícios do plano..."
                  className="min-h-[100px]"
                  defaultValue={editandoPlano ? planos.find((p) => p.id === editandoPlano)?.descricao : ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="preco">Preço (R$)</Label>
                  <Input
                    id="preco"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0,00"
                    defaultValue={editandoPlano ? planos.find((p) => p.id === editandoPlano)?.preco : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessoes">Número de Sessões</Label>
                  <Input
                    id="sessoes"
                    type="number"
                    min="1"
                    placeholder="1"
                    defaultValue={editandoPlano ? planos.find((p) => p.id === editandoPlano)?.sessoes : "1"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Serviços Incluídos</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {servicosPlano.map((servico, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {getIconForService(servico)}
                      {servico}
                      <button onClick={() => removerServico(servico)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remover {servico}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar serviço"
                    value={novoServico}
                    onChange={(e) => setNovoServico(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && adicionarServico()}
                  />
                  <Button type="button" onClick={adicionarServico} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="destaque" />
                <Label htmlFor="destaque">Destacar este plano</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setEditandoPlano(null)
                  setServicosPlano([])
                }}
              >
                Cancelar
              </Button>
              <Button>{editandoPlano ? "Salvar Alterações" : "Criar Plano"}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
