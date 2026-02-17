import { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

interface TeamMemberData {
  id: string;
  name: string;
  name_zh_hant: string;
  name_zh_hans: string;
  role: string;
  role_zh_hant: string;
  role_zh_hans: string;
  focus: string;
  focus_zh_hant: string;
  focus_zh_hans: string;
  bio: string;
  bio_zh_hant: string;
  bio_zh_hans: string;
  image_url: string | null;
}

function useLocalizedField(member: TeamMemberData, field: 'name' | 'role' | 'focus' | 'bio') {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  if (lang === 'zh-Hant' || lang === 'zh') {
    return (member as any)[`${field}_zh_hant`] || member[field];
  }
  if (lang === 'zh-Hans') {
    return (member as any)[`${field}_zh_hans`] || member[field];
  }
  return member[field];
}

export function TeamMemberCard({ member, index }: { member: TeamMemberData; index: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const name = useLocalizedField(member, 'name');
  const role = useLocalizedField(member, 'role');
  const focus = useLocalizedField(member, 'focus');
  const bio = useLocalizedField(member, 'bio');

  const hasBio = bio && bio.trim().length > 0;

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-card rounded-xl border border-border overflow-hidden cursor-pointer"
      onClick={() => hasBio && setMobileOpen(!mobileOpen)}
    >
      {/* Photo */}
      <div className="aspect-[4/5] bg-muted overflow-hidden relative">
        {member.image_url ? (
          <img
            src={member.image_url}
            alt={name}
            className="w-full h-full object-cover grayscale"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50">
            <User className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-medium text-foreground mb-1">{name}</h3>
        <p className="font-body text-sm text-muted-foreground/80 mb-2">{role}</p>
        {focus && <p className="font-body text-xs text-primary/70">{focus}</p>}
      </div>
    </motion.div>
  );

  if (!hasBio) return cardContent;

  return (
    <>
      {/* Desktop: HoverCard */}
      <div className="hidden md:block">
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            {cardContent}
          </HoverCardTrigger>
          <HoverCardContent
            side="top"
            align="center"
            sideOffset={8}
            className="w-80 p-5"
          >
            <div className="space-y-2">
              <p className="font-serif text-sm font-medium text-foreground">{name}</p>
              <p className="font-body text-xs text-muted-foreground/80">{role}</p>
              {focus && <p className="font-body text-xs text-primary/70 mb-2">{focus}</p>}
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{bio}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Mobile: tap to expand inline */}
      <div className="md:hidden">
        {cardContent}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border border-t-0 border-border rounded-b-xl px-5 pb-5 -mt-3"
          >
            <p className="font-body text-sm text-muted-foreground leading-relaxed pt-2">{bio}</p>
          </motion.div>
        )}
      </div>
    </>
  );
}
