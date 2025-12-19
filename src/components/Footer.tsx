import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="container py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <span className="font-serif text-xl font-medium text-foreground tracking-tight">
              Plexa Partners
            </span>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Strategy and advisory for founders and leadership teams seeking clarity, growth, and measurable impact.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-body text-sm font-medium text-foreground">Navigate</h3>
            <nav className="space-y-3">
              <Link to="/about" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/contact" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-body text-sm font-medium text-foreground">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@plexapartners.com"
                className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@plexapartners.com
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Credentials */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-body text-sm font-medium text-foreground">Credentials</h3>
            <p className="font-body text-sm text-muted-foreground">
              ICAEW Chartered Accountant
            </p>
            <p className="font-body text-sm text-muted-foreground">
              London, United Kingdom
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-muted-foreground">
              © 2025 Plexa Partners. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
