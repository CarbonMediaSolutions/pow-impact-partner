import { useState, useEffect } from 'react';
import i18n from '@/i18n/config';
import { supabase } from '@/integrations/supabase/client';

/**
 * Sets a nested value in an object using a dot-separated key path.
 * e.g. setNestedValue(obj, 'hero.headline', 'Hello') → obj.hero.headline = 'Hello'
 */
function setNestedValue(obj: Record<string, unknown>, keyPath: string, value: string) {
  const keys = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
      current[keys[i]] = {};
    }
    current = current[keys[i]] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

export function useSiteContent() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchOverrides = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('page, section_key, value_en, value_zh');

        if (error) {
          console.error('Failed to fetch site content overrides:', error);
          setLoaded(true);
          return;
        }

        if (!data || data.length === 0) {
          setLoaded(true);
          return;
        }

        // Group overrides by page (namespace)
        const enOverrides: Record<string, Record<string, unknown>> = {};
        const zhOverrides: Record<string, Record<string, unknown>> = {};

        for (const row of data) {
          const { page, section_key, value_en, value_zh } = row;

          if (value_en) {
            if (!enOverrides[page]) enOverrides[page] = {};
            setNestedValue(enOverrides[page], section_key, value_en);
          }

          if (value_zh) {
            if (!zhOverrides[page]) zhOverrides[page] = {};
            setNestedValue(zhOverrides[page], section_key, value_zh);
          }
        }

        // Merge overrides into i18n resource bundles (deep merge, don't overwrite)
        for (const [ns, overrideObj] of Object.entries(enOverrides)) {
          i18n.addResourceBundle('en', ns, overrideObj, true, true);
        }

        for (const [ns, overrideObj] of Object.entries(zhOverrides)) {
          i18n.addResourceBundle('zh', ns, overrideObj, true, true);
        }
      } catch (err) {
        console.error('Site content override fetch failed:', err);
      } finally {
        setLoaded(true);
      }
    };

    fetchOverrides();
  }, []);

  return { loaded };
}
