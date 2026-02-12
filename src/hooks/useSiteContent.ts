import { useState, useEffect } from 'react';
import i18n from '@/i18n/config';
import { supabase } from '@/integrations/supabase/client';

/**
 * Sets a nested value in an object using a dot-separated key path.
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
          .select('page, section_key, value_en, value_zh, value_zh_hans');

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
        const zhHantOverrides: Record<string, Record<string, unknown>> = {};
        const zhHansOverrides: Record<string, Record<string, unknown>> = {};

        for (const row of data) {
          const { page, section_key, value_en, value_zh } = row;
          const value_zh_hans = (row as Record<string, string>).value_zh_hans;

          if (value_en) {
            if (!enOverrides[page]) enOverrides[page] = {};
            setNestedValue(enOverrides[page], section_key, value_en);
          }

          if (value_zh) {
            if (!zhHantOverrides[page]) zhHantOverrides[page] = {};
            setNestedValue(zhHantOverrides[page], section_key, value_zh);
          }

          if (value_zh_hans) {
            if (!zhHansOverrides[page]) zhHansOverrides[page] = {};
            setNestedValue(zhHansOverrides[page], section_key, value_zh_hans);
          }
        }

        // Merge overrides into i18n resource bundles
        for (const [ns, overrideObj] of Object.entries(enOverrides)) {
          i18n.addResourceBundle('en', ns, overrideObj, true, true);
        }

        for (const [ns, overrideObj] of Object.entries(zhHantOverrides)) {
          i18n.addResourceBundle('zh-Hant', ns, overrideObj, true, true);
        }

        for (const [ns, overrideObj] of Object.entries(zhHansOverrides)) {
          i18n.addResourceBundle('zh-Hans', ns, overrideObj, true, true);
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
