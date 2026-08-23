# Spec: homepage-hot-posts（热门帖子能力规范）

> **Capability**: homepage-hot-posts  
> **Change**: homepage-hot-posts  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / design.md / tasks.md  
> **详细设计来源**: 外部 spec 仓库 `specs/homepage-hot-posts.md`

## Purpose

The Hot Posts section displays the top 10 community posts ranked by upvote count in the last 7 days, fetched from a Spring Boot API via React Query. The component handles three rendering states (Loading / Empty / Error) and provides a click-through to each post's detail page. This spec defines the high-level Requirements; detailed design lives in the source spec file.

## ADDED Requirements

### Requirement: API Data Fetching

The system MUST fetch the top 10 community posts from `GET /api/homepage/hot-posts?limit=10&days=7` using TanStack Query, with caching tuned for a 5-minute staleness window.

#### Scenario: Posts Load Successfully

- **WHEN** the API returns HTTP 200 with `code: 0` and 10 items in `data.items`
- **THEN** the 10 posts are displayed sorted by `upvote_count` DESC
- **AND** the section-level LCP < 2s when cached, < 2.5s on first load

#### Scenario: API Returns Empty

- **WHEN** the API returns `{ code: 0, data: { items: [] } }`
- **THEN** the empty UI is displayed with the message "No trending posts this week."
- **AND** a "Write a Post" button is shown, linking to `/community/new`

#### Scenario: API Returns 500

- **WHEN** React Query retries 3 times and all attempts fail
- **THEN** the error UI is displayed with a "Retry" button
- **AND** a single `warn` log entry is emitted
- **AND** other homepage units (Hero / FeatureNav / CityQuickEntry / HotSpots) continue to render normally

#### Scenario: Network Disconnected

- **WHEN** `fetch` rejects immediately (offline)
- **THEN** the error UI is displayed (same as the 500 case)
- **AND** retry is bounded (no infinite loop)

### Requirement: Three Rendering States

The system MUST render Loading / Empty / Error states separately from the data state.

#### Scenario: Loading Skeleton

- **WHEN** the initial fetch is in flight
- **THEN** a Skeleton (5 large + 5 small placeholders) is rendered
- **AND** no layout shift occurs when real data arrives (CLS < 0.1)

#### Scenario: Data Arrives Smoothly

- **WHEN** the fetch resolves successfully
- **THEN** the Skeleton is replaced with the rendered cards
- **AND** the transition does not flash or re-mount

### Requirement: Responsive Layout

The system MUST adapt the layout to viewport size.

#### Scenario: Desktop Layout One Plus Three Plus Six

- **WHEN** viewport ≥ 1024px
- **THEN** the first post is rendered as a Large card (col-span-2, ~2/3 width)
- **AND** posts 2-4 are rendered as Small cards stacked vertically (1/3 width, 3 rows)
- **AND** posts 5-10 are rendered as Small cards in a 6-column row

#### Scenario: Tablet Layout Two Plus Four

- **WHEN** viewport 768-1023px
- **THEN** 2 large cards + 4 small cards are displayed in 2 columns
- **AND** card sizes adapt

#### Scenario: Mobile Horizontal Scroll

- **WHEN** viewport < 768px
- **THEN** all 10 cards are arranged in a horizontally scrollable container (`snap-x snap-mandatory`)
- **AND** approximately 1.2 cards are visible at any moment

### Requirement: Click Navigation

The system MUST navigate to the post detail page when a card is clicked.

#### Scenario: User Clicks Post Card

- **WHEN** user clicks any post card
- **THEN** the browser navigates to `/community/post/{post_id}`
- **AND** Next.js `<Link>` prefetch is hit, navigation completes < 200ms

#### Scenario: View All Link

- **WHEN** user clicks the "View All" button at the top-right
- **THEN** the browser navigates to `/community`

### Requirement: Relative Time Format

The system MUST format `created_at` as a human-readable relative time string.

#### Scenario: Recent Post

- **WHEN** a post was created 2 hours ago
- **THEN** the card displays "2h ago"

#### Scenario: Days-Old Post

- **WHEN** a post was created 3 days ago
- **THEN** the card displays "3d ago"

#### Scenario: Post Older Than One Week

- **WHEN** a post is older than 7 days
- **THEN** the card displays a short ISO date (e.g. "Aug 12")

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `design.md` / `tasks.md` / 已归档 `wanderchina-homepage/specs/wanderchina-homepage/spec.md`