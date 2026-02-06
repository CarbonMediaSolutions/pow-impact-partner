

## Homepage Polish: Credibility Strip & Client Logos

### Overview

Three changes to the homepage:

1. **Remove "ICAEW Chartered Accountant"** from the credibility strip (avoids solo-practitioner impression)
2. **Expand locations** to reflect global presence: UK, US, Canada, HK, Singapore
3. **Add client logo section** beneath Selected Engagements using the 8 uploaded logos

---

### 1. Credibility Strip Update (Hero)

**Current:**
```text
ICAEW Chartered Accountant  •  Regulated by ICAEW  •  London, UK
```

**After:**
```text
Regulated by ICAEW  •  UK  •  US  •  Canada  •  Hong Kong  •  Singapore
```

**Files to change:**

| File | Change |
|------|--------|
| `src/components/Hero.tsx` | Remove `icaewChartered` line, update location rendering to show multiple locations |
| `src/locales/en/common.json` | Remove `icaewChartered`, replace `london` with `locations` string |
| `src/locales/zh/common.json` | Same changes in Chinese |

**Translation updates:**

English `credentials`:
```json
{
  "regulatedByIcaew": "Regulated by ICAEW",
  "locations": "UK  •  US  •  Canada  •  Hong Kong  •  Singapore"
}
```

Chinese `credentials`:
```json
{
  "regulatedByIcaew": "受ICAEW監管",
  "locations": "英國  •  美國  •  加拿大  •  香港  •  新加坡"
}
```

The Hero component will render just two items separated by a dot: the ICAEW regulation line and the locations string.

---

### 2. Client Logo Section

A new `ClientLogos` component placed **below Selected Engagements** and **above the Final CTA** on the homepage.

**Design approach:**
- Clean, minimal row of greyscale/muted logos
- No heading text -- just logos with subtle opacity to match the institutional aesthetic
- A simple label like "Trusted by organisations across sectors" above the logos
- Responsive grid: single scrollable row on mobile, centered wrap on desktop

**8 logos to add (copied to `src/assets/clients/`):**

| Logo | Source |
|------|--------|
| Quantic School of Business & Technology | `Screenshot_2026-02-06_at_12.23.37.png` |
| City & Guilds | `Screenshot_2026-02-06_at_12.23.40.png` |
| ThriveGrowth | `Screenshot_2026-02-06_at_12.23.43.png` |
| ETZ | `Screenshot_2026-02-06_at_12.23.47.png` |
| Offploy | `Screenshot_2026-02-06_at_12.23.51.png` |
| AZCrown | `Screenshot_2026-02-06_at_12.23.55.png` |
| Hello Yellow | `Screenshot_2026-02-06_at_12.24.01.png` |
| Tiantong Foods | `Screenshot_2026-02-06_at_12.24.05.png` |

**Visual layout:**
```text
┌──────────────────────────────────────────────────────────┐
│                   Selected Engagements                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ Tech Org │  │ Prof Svc │  │ Soc Ent  │               │
│  └──────────┘  └──────────┘  └──────────┘               │
├──────────────────────────────────────────────────────────┤
│                                                          │
│      Trusted by organisations across sectors             │
│                                                          │
│  [Quantic] [City&Guilds] [ThriveGrowth] [ETZ]           │
│  [Offploy] [AZCrown] [HelloYellow] [Tiantong]           │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                      Final CTA                           │
└──────────────────────────────────────────────────────────┘
```

**Styling:**
- Logos displayed with `opacity-60 hover:opacity-100` transition for subtle, institutional feel
- `grayscale` filter with `hover:grayscale-0` for polish
- Max height ~40px per logo to keep things uniform
- Bilingual label: EN "Trusted by organisations across sectors" / ZH "受各行業機構信賴"

---

### Files to Create/Modify

| File | Action |
|------|--------|
| `src/assets/clients/quantic.png` | Copy uploaded logo |
| `src/assets/clients/city-guilds.png` | Copy uploaded logo |
| `src/assets/clients/thrivegrowth.png` | Copy uploaded logo |
| `src/assets/clients/etz.png` | Copy uploaded logo |
| `src/assets/clients/offploy.png` | Copy uploaded logo |
| `src/assets/clients/azcrown.png` | Copy uploaded logo |
| `src/assets/clients/hello-yellow.png` | Copy uploaded logo |
| `src/assets/clients/tiantong.png` | Copy uploaded logo |
| `src/components/ClientLogos.tsx` | **New** - Client logo strip component |
| `src/pages/Index.tsx` | Add `ClientLogos` between `CaseStudies` and `FinalCTA` |
| `src/components/Hero.tsx` | Update credibility strip |
| `src/locales/en/common.json` | Update credentials, add client logo label |
| `src/locales/zh/common.json` | Same in Chinese |

---

### Technical Details

**New `ClientLogos.tsx` component:**

```tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import quantic from '@/assets/clients/quantic.png';
import cityGuilds from '@/assets/clients/city-guilds.png';
// ... other imports

const logos = [
  { src: quantic, alt: 'Quantic School of Business & Technology' },
  { src: cityGuilds, alt: 'City & Guilds' },
  // ... all 8 logos
];

export const ClientLogos = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <p className="text-center font-body text-sm text-muted-foreground/60 mb-10">
          {t('clients.label')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo, i) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-8 sm:h-10 w-auto object-contain grayscale opacity-60
                         hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
```

**Hero.tsx credibility strip update:**

```tsx
{/* Credibility Strip - updated */}
<motion.div ...>
  <span>{t('common:credentials.regulatedByIcaew')}</span>
  <span className="hidden sm:inline text-muted-foreground/30">•</span>
  <span>{t('common:credentials.locations')}</span>
</motion.div>
```

**Index.tsx update:**

```tsx
<CaseStudies />
<ClientLogos />   {/* NEW */}
<FinalCTA />
```

