import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    const cleanup = autoplay();
    return cleanup;
  }, [autoplay]);

  return (
    <section className="py-16 lg:py-20">
      <div className="container max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-body text-sm text-muted-foreground/60 mb-10"
        >
          {t('clients.label')}
        </motion.p>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="flex-[0_0_25%] min-w-0 flex items-center justify-center px-4 sm:px-6"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-24 sm:h-32 w-auto max-w-[320px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
