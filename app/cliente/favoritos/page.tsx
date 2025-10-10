"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Search, Instagram, Calendar, Trash2 } from "lucide-react"

export default function ClienteFavoritos() {
  const [searchTerm, setSearchTerm] = useState("")

  const [profissionaisFavoritos, setProfissionaisFavoritos] = useState([
    {
      id: 1,
      name: "Ana Silva",
      role: "Cabeleireira",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 127,
      specialties: ["Cortes Femininos", "Coloração", "Mechas"],
      instagram: "@anasilva.hair",
      lastService: "Corte de Cabelo",
      lastServiceDate: "10/05/2024",
      totalServices: 5,
    },
    {
      id: 2,
      name: "Juliana Santos",
      role: "Manicure",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 85,
      specialties: ["Unhas em Gel", "Nail Art", "Alongamento"],
      instagram: "@juliana.nails",
      lastService: "Manicure",
      lastServiceDate: "28/04/2024",
      totalServices: 3,
    },
    {
      id: 3,
      name: "Rafael Costa",
      role: "Cabeleireiro",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 112,
      specialties: ["Tratamentos Capilares", "Cortes", "Penteados"],
      instagram: "@rafael.hair",
      lastService: "Hidratação",
      lastServiceDate: "15/04/2024",
      totalServices: 2,
    },
  ])

  const [servicosFavoritos, setServicosFavoritos] = useState([
    {
      id: 1,
      name: "Corte de Cabelo",
      category: "Cabelo",
      averagePrice: "R$ 80,00",
      duration: "45 min",
      timesBooked: 5,
      lastBooked: "10/05/2024",
      description: "Corte personalizado de acordo com o formato do rosto",
    },
    {
      id: 2,
      name: "Hidratação Profunda",
      category: "Tratamento",
      averagePrice: "R$ 120,00",
      duration: "1h 30min",
      timesBooked: 3,
      lastBooked: "15/04/2024",
      description: "Tratamento intensivo para cabelos ressecados",
    },
    {
      id: 3,
      name: "Manicure Completa",
      category: "Unhas",
      averagePrice: "R$ 60,00",
      duration: "1h",
      timesBooked: 3,
      lastBooked: "28/04/2024",
      description: "Cuidado completo das unhas das mãos",
    },
    {
      id: 4,
      name: "Coloração",
      category: "Cabelo",
      averagePrice: "R$ 150,00",
      duration: "2h",
      timesBooked: 2,
      lastBooked: "20/03/2024",
      description: "Coloração profissional com produtos de qualidade",
    },
  ])

  const removerProfissionalFavorito = (id: number) => {
    setProfissionaisFavoritos((prev) => prev.filter((p) => p.id !== id))
  }

  const removerServicoFavorito = (id: number) => {
    setServicosFavoritos((prev) => prev.filter((s) => s.id !== id))
  }

  const filteredProfissionais = profissionaisFavoritos.filter(
    (pro) =>
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredServicos = servicosFavoritos.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meus Favoritos</h1>
        <p className="text-muted-foreground">Seus profissionais e serviços preferidos em um só lugar</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar nos favoritos..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="profissionais">
        <TabsList>
          <TabsTrigger value="profissionais">Profissionais ({profissionaisFavoritos.length})</TabsTrigger>
          <TabsTrigger value="servicos">Serviços ({servicosFavoritos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="profissionais" className="space-y-4">
          {filteredProfissionais.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfissionais.map((profissional) => (
                <Card key={profissional.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
                    onClick={() => removerProfissionalFavorito(profissional.id)}
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  </Button>
                  <div className="relative h-48">
                    <Image
                      src={profissional.image || "/placeholder.svg"}
                      alt={profissional.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{profissional.name}</CardTitle>
                        <CardDescription>{profissional.role}</CardDescription>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-primary fill-primary" />
                        <span className="ml-1 font-medium">{profissional.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({profissional.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {profissional.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Último serviço:</span>
                        <span>{profissional.lastService}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data:</span>
                        <span>{profissional.lastServiceDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total de serviços:</span>
                        <span>{profissional.totalServices}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Instagram className="h-4 w-4 mr-1" />
                      {profissional.instagram}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/cliente/profissionais/${profissional.id}`}>Ver Perfil</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/cliente/solicitacao?profissional=${profissional.id}`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum profissional favorito encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "Tente buscar por outro termo"
                  : "Adicione profissionais aos seus favoritos para vê-los aqui"}
              </p>
              <Button asChild>
                <Link href="/cliente/profissionais">Explorar Profissionais</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="servicos" className="space-y-4">
          {filteredServicos.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredServicos.map((servico) => (
                <Card key={servico.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removerServicoFavorito(servico.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                  </Button>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{servico.name}</CardTitle>
                        <CardDescription>{servico.category}</CardDescription>
                      </div>
                      <Badge variant="outline">
                        <Heart className="h-3 w-3 mr-1 text-red-500 fill-red-500" />
                        Favorito
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{servico.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Preço médio:</span>
                        <p className="font-medium">{servico.averagePrice}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duração:</span>
                        <p className="font-medium">{servico.duration}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Vezes agendado:</span>
                        <p className="font-medium">{servico.timesBooked}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Último agendamento:</span>
                        <p className="font-medium">{servico.lastBooked}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/agendamento?servico=${servico.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar {servico.name}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum serviço favorito encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Tente buscar por outro termo" : "Adicione serviços aos seus favoritos para vê-los aqui"}
              </p>
              <Button asChild>
                <Link href="/agendamento">Explorar Serviços</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
