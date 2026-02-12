import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import featuredHeroImage from '@/assets/featured-insight-hero.jpg';
import insightTile1 from '@/assets/insight-tile-1.jpg';
import insightTile2 from '@/assets/insight-tile-2.jpg';
import insightTile3 from '@/assets/insight-tile-3.jpg';
import insightTile4 from '@/assets/insight-tile-4.jpg';

const tileImages = [insightTile1, insightTile2, insightTile3, insightTile4];

interface FeaturedItem {
  id: string;
  title: string;
  title_zh: string | null;
  title_zh_hans: string | null;
  image?: string;
}

export const FeaturedPerspectives = () => {
  const { t, i18n } = useTranslation(['home', 'common']);
  const [items, setItems] = useState<FeaturedItem[]>([]);
  
  useEffect(() => {
    const fetchFeaturedPerspectives = async () => {
      const { data } = await supabase
        .from('perspectives')
        .select('id, title, title_zh, title_zh_hans, image')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (data) {
        setItems(data.map(p => ({
          id: p.id,
          title: p.title,
          title_zh: p.title_zh,
          title_zh_hans: p.title_zh_hans,
          image: p.image || undefined,
        })));
      }
    };
    
    fetchFeaturedPerspectives();
  }, []);

  const getTitle = (item: FeaturedItem) => {
    if (i18n.language === 'zh-Hant' && item.title_zh) return item.title_zh;
    if (i18n.language === 'zh-Hans' && (item.title_zh_hans || item.title_zh)) return item.title_zh_hans || item.title_zh || item.title;
    return item.title;
  };
  
  const mainItem = items[0];
  const sideItems = items.slice(1, 5);

  if (!mainItem) return null;
  
  const getLink = (item: FeaturedItem) => `/perspectives/${item.id}`;
  
  const getMainImage = () => mainItem.image || featuredHeroImage;

  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="section-divider" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            {t('home:perspectives.sectionTitle')}
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-2xl">
            {t('home:perspectives.sectionDescription')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Featured Post - Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
          <Link to={getLink(mainItem)} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-muted mb-5 relative rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
                <img
                src={getMainImage()}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl" />
              </div>
              <span className="font-body text-xs text-primary uppercase tracking-wider font-medium">
              {t('common:labels.perspective')}
              </span>
              <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground mt-2 leading-tight group-hover:text-primary transition-colors">
              {getTitle(mainItem)}
              </h3>
            </Link>
          </motion.div>

          {/* Side Posts - Right (Stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
          {sideItems.map((item, index) => (
              <motion.div
              key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              >
              <Link to={getLink(item)} className="group flex gap-5 items-start">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0 overflow-hidden bg-muted rounded-xl shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-0.5 group-hover:scale-[1.02]">
                    <img
                    src={item.image || tileImages[index] || tileImages[0]}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 py-1">
                    <span className="font-body text-xs text-primary uppercase tracking-wider font-medium">
                      {t('common:labels.perspective')}
                    </span>
                    <h4 className="font-serif text-base lg:text-lg font-medium text-foreground mt-2 leading-snug group-hover:text-primary transition-colors">
                    {getTitle(item)}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
