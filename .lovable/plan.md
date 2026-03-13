

## Cookie Consent Banner

Add a GDPR-compliant cookie consent banner similar to the QVCC.club implementation -- a bottom-of-screen bar that appears on first visit with three options.

### Design

A fixed banner at the bottom of the viewport with:
- **Title**: "We value your privacy"
- **Description**: Brief text about cookies with a link to the Privacy Policy page
- **Three buttons**: "Reject All", "Customise", "Accept All"
- Consent choice saved to `localStorage` so it only shows once
- Matches Plexa's existing design language (dark bg, clean typography, subtle border)

### Implementation

**New file: `src/components/CookieConsent.tsx`**
- Fixed bottom banner with `z-50`, appears with a slide-up animation (framer-motion)
- Reads/writes `cookie-consent` key in localStorage
- "Accept All" / "Reject All" dismiss the banner immediately
- "Customise" opens a small dialog with toggles for Analytics vs Essential cookies
- Links "Privacy Policy" text to `/privacy`
- Add translation keys for all four languages

**Edit: `src/App.tsx`**
- Render `<CookieConsent />` inside the BrowserRouter, after Routes

**New locale keys** in `en/common.json`, `zh/common.json`, `zh-Hans/common.json`, `zh-Hant/common.json`:
- `cookie.title`, `cookie.description`, `cookie.acceptAll`, `cookie.rejectAll`, `cookie.customise`

