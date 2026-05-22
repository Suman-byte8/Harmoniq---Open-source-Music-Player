# Design System Strategy: The Sonic Bloom

## 1. Overview & Creative North Star
This design system is built upon the "Sonic Bloom" philosophy—a vision where technology and organic warmth converge. We are moving away from the cold, industrial "SaaS-blue" aesthetics of the past toward a high-end, editorial experience that feels as curated as a rare vinyl collection.

**The Creative North Star: "The Resonant Gallery"**
Rather than treating the app as a tool, we treat it as an immersive space. We break the "template" look by utilizing intentional asymmetry—where white space is not just "empty" but a structural element that guides the eye. By layering semi-transparent "glass" surfaces over soft, rose-tinted backgrounds, we create a sense of depth that feels like looking through lenses of sound.

---

## 2. Colors: Tonal Depth & Warmth
Our palette is rooted in the Rose spectrum, moving beyond flat color to create a rhythmic vibration across the UI.

### The Palette (Material Design Mapping)
*   **Primary (`#b80035`):** The heartbeat. Use for primary actions and focused states.
*   **Primary Container (`#e11d48`):** The signature Rose 600. High-impact backgrounds for hero elements.
*   **Surface (`#fff8f7`):** The base canvas. A warm, welcoming white that prevents eye fatigue.
*   **Surface Container Tiers:**
    *   **Lowest (`#ffffff`):** Floating cards and interactive layers.
    *   **Low (`#fef0f1`):** Sub-sectioning and subtle grouping.
    *   **High (`#f3e5e6`):** Deeply recessed content or inactive regions.

### Visual Rules for Sophistication
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through tonal shifts (e.g., a `surface-container-lowest` card sitting on a `surface` background).
*   **The Glass & Gradient Rule:** For floating navigation or music players, utilize Glassmorphism. Use `surface_container_lowest` at 70% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** Apply a linear gradient from `primary` to `primary_container` (Rose 600) on main CTAs to add "soul" and dimension.

---

## 3. Typography: Editorial Authority
We utilize a duo-font system to balance technical precision with human warmth.

*   **Display & Headlines (Plus Jakarta Sans):** Our "Voice." Bold, geometric, and high-impact. Use `display-lg` (3.5rem) for hero moments with slightly tightened letter-spacing (-0.02em) to create a premium, editorial feel.
*   **Body & Titles (Manrope):** Our "Reader." Chosen for its exceptional legibility and modern proportions.
*   **The Hierarchy Strategy:** Use extreme scale contrast. Pair a `headline-lg` title with a `body-sm` description to create a sophisticated, unbalanced layout that feels intentional rather than safe.

---

## 4. Elevation & Depth: The Layering Principle
We reject heavy, muddy shadows. Elevation in this system is achieved through "Tonal Layering."

*   **The Stacking Rule:** Depth is achieved by stacking surface tiers. A `surface-container-lowest` element (pure white) naturally "lifts" off a `surface` background (`#fff8f7`).
*   **Ambient Shadows:** When floating elements require a shadow (e.g., active music players), use the "Rose Shadow": 
    *   *Shadow Color:* `rgba(225, 29, 72, 0.08)` (Rose 600 at 8%).
    *   *Blur:* 40px to 60px.
    *   *Spread:* -10px. This creates a soft, ambient glow rather than a harsh drop shadow.
*   **The Ghost Border:** If accessibility requires a stroke, use `outline_variant` at 15% opacity. Never use 100% opaque borders.

---

## 5. Components: Fluidity & Softness

### Buttons: The Pill
*   **Primary:** Fully rounded (`full` / 50px). Gradient fill from `primary` to `primary_container`. 
*   **Secondary:** Ghost style. No background, `primary` text, and a `Ghost Border` on hover.
*   **Interaction:** On tap, use a subtle "scale-down" micro-interaction (98%) to simulate a physical press.

### Cards: The Gallery Frame
*   **Styling:** `xl` (3rem) or `lg` (2rem) corner radius. Use `surface_container_lowest`.
*   **Rule:** Forbid the use of divider lines. Separate content using the spacing scale (e.g., `24px` gap) or subtle background shifts between the header and body of the card.

### Inputs: The Focused Field
*   **Styling:** `12px` (Medium) rounded corners. Use `surface_container_low` as the base.
*   **Active State:** Transition background to `surface_container_lowest` and apply a `2px` "Ghost Border" using the `primary` token at 30% opacity.

### Featured Component: The "Sonic Wave" Player
A floating persistent bar utilizing Glassmorphism (`surface_container_lowest` @ 80% opacity). Instead of a standard progress bar, use a variable-width waveform that utilizes the `primary` color for played segments.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use whitespace as a luxury. If a layout feels crowded, remove an element rather than shrinking it.
*   **DO** use `surface-tint` for subtle accents in iconography to maintain brand cohesion.
*   **DO** lean into asymmetry. Align a large `display-lg` headline to the left while keeping body text centered in a narrower column to the right.

### Don't
*   **DON'T** use pure black (`#000000`) for text. Use `on_surface` (`#211a1b`) to maintain the warm, rose-tinted atmosphere.
*   **DON'T** use standard "Material Design" shadows. If it looks like a default shadow, it is too heavy.
*   **DON'T** use 1px dividers to separate list items. Use `16px` of vertical padding and a tonal shift on hover instead.
