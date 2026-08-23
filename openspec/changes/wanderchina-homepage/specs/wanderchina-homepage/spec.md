# Spec: wanderchina-homepage（首页能力规范）

> **Capability**: wanderchina-homepage  
> **Change**: wanderchina-homepage  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-23  
> **Related**: proposal.md / design.md / tasks.md  
> **详细 spec 单元来源**: 本仓库 `docs/specs/homepage-*.md`（阶段 2 由外部 spec 仓库迁移落地）

## Purpose

WanderChina 首页是外国游客首次接触平台的核心入口，提供 7 个独立可开发的能力单元（Hero / FeatureNav / CityQuickEntry / AiEntry / HotPosts / HotSpots / PageShell），整合后形成"信息浏览 + AI 引导 + 城市导航"的完整体验。本 spec 定义 7 个能力的高层 Requirement 与 Scenario；每个能力单元的详细 spec 见 `docs/specs/homepage-*.md`（阶段 2 迁移后引用；当前作为外部规范引用）。

## ADDED Requirements

### Requirement: Hero Section

The system MUST provide a hero section at the top of the homepage with a large headline, a search input box for attractions / cities, and two CTA buttons ("Explore Guides" / "Ask AI").

#### Scenario: Hero Renders With Headline And Search

- **WHEN** user visits homepage for the first time
- **THEN** hero area renders with a large headline ("Discover China Like a Local") + a search input box + two CTAs ("Explore Guides" / "Ask AI")
- **AND** hero background image is `/public/hero-bg.jpg` (optimized via next/image)

#### Scenario: Search Input Debounced

- **WHEN** user types characters into the search input
- **THEN** after a 300ms debounce, the onSearch callback fires (logs only in this iteration)
- **AND** no API request is made (to avoid excessive requests)

#### Scenario: Explore Guides CTA

- **WHEN** user clicks the "Explore Guides" button
- **THEN** navigation to `/guides` (the guides index page; placeholder acceptable in this iteration)

#### Scenario: Ask AI CTA

- **WHEN** user clicks the "Ask AI" button
- **THEN** the Shell-injected onOpen callback is invoked, opening the AI assistant modal

---

### Requirement: Feature Navigation

The system MUST provide a 6-icon feature navigation row below the Hero, linking to 6 main sections (City Guide / Spots / Food / AI / Community / Routes).

#### Scenario: 6 Icons Render

- **WHEN** browser renders FeatureNav
- **THEN** 6 icons (lucide-react) + text labels are displayed
- **AND** layout adapts: horizontal scroll on mobile, 3×2 on tablet, 6×1 on desktop

#### Scenario: Click Feature Icon

- **WHEN** user clicks any feature icon
- **THEN** navigation routes to the corresponding path (`/guides` / `/spots` / `/food` / `/ai` / `/community` / `/routes`; placeholder acceptable in this iteration)

---

### Requirement: City Quick Entry

