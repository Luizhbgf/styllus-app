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
import { Progress } from "@/components/ui/progress"
import { Upload, Camera, Eye, EyeOff, Trash2, Star, X, Plus, Instagram, Facebook, Linkedin } from "lucide-react"

export default function StaffPerfil() {
  const [showPassword, setShowPassword] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")
  const [skills, setSkills] = useState<string[]>([
    "Cortes Femininos",
    "Coloração",
    "Mechas",
    "Penteados",
    "Tratamentos Capilares",
  ])
  const [newSkill, setNewSkill] = useState("")

  const [dadosPessoais, setDadosPessoais] = useState({
    nome: "Ana",
    sobrenome: "Silva",
    email: "ana.silva@styllus.com",
    telefone: "(11) 98765-4321",
    dataNascimento: "1990-05-15",
    cpf: "123.456.789-00",
    endereco: {
      cep: "01234-567",
      rua: "Rua das Flores, 123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
    },
  })

  const [dadosProfissionais, setDadosProfissionais] = useState({
    cargo: "Cabeleireira",
    especialidade: "Coloração e Mechas",
    biografia:
      "Cabeleireira especialista em coloração e mechas, com mais de 10 anos de experiência no mercado. Formada pela Academia de Beleza de São Paulo, com diversos cursos de especialização em técnicas modernas de coloração. Meu objetivo é realçar a beleza natural de cada cliente, respeitando a saúde dos fios.",
    experiencia: "10 anos",
    formacao: "Academia de Beleza de São Paulo",
    certificacoes: ["Técnicas Avançadas de Coloração - L'Oréal Professional", "Especialização em Cortes Modernos"],
    redesSociais: {
      instagram: "@anasilva.hair",
      facebook: "facebook.com/anasilva.hair",
      linkedin: "",
    },
    horarioTrabalho: {
      segunda: { ativo: true, inicio: "08:00", fim: "18:00" },
      terca: { ativo: true, inicio: "08:00", fim: "18:00" },
      quarta: { ativo: true, inicio: "08:00", fim: "18:00" },
      quinta: { ativo: true, inicio: "08:00", fim: "18:00" },
      sexta: { ativo: true, inicio: "08:00", fim: "18:00" },
      sabado: { ativo: true, inicio: "08:00", fim: "16:00" },
      domingo: { ativo: false, inicio: "", fim: "" },
    },
    precos: {
      corte: 80,
      coloracao: 150,
      hidratacao: 120,
      escova: 70,
      penteado: 130,
    },
  })

  const [configuracoes, setConfiguracoes] = useState({
    privacidade: {
      perfilPublico: true,
      mostrarAvaliacao: true,
      mostrarPrecos: true,
      aceitarNovosClientes: true,
    },
    notificacoes: {
      agendamentos: true,
      mensagens: true,
      avaliacoes: true,
      promocoes: false,
    },
    seguranca: {
      autenticacaoDoisFatores: false,
      loginSocial: true,
    },
  })

  const estatisticas = {
    totalClientes: 127,
    avaliacaoMedia: 4.9,
    totalServicos: 1250,
    faturamentoMensal: 8500,
    clientesRecorrentes: 85,
    tempoMedioAtendimento: 75,
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
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
        <p className="text-muted-foreground">Gerencie suas informações profissionais e visibilidade</p>
      </div>

      <Tabs defaultValue="pessoais">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="profissional">Perfil Profissional</TabsTrigger>
          <TabsTrigger value="servicos">Serviços e Preços</TabsTrigger>
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
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        value={dadosPessoais.cpf}
                        onChange={(e) => updateDadosPessoais("cpf", e.target.value)}
                      />
                    </div>
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

        <TabsContent value="profissional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perfil Profissional</CardTitle>
              <CardDescription>Destaque suas habilidades e experiência para atrair mais clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo/Especialidade</Label>
                <Select defaultValue="cabeleireira">
                  <SelectTrigger id="cargo">
                    <SelectValue placeholder="Selecione sua especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cabeleireira">Cabeleireira</SelectItem>
                    <SelectItem value="barbeiro">Barbeiro</SelectItem>
                    <SelectItem value="manicure">Manicure</SelectItem>
                    <SelectItem value="maquiadora">Maquiadora</SelectItem>
                    <SelectItem value="esteticista">Esteticista</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia/Apresentação</Label>
                <Textarea
                  id="bio"
                  placeholder="Conte um pouco sobre você, sua experiência e estilo de trabalho..."
                  className="min-h-[120px]"
                  value={dadosProfissionais.biografia}
                  onChange={(e) => setDadosProfissionais((prev) => ({ ...prev, biografia: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Esta descrição será exibida no seu perfil público para os clientes.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Especialidades e Habilidades</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remover {skill}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar nova habilidade"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button type="button" onClick={addSkill} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Redes Sociais</Label>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="@seu_instagram"
                      value={dadosProfissionais.redesSociais.instagram}
                      onChange={(e) =>
                        setDadosProfissionais((prev) => ({
                          ...prev,
                          redesSociais: { ...prev.redesSociais, instagram: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Facebook className="h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="facebook.com/seuperfil"
                      value={dadosProfissionais.redesSociais.facebook}
                      onChange={(e) =>
                        setDadosProfissionais((prev) => ({
                          ...prev,
                          redesSociais: { ...prev.redesSociais, facebook: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="linkedin.com/in/seuperfil"
                      value={dadosProfissionais.redesSociais.linkedin}
                      onChange={(e) =>
                        setDadosProfissionais((prev) => ({
                          ...prev,
                          redesSociais: { ...prev.redesSociais, linkedin: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Horários de Trabalho</Label>
                <div className="space-y-4">
                  {[
                    { key: "segunda", label: "Segunda-feira" },
                    { key: "terca", label: "Terça-feira" },
                    { key: "quarta", label: "Quarta-feira" },
                    { key: "quinta", label: "Quinta-feira" },
                    { key: "sexta", label: "Sexta-feira" },
                    { key: "sabado", label: "Sábado" },
                    { key: "domingo", label: "Domingo" },
                  ].map((dia) => (
                    <div key={dia.key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={dia.key}
                          className="h-4 w-4"
                          checked={
                            dadosProfissionais.horarioTrabalho[
                              dia.key as keyof typeof dadosProfissionais.horarioTrabalho
                            ].ativo
                          }
                          onChange={(e) =>
                            setDadosProfissionais((prev) => ({
                              ...prev,
                              horarioTrabalho: {
                                ...prev.horarioTrabalho,
                                [dia.key]: {
                                  ...prev.horarioTrabalho[dia.key as keyof typeof prev.horarioTrabalho],
                                  ativo: e.target.checked,
                                },
                              },
                            }))
                          }
                        />
                        <Label htmlFor={dia.key}>{dia.label}</Label>
                      </div>
                      {dadosProfissionais.horarioTrabalho[dia.key as keyof typeof dadosProfissionais.horarioTrabalho]
                        .ativo && (
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            className="w-24"
                            value={
                              dadosProfissionais.horarioTrabalho[
                                dia.key as keyof typeof dadosProfissionais.horarioTrabalho
                              ].inicio
                            }
                            onChange={(e) =>
                              setDadosProfissionais((prev) => ({
                                ...prev,
                                horarioTrabalho: {
                                  ...prev.horarioTrabalho,
                                  [dia.key]: {
                                    ...prev.horarioTrabalho[dia.key as keyof typeof prev.horarioTrabalho],
                                    inicio: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                          <span>às</span>
                          <Input
                            type="time"
                            className="w-24"
                            value={
                              dadosProfissionais.horarioTrabalho[
                                dia.key as keyof typeof dadosProfissionais.horarioTrabalho
                              ].fim
                            }
                            onChange={(e) =>
                              setDadosProfissionais((prev) => ({
                                ...prev,
                                horarioTrabalho: {
                                  ...prev.horarioTrabalho,
                                  [dia.key]: {
                                    ...prev.horarioTrabalho[dia.key as keyof typeof prev.horarioTrabalho],
                                    fim: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Perfil Profissional</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="servicos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Serviços e Preços</CardTitle>
              <CardDescription>Configure os serviços que você oferece e seus preços</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "corte", label: "Corte de Cabelo", duracao: "45 min" },
                  { key: "coloracao", label: "Coloração", duracao: "2h" },
                  { key: "hidratacao", label: "Hidratação", duracao: "1h" },
                  { key: "escova", label: "Escova", duracao: "45 min" },
                  { key: "penteado", label: "Penteado", duracao: "1h 30min" },
                ].map((servico) => (
                  <div key={servico.key} className="space-y-2 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{servico.label}</h4>
                      <Badge variant="outline">{servico.duracao}</Badge>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`preco-${servico.key}`}>Preço (R$)</Label>
                      <Input
                        id={`preco-${servico.key}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={dadosProfissionais.precos[servico.key as keyof typeof dadosProfissionais.precos]}
                        onChange={(e) =>
                          setDadosProfissionais((prev) => ({
                            ...prev,
                            precos: { ...prev.precos, [servico.key]: Number.parseFloat(e.target.value) || 0 },
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Preços</Button>
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
                  <p className="text-sm text-muted-foreground">Permite que clientes vejam seu perfil</p>
                </div>
                <Switch
                  checked={configuracoes.privacidade.perfilPublico}
                  onCheckedChange={(checked) => updateConfiguracoes("privacidade", "perfilPublico", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Mostrar Avaliações</Label>
                  <p className="text-sm text-muted-foreground">Exibe suas avaliações no perfil público</p>
                </div>
                <Switch
                  checked={configuracoes.privacidade.mostrarAvaliacao}
                  onCheckedChange={(checked) => updateConfiguracoes("privacidade", "mostrarAvaliacao", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Mostrar Preços</Label>
                  <p className="text-sm text-muted-foreground">Exibe os preços dos seus serviços</p>
                </div>
                <Switch
                  checked={configuracoes.privacidade.mostrarPrecos}
                  onCheckedChange={(checked) => updateConfiguracoes("privacidade", "mostrarPrecos", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Aceitar Novos Clientes</Label>
                  <p className="text-sm text-muted-foreground">Permite que novos clientes agendem com você</p>
                </div>
                <Switch
                  checked={configuracoes.privacidade.aceitarNovosClientes}
                  onCheckedChange={(checked) => updateConfiguracoes("privacidade", "aceitarNovosClientes", checked)}
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
        </TabsContent>

        <TabsContent value="estatisticas" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.totalClientes}</div>
                <p className="text-xs text-muted-foreground">Clientes atendidos</p>
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
                <p className="text-xs text-muted-foreground">Baseado em avaliações</p>
              </CardContent>
            </Card>

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
                <CardTitle className="text-sm font-medium">Faturamento Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {estatisticas.faturamentoMensal.toFixed(2).replace(".", ",")}
                </div>
                <p className="text-xs text-muted-foreground">Média mensal</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Clientes Recorrentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.clientesRecorrentes}%</div>
                <p className="text-xs text-muted-foreground">Taxa de retenção</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.tempoMedioAtendimento}min</div>
                <p className="text-xs text-muted-foreground">Por atendimento</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progresso Profissional</CardTitle>
              <CardDescription>Seu desenvolvimento como profissional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Meta de Clientes Mensais</h4>
                  <span className="text-sm font-medium">85 / 100</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">85% da meta atingida</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Satisfação dos Clientes</h4>
                  <span className="text-sm font-medium">4.9 / 5.0</span>
                </div>
                <Progress value={98} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">98% de satisfação</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Taxa de Retenção</h4>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">Clientes que retornam</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
