import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import quantic from '@/assets/clients/quantic.png';
import cityGuilds from '@/assets/clients/city-guilds.png';
import thrivegrowth from '@/assets/clients/thrivegrowth.png';
import etz from '@/assets/clients/etz.png';
import offploy from '@/assets/clients/offploy.png';
import azcrown from '@/assets/clients/azcrown.png';
import helloYellow from '@/assets/clients/hello-yellow.png';
import tiantong from '@/assets/clients/tiantong.png';

const logos = [
  { src: quantic, alt: 'Quantic School of Business & Technology' },
  { src: cityGuilds, alt: 'City & Guilds' },
  { src: thrivegrowth, alt: 'ThriveGrowth' },
  { src: etz, alt: 'ETZ' },
  { src: offploy, alt: 'Offploy' },
  { src: azcrown, alt: 'AZCrown' },
  { src: helloYellow, alt: 'Hello Yellow' },
  { src: tiantong, alt: 'Tiantong Foods' },
];

export const ClientLogos = () => {
  const { t } = useTranslation('common');

  return (
    <section className="py-16 lg:py-20">
      <div className="container max-w-5xl">
        <p className="text-center font-body text-sm text-muted-foreground/60 mb-10">
          {t('clients.label')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo, i) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-8 sm:h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
