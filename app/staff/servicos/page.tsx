"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase/client"
import { getSession } from "@/lib/auth/session"

interface Service {
  id: string
  name: string
  description: string
  category: string
  duration_minutes: number
  price: number
  is_active: boolean
}

export default function StaffServicos() {
  const { toast } = useToast()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    duration_minutes: 30,
    price: 0,
    is_active: true,
  })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const session = getSession()
      if (!session) return

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("professional_id", session.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      setServices(data || [])
    } catch (error) {
      console.error("Error loading services:", error)
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os serviços",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const session = getSession()
      if (!session) return

      if (editingService) {
        // Atualizar serviço existente
        const { error } = await supabase.from("services").update(formData).eq("id", editingService.id)

        if (error) throw error

        toast({
          title: "Serviço atualizado!",
          description: "As alterações foram salvas com sucesso",
        })
      } else {
        // Criar novo serviço
        const { error } = await supabase.from("services").insert({
          ...formData,
          professional_id: session.id,
        })

        if (error) throw error

        toast({
          title: "Serviço criado!",
          description: "O novo serviço foi adicionado com sucesso",
        })
      }

      setIsDialogOpen(false)
      resetForm()
      loadServices()
    } catch (error) {
      console.error("Error saving service:", error)
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar o serviço",
      })
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category,
      duration_minutes: service.duration_minutes,
      price: service.price,
      is_active: service.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return

    try {
      const { error } = await supabase.from("services").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Serviço excluído",
        description: "O serviço foi removido com sucesso",
      })

      loadServices()
    } catch (error) {
      console.error("Error deleting service:", error)
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir o serviço",
      })
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("services").update({ is_active: !currentStatus }).eq("id", id)

      if (error) throw error

      toast({
        title: currentStatus ? "Serviço desativado" : "Serviço ativado",
      })

      loadServices()
    } catch (error) {
      console.error("Error toggling service status:", error)
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível alterar o status",
      })
    }
  }

  const resetForm = () => {
    setEditingService(null)
    setFormData({
      name: "",
      description: "",
      category: "",
      duration_minutes: 30,
      price: 0,
      is_active: true,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando serviços...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Serviços</h1>
          <p className="text-muted-foreground">Gerencie os serviços que você oferece aos seus clientes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingService ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
              <DialogDescription>
                {editingService ? "Atualize as informações do serviço" : "Adicione um novo serviço ao seu catálogo"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Serviço *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Corte de Cabelo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o serviço..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cabelo">Cabelo</SelectItem>
                        <SelectItem value="barba">Barba</SelectItem>
                        <SelectItem value="sobrancelha">Sobrancelha</SelectItem>
                        <SelectItem value="manicure">Manicure</SelectItem>
                        <SelectItem value="pedicure">Pedicure</SelectItem>
                        <SelectItem value="estetica">Estética</SelectItem>
                        <SelectItem value="massagem">Massagem</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (minutos) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="15"
                      step="15"
                      value={formData.duration_minutes}
                      onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="active">Serviço ativo</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingService ? "Salvar Alterações" : "Criar Serviço"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum serviço cadastrado</h3>
            <p className="text-muted-foreground text-center mb-4">
              Comece criando seu primeiro serviço para que os clientes possam agendar com você
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Serviço
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className={!service.is_active ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {service.name}
                      {!service.is_active && <Badge variant="secondary">Inativo</Badge>}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      <Badge variant="outline" className="mt-2">
                        {service.category}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {service.description && <p className="text-sm text-muted-foreground">{service.description}</p>}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{service.duration_minutes} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <DollarSign className="h-5 w-5 text-primary" />
                    {formatPrice(service.price)}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(service)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(service.id, service.is_active)}
                    className="flex-1"
                  >
                    {service.is_active ? "Desativar" : "Ativar"}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
