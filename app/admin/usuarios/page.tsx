"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Search, Shield, Users, Crown, MoreVertical, History } from "lucide-react"
import { getAllUsers, updateUserAccessLevel, toggleUserStatus, type User as UserType } from "@/lib/database/users"
import { getSession } from "@/lib/auth/session"
import { canModifyUser, getAccessLevelName } from "@/lib/auth/auth-service"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function UsersManagementPage() {
  const { toast } = useToast()
  const currentUser = getSession()
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLevel, setFilterLevel] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newLevel, setNewLevel] = useState<number>(10)
  const [reason, setReason] = useState("")

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      const data = await getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error("Error loading users:", error)
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os usuários.",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === "all" || user.access_level.toString() === filterLevel
    return matchesSearch && matchesLevel
  })

  const handleEditAccess = (user: UserType) => {
    if (!currentUser) return

    if (!canModifyUser(currentUser.accessLevel, currentUser.isOwner, user.access_level)) {
      toast({
        variant: "destructive",
        title: "Sem permissão",
        description: "Você não tem permissão para modificar este usuário.",
      })
      return
    }

    setSelectedUser(user)
    setNewLevel(user.access_level)
    setReason("")
    setIsEditDialogOpen(true)
  }

  const handleSaveAccessLevel = async () => {
    if (!selectedUser || !currentUser) return

    if (selectedUser.access_level === newLevel) {
      toast({
        variant: "destructive",
        title: "Nenhuma alteração",
        description: "O nível de acesso não foi alterado.",
      })
      return
    }

    try {
      await updateUserAccessLevel(selectedUser.id, newLevel, currentUser.id, reason)

      toast({
        title: "Nível de acesso atualizado",
        description: `${selectedUser.name} agora é ${getAccessLevelName(newLevel)}`,
      })

      setIsEditDialogOpen(false)
      loadUsers()
    } catch (error) {
      console.error("Error updating access level:", error)
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o nível de acesso.",
      })
    }
  }

  const handleToggleStatus = async (user: UserType) => {
    if (!currentUser) return

    if (!canModifyUser(currentUser.accessLevel, currentUser.isOwner, user.access_level)) {
      toast({
        variant: "destructive",
        title: "Sem permissão",
        description: "Você não tem permissão para modificar este usuário.",
      })
      return
    }

    try {
      await toggleUserStatus(user.id, !user.is_active)
      toast({
        title: user.is_active ? "Usuário desativado" : "Usuário ativado",
        description: `${user.name} foi ${user.is_active ? "desativado" : "ativado"} com sucesso.`,
      })
      loadUsers()
    } catch (error) {
      console.error("Error toggling user status:", error)
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível alterar o status do usuário.",
      })
    }
  }

  const getAccessLevelBadge = (level: number, isOwner: boolean) => {
    if (isOwner) {
      return (
        <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-amber-600">
          <Crown className="h-3 w-3 mr-1" />
          Owner
        </Badge>
      )
    }

    switch (level) {
      case 30:
        return (
          <Badge variant="default" className="bg-red-500">
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        )
      case 20:
        return (
          <Badge variant="default" className="bg-blue-500">
            <Users className="h-3 w-3 mr-1" />
            Staff
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Users className="h-3 w-3 mr-1" />
            Cliente
          </Badge>
        )
    }
  }

  const stats = {
    total: users.length,
    clients: users.filter((u) => u.access_level === 10).length,
    staff: users.filter((u) => u.access_level === 20).length,
    admins: users.filter((u) => u.access_level === 30).length,
    active: users.filter((u) => u.is_active).length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
        <p className="text-muted-foreground">Gerencie níveis de acesso e permissões dos usuários</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.staff}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admins}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                <SelectItem value="10">Cliente (10)</SelectItem>
                <SelectItem value="20">Staff (20)</SelectItem>
                <SelectItem value="30">Admin (30)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Lista de todos os usuários cadastrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{user.name}</p>
                      {!user.is_active && <Badge variant="outline">Inativo</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="hidden md:block">{getAccessLevelBadge(user.access_level, user.is_owner)}</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleEditAccess(user)}
                      disabled={
                        !currentUser || !canModifyUser(currentUser.accessLevel, currentUser.isOwner, user.access_level)
                      }
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Alterar Nível
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleToggleStatus(user)}
                      disabled={
                        !currentUser || !canModifyUser(currentUser.accessLevel, currentUser.isOwner, user.access_level)
                      }
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {user.is_active ? "Desativar" : "Ativar"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <History className="h-4 w-4 mr-2" />
                      Ver Histórico
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum usuário encontrado com os filtros aplicados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Access Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Nível de Acesso</DialogTitle>
            <DialogDescription>Modifique o nível de acesso de {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nível Atual</Label>
              <div className="p-3 bg-muted rounded-md">
                {selectedUser && getAccessLevelBadge(selectedUser.access_level, selectedUser.is_owner)}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-level">Novo Nível</Label>
              <Select value={newLevel.toString()} onValueChange={(value) => setNewLevel(Number.parseInt(value))}>
                <SelectTrigger id="new-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Cliente (10)</SelectItem>
                  <SelectItem value="20">Staff (20)</SelectItem>
                  <SelectItem value="30" disabled={!currentUser?.isOwner && currentUser?.accessLevel !== 30}>
                    Admin (30)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo (Opcional)</Label>
              <Textarea
                id="reason"
                placeholder="Descreva o motivo da alteração..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveAccessLevel}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
