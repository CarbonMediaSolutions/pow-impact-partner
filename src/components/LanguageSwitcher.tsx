import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Switch language"
    >
      <span className={i18n.language === 'en' ? 'text-foreground font-medium' : ''}>
        EN
      </span>
      <span className="mx-1.5 text-muted-foreground/50">|</span>
      <span className={i18n.language === 'zh' ? 'text-foreground font-medium' : ''}>
        中文
      </span>
    </button>
  );
};
