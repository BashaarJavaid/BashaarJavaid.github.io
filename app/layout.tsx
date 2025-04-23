import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Malik Bashaar | Software Engineer',
  description: 'Personal portfolio of Malik Bashaar Javaid, Software Engineer specializing in Machine Learning and Agentic Systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4 md:px-8 py-24 md:py-32 max-w-5xl">
            {children}
          </main>
          <footer className="container mx-auto px-4 md:px-8 py-8 max-w-5xl border-t border-accent/20 text-secondary">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm order-2 md:order-1">© {new Date().getFullYear()} Malik Bashaar Javaid</p>
              <div className="flex items-center space-x-4 order-1 md:order-2">
                <a 
                  href="https://linkedin.com/in/malik-bashaar-javaid"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors p-2 hover:bg-accent/10 rounded-full"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors p-2 hover:bg-accent/10 rounded-full"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a 
                  href="mailto:mjavaid_2025@depauw.edu"
                  className="hover:text-primary transition-colors p-2 hover:bg-accent/10 rounded-full"
                  aria-label="Email"
                >
                  <FaEnvelope className="text-xl" />
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
} 