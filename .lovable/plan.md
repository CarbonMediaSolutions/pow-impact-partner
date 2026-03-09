

## Make "+X more services" expandable on solution cards

Currently the "+ X more services" text on the Solutions page is static — just a label with no interaction. The fix is to make it a clickable toggle that expands/collapses the hidden services inline.

### Changes

**`src/pages/Solutions.tsx`**
- Add a state map to track which solution cards are expanded: `const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})`
- Replace the static `<p>` tag for "+X more services" with a clickable `<button>` that toggles the expanded state
- When expanded, render all services instead of just the first 4
- When collapsed, show the first 4 + the clickable "+X more services" toggle
- Add a subtle animation (e.g. framer-motion `AnimatePresence`) for smooth expand/collapse

The toggle text will switch between "+X more services" (collapsed) and "Show less" (expanded).

