# Spec: homepage-hot-spots（热门景点能力规范）

> **Capability**: homepage-hot-spots  
> **Change**: homepage-hot-spots  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / tasks.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-hot-spots.md`

## Purpose

The Hot Spots section displays the top 8 popular attractions ranked by view count, fetched from a Spring Boot API via React Query. The component handles three rendering states (Loading / Empty / Error) and provides a click-through to each spot's guide page. This spec defines the high-level Requirements; detailed design lives in the source spec file.

## ADDED Requirements

### Requirement: API Data Fetching

The system MUST fetch the top 8 attractions from `GET /api/homepage/hot-spots?limit=8` using TanStack Query, with caching tuned for a 10-minute staleness window.

#### Scenario: Spots Load Successfully

- **WHEN** the API returns HTTP 200 with 8 items in `data.items`
- **THEN** 8 spot cards are rendered sorted by `view_count` DESC
- **AND** the section-level LCP < 1.5s

#### Scenario: API Returns Empty

- **WHEN** the API returns `{ code: 0, data: { items: [] } }`
- **THEN** the empty UI is displayed with the message "No popular attractions yet."
- **AND** no retry button is shown (this is not an error state)

#### Scenario: API Returns 500

- **WHEN** React Query retries 3 times and all attempts fail
- **THEN** the error UI is displayed with a "Retry" button
- **AND** other homepage units (Hero / FeatureNav / CityQuickEntry / HotPosts) continue to render normally

#### Scenario: Network Disconnected

- **WHEN** `fetch` rejects immediately
- **THEN** the error UI is displayed (same as the 500 case)
- **AND** retry is bounded (no infinite loop)

### Requirement: Three Rendering States

The system MUST render Loading / Empty / Error states separately.

#### Scenario: Loading Skeleton

- **WHEN** the initial fetch is in flight
- **THEN** a Skeleton of 8 placeholders is rendered

### Requirement: Responsive Layout

The system MUST adapt the layout to viewport size.

#### Scenario: Desktop Four By Two Grid

- **WHEN** viewport ≥ 1024px
- **THEN** 8 cards display in a 4×2 grid with 16-24px gap
- **AND** each card has a 3:4 aspect ratio cover image

#### Scenario: Tablet Two By Four Grid

- **WHEN** viewport 768-1023px
- **THEN** 8 cards display in a 2×4 grid

#### Scenario: Mobile Horizontal Scroll

- **WHEN** viewport < 768px
- **THEN** 8 cards are arranged in a horizontally scrollable container (`snap-x snap-mandatory`)
- **AND** approximately 1.5 cards are visible at any moment

### Requirement: View Count Format

The system MUST format `view_count` as a human-readable string.

#### Scenario: Large View Count

- **WHEN** `view_count` is 12453
- **THEN** the card displays "12.5k views"

#### Scenario: Small View Count

- **WHEN** `view_count` is 4823
- **THEN** the card displays "4823 views"

#### Scenario: Million-Scale View Count

- **WHEN** `view_count` is 1500000
- **THEN** the card displays "1.5M views"

### Requirement: Click Navigation

The system MUST navigate to the spot's guide page when a card is clicked.

#### Scenario: User Clicks Spot Card

- **WHEN** user clicks any spot card
- **THEN** the browser navigates to `/guides/spot/{spot_id}`
- **AND** Next.js `<Link>` prefetch is hit

#### Scenario: View All Link

- **WHEN** user clicks "View All"
- **THEN** the browser navigates to `/guides`

### Requirement: Cover Image Fallback

The system MUST handle cover image load failures gracefully.

#### Scenario: Cover Image 404

- **WHEN** a card's cover image returns 404
- **THEN** that specific card displays a gray placeholder instead of the image
- **AND** the spot name and view count remain visible
- **AND** a single `warn` log is emitted
- **AND** other cards continue to render normally

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `tasks.md` / 已归档 `wanderchina-homepage/specs/wanderchina-homepage/spec.md`