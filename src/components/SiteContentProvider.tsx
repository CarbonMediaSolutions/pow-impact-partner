import { ReactNode } from 'react';
import { useSiteContent } from '@/hooks/useSiteContent';

interface SiteContentProviderProps {
  children: ReactNode;
}

export function SiteContentProvider({ children }: SiteContentProviderProps) {
  const { loaded } = useSiteContent();

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground text-sm">Loading…</div>
      </div>
    );
  }

  return <>{children}</>;
}
