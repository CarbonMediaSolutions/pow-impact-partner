import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Shield, MapPin, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const trustBadges = [
  { icon: Shield, label: 'ICAEW Regulated' },
  { icon: MapPin, label: 'Based in London' },
  { icon: Cloud, label: 'Cloud-based, remote-friendly' },
];

export const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="font-serif text-2xl font-bold">Pow</span>
              <span className="font-serif text-2xl font-light ml-1">Consulting</span>
            </div>
            <p className="font-serif text-lg text-primary-foreground/80">
              From Strategy to Impact
            </p>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              We help startups, SMEs, and not-for-profits master financial complexity while maintaining their mission.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="block font-body text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:hello@p-wconsulting.com"
                className="flex items-center gap-3 font-body text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@p-wconsulting.com
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="btn-emerald font-body font-medium"
              >
                Book a Consultation
              </Button>
              <Button
                onClick={() => scrollToSection('#assessment')}
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body font-medium"
              >
                Start Assessment
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-primary-foreground/10"
        >
          <div className="flex flex-wrap justify-center gap-8">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={index} className="flex items-center gap-2 text-primary-foreground/60">
                  <Icon className="w-4 h-4" />
                  <span className="font-body text-sm">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-teal-dark">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-primary-foreground/50">
              © 2025 Pow Consulting. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-body text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-body text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="font-body text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
