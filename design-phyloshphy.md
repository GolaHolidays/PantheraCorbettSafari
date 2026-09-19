# Panthera Corbett Safari — Design Philosophy & Style Guide

Raw material for the frontend build — how the site should look, feel, and behave before a single page gets designed. Not a mockup. A decision record.

---

## The brief, in plain terms

Panthera Corbett Safari sells access to Jim Corbett Tiger Reserve: jungle safaris across Core and Buffer zones, Canter and Jeep safaris, jungle and forest night stays. That's the primary business, and the site's entire structure should say so. Cabs and hotel bookings are real, revenue-generating services — but they're secondary, and should read as secondary: useful add-ons for someone who's already decided to book a safari, not competing headline offers.

The site's job is not to explain Jim Corbett. It's to get a visitor to pick up the phone. Every section, every image, every button exists to move a browser toward a call or a WhatsApp message — not to be the most complete safari encyclopedia on the internet. Mobile-first, photo-heavy, and built to be found through the Google Business Profile listing, where trust is decided in the first three seconds of a swipe.

---

## What the site should make someone feel

Four things have to be true at once, in the first screen, on a phone, in bad network conditions.

1. **Wild and real, not a brochure** — The forest should feel close enough to smell: actual tigers, actual dust, actual jeep tracks. The moment this looks like stock photography or a template safari site, the visitor's guard goes up.
2. **Officially legitimate** — Jim Corbett safaris run on Forest Department permits and fixed entry quotas; a visitor needs to feel, instantly, that this operator knows the system and will get their paperwork right. That reads as trust, not luxury.
3. **Premium, but reachable** — Not an ultra-luxury African lodge selling a two-week retreat to a small global elite. This is a high-quality local operator selling a day or two to families and friend groups, mostly from Delhi NCR and other Indian cities, plus a smaller international crowd. Considered and high-end, never precious or slow.
4. **Alive with urgency** — Safari permits are genuinely limited per zone, per day. That's real scarcity, not a manufactured countdown timer, and the design should surface it honestly.

---

## Color theory & palette

Color is the fastest signal a visitor reads, before they process a single word. This palette is drawn from the reserve itself — sal forest, dry-season grass, dusk light, tiger colouring — rather than a generic "travel site" template, so it reads as specific to Corbett rather than interchangeable with any tour operator anywhere.

| Name | Hex | Role |
|---|---|---|
| Ink | `#17211A` | Anchor / dark backgrounds, premium weight |
| Forest | `#37482E` | Primary brand colour, nav, headers |
| Moss | `#8A9468` | Muted secondary, tags, borders |
| Ember | `#B84C1E` | Single hero accent — every "Call now" and "Book" CTA |
| Gold | `#C99A3D` | Ratings, badges, small highlights only |
| Sand | `#E8E0CC` | Primary light background |
| Paper | `#FBF8F0` | Cards and surfaces on Sand |

**How to use it:** Forest and Ink carry weight and trust (headers, footer, the permit/licence section). Ember is spent on exactly one job — the action a visitor should take right now — and nowhere else, so it never loses urgency through overuse. Gold stays small: a star rating, a "15 years in Corbett" badge, never a large fill. Sand and Paper do the quiet work of making photography the loudest thing on the page.

**What to avoid:** two failure modes on either side of this palette. One is the "souvenir shop" safari look — cartoon khaki, jungle-green gradients, paw-print icons — which reads as a kids' zoo, not a serious wildlife operator. The other is the generic templated look: a warm cream background with a soft coral-terracotta accent and a high-contrast serif headline, which has become the default "AI-generated site" palette across the web this year — technically pleasant, but instantly forgettable and not specific to Corbett at all.

---

## Typography

Two families, clearly distinct roles. A characterful serif for anything the visitor should feel, and a highly legible sans for anything they need to read fast on a small screen with patchy hill-station signal.

