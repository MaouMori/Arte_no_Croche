import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, LayoutDashboard, LogIn, LogOut, Menu, MessageCircle, User, X, Heart } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import { getWhatsAppUrl } from '../lib/whatsapp'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/loja', label: 'Croches' },
    { path: '/colecoes', label: 'Colecoes' },
    { path: '/sobre', label: 'Sobre nos' },
    { path: '/ajuda', label: 'Ajuda' },
    { path: '/termos', label: 'Termos' },
  ]

  const handleLogout = async () => {
    setAccountOpen(false)
    await logout()
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-void/92 backdrop-blur-xl border-b border-neon-pink/10 shadow-lg shadow-[#9f7e56]/5'
            : 'bg-void/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3 group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neon-pink/30 text-neon-pink sm:h-11 sm:w-11">
                <Heart className="h-5 w-5" />
              </div>
              <div className="relative min-w-0 leading-none">
                <span className="font-display text-2xl text-text-main lg:text-4xl">
                  Arte
                </span>
                <span className="block -mt-1 font-['Caveat'] text-lg text-text-muted lg:text-2xl">
                  no croche
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link text-sm font-heading font-semibold transition-colors ${
                    location.pathname === link.path
                      ? 'text-neon-pink active'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 rounded-full bg-neon-pink px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-hot-pink"
              >
                <MessageCircle className="h-4 w-4" />
                Comprar pelo WhatsApp
              </a>

              <div className="relative hidden sm:block">
                <button
                  onClick={() => setAccountOpen(open => !open)}
                  className={`flex items-center gap-1 p-2 transition-colors ${isAuthenticated ? 'text-neon-pink' : 'text-text-muted hover:text-neon-pink'}`}
                  title={isAuthenticated ? `Logado como ${user?.name}` : 'Minha conta'}
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated && (
                    <span className="hidden xl:inline max-w-24 truncate text-xs font-heading font-bold">
                      {user?.name}
                    </span>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-neon-pink/20 bg-white/95 backdrop-blur-xl shadow-xl shadow-[#9f7e56]/20 p-2">
                    {isAuthenticated ? (
                      <>
                        <div className="px-3 py-2 border-b border-neon-pink/10 mb-1">
                          <p className="text-text-main text-sm font-heading font-bold truncate">{user?.name}</p>
                          <p className="text-text-dim text-xs truncate">{user?.email}</p>
                        </div>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-muted hover:bg-neon-pink/10 hover:text-neon-pink transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Painel admin
                          </Link>
                        )}
                        <Link
                          to="/minha-conta"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-muted hover:bg-neon-pink/10 hover:text-neon-pink transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Minha conta
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-muted hover:bg-neon-pink/10 hover:text-neon-pink transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sair
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/feedback"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-muted hover:bg-neon-pink/10 hover:text-neon-pink transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          Feedback
                        </Link>
                        <Link
                          to="/login"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neon-pink hover:bg-neon-pink/10 transition-colors"
                        >
                          <LogIn className="w-4 h-4" />
                          Entrar
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Link
                to={isAuthenticated && isAdmin ? '/admin' : isAuthenticated ? '/minha-conta' : '/login'}
                className="hidden md:flex items-center gap-1.5 bg-neon-pink/10 hover:bg-neon-pink/20 border border-neon-pink/20 text-neon-pink px-3 py-1.5 rounded-lg text-xs font-heading font-bold tracking-wider transition-all"
                title={isAuthenticated && isAdmin ? 'Painel Administrativo' : 'Minha conta'}
              >
                <LogIn className="w-3.5 h-3.5" />
                {isAuthenticated && isAdmin ? 'PAINEL' : isAuthenticated ? 'CONTA' : 'LOGIN'}
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-text-muted hover:text-neon-pink transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="max-h-[80vh] overflow-y-auto bg-void/95 backdrop-blur-xl border-t border-neon-pink/10 px-4 py-4 space-y-1">
            {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-heading font-semibold tracking-wider transition-colors ${
                  location.pathname === link.path
                    ? 'bg-neon-pink/10 text-neon-pink'
                    : 'text-text-muted hover:bg-void-lighter hover:text-text-main'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/feedback"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-heading font-semibold tracking-wider text-text-muted hover:bg-void-lighter hover:text-text-main transition-colors"
            >
              <Heart className="w-4 h-4" />
              FEEDBACK
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-heading font-semibold tracking-wider text-neon-pink hover:bg-neon-pink/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              COMPRAR PELO WHATSAPP
            </a>
            <Link
              to={isAuthenticated && isAdmin ? '/admin' : isAuthenticated ? '/minha-conta' : '/login'}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-heading font-semibold tracking-wider text-neon-pink hover:bg-neon-pink/10 transition-colors"
            >
              {isAuthenticated && isAdmin ? <LayoutDashboard className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              {isAuthenticated && isAdmin ? 'PAINEL ADMIN' : isAuthenticated ? `MINHA CONTA: ${user?.name}` : 'LOGIN'}
            </Link>
            {isAuthenticated && (
              <button
                onClick={() => {
                  setMobileOpen(false)
                  void handleLogout()
                }}
                className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-heading font-semibold tracking-wider text-text-muted hover:bg-void-lighter hover:text-text-main transition-colors"
              >
                <LogOut className="w-4 h-4" />
                SAIR
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="h-16 lg:h-20" />
    </>
  )
}
