import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
            <CardDescription>Entre com seu e-mail e senha para acessar sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="cliente" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cliente">Cliente</TabsTrigger>
                <TabsTrigger value="staff">Profissional</TabsTrigger>
                <TabsTrigger value="admin">Administrador</TabsTrigger>
              </TabsList>
              <TabsContent value="cliente" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-cliente">E-mail</Label>
                  <Input id="email-cliente" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-cliente">Senha</Label>
                    <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input id="password-cliente" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-cliente" />
                  <Label htmlFor="remember-cliente" className="text-sm">
                    Lembrar de mim
                  </Label>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/cliente/dashboard">Entrar como Cliente</Link>
                </Button>
              </TabsContent>
              <TabsContent value="staff" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-staff">E-mail</Label>
                  <Input id="email-staff" type="email" placeholder="profissional@styllus.com" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-staff">Senha</Label>
                    <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input id="password-staff" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-staff" />
                  <Label htmlFor="remember-staff" className="text-sm">
                    Lembrar de mim
                  </Label>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/staff/dashboard">Entrar como Profissional</Link>
                </Button>
              </TabsContent>
              <TabsContent value="admin" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-admin">E-mail</Label>
                  <Input id="email-admin" type="email" placeholder="admin@styllus.com" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-admin">Senha</Label>
                    <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input id="password-admin" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-admin" />
                  <Label htmlFor="remember-admin" className="text-sm">
                    Lembrar de mim
                  </Label>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/admin/dashboard">Entrar como Administrador</Link>
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
