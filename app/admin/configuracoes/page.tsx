"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Bell, CreditCard, Users, Globe, Database, Save, Upload } from "lucide-react"

export default function AdminConfiguracoesPage() {
  const [configuracoes, setConfiguracoes] = useState({
    // Configurações Gerais
    nomeEmpresa: "Styllus",
    descricao: "Plataforma de serviços de beleza e bem-estar",
    email: "contato@styllus.com",
    telefone: "(11) 99999-9999",
    endereco: "São Paulo, SP",

    // Notificações
    emailNotificacoes: true,
    smsNotificacoes: false,
    pushNotificacoes: true,
    notificacoesAgendamento: true,
    notificacoesPagamento: true,

    // Pagamentos
    taxaPlataforma: 5,
    taxaCartao: 3.5,
    prazoRepasse: 7,

    // Sistema
    manutencao: false,
    registroNovosUsuarios: true,
    aprovacaoAutomatica: false,
    backupAutomatico: true,

    // Segurança
    autenticacaoDoisFatores: true,
    sessaoExpira: 24,
    tentativasLogin: 5,
  })

  const handleSave = () => {
    // Lógica para salvar configurações
    console.log("Configurações salvas:", configuracoes)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Informações da Empresa
              </CardTitle>
              <CardDescription>Configure as informações básicas da sua empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                  <Input
                    id="nomeEmpresa"
                    value={configuracoes.nomeEmpresa}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, nomeEmpresa: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email de Contato</Label>
                  <Input
                    id="email"
                    type="email"
                    value={configuracoes.email}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={configuracoes.telefone}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, telefone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={configuracoes.endereco}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, endereco: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="descricao">Descrição da Empresa</Label>
                <Textarea
                  id="descricao"
                  value={configuracoes.descricao}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, descricao: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>Logo da Empresa</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Fazer Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
              <CardDescription>Configure como e quando as notificações são enviadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canais de Notificação</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">Enviar notificações via email</p>
                    </div>
                    <Switch
                      checked={configuracoes.emailNotificacoes}
                      onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, emailNotificacoes: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por SMS</Label>
                      <p className="text-sm text-muted-foreground">Enviar notificações via SMS</p>
                    </div>
                    <Switch
                      checked={configuracoes.smsNotificacoes}
                      onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, smsNotificacoes: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Notificações push no app</p>
                    </div>
                    <Switch
                      checked={configuracoes.pushNotificacoes}
                      onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, pushNotificacoes: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tipos de Notificação</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Agendamentos</Label>
                      <p className="text-sm text-muted-foreground">Novos agendamentos e alterações</p>
                    </div>
                    <Switch
                      checked={configuracoes.notificacoesAgendamento}
                      onCheckedChange={(checked) =>
                        setConfiguracoes({ ...configuracoes, notificacoesAgendamento: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Pagamentos</Label>
                      <p className="text-sm text-muted-foreground">Confirmações e falhas de pagamento</p>
                    </div>
                    <Switch
                      checked={configuracoes.notificacoesPagamento}
                      onCheckedChange={(checked) =>
                        setConfiguracoes({ ...configuracoes, notificacoesPagamento: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagamentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Configurações de Pagamento
              </CardTitle>
              <CardDescription>Configure taxas e prazos de pagamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="taxaPlataforma">Taxa da Plataforma (%)</Label>
                  <Input
                    id="taxaPlataforma"
                    type="number"
                    value={configuracoes.taxaPlataforma}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, taxaPlataforma: Number(e.target.value) })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Taxa cobrada por transação</p>
                </div>
                <div>
                  <Label htmlFor="taxaCartao">Taxa do Cartão (%)</Label>
                  <Input
                    id="taxaCartao"
                    type="number"
                    step="0.1"
                    value={configuracoes.taxaCartao}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, taxaCartao: Number(e.target.value) })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Taxa do processador de pagamento</p>
                </div>
                <div>
                  <Label htmlFor="prazoRepasse">Prazo de Repasse (dias)</Label>
                  <Input
                    id="prazoRepasse"
                    type="number"
                    value={configuracoes.prazoRepasse}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, prazoRepasse: Number(e.target.value) })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Dias para repasse aos profissionais</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Métodos de Pagamento Aceitos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { nome: "Cartão de Crédito", ativo: true },
                    { nome: "Cartão de Débito", ativo: true },
                    { nome: "PIX", ativo: true },
                    { nome: "Boleto", ativo: false },
                  ].map((metodo, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{metodo.nome}</span>
                      <Badge variant={metodo.ativo ? "default" : "secondary"}>
                        {metodo.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Configurações de Usuários
              </CardTitle>
              <CardDescription>Configure políticas para novos usuários e aprovações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Permitir Registro de Novos Usuários</Label>
                    <p className="text-sm text-muted-foreground">Usuários podem se cadastrar livremente</p>
                  </div>
                  <Switch
                    checked={configuracoes.registroNovosUsuarios}
                    onCheckedChange={(checked) =>
                      setConfiguracoes({ ...configuracoes, registroNovosUsuarios: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Aprovação Automática de Profissionais</Label>
                    <p className="text-sm text-muted-foreground">Profissionais são aprovados automaticamente</p>
                  </div>
                  <Switch
                    checked={configuracoes.aprovacaoAutomatica}
                    onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, aprovacaoAutomatica: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Estatísticas de Usuários</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold">1,234</div>
                    <div className="text-sm text-muted-foreground">Total de Usuários</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold">89</div>
                    <div className="text-sm text-muted-foreground">Profissionais Ativos</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold">1,145</div>
                    <div className="text-sm text-muted-foreground">Clientes Ativos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>Configure políticas de segurança e autenticação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">Exigir 2FA para todos os usuários</p>
                  </div>
                  <Switch
                    checked={configuracoes.autenticacaoDoisFatores}
                    onCheckedChange={(checked) =>
                      setConfiguracoes({ ...configuracoes, autenticacaoDoisFatores: checked })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessaoExpira">Expiração de Sessão (horas)</Label>
                  <Input
                    id="sessaoExpira"
                    type="number"
                    value={configuracoes.sessaoExpira}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, sessaoExpira: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="tentativasLogin">Máximo de Tentativas de Login</Label>
                  <Input
                    id="tentativasLogin"
                    type="number"
                    value={configuracoes.tentativasLogin}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, tentativasLogin: Number(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>Configure manutenção, backups e outras configurações técnicas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Modo de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">Sistema em manutenção para usuários</p>
                  </div>
                  <Switch
                    checked={configuracoes.manutencao}
                    onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, manutencao: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">Backup diário automático dos dados</p>
                  </div>
                  <Switch
                    checked={configuracoes.backupAutomatico}
                    onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, backupAutomatico: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Informações do Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Versão do Sistema</div>
                    <div className="font-medium">v2.1.0</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Último Backup</div>
                    <div className="font-medium">Hoje às 03:00</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Uptime</div>
                    <div className="font-medium">99.9%</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Espaço em Disco</div>
                    <div className="font-medium">78% usado</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Fazer Backup Manual
                </Button>
                <Button variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  Verificar Atualizações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