| Role | Typeface | Weight | Notes |
|---|---|---|---|
| Display / hero headline | Fraunces | 600 | Slightly hand-cut, field-guide character — avoids the cold, corporate feel of a pure geometric sans used as a headline |
| Section headings | Fraunces | 500–600 | Keep to one or two lines; this face gets heavy at long lengths |
| Body copy, nav, buttons | Inter | 400–700 | Built for screens — holds up at small sizes on cheap Android displays, which matters more here than desktop polish |
| Prices, dates, zone codes | Inter | 700, tabular figures | Numbers should feel exact and trustworthy, not decorative |

**Two alternative pairings**, if Fraunces feels too soft for the brief once it's on screen:

- **Instrument Serif + Inter** — leaner, more editorial, higher-contrast strokes. Reads slightly more "luxury magazine," slightly less "expedition journal."
- **DM Serif Display + DM Sans** — same type family for both roles, so they pair with zero effort and stay consistent across every implementation tool.

Line length: keep body paragraphs under ~75 characters per line on desktop, and let them run full-width on mobile. Never split a package price or phone number across a line break.

---

## Edges & shape language

This is the question worth answering carefully, because corner radius is doing real psychological work, not just decoration.

There's a well-documented human bias against sharp angles — researchers call it *contour bias*: sharp points get read, at a near-instinctive level, as things that can cut or hurt, and that reaction shows up as measurable stress response even in a flat, harmless UI element. The flip side, the "Bouba/Kiki" effect, shows that almost everyone instinctively pairs round shapes with soft, friendly-sounding words and jagged shapes with hard, sharp-sounding ones. In interface terms: sharp, zero-radius corners read as serious, solid, and premium — the look of an insurance company or an architecture firm. Rounded corners read as safe, friendly, and easy to trust — exactly why almost every "Book now" or "Buy" button on the web is rounded, regardless of the brand around it.

**The recommendation:** a hybrid system, not one radius for the whole site. Structure stays sharp — it's what makes the site feel like a serious operator instead of a friendly travel-blog template, and it lets the photography stay the undisputed focus. Every actual conversion action — Call, WhatsApp, Check Availability, Book — gets a generously rounded or fully pill-shaped button in Ember. That contrast does two jobs at once: it makes the CTA impossible to miss against an otherwise angular page, and it lowers the visitor's guard at the exact moment they're being asked to commit to a call. On mobile specifically, a rounded shape also reads as an easier, more forgiving tap target.

| Element | Radius | Why |
|---|---|---|
| Photo frames, gallery tiles | 2–4px | Photography stays the hero; the frame shouldn't compete with it |
| Package / price cards | 4px | Serious and legible, not playful — this is where someone reads real numbers |
| Trust badges, zone tags | full (pill) | Small, low-stakes elements read fine as friendly pills |
| Primary CTA (Call / Book / WhatsApp) | full (pill) or 12px | Maximum approachability at the exact point of conversion |
| Secondary buttons, form fields | 6px | A middle ground — usable, not attention-grabbing |
| Modals, sticky call bar | 0–2px top corners | Anchored to the screen edge; sharpness reads as fixed and dependable |

---

## Photography direction

Since photography is going to carry most of the emotional weight on this site, the treatment matters more than almost anything else here.

- **Cinematic and raw over polished and staged.** Real dust, real motion blur on a jeep, real weather — not a studio-lit brochure shoot. Nothing soft-focus, nothing that looks like a stock-photo library.
- **Consistent colour grade.** Pull every photo slightly warm and slightly desaturated toward the Forest/Ember palette above, so a gallery of forty different photos still feels like one brand, not a dumped phone album.
- **Golden hour bias.** Early morning and late afternoon light is both when safaris actually happen and when the forest photographs best — lean into it rather than midday flat light.
- **People, sparingly and real.** A genuine guide, a genuine family in a genuine jeep, is worth more than another empty landscape. Avoid posed, stock-agency tourists.
- **Text-over-image needs a real gradient, not a flat dark box.** A soft dark-to-transparent overlay (Ink at low opacity) at the bottom third of hero images keeps captions and CTAs legible without flattening the photo.
- **Shoot for both crops.** Since the build is mobile-first, prioritise portrait and square crops for hero and gallery use, with wide crops reserved for desktop-only banners.

