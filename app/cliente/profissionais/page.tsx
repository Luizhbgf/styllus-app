"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Instagram, Star, Search, Filter, Clock, Calendar } from "lucide-react"

export default function ClienteProfissionais() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevancia")

  const profissionais = [
    {
      id: 1,
      name: "Ana Silva",
      role: "Cabeleireira",
      category: "cabelo",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 127,
      specialties: ["Cortes Femininos", "Coloração", "Mechas"],
      bio: "Especialista em coloração e mechas, com mais de 10 anos de experiência no mercado.",
      instagram: "@anasilva.hair",
      priceRange: "R$ 80 - R$ 250",
      availability: ["Manhã", "Tarde"],
      services: ["Corte de Cabelo", "Coloração", "Mechas", "Hidratação"],
      whatsapp: "5511987654321",
    },
    {
      id: 2,
      name: "Carlos Oliveira",
      role: "Barbeiro",
      category: "barba",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 98,
      specialties: ["Cortes Masculinos", "Barba", "Degradê"],
      bio: "Barbeiro especializado em cortes modernos e técnicas de barbear tradicionais.",
      instagram: "@carlosoliveira.barber",
      priceRange: "R$ 50 - R$ 120",
      availability: ["Tarde", "Noite"],
      services: ["Corte Masculino", "Barba", "Pezinho", "Sobrancelha"],
      whatsapp: "5511987654322",
    },
    {
      id: 3,
      name: "Juliana Santos",
      role: "Manicure",
      category: "manicure",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 85,
      specialties: ["Unhas em Gel", "Nail Art", "Alongamento"],
      bio: "Especialista em unhas em gel e nail art, sempre atualizada com as últimas tendências.",
      instagram: "@juliana.nails",
      priceRange: "R$ 40 - R$ 150",
      availability: ["Manhã", "Tarde", "Noite"],
      services: ["Manicure", "Pedicure", "Unhas em Gel", "Nail Art"],
      whatsapp: "5511987654323",
    },
    {
      id: 4,
      name: "Rafael Costa",
      role: "Cabeleireiro",
      category: "cabelo",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 112,
      specialties: ["Tratamentos Capilares", "Cortes", "Penteados"],
      bio: "Especialista em tratamentos capilares e recuperação de cabelos danificados.",
      instagram: "@rafael.hair",
      priceRange: "R$ 80 - R$ 200",
      availability: ["Tarde", "Noite"],
      services: ["Corte de Cabelo", "Tratamento Capilar", "Hidratação", "Penteado"],
      whatsapp: "5511987654324",
    },
    {
      id: 5,
      name: "Fernanda Lima",
      role: "Maquiadora",
      category: "maquiagem",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 76,
      specialties: ["Maquiagem Social", "Maquiagem para Noivas", "Automaquiagem"],
      bio: "Maquiadora profissional especializada em realçar a beleza natural de cada cliente.",
      instagram: "@fernanda.makeup",
      priceRange: "R$ 100 - R$ 300",
      availability: ["Manhã", "Tarde"],
      services: ["Maquiagem Social", "Maquiagem para Noivas", "Curso de Automaquiagem"],
      whatsapp: "5511987654325",
    },
    {
      id: 6,
      name: "Mariana Costa",
      role: "Esteticista",
      category: "estetica",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 92,
      specialties: ["Limpeza de Pele", "Massagem", "Tratamentos Faciais"],
      bio: "Esteticista com formação internacional e especialização em tratamentos faciais avançados.",
      instagram: "@mariana.estetica",
      priceRange: "R$ 90 - R$ 250",
      availability: ["Manhã", "Tarde"],
      services: ["Limpeza de Pele", "Massagem Relaxante", "Tratamento Facial", "Drenagem Linfática"],
      whatsapp: "5511987654326",
    },
  ]

  // Filtrar profissionais
  const filteredProfessionals = profissionais
    .filter((pro) => {
      // Filtro por categoria
      if (selectedCategory !== "todos" && pro.category !== selectedCategory) return false

      // Filtro por termo de busca
      if (
        searchTerm &&
        !pro.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !pro.role.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !pro.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
      )
        return false

      // Filtro por serviços
      if (selectedServices.length > 0 && !pro.services.some((s) => selectedServices.includes(s))) return false

      // Filtro por disponibilidade
      if (selectedAvailability.length > 0 && !pro.availability.some((a) => selectedAvailability.includes(a)))
        return false

      return true
    })
    .sort((a, b) => {
      // Ordenação
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviews - a.reviews
      // Por padrão, ordenar por relevância (uma combinação de avaliação e número de avaliações)
      return b.rating * b.reviews - a.rating * a.reviews
    })

  const toggleService = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const toggleAvailability = (time: string) => {
    setSelectedAvailability((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
  }

  const allServices = Array.from(new Set(profissionais.flatMap((pro) => pro.services))).sort()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Encontre seu Profissional</h1>
        <p className="text-muted-foreground">Descubra o profissional perfeito para o seu estilo</p>
      </div>

      {/* Barra de pesquisa e filtros */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, especialidade..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Relevância</SelectItem>
                <SelectItem value="rating">Melhor Avaliação</SelectItem>
                <SelectItem value="reviews">Mais Avaliações</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Categorias</h3>
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                    <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
                      <TabsTrigger value="todos" className="text-xs py-1">
                        Todos
                      </TabsTrigger>
                      <TabsTrigger value="cabelo" className="text-xs py-1">
                        Cabelo
                      </TabsTrigger>
                      <TabsTrigger value="barba" className="text-xs py-1">
                        Barba
                      </TabsTrigger>
                      <TabsTrigger value="manicure" className="text-xs py-1">
                        Manicure
                      </TabsTrigger>
                      <TabsTrigger value="maquiagem" className="text-xs py-1">
                        Maquiagem
                      </TabsTrigger>
                      <TabsTrigger value="estetica" className="text-xs py-1">
                        Estética
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Serviços</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {allServices.slice(0, 6).map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={() => toggleService(service)}
                        />
                        <Label htmlFor={`service-${service}`} className="text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Disponibilidade</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Manhã", "Tarde", "Noite"].map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <Checkbox
                          id={`time-${time}`}
                          checked={selectedAvailability.includes(time)}
                          onCheckedChange={() => toggleAvailability(time)}
                        />
                        <Label htmlFor={`time-${time}`} className="text-sm">
                          {time}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Lista de profissionais */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.map((profissional) => (
          <Card key={profissional.id} className="overflow-hidden">
            <div className="relative h-64">
              <Image
                src={profissional.image || "/placeholder.svg"}
                alt={profissional.name}
                fill
                className="object-cover"
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
              <p className="text-sm text-muted-foreground">{profissional.bio}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Instagram className="h-4 w-4 mr-1" />
                {profissional.instagram}
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{profissional.availability.join(", ")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{profissional.priceRange}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/cliente/profissionais/${profissional.id}`}>Ver Perfil</Link>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://wa.me/${profissional.whatsapp}?text=Olá, gostaria de agendar um horário com você!`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                      className="lucide lucide-message-circle"
                    >
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                    <span className="sr-only">WhatsApp</span>
                  </a>
                </Button>
                <Button asChild>
                  <Link href={`/cliente/solicitacao?profissional=${profissional.id}`}>Solicitar Horário</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProfessionals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum profissional encontrado com os filtros selecionados.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("todos")
              setSelectedServices([])
              setSelectedAvailability([])
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
