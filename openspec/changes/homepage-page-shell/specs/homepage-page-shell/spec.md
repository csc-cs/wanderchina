# Spec: homepage-page-shell（页面骨架能力规范）

> **Capability**: homepage-page-shell  
> **Change**: homepage-page-shell  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / tasks.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-page-shell.md`

## Purpose

The Page Shell is the top-level integrator that assembles all six homepage units (Hero / FeatureNav / CityQuickEntry / HotPosts / HotSpots / AiEntry) in order, owns the AI modal open-state, manages global SEO metadata, and coordinates the scroll-coordinated transparent Header. This spec defines the high-level Requirements; detailed design lives in the source spec file.

## ADDED Requirements

### Requirement: Unit Assembly Order

The system MUST render the six units in a fixed visual order on the homepage.

#### Scenario: Initial Page Load

- **WHEN** user navigates to `/`
- **THEN** units are rendered in this order: Header → Hero → FeatureNav → CityQuickEntry → HotPosts → HotSpots → Footer
- **AND** the AiEntry FAB is fixed at the bottom-right corner throughout

#### Scenario: Header Initial State

- **WHEN** the page first loads
- **THEN** the Header is transparent (overlaying the Hero background)
- **AND** the logo and navigation links are visible

### Requirement: Header Scroll Behavior

The system MUST transition the Header from transparent to solid when the user scrolls down.

#### Scenario: Scroll Past Threshold

- **WHEN** `window.scrollY > 100`
- **THEN** the Header transitions to a solid white background with `shadow-md`
- **AND** the transition completes in 200ms

#### Scenario: Scroll Back To Top

- **WHEN** the user scrolls back to `scrollY <= 100`
- **THEN** the Header returns to its transparent state

### Requirement: AI Modal State Management

The system MUST own the AI modal open-state in the Shell and inject the toggle callback into AiEntry.

#### Scenario: Click FAB Opens Modal

- **WHEN** user clicks the AiEntry FAB
- **THEN** the Shell sets `aiOpen = true`
- **AND** the AiAssistantModal renders (Portal'd to body)
- **AND** the modal displays a placeholder message ("AI Assistant Coming Soon")

#### Scenario: ESC Key Closes Modal

- **WHEN** the modal is open and the user presses ESC
- **THEN** the Shell sets `aiOpen = false`
- **AND** the modal is removed from the DOM

#### Scenario: Backdrop Click Closes Modal

- **WHEN** the user clicks the modal backdrop
- **THEN** the modal closes

#### Scenario: Focus Returns To FAB On Close

- **WHEN** the modal closes
- **THEN** keyboard focus returns to the AiEntry FAB button

### Requirement: Unit Failure Isolation

The system MUST ensure that one unit's failure does not break other units or the page.

#### Scenario: HotPosts API 500

- **WHEN** the HotPosts component's API returns 500
- **THEN** HotPosts displays its error UI with a Retry button
- **AND** the other 5 units (Hero / FeatureNav / CityQuickEntry / HotSpots / Footer) continue to render normally
- **AND** the page as a whole remains scrollable
- **AND** the Footer is still visible at the bottom

#### Scenario: JavaScript Bundle Fails To Load

- **WHEN** the JS bundle fails to load (CDN issue)
- **THEN** Next.js displays its built-in "Application error" page
- **AND** the user can refresh to retry

### Requirement: SEO Metadata

The system MUST export complete SEO metadata for the homepage.

#### Scenario: Metadata Exported

- **WHEN** Next.js renders the homepage
- **THEN** the `<head>` contains: title (default "WanderChina · Discover China Like a Local"), description, keywords
- **AND** Open Graph tags (og:title / og:description / og:image / og:url) are present
- **AND** Twitter card tags (twitter:card / twitter:title / twitter:description / twitter:image) are present
- **AND** the Open Graph image is `/og-image.jpg` at 1200×630

#### Scenario: Subpage Title Inheritance

- **WHEN** a subpage (e.g. `/guides/beijing`) sets its own title
- **THEN** the rendered `<title>` follows the template `%s · WanderChina`

#### Scenario: Metadata Missing (Defensive)

- **WHEN** a developer forgets to export `metadata`
- **THEN** the browser uses Next.js's default title
- **AND** the page is still accessible
- **AND** a single `warn` log is emitted

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `tasks.md` / 已归档 `wanderchina-homepage/specs/wanderchina-homepage/spec.md`