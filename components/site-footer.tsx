import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary">Styllus</h3>
          <p className="text-sm text-muted-foreground">
            Sistema completo para gerenciamento de salão de beleza, agendamentos e cursos.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Início
              </Link>
            </li>
            <li>
              <Link href="/agendamento" className="text-muted-foreground hover:text-primary">
                Agendamento
              </Link>
            </li>
            <li>
              <Link href="/profissionais" className="text-muted-foreground hover:text-primary">
                Profissionais
              </Link>
            </li>
            <li>
              <Link href="/cursos" className="text-muted-foreground hover:text-primary">
                Cursos
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Serviços</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Corte de Cabelo
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Coloração
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Manicure e Pedicure
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Maquiagem
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Depilação
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Contato</h3>
          <address className="not-italic text-sm space-y-2 text-muted-foreground">
            <p>Rua Exemplo, 123</p>
            <p>São Paulo, SP</p>
            <p>CEP: 01234-567</p>
            <p className="pt-2">
              <a href="tel:+551199999999" className="hover:text-primary">
                (11) 9999-9999
              </a>
            </p>
            <p>
              <a href="mailto:contato@styllus.com.br" className="hover:text-primary">
                contato@styllus.com.br
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Styllus. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
