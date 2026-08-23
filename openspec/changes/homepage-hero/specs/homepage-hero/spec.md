# Spec: homepage-hero（Hero 区能力规范）

> **Capability**: homepage-hero  
> **Change**: homepage-hero  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / tasks.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-hero.md`（阶段 2 迁移到本仓库 `docs/specs/`）

## Purpose

The Hero section is the topmost visual area of the WanderChina homepage. It provides a full-screen background image with a headline and subtitle, and coordinates a transparent-to-solid Header that becomes opaque on scroll. This spec defines the high-level Requirements; detailed design lives in the source spec file.

## ADDED Requirements

### Requirement: Full-screen Hero Section

The system MUST render a full-screen Hero section at the top of the homepage with a background image, brand tagline (H1), brand subtitle (H2), and a scroll-coordinated transparent Header.

#### Scenario: User Visits Homepage On Desktop

- **WHEN** user visits `/` on a viewport ≥ 1024px
- **THEN** the Hero renders at height `100vh - 56px` (subtracting the Header height)
- **AND** the desktop background image (`/images/hero-desktop.jpg`, 1920×1080) fills the section via `next/image` with `priority`
- **AND** the H1 displays "Discover China Like a Local" at 56-72px semibold white
- **AND** the H2 subtitle displays below at 20-24px white/80
- **AND** the LCP < 2.5s on a 4G mobile connection

#### Scenario: User Visits Homepage On Mobile

- **WHEN** user visits `/` on a viewport < 768px
- **THEN** the Hero renders at `70vh` (leaving 30vh for content below)
- **AND** the mobile background image (`/images/hero-mobile.jpg`, 750×1334) is used instead of the desktop version
- **AND** the H1 font size shrinks to 32px; the H2 to 16px
- **AND** text is not occluded by device notches or status bars (safe-area-inset honored)

#### Scenario: User Scrolls Down

- **WHEN** `window.scrollY > 100`
- **THEN** the Header transitions from transparent to solid white background with `shadow-md` over 200ms
- **AND** the logo and navigation links remain visible
- **AND** the scroll listener is registered with `{ passive: true }` to avoid blocking

#### Scenario: Background Image Fails To Load

- **WHEN** the `next/image` component detects a load error (CDN 404 or network down)
- **THEN** the fallback brand-color gradient background (`bg-gradient-to-br from-brand-primary to-brand-secondary`) is shown
- **AND** the headline and subtitle remain centered and readable
- **AND** the browser console logs a single `warn` (no React error boundary is thrown)

#### Scenario: Subtitle Exceeds Maximum Length

- **WHEN** `props.brandSubtitle` length > 200 characters
- **THEN** the subtitle is truncated with `line-clamp-3` and an ellipsis
- **AND** the Hero section height remains stable (no layout shift)

#### Scenario: User Prefers Reduced Motion

- **WHEN** the operating system has `prefers-reduced-motion: reduce` enabled
- **THEN** the `fade-in` entrance animation duration is reduced to 0ms (or disabled entirely via `motion-reduce:animate-none`)
- **AND** no transform or opacity transitions occur on user interaction

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `tasks.md` / 已归档 `wanderchina-homepage/specs/wanderchina-homepage/spec.md`（Hero 是其 7 Requirement 之一）