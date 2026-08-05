import './globals.css'

export const metadata = {
  title: 'NombreBot — Moderación',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="site">
          <header className="site-header">
            <div className="container">
              <h1 className="brand">NombreBot — Moderación</h1>
            </div>
          </header>

          <main className="container">{children}</main>

          <footer className="site-footer">
            <div className="container">© {new Date().getFullYear()} NombreBot</div>
          </footer>
        </div>
      </body>
    </html>
  )
}