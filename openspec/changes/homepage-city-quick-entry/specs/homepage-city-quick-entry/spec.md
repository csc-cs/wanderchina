# Spec: homepage-city-quick-entry（城市快速入口能力规范）

> **Capability**: homepage-city-quick-entry  
> **Change**: homepage-city-quick-entry  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / tasks.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-city-quick-entry.md`

## Purpose

The City Quick Entry section renders eight MVP city cards that link to each city's guide page, providing visual entry points to the platform's city guides. This spec defines the high-level Requirements; detailed design lives in the source spec file.

## ADDED Requirements

### Requirement: Eight MVP City Cards

The system MUST render exactly eight city cards (Beijing / Shanghai / Xi'an / Chengdu / Chongqing / Hangzhou / Guangzhou / Xiamen), each linking to its respective `/guides/{code}` route.

#### Scenario: Desktop Renders Four By Two Grid

- **WHEN** user views on viewport ≥ 1024px
- **THEN** 8 cards display in a 4×2 grid with 16px gap (`grid-cols-4 gap-4`)
- **AND** each card is square (`aspect-square`)
- **AND** section-level LCP < 1.5s

#### Scenario: Tablet Renders Two By Four Grid

- **WHEN** user views on viewport 768-1023px
- **THEN** 8 cards display in a 2×4 grid with 16px gap

#### Scenario: Mobile Renders Horizontal Scroll

- **WHEN** user views on viewport < 768px
- **THEN** 8 cards are arranged in a horizontally scrollable container (`snap-x snap-mandatory`)
- **AND** approximately 2.5 cards are visible at any moment
- **AND** touch targets are ≥ 44×44px

#### Scenario: User Clicks City Card

- **WHEN** user clicks the "Beijing" card
- **THEN** the browser navigates to `/guides/beijing` (same tab)
- **AND** Next.js `<Link>` prefetch is hit, navigation completes < 200ms

#### Scenario: User Hovers City Card

- **WHEN** user moves the mouse over any card
- **THEN** the background color deepens (e.g. `bg-rose-50` → `bg-rose-100`)
- **AND** the emoji icon scales to 1.05 (`group-hover:scale-105`)
- **AND** the transition completes in 200ms

#### Scenario: City Record Missing Chinese Name

- **WHEN** `config/cities.ts` has an entry without `name_zh`
- **THEN** only the English name is rendered for that card (no error thrown)
- **AND** the browser console logs a single `warn`: `[CityQuickEntry] Missing name_zh for city: {code}`
- **AND** the other 7 cards render normally

#### Scenario: Target City Guide Returns 404

- **WHEN** user clicks a card whose `/guides/{code}` route returns 404
- **THEN** Next.js renders its built-in 404 page
- **AND** the card itself does not error
- **AND** the browser back button returns to the homepage

#### Scenario: Keyboard Navigation

- **WHEN** user presses Tab to focus cards
- **THEN** the 8 cards receive focus in left-to-right, top-to-bottom order
- **AND** focus rings are visible (`focus-visible:ring-2`)
- **AND** pressing Enter triggers navigation

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `tasks.md` / 已归档 `wanderchina-homepage/specs/wanderchina-homepage/spec.md`