The system MUST provide 8 MVP city cards (Beijing / Shanghai / Xi'an / Chengdu / Chongqing / Hangzhou / Guangzhou / Xiamen), each linking to that city's guide page.

#### Scenario: 8 Cities Render

- **WHEN** browser renders CityQuickEntry
- **THEN** 8 city cards are displayed, each with an emoji icon + English name + Chinese name
- **AND** layout adapts: 4×2 on desktop, 2×4 on tablet, horizontal scroll on mobile (snap-x)

#### Scenario: Click City Card

- **WHEN** user clicks any city card
- **THEN** navigation to `/guides/[code]` (e.g., `/guides/beijing`)
- **AND** Next.js Link prefetch is hit

---

### Requirement: AI Assistant Entry

The system MUST provide a floating action button (FAB) at the bottom-right corner and a "Ask AI" button in the Header to open the AI assistant modal.

#### Scenario: FAB Always Visible

- **WHEN** user scrolls to any position on the page
- **THEN** the FAB remains fixed in the bottom-right corner (48px on mobile, 56px on desktop)
- **AND** it is not occluded by notches or device navigation bars (respects safe-area-inset)

#### Scenario: Click FAB Opens Modal

- **WHEN** user clicks the FAB or the "Ask AI" button in the Header
- **THEN** the Shell's onOpen callback is invoked, opening the AI assistant modal
- **AND** the modal can be dismissed by pressing ESC or clicking the backdrop

---

### Requirement: Hot Posts

The system MUST display the top 10 community posts ranked by upvote count in the last 7 days, with first post as a large card (3 mid-cards + 6 small cards on desktop, horizontal scroll on mobile).

#### Scenario: 10 Posts Load

- **WHEN** API `GET /api/homepage/hot-posts?limit=10&days=7` returns 200
- **THEN** 10 post cards are displayed, sorted by `upvote_count` DESC
- **AND** desktop layout shows: 1 large card + 3 stacked mid cards + 6 small cards in a row

#### Scenario: API Returns Empty

- **WHEN** API returns an empty payload `{ items: [] }`
- **THEN** the empty-state UI is shown with a "Write a Post" button (links to `/community/new`)

#### Scenario: API Returns 500

- **WHEN** React Query retries 3 times and still fails
- **THEN** the error-state UI is shown with a "Retry" button
- **AND** other units continue to render normally

#### Scenario: Click Post Card

- **WHEN** user clicks any post card
- **THEN** navigation to `/community/post/{post_id}`

---

### Requirement: Hot Spots

The system MUST display the top 8 popular attractions ranked by view count, with 4×2 grid on desktop, 2×4 on tablet, and horizontal scroll on mobile.

#### Scenario: 8 Spots Load

- **WHEN** API `GET /api/homepage/hot-spots?limit=8` returns 200
- **THEN** 8 spot cards are displayed, each with cover image + English name + Chinese name + city badge + view count
- **AND** sorted by `view_count` DESC

#### Scenario: View Count Formatted

- **WHEN** `view_count` = 12453
- **THEN** display "12.5k views"
- **WHEN** `view_count` = 4823
- **THEN** display "4823 views"

#### Scenario: Click Spot Card

- **WHEN** user clicks any spot card
- **THEN** navigation to `/guides/spot/{spot_id}`

---

### Requirement: Page Shell

The system MUST provide a top-level Shell that assembles all 6 unit components in order, manages Header / Footer / AI modal state, and handles global SEO metadata.

#### Scenario: Shell Renders 6 Units In Order

- **WHEN** browser loads the homepage
- **THEN** units render in order: Header → Hero → FeatureNav → CityQuickEntry → HotPosts → HotSpots → Footer
- **AND** the AiEntry FAB remains fixed in the bottom-right corner

#### Scenario: Header Scroll Behavior

- **WHEN** `window.scrollY > 100`
- **THEN** the Header transitions from transparent to a solid white background with shadow (200ms transition)

#### Scenario: Single Unit Failure Isolated

- **WHEN** any unit's API fails (e.g., HotPosts returns 500)
- **THEN** that unit displays the error UI, while other units continue to render normally
- **AND** the page as a whole remains scrollable

#### Scenario: SEO Metadata Exported

- **WHEN** Next.js renders the homepage
- **THEN** `<head>` contains title / description / OG image
- **AND** the Open Graph image is `/og-image.jpg` (1200×630)

---

## 使用指南（本文件）

### Spec 写作要点

- 本文件是**高层 requirement 合并**，仅展示"首页应满足的核心行为"
- 每个 Requirement 的详细设计见对应的 spec 单元文件（`docs/specs/homepage-*.md`，阶段 2 迁移后）
- Scenario 数量**精简**（每个 Requirement 2-5 个），覆盖正常 / 边界 / 异常路径即可
- 单元内的细节（如具体 API 响应字段、TS 类型定义）**不重复**到本文件

### 跨 Requirement 的一致性

- 所有 CTA 点击 → 调用 Shell 注入的回调（避免单元间直接耦合）
- 所有数据获取 → 统一用 React Query + `lib/api/homepage.ts`
- 所有错误 → 单元自治 ErrorBoundary + Retry
- 所有响应式 → 沿用 `design.md` Decision 2 的 Tailwind 断点

### 详细 spec 单元映射

| Requirement | 详细 spec 单元（仅引用，阶段 2 落地到 `docs/specs/`） |
|---|---|
| Hero Section | `docs/specs/homepage-hero.md` |
| Feature Navigation | `docs/specs/homepage-feature-nav.md` |
| City Quick Entry | `docs/specs/homepage-city-quick-entry.md` |
| AI Assistant Entry | `docs/specs/homepage-ai-entry.md` |
| Hot Posts | `docs/specs/homepage-hot-posts.md` |
| Hot Spots | `docs/specs/homepage-hot-spots.md` |
| Page Shell | `docs/specs/homepage-page-shell.md` |

---

**版本**: 1.0.0
**最后更新**: 2026-08-23
**关联**: `proposal.md` / `design.md` / `tasks.md` / 7 个详细 spec 单元文件（`docs/specs/homepage-*.md`，阶段 2 迁移）
