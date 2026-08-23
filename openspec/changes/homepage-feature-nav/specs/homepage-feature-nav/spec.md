# Spec: homepage-feature-nav（功能导航区能力规范）

> **Capability**: homepage-feature-nav  
> **Change**: homepage-feature-nav  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / tasks.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-feature-nav.md`

## Purpose

The Feature Navigation section provides three entry cards (Travel Community / City Guides / AI Travel Assistant) immediately below the Hero, giving users clear directions to the platform's three core modules. This spec defines the high-level Requirements; detailed design lives in the source spec file.

## ADDED Requirements

### Requirement: Three Feature Cards

The system MUST render exactly three feature cards below the Hero, with fixed content (Travel Community / City Guides / AI Travel Assistant), each linking to its respective module.

#### Scenario: Desktop Renders Three Columns

- **WHEN** user views the homepage on a viewport ≥ 1024px
- **THEN** 3 cards are displayed in a single row with equal width and 24px gap
- **AND** each card has emoji icon (64px) + H3 title + line-clamp-2 description + "Enter →" button
- **AND** section-level LCP < 1.5s

#### Scenario: Tablet Renders Two Columns

- **WHEN** user views on a viewport 640-1023px
- **THEN** 2 cards per row are displayed; the 3rd card occupies the first column of the next row
- **AND** card heights remain equal via `grid-auto-rows-fr`

#### Scenario: Mobile Renders One Column

- **WHEN** user views on a viewport < 640px
- **THEN** cards stack vertically as a single column
- **AND** touch targets are ≥ 44×44px

#### Scenario: User Clicks Community Card

- **WHEN** user clicks the Travel Community card
- **THEN** the browser navigates to `/community` (same tab)
- **AND** the Next.js `<Link>` prefetch is hit and navigation completes < 200ms

#### Scenario: User Hovers Card

- **WHEN** user moves the mouse over any card
- **THEN** the card translates up 4px (`-translate-y-1`)
- **AND** shadow upgrades from `shadow-sm` to `shadow-lg`
- **AND** the arrow icon translates right 4px (`translate-x-1`)
- **AND** all transitions complete in 200ms

#### Scenario: Target Route Returns 404

- **WHEN** the destination route (e.g. `/guides`) is not yet deployed
- **THEN** Next.js renders its built-in 404 page (dev) or a "Coming Soon" page (prod)
- **AND** the card itself does not error

#### Scenario: User Prefers Reduced Motion

- **WHEN** `prefers-reduced-motion: reduce` is enabled
- **THEN** all hover transitions (translate, shadow) complete in 0ms
- **AND** color changes still apply (so hover state remains visible)

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `tasks.md` / 已归档 `wanderchina-homepage/specs/wanderchina-homepage/spec.md`