---

## Layout & conversion patterns

The instruction was clear: this can't read like an encyclopedia. Every pattern below exists to turn "browsing" into "calling."

1. **Sticky call bar on mobile** — A thin, always-visible bar pinned to the bottom of the screen with two tap targets: Call and WhatsApp. This single pattern usually does more for phone-based lead generation than any other element on the page.
2. **One primary CTA per screen** — Every section should have exactly one obvious next action — "Call for Dhikala availability," not three competing buttons. Secondary services (cabs, hotels) get their own CTA, but never share top billing with a safari CTA.
3. **Trust row, above the fold** — Years operating in Corbett, a Google rating, and an explicit mention of Forest Department–authorised booking, placed where a visitor sees it before they scroll.
4. **Package cards, not package paragraphs** — Zone, safari type (Jeep/Canter), duration, starting price and a Call/Enquire button, scannable in under five seconds. Long descriptive text goes below the fold, never in front of the card.
5. **Honest scarcity** — Zone permits are genuinely capped per day; state that plainly near the booking CTA ("Limited jeep permits per zone per day"). True urgency converts better than any invented countdown.
6. **Information paired with action, never alone** — Zone-comparison and Jeep-vs-Canter content is genuinely useful, but every block of explanation should end in a micro-CTA ("Check today's Bijrani availability"), not just end.
7. **Cabs and hotels as cross-sell, not competition** — Surface them after a safari decision is underway — on a thank-you state, a package detail page, or a dedicated secondary section — never in the primary hero or main nav's first position.

---

## Motion

Minimal and purposeful. Motion should answer something the visitor did, not perform for its own sake.

- One deliberate moment on load — a slow, single hero image reveal or a subtle parallax on the hero photo — rather than every card fading and sliding in as it's scrolled to.
- Buttons and tap targets get a quick, tactile press/hover feedback so they feel physically responsive on a touchscreen.
- Respect reduced-motion settings; nothing here should depend on animation to be understood.

---

## What to avoid

A short list of patterns that have become the default "generic template" look across the web — worth naming so the build doesn't drift into them by accident.

- The cream-background-plus-coral-accent-plus-high-contrast-serif combination — pleasant, but instantly recognisable as a generic default rather than something built for Corbett specifically.
- Identical rounded cards everywhere with the same soft grey shadow under each one — flattens hierarchy and makes every element feel equally (un)important.
- Tracked-out ALL-CAPS labels above every heading, and an arrow appended to every link and button — small habits that read as templated the moment there's more than one on a page.
- Numbered "01 / 02 / 03" markers used decoratively where the content isn't actually a sequence.
- Stock jungle/safari clip-art — paw prints, cartoon binoculars, generic globe-and-compass icons. Real photography should always outperform an icon here.

---

## Developer quick reference

Everything above, condensed into tokens ready to drop into a Tailwind config or CSS variables file.

| Token | Value |
|---|---|
| color.ink | `#17211A` |
| color.forest | `#37482E` |
| color.moss | `#8A9468` |
| color.ember (accent / CTA) | `#B84C1E` |
| color.ember-dark (hover) | `#8F3B16` |
| color.gold | `#C99A3D` |
| color.sand (bg) | `#E8E0CC` |
| color.paper (surface) | `#FBF8F0` |
| font.display | Fraunces, 500/600 |
| font.body | Inter, 400/600/700 |
| radius.structure (cards, frames) | 2–4px |
| radius.secondary | 6px |
| radius.pill (CTA, badges) | 999px |
| touch-target.min | 44 × 44px |
| line-length.body | ≤ 75 characters |

---

*This is raw material, not a finished design — a set of deliberate decisions for whoever builds the actual pages (human or AI coding tool) to work from, so the site ends up feeling specific to Panthera Corbett Safari rather than like any other tour-operator template.*