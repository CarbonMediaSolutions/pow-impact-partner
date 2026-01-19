import { Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="border-t border-border/30">
      {/* Institutional Closing Statement */}
      <div className="container py-12 lg:py-16 border-b border-border/30">
        <p className="font-body text-sm text-muted-foreground max-w-lg leading-relaxed">
          {t('footer.statement')}
        </p>
      </div>

      <div className="container py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <span className="font-serif text-lg font-medium text-foreground tracking-tight">
              {t('brand.name')}
            </span>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <nav className="space-y-3">
              <Link to="/about" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">{t('nav.about')}</Link>
              <Link to="/perspectives" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">{t('nav.perspectives')}</Link>
              <Link to="/solutions" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">{t('nav.solutions')}</Link>
              <Link to="/submit-perspective" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">{t('nav.shareYourPerspective')}</Link>
              <Link to="/admin" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">{t('nav.admin')}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-3">
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
              {t('footer.linkedin')}
            </a>
          </div>

          {/* Location */}
          <div className="lg:col-span-3">
            <p className="font-body text-sm text-muted-foreground">
              {t('footer.location')}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-muted-foreground">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
