import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const servicePages = [
  { label: 'Tax Planning & Optimization', href: '/services/tax-planning' },
  { label: 'Financial Compliance & Reporting', href: '/services/financial-compliance' },
  { label: 'Growth & Scale Strategy', href: '/services/growth-strategy' },
  { label: 'Impact Measurement & Reporting', href: '/services/impact-measurement' },
];

const navItems = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'Services', href: '#services', hasDropdown: true },
  { label: 'Impact', href: '#impact' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowStickyCTA(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (!isHomePage) {
      navigate('/' + href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-primary">Pow</span>
            <span className="font-serif text-2xl font-light text-foreground">Consulting</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="font-body text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 outline-none">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64">
                    {servicePages.map((service) => (
                      <DropdownMenuItem key={service.href} asChild>
                        <Link to={service.href} className="cursor-pointer">
                          {service.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="font-body text-sm font-medium text-foreground/80 hover:text-primary transition-colors link-underline"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="font-body text-sm font-medium text-foreground/80 hover:text-primary transition-colors link-underline"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection('#contact')}
              className="btn-emerald font-body font-semibold px-6"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-t border-border"
            >
              <nav className="container py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="font-body text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 flex items-center gap-2 w-full"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-4 flex flex-col gap-2 mt-2">
                          {servicePages.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="font-body text-sm text-foreground/70 hover:text-primary transition-colors py-1"
                            >
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : item.isRoute ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-body text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                      className="font-body text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                    >
                      {item.label}
                    </a>
                  )
                ))}
                <Button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-emerald font-body font-semibold mt-4"
                >
                  Book Consultation
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sticky CTA Bar - Appears on scroll */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 bg-primary shadow-lg"
          >
            <div className="container py-2.5 flex items-center justify-between">
              <p className="font-body text-sm text-primary-foreground hidden sm:block">
                Ready to transform your financial health?
              </p>
              <div className="flex items-center gap-3 mx-auto sm:mx-0">
                <Button
                  onClick={() => scrollToSection('#assessment')}
                  variant="outline"
                  size="sm"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body text-sm"
                >
                  Free Assessment
                </Button>
                <Button
                  onClick={() => scrollToSection('#contact')}
                  size="sm"
                  className="bg-emerald hover:bg-emerald/90 text-emerald-foreground font-body font-semibold text-sm"
                >
                  Book a Consultation
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
