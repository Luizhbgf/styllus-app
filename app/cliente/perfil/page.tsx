"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { User, Upload, Camera, Eye, EyeOff, Trash2, Download, Star, Calendar, Heart } from "lucide-react"

export default function ClientePerfil() {
  const [showPassword, setShowPassword] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")

  const [dadosPessoais, setDadosPessoais] = useState({
    nome: "Maria",
    sobrenome: "Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 98765-4321",
    dataNascimento: "1990-05-15",
    genero: "feminino",
    cpf: "123.456.789-00",
    endereco: {
      cep: "01234-567",
      rua: "Rua das Flores, 123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
    },
  })

  const [preferencias, setPreferencias] = useState({
    profissionaisPreferidos: ["Ana Silva", "Juliana Santos"],
    servicosPreferidos: ["Corte de Cabelo", "Hidratação"],
    horarioPreferido: "tarde",
    frequenciaVisitas: "mensal",
    orcamentoMedio: "100-200",
    observacoes: "Prefiro produtos naturais e sem química",
  })

  const [configuracoes, setConfiguracoes] = useState({
    privacidade: {
      perfilPublico: false,
      mostrarHistorico: false,
      receberSugestoes: true,
    },
    notificacoes: {
      agendamentos: true,
      promocoes: true,
      lembretes: true,
    },
    seguranca: {
      autenticacaoDoisFatores: false,
      loginSocial: true,
    },
  })

  const estatisticas = {
    totalServicos: 15,
    totalGasto: 1250.0,
    profissionalFavorito: "Ana Silva",
    servicoFavorito: "Corte de Cabelo",
    avaliacaoMedia: 4.8,
    clienteDesde: "Janeiro 2023",
  }

  const updateDadosPessoais = (campo: string, valor: string) => {
    if (campo.includes(".")) {
      const [categoria, subcampo] = campo.split(".")
      setDadosPessoais((prev) => ({
        ...prev,
        [categoria]: {
          ...prev[categoria as keyof typeof prev.endereco],
          [subcampo]: valor,
        },
      }))
    } else {
      setDadosPessoais((prev) => ({
        ...prev,
        [campo]: valor,
      }))
    }
  }

  const updatePreferencias = (campo: string, valor: string) => {
    setPreferencias((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const updateConfiguracoes = (categoria: string, campo: string, valor: boolean) => {
    setConfiguracoes((prev) => ({
      ...prev,
      [categoria]: {
        ...prev[categoria as keyof typeof prev],
        [campo]: valor,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências</p>
      </div>

      <Tabs defaultValue="pessoais">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="preferencias">Preferências</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="pessoais" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize suas informações pessoais e de contato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Foto de perfil */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Foto de perfil"
                      className="w-32 h-32 rounded-full object-cover border"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute bottom-0 right-0 rounded-full bg-background"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Alterar foto</span>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Alterar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Dados pessoais */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        value={dadosPessoais.nome}
                        onChange={(e) => updateDadosPessoais("nome", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sobrenome">Sobrenome</Label>
                      <Input
                        id="sobrenome"
                        value={dadosPessoais.sobrenome}
                        onChange={(e) => updateDadosPessoais("sobrenome", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={dadosPessoais.email}
                        onChange={(e) => updateDadosPessoais("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={dadosPessoais.telefone}
                        onChange={(e) => updateDadosPessoais("telefone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                      <Input
                        id="data-nascimento"
                        type="date"
                        value={dadosPessoais.dataNascimento}
                        onChange={(e) => updateDadosPessoais("dataNascimento", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genero">Gênero</Label>
                      <Select
                        value={dadosPessoais.genero}
                        onValueChange={(value) => updateDadosPessoais("genero", value)}
                      >
                        <SelectTrigger id="genero">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feminino">Feminino</SelectItem>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                          <SelectItem value="nao-informar">Prefiro não informar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={dadosPessoais.cpf}
                      onChange={(e) => updateDadosPessoais("cpf", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      value={dadosPessoais.endereco.cep}
                      onChange={(e) => updateDadosPessoais("endereco.cep", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="rua">Rua</Label>
                    <Input
                      id="rua"
                      value={dadosPessoais.endereco.rua}
                      onChange={(e) => updateDadosPessoais("endereco.rua", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input
                      id="bairro"
                      value={dadosPessoais.endereco.bairro}
                      onChange={(e) => updateDadosPessoais("endereco.bairro", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      value={dadosPessoais.endereco.cidade}
                      onChange={(e) => updateDadosPessoais("endereco.cidade", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select
                      value={dadosPessoais.endereco.estado}
                      onValueChange={(value) => updateDadosPessoais("endereco.estado", value)}
                    >
                      <SelectTrigger id="estado">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        {/* Adicionar outros estados */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Altere sua senha e configurações de segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senha-atual">Senha Atual</Label>
                <div className="relative">
                  <Input id="senha-atual" type={showPassword ? "text" : "password"} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nova-senha">Nova Senha</Label>
                <Input id="nova-senha" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                <Input id="confirmar-senha" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Alterar Senha</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferencias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Serviço</CardTitle>
              <CardDescription>Configure suas preferências para uma experiência personalizada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="horario-preferido">Horário Preferido</Label>
                <Select
                  value={preferencias.horarioPreferido}
                  onValueChange={(value) => updatePreferencias("horarioPreferido", value)}
                >
                  <SelectTrigger id="horario-preferido">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manha">Manhã (8h às 12h)</SelectItem>
                    <SelectItem value="tarde">Tarde (13h às 18h)</SelectItem>
                    <SelectItem value="noite">Noite (18h às 21h)</SelectItem>
                    <SelectItem value="flexivel">Flexível</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequencia-visitas">Frequência de Visitas</Label>
                <Select
                  value={preferencias.frequenciaVisitas}
                  onValueChange={(value) => updatePreferencias("frequenciaVisitas", value)}
                >
                  <SelectTrigger id="frequencia-visitas">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="quinzenal">Quinzenal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="bimestral">Bimestral</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orcamento-medio">Orçamento Médio por Visita</Label>
                <Select
                  value={preferencias.orcamentoMedio}
                  onValueChange={(value) => updatePreferencias("orcamentoMedio", value)}
                >
                  <SelectTrigger id="orcamento-medio">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-100">R$ 50 - R$ 100</SelectItem>
                    <SelectItem value="100-200">R$ 100 - R$ 200</SelectItem>
                    <SelectItem value="200-300">R$ 200 - R$ 300</SelectItem>
                    <SelectItem value="300+">Acima de R$ 300</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações e Preferências</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Conte-nos sobre suas preferências, alergias, produtos favoritos..."
                  value={preferencias.observacoes}
                  onChange={(e) => updatePreferencias("observacoes", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Profissionais Favoritos</h4>
                <div className="flex flex-wrap gap-2">
                  {preferencias.profissionaisPreferidos.map((profissional, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {profissional}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Serviços Favoritos</h4>
                <div className="flex flex-wrap gap-2">
                  {preferencias.servicosPreferidos.map((servico, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {servico}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacidade</CardTitle>
              <CardDescription>Configure suas preferências de privacidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Perfil Público</Label>
                  <p className="text-sm text-muted-foreground">Permite que outros usuários vejam seu perfil</p>
                </div>
                <Switch
                  checked={configuracoes.privacidade.perfilPublico}
                  onCheckedChange={(checked) => updateConfiguracoes("privacidade", "perfilPublico", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Mostrar Histórico</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que profissionais vejam seu histórico de serviços
                  </p>
                </div>
                <Switch
                  checked={configuracoes.privacidade.mostrarHistorico}
                  onCheckedChange={(checked) => updateConfiguracoes("privacidade", "mostrarHistorico", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Receber Sugestões</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba sugestões personalizadas de serviços e profissionais
                  </p>
                </div>
                <Switch
                  checked={configuracoes.privacidade.receberSugestoes}
                  onCheckedChange={(checked) => updateConfiguracoes("privacidade", "receberSugestoes", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Configure opções adicionais de segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">Adiciona uma camada extra de segurança à sua conta</p>
                </div>
                <Switch
                  checked={configuracoes.seguranca.autenticacaoDoisFatores}
                  onCheckedChange={(checked) => updateConfiguracoes("seguranca", "autenticacaoDoisFatores", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Login Social</Label>
                  <p className="text-sm text-muted-foreground">Permite login com Google, Facebook, etc.</p>
                </div>
                <Switch
                  checked={configuracoes.seguranca.loginSocial}
                  onCheckedChange={(checked) => updateConfiguracoes("seguranca", "loginSocial", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados da Conta</CardTitle>
              <CardDescription>Gerencie os dados da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Exportar Dados</h4>
                  <p className="text-sm text-muted-foreground">Baixe uma cópia de todos os seus dados</p>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-red-600">Excluir Conta</h4>
                  <p className="text-sm text-muted-foreground">Exclua permanentemente sua conta e todos os dados</p>
                </div>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estatisticas" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.totalServicos}</div>
                <p className="text-xs text-muted-foreground">Serviços realizados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {estatisticas.totalGasto.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">Em cuidados pessoais</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{estatisticas.avaliacaoMedia}</div>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(estatisticas.avaliacaoMedia) ? "text-primary fill-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Dos serviços avaliados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profissional Favorito</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{estatisticas.profissionalFavorito}</div>
                <p className="text-xs text-muted-foreground">Mais agendamentos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Serviço Favorito</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{estatisticas.servicoFavorito}</div>
                <p className="text-xs text-muted-foreground">Mais realizado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cliente Desde</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{estatisticas.clienteDesde}</div>
                <p className="text-xs text-muted-foreground">Membro há 1 ano</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
              <CardDescription>Suas conquistas e marcos alcançados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Cliente VIP</h4>
                    <p className="text-sm text-muted-foreground">Mais de 10 serviços realizados</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Cliente Fiel</h4>
                    <p className="text-sm text-muted-foreground">1 ano como cliente</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Avaliadora</h4>
                    <p className="text-sm text-muted-foreground">Avaliou mais de 5 serviços</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">Embaixadora</h4>
                    <p className="text-sm text-muted-foreground">Indique 3 amigos (0/3)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
