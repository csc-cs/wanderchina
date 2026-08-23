# Spec: homepage-explore（Explore 区块能力规范）

> **Capability**: homepage-explore  
> **Change**: homepage-explore  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / tasks.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-explore.md`  
> **产品理念源**: README.md「面向外国游客的中国入境旅游平台」

## Purpose

The Explore section is the homepage's content-discovery hub for overseas travelers. It aggregates curated hotspots and trending posts under five culturally-translated category tabs (Food & Cuisine / Nature & Hiking / History & Culture / Nightlife & Markets / Nightlife & Markets) with rich trust signals (rating, review count, price in CNY+USD, "Loved by" social proof). Data is sourced client-side by merging the existing `/api/homepage/hot-spots` and `/api/homepage/hot-posts` endpoints — no new backend endpoint is required. This spec defines the high-level Requirements; detailed design lives in the source spec file.

## ADDED Requirements

### Requirement: Category Tabs

The system MUST display five category tabs with English culturally-translated labels and a single-select control.

#### Scenario: Initial State All Tab

- **WHEN** the Explore section first renders
- **THEN** the "All" tab is selected by default
- **AND** all 12 items (mix of spots + posts) are displayed

#### Scenario: Switch To Food And Cuisine

- **WHEN** the user clicks the "Food & Cuisine" tab
- **THEN** only items with `category === 'food'` are displayed
- **AND** the previously-displayed items remain visible briefly (skeleton background) while new data loads
- **AND** the tab visually indicates selection (indigo background)

#### Scenario: Switch To Nightlife And Markets

- **WHEN** the user clicks the "Nightlife & Markets" tab
- **THEN** only items tagged as night markets or evening activities are displayed
- **AND** the Chinese "夜市" / "酒吧街" semantics are translated correctly

### Requirement: Trust Stack Rendering

The system MUST render seven trust signals per card in this order.

#### Scenario: All Seven Fields Render

- **WHEN** an item has all trust fields populated
- **THEN** the card displays: cover image, city badge, category icon, title, rating (e.g. "★ 4.8"), review count (e.g. "(1.2k reviews)"), duration (e.g. "2-3 hours"), price in CNY and USD (e.g. "¥45 / $6"), and a "Loved by" social proof line (e.g. "Loved by 12k+ from USA")
- **AND** the price uses USD = CNY ÷ 7.5 (or equivalent rate config) with no decimal places under $1

#### Scenario: Missing Field Renders Gracefully

- **WHEN** an item is missing `rating` or `price_cny`
- **THEN** that field is not rendered (no empty placeholder)
- **AND** the remaining six fields are still rendered

#### Scenario: Zero Review Count

- **WHEN** `review_count === 0`
- **THEN** the rating row is hidden entirely (not "★ 0 (0)")

### Requirement: Quick View Hover Preview

The system MUST show a preview drawer on hover for desktop only.

#### Scenario: Desktop Hover Triggers Quick View

- **WHEN** user hovers a card on viewport ≥ 1024px
- **THEN** a "Quick View" button appears overlaying the cover image (white background, 90% opacity)
- **AND** the cover image scales to 1.05 with a 300ms ease transition

#### Scenario: Click Quick View Opens Drawer

- **WHEN** user clicks "Quick View"
- **THEN** a preview drawer slides in from the right
- **AND** the drawer shows the full description, all 7 trust fields, and a "Read More" link to the detail page

#### Scenario: Mobile Does Not Show Quick View

- **WHEN** viewport < 768px
- **THEN** no hover behavior is shown
- **AND** tapping the card navigates directly to the detail page

### Requirement: Loading And Empty States

The system MUST render distinct Loading / Empty / Error states.

#### Scenario: Skeleton Loading

- **WHEN** the initial fetch is in flight
- **THEN** 12 skeleton cards are rendered at the same height as the real cards (CLS < 0.1)

#### Scenario: Empty Category

- **WHEN** no items match the selected category
- **THEN** the empty state shows the message "No spots match your filters yet — try a different category"
- **AND** a "Clear Filters" button is shown that resets to the "All" tab

#### Scenario: Partial API Failure Degrades Gracefully

- **WHEN** `useHotPosts` fails but `useHotSpots` succeeds
- **THEN** the section still renders with spot-only items
- **AND** a small toast "Some content is temporarily unavailable" is displayed for 3 seconds
- **AND** no full-section error is shown

### Requirement: Browse All Navigation

The system MUST provide a top-right "Browse All" link in the section header.

#### Scenario: Browse All Link

- **WHEN** user clicks "Browse All"
- **THEN** the browser navigates to `/guides`

### Requirement: PageShell Integration

The system MUST be rendered by `HomeShellClient` between `<HotSpots />` and `<Footer />`.

#### Scenario: Render Order

- **WHEN** user navigates to `/`
- **THEN** units are rendered in this order: Header → Hero → FeatureNav → CityQuickEntry → HotPosts → HotSpots → **Explore** → Footer
- **AND** the AiEntry FAB remains fixed at the bottom-right

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `tasks.md` / 已归档 `wanderchina-homepage/specs/wanderchina-homepage/spec.md` / `homepage-page-shell/specs/homepage-page-shell/spec.md`（修改）