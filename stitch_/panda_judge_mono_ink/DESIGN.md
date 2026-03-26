# Design System Specification: The Ink & Iron Protocol

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Calligrapher"**

This design system rejects the clinical coldness of modern SaaS in favor of "The Modern Calligrapher"—a visual philosophy where the precision of minimalist UI meets the soul of traditional Chinese ink wash aesthetics. We move beyond the "template" look by embracing a high-contrast, editorial layout that feels both ancient and cutting-edge. 

The system is defined by **intentional asymmetry** and **tactile weight**. Every element should feel like a physical object—a bamboo slip, a stone seal, or a heavy stroke of ink on parchment. By pairing the stark authority of Black and White with the playful energy of Bamboo Green, we create a "serious-but-smirking" brand persona that commands respect while remaining approachable.

---

## 2. Colors: The Inkwell Palette
The color strategy utilizes high-contrast primaries to establish authority, while the background and accent colors inject warmth and vitality.

### Color Tokens
- **Primary (Ink):** `#000000` (The definitive stroke)
- **Secondary (Bamboo):** `#2B6C00` (The life-blood of action)
- **Surface (Parchment):** `#FFF9E6` (The foundational canvas)
- **Container Tiers:** From `surface-container-lowest` (`#FFFFFF`) to `surface-container-highest` (`#E8E3CB`).

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a card should be distinguished from the background by sitting on a `surface-container-low` section or by being a `surface-container-lowest` element on a `surface` background. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine rice paper. 
*   **Level 0 (Foundation):** `surface` (`#FFF9E6`)
*   **Level 1 (Sections):** `surface-container-low` (`#FAF4DC`)
*   **Level 2 (Active Cards):** `surface-container-lowest` (`#FFFFFF`)

### The "Glass & Bamboo" Rule
To add a premium feel, use **Glassmorphism** for floating headers or navigation bars. Use a semi-transparent `surface` color with a `backdrop-blur(12px)` to allow the "ink" of the content to bleed through softly as the user scrolls.

---

## 3. Typography: The Editorial Voice
The typography is a dialogue between the bold authority of a judge's decree and the friendly clarity of a scholar.

*   **Display & Headlines (Plus Jakarta Sans):** These are your "Stamps." Use `display-lg` (3.5rem) and `headline-lg` (2rem) with tight letter-spacing to create a bold, "stamped" appearance.
*   **Body & Titles (Be Vietnam Pro):** These provide the "Narrative." Use `body-lg` (1rem) for readability. The rounded terminals of Be Vietnam Pro complement the "hand-drawn" nature of the brand.
*   **Hierarchy as Identity:** Use massive size contrasts. A `display-sm` headline next to a `body-sm` label creates the editorial, "High-End" look that distinguishes this system from generic dashboards.

---

## 4. Elevation & Depth: Tonal Layering
In this system, we do not "drop shadows"; we "layer light."

*   **The Layering Principle:** Depth is achieved by stacking surface tokens. A `surface-container-highest` element feels "heavier" and closer to the user than a `surface` element.
*   **Ambient Shadows:** When an element must float (like the mascot or a primary CTA), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(30, 28, 14, 0.06)`. This mimics natural light hitting parchment.
*   **The "Ghost Border":** If a boundary is required for accessibility, use the `outline-variant` token at 15% opacity. Never use 100% opaque lines.
*   **Tactile Stamps:** Elements like buttons should utilize a "pressed" state that removes the ambient shadow and shifts the background color slightly deeper, mimicking a physical seal being pressed into paper.

---

## 5. Components: Tactile Artifacts

### Buttons (The Judge's Seal)
*   **Primary:** Solid `primary` (#000000) with `on-primary` (#FFFFFF) text. High-contrast, sharp or `md` (0.75rem) rounded corners.
*   **Action/Success:** `secondary` (#2B6C00). This is the "Bamboo Green" used for positive progression.
*   **Interaction:** On hover, buttons should not just change color; they should scale slightly (1.02x) to feel like a physical token.

### Cards & Containers
*   **Forbid Divider Lines.** Use vertical whitespace (e.g., `spacing-8` or `spacing-12`) to separate content blocks. 
*   **Nesting:** Place a `surface-container-lowest` card inside a `surface-container-low` page wrapper to create definition without borders.

### Input Fields (The Scholar's Script)
*   **Style:** Minimalist. No bounding box—only a thick `primary` bottom border (2px) that mimics an ink line. 
*   **Focus State:** The bottom border transitions to `secondary` (Bamboo Green) with a subtle `surface-container-highest` background fill.

### Slips & Chips (The Bamboo Slips)
*   **Concept:** Inspired by the *Jian* (bamboo slips). Use `rounded-full` corners and `surface-variant` backgrounds. 
*   **Iconography:** Icons must use thick, hand-drawn strokes (2px minimum) to match the "ink brush" aesthetic.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place the Panda mascot slightly off-grid, overlapping two different surface containers to create depth.
*   **Embrace Negative Space:** Use `spacing-16` and `spacing-24` generously. White space is not "empty"; it is the "air" in the calligraphy.
*   **Apply "Ink Bleed":** Use subtle gradients (Primary to Primary-Container) on large black areas to prevent them from feeling "dead."

### Don’t:
*   **Don't use grey borders.** It breaks the parchment/ink illusion. Use background tone shifts instead.
*   **Don't use standard icons.** Avoid thin-line, "techy" icons. If it doesn't look like it was drawn with a felt-tip marker, it doesn't belong.
*   **Don't clutter.** The Judge is authoritative. If a piece of information isn't vital, strike it out. Use the "Slips" (chips) for secondary metadata.

---

## 7. The Mascot Integration
The mascot is not a decorative sticker; he is the UI. 
*   **Contextual Feedback:** When an error occurs, the panda should look "stern" (ink-heavy lines). When a task is completed, he should offer a Bamboo Slip (the Success Toast).
*   **Layering:** The mascot should always sit on the highest Z-index, often breaking the "box" of the container he is in to create a 3D effect.