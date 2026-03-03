import { useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface ClientLogo {
  id: string;
  name: string;
  image_url: string;
  sort_order: number;
}

export const ClientLogos = () => {
  const { t } = useTranslation('common');
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  useEffect(() => {
    const fetchLogos = async () => {
      const { data } = await supabase
        .from('client_logos' as any)
        .select('*')
        .order('sort_order', { ascending: true });
      if (data) setLogos(data as any);
      setLoading(false);
    };
    fetchLogos();
  }, []);

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

  if (loading) {
    return (
      <section className="py-16 lg:py-20">
        <div className="container max-w-6xl">
          <div className="flex justify-center gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-40" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (logos.length === 0) return null;

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
                key={logo.id}
                className="flex-[0_0_25%] min-w-0 flex items-center justify-center px-4 sm:px-6"
              >
                <img
                  src={logo.image_url}
                  alt={logo.name}
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
