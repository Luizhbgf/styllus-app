import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, BookOpen, Star, Scissors, Brush, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 hero-gradient text-white">
          <div className="container flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Styllus <span className="text-primary">Salão de Beleza</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Agende seu horário com os melhores profissionais e transforme seu visual com um clique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/agendamento">Agendar Agora</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                asChild
              >
                <Link href="/profissionais">Nossos Profissionais</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Por que escolher o Styllus?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nosso sistema oferece uma experiência completa para você e seu salão
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="space-y-1">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Agendamento Fácil</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Agende horários com seus profissionais favoritos em poucos cliques, sem complicações.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Disponibilidade em Tempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Veja a disponibilidade dos profissionais em tempo real e escolha o melhor horário para você.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Perfil de Profissionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Conheça nossos profissionais, suas especialidades e avaliações antes de agendar.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Cursos e Workshops</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Inscreva-se em cursos e workshops exclusivos para aprimorar suas habilidades.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Avaliações e Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compartilhe sua experiência e veja avaliações de outros clientes para fazer a melhor escolha.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Promoções Exclusivas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Receba notificações sobre promoções exclusivas e descontos especiais.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Oferecemos uma ampla variedade de serviços para atender todas as suas necessidades
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden">
                <div className="h-48 relative">
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Corte de Cabelo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex items-center gap-2">
                      <Scissors className="h-5 w-5 text-white" />
                      <h3 className="text-xl font-bold text-white">Corte de Cabelo</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    Cortes modernos e personalizados para todos os tipos de cabelo e estilos.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/agendamento">Agendar</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <div className="h-48 relative">
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  <Image src="/placeholder.svg?height=300&width=500" alt="Coloração" fill className="object-cover" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex items-center gap-2">
                      <Brush className="h-5 w-5 text-white" />
                      <h3 className="text-xl font-bold text-white">Coloração</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    Coloração profissional com as melhores técnicas e produtos de qualidade.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/agendamento">Agendar</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <div className="h-48 relative">
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Manicure e Pedicure"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-white" />
                      <h3 className="text-xl font-bold text-white">Manicure</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    Cuidados completos para suas unhas com os melhores produtos e técnicas.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/agendamento">Agendar</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/agendamento">Ver Todos os Serviços</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Cursos e Workshops</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Aprimore suas habilidades com nossos cursos exclusivos ministrados por profissionais renomados
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Técnicas Avançadas de Coloração</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>20 horas</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Aprenda técnicas avançadas de coloração, incluindo balayage, ombré e mechas.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="font-bold">R$ 1.200,00</span>
                  <Button asChild>
                    <Link href="/cursos/1">Inscrever-se</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Corte Masculino Moderno</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>16 horas</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Domine as técnicas de corte masculino moderno, incluindo fade, pompadour e texturas.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="font-bold">R$ 980,00</span>
                  <Button asChild>
                    <Link href="/cursos/2">Inscrever-se</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Nail Art Profissional</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>24 horas</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Aprenda técnicas avançadas de nail art, incluindo desenhos, adesivos e efeitos especiais.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="font-bold">R$ 1.450,00</span>
                  <Button asChild>
                    <Link href="/cursos/3">Inscrever-se</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/cursos">Ver Todos os Cursos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para transformar seu visual?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Agende seu horário agora mesmo e experimente o melhor atendimento com os melhores profissionais.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/agendamento">Agendar Agora</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
