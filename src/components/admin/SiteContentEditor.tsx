import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { siteContentSchema, type ContentField, type ContentSection } from '@/data/siteContentSchema';
import { ChevronDown, ChevronRight, Save, RotateCcw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import i18n from '@/i18n/config';

// Helper to get a nested value from the i18n default resources
function getDefaultValue(lang: string, namespace: string, key: string): string {
  const value = i18n.getResource(lang, namespace, key);
  if (typeof value === 'string') return value;
  return '';
}

interface FieldValues {
  [key: string]: { en: string; zhHant: string; zhHans: string };
}

interface SectionEditorProps {
  pageKey: string;
  sectionKey: string;
  section: ContentSection;
  dbValues: Record<string, { value_en: string; value_zh: string; value_zh_hans: string }>;
  onSaved: () => void;
}

function SectionEditor({ pageKey, sectionKey, section, dbValues, onSaved }: SectionEditorProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [values, setValues] = useState<FieldValues>({});

  // Initialize values from DB overrides or defaults
  useEffect(() => {
    const initial: FieldValues = {};
    for (const field of section.fields) {
      const dbVal = dbValues[field.key];
      initial[field.key] = {
        en: dbVal?.value_en ?? getDefaultValue('en', pageKey, field.key),
        zhHant: dbVal?.value_zh ?? getDefaultValue('zh-Hant', pageKey, field.key),
        zhHans: dbVal?.value_zh_hans ?? getDefaultValue('zh-Hans', pageKey, field.key),
      };
    }
    setValues(initial);
  }, [section.fields, dbValues, pageKey]);

  const handleChange = (key: string, lang: 'en' | 'zhHant' | 'zhHans', value: string) => {
    setValues(prev => ({
      ...prev,
      [key]: { ...prev[key], [lang]: value },
    }));
  };

  const hasOverrides = section.fields.some(f => !!dbValues[f.key]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const rows = section.fields.map(field => ({
        page: pageKey,
        section_key: field.key,
        value_en: values[field.key]?.en || '',
        value_zh: values[field.key]?.zhHant || '',
        value_zh_hans: values[field.key]?.zhHans || '',
      }));

      const { error } = await supabase
        .from('site_content')
        .upsert(rows, { onConflict: 'page,section_key' });

      if (error) throw error;

      toast.success(`${section.label} saved`);
      onSaved();
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm(`Reset "${section.label}" to defaults? This will delete all overrides for this section.`)) return;
    setResetting(true);
    try {
      const keys = section.fields.map(f => f.key);
      const { error } = await supabase
        .from('site_content')
        .delete()
        .eq('page', pageKey)
        .in('section_key', keys);

      if (error) throw error;

      const reset: FieldValues = {};
      for (const field of section.fields) {
        reset[field.key] = {
          en: getDefaultValue('en', pageKey, field.key),
          zhHant: getDefaultValue('zh-Hant', pageKey, field.key),
          zhHans: getDefaultValue('zh-Hans', pageKey, field.key),
        };
      }
      setValues(reset);

      toast.success(`${section.label} reset to defaults`);
      onSaved();
    } catch (err) {
      console.error('Reset error:', err);
      toast.error('Failed to reset');
    } finally {
      setResetting(false);
    }
  };

  const renderField = (field: ContentField) => {
    const val = values[field.key] || { en: '', zhHant: '', zhHans: '' };
    const FieldComponent = field.type === 'textarea' ? Textarea : Input;

    return (
      <div key={field.key} className="grid grid-cols-1 lg:grid-cols-3 gap-3 py-3 border-b border-border/50 last:border-0">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            {field.label} <span className="text-muted-foreground/50">(EN)</span>
          </Label>
          <FieldComponent
            value={val.en}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handleChange(field.key, 'en', e.target.value)
            }
            className="text-sm"
            rows={field.type === 'textarea' ? 3 : undefined}
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            {field.label} <span className="text-muted-foreground/50">(简体)</span>
          </Label>
          <FieldComponent
            value={val.zhHans}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handleChange(field.key, 'zhHans', e.target.value)
            }
            className="text-sm"
            rows={field.type === 'textarea' ? 3 : undefined}
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            {field.label} <span className="text-muted-foreground/50">(繁體)</span>
          </Label>
          <FieldComponent
            value={val.zhHant}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handleChange(field.key, 'zhHant', e.target.value)
            }
            className="text-sm"
            rows={field.type === 'textarea' ? 3 : undefined}
          />
        </div>
      </div>
    );
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors text-left">
        {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        <span className="font-medium text-sm">{section.label}</span>
        {hasOverrides && (
          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            customised
          </span>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 overflow-x-auto">
          {section.fields.map(renderField)}
          <div className="flex items-center justify-end gap-2 mt-4">
            {hasOverrides && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={resetting}
              >
                {resetting ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <RotateCcw className="h-3 w-3 mr-1" />}
                Reset to Default
              </Button>
            )}
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Save className="h-3 w-3 mr-1" />}
              Save
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function SiteContentEditor() {
  const [selectedPage, setSelectedPage] = useState<string>(Object.keys(siteContentSchema)[0]);
  const [dbValues, setDbValues] = useState<Record<string, { value_en: string; value_zh: string; value_zh_hans: string }>>({});
  const [loading, setLoading] = useState(true);

  const fetchPageContent = useCallback(async (page: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('section_key, value_en, value_zh, value_zh_hans')
        .eq('page', page);

      if (error) throw error;

      const map: Record<string, { value_en: string; value_zh: string; value_zh_hans: string }> = {};
      for (const row of data || []) {
        map[row.section_key] = {
          value_en: row.value_en,
          value_zh: row.value_zh,
          value_zh_hans: (row as Record<string, string>).value_zh_hans || '',
        };
      }
      setDbValues(map);
    } catch (err) {
      console.error('Error fetching site content:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPageContent(selectedPage);
  }, [selectedPage, fetchPageContent]);

  const handleSaved = () => {
    fetchPageContent(selectedPage);
  };

  const pageConfig = siteContentSchema[selectedPage];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-6">
          <Label className="text-sm font-medium whitespace-nowrap">Page:</Label>
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(siteContentSchema).map(([key, page]) => (
                <SelectItem key={key} value={key}>
                  {page.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-1">
            {pageConfig &&
              Object.entries(pageConfig.sections).map(([sectionKey, section]) => (
                <SectionEditor
                  key={`${selectedPage}-${sectionKey}`}
                  pageKey={selectedPage}
                  sectionKey={sectionKey}
                  section={section}
                  dbValues={dbValues}
                  onSaved={handleSaved}
                />
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
