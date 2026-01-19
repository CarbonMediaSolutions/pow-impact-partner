import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { t } = useTranslation();

  const navItems = [
    { labelKey: 'nav.home', href: '/', isRoute: true },
    { labelKey: 'nav.about', href: '/about', isRoute: true },
    { labelKey: 'nav.perspectives', href: '/perspectives', isRoute: true },
    { labelKey: 'nav.dataAnalysis', href: '/analysis', isRoute: true },
    { labelKey: 'nav.solutions', href: '/solutions', isRoute: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-serif text-xl font-medium text-foreground tracking-tight">
            {t('brand.name')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            item.isRoute ? (
              <Link
                key={item.labelKey}
                to={item.href}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            ) : (
              <button
                key={item.labelKey}
                onClick={() => scrollToSection(item.href)}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(item.labelKey)}
              </button>
            )
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <LanguageSwitcher />
          <Button
            asChild
            variant="outline"
            className="font-body text-sm font-medium border-foreground/20 text-foreground hover:bg-foreground hover:text-background px-6"
          >
            <Link to="/book">{t('nav.requestConsultation')}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
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
            <nav className="container py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.labelKey}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-body text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(item.labelKey)}
                  </Link>
                ) : (
                  <button
                    key={item.labelKey}
                    onClick={() => scrollToSection(item.href)}
                    className="font-body text-base text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    {t(item.labelKey)}
                  </button>
                )
              ))}
              <div className="pt-4 border-t border-border">
                <LanguageSwitcher />
              </div>
              <Button
                asChild
                variant="outline"
                className="font-body text-sm font-medium border-foreground/20 text-foreground hover:bg-foreground hover:text-background mt-2"
              >
                <Link to="/book">{t('nav.requestConsultation')}</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
