# Design: homepage-explore（Explore 单元内设计决策）

> **Change**: homepage-explore  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / tasks.md / specs/homepage-explore/spec.md  
> **跨单元决策继承自**: 已归档 `wanderchina-homepage/design.md` + `homepage-page-shell/design.md`

---

## Context

Explore 区块是 8 单元中最**重视觉**与**重产品体验**的。它不像 HotSpots 那样单纯展示数据，而是要承担"留住用户、深度种草"的角色。海外用户的浏览心智模型决定了我们的设计选择。

## Goals / Non-Goals

**Goals:**

- 5 个分类 Tabs（All / Food & Cuisine / Nature & Hiking / History & Culture / Nightlife & Markets）
- 客户端合并 hot-spots + hot-posts，按 category 字段筛选
- 桌面 4 列 / 平板 2 列 / 移动 1 列横滑
- 卡片 Trust Stack：封面 + 城市 badge + 类别 icon + 时长 + 价格 + 评分 + 评论数 + "Loved by" 标签
- Quick View hover 反馈
- 海外用户思维：信任信号 / 社会证明 / 文化翻译 / 价格 USD / 时长预期

**Non-Goals:**

- 不实现真实评论数据（mock 即可）
- 不做"无限滚动"（仅 12 张 + Browse All 跳转）
- 不做"个人推荐"（不做用户画像）
- 不做"对比"功能（仅浏览）
- 不做"视频预览"（仅图文）
- 不做"多语言切换"（仅英文）

## Decisions

### Decision 1: 客户端合并数据策略

**Context**: 复用现有 API（hot-spots + hot-posts），但需要按 category 统一筛选。

**Decision**:

- `useHotPosts()` + `useHotSpots()` 并行（React Query 同层 query）
- 客户端聚合：`useExploreItems(category)` 内部调用两个 hook，将响应归一化为 `ExploreItem` 联合类型
- 字段归一化：
  ```typescript
  type ExploreItem =
    | { type: 'spot'; id: number; title: string; cover_url: string;
        city_code: string; city_name_en: string; category: string;
        duration?: string; price_cny?: number; rating?: number;
        review_count?: number; loved_by_count: number; loved_by_country?: string;
        english_guide: boolean; }
    | { type: 'post'; id: number; title: string; cover_url: string;
        city_code: string; city_name_en: string; category: string;
        duration?: string; price_cny?: number; rating?: number;
        review_count?: number; loved_by_count: number; loved_by_country?: string;
        english_guide: boolean; };
  ```
- 筛选：`category === 'all' || item.category === selectedCategory`
- 排序：`loved_by_count` DESC + `rating` DESC

**Rationale**: 不改后端是 P0 决策；客户端聚合避免 API 改动；联合类型让组件按 `type` 分支渲染但保留共享字段。

### Decision 2: 分类标签文化翻译

**Context**: 直译"美食 / 自然 / 历史 / 夜生活"会让海外用户困惑（"夜生活"=Nightlife 在西方是酒吧/夜店，与中国"夜市"语义不同）。

**Decision**:

| 中文概念 | 英文翻译 | 理由 |
|---|---|---|
| 美食 | **Food & Cuisine** | "Cuisine" 比 "Food" 更显正式感 |
| 自然 | **Nature & Hiking** | 加上 "Hiking" 让用户立刻理解是户外 |
| 历史 | **History & Culture** | "Culture" 涵盖博物馆 / 古迹 / 传统 |
| 夜生活 | **Nightlife & Markets** | 加上 "Markets" 涵盖"夜市"独特中国场景 |

**Rationale**: 海外用户认知模型（Booking.com 的"Culture" / TripAdvisor 的"Food & Drink" / Airbnb 的"Nightlife"）

### Decision 3: 卡片 Trust Stack（7 字段）

**Context**: 海外用户对卡片信息密度敏感（信息太少 → 不信任；信息太密 → 视觉杂乱）。

**Decision**:

```
┌────────────────────────────┐
│   Cover Image (3:4 aspect) │  ← lazy load + onError fallback
│                            │
│   [City Badge]             │  ← 城市品牌色 + CITY_COLOR_MAP
│   [Quick View on Hover]    │  ← 仅桌面
├────────────────────────────┤
│  Category Icon  Food Title │  ← 左侧 icon + 标题
│  ★ 4.8 (1.2k reviews)      │  ← 评分 + 评论数
│  2-3 hours · ¥45 / $6      │  ← 时长 + 双币价格
│  ❤️ Loved by 12k+ from USA │  ← 社会证明
└────────────────────────────┘
```

**Rationale**:
- 7 字段符合 Airbnb 单卡信息密度基准
- 价格双币消除海外用户的"汇率换算"焦虑
- "Loved by X from <country>" 是最强社会证明

### Decision 4: Quick View Hover（仅桌面）

**Context**: 海外用户期待"快速预览"模式（Booking.com / Etsy）。

**Decision**:

- 鼠标 hover 时，封面图 `transform: scale(1.05)` + `transition: 300ms ease`
- 同时浮出"Quick View" 按钮（半透明白底 + 文字）
- 点击 Quick View：弹出 preview drawer（同 Modal 模式，但仅展示字段不导航）
- **移动端无 Quick View**（触屏 hover 不友好）

**Rationale**: 海外用户在浏览阶段不愿"跳走"，需要快速对比。

### Decision 5: 主色调（产品哲学驱动）

**Context**: 国内旅游产品常用红 + 金 + 龙凤。海外用户觉得"过于本土、不够国际化"。

**Decision**:

- **主色**：Indigo `#4F46E5`（信任、专业、国际化）
- **辅色**：Warm Orange `#F59E0B`（温暖、活力、CTA 强调）
- **中性色**：Slate-50 / Slate-900（背景 + 文本）
- **错误色**：Rose-500（保持 Tailwind 标准）
- **城市 badge**：复用 `CITY_COLOR_MAP`（与 CityQuickEntry 一致）

**Rationale**:
- Indigo 是 Stripe / Linear / Figma 的品牌色（海外用户熟悉的"科技感信任色"）
- 暖橙作为唯一强调色（避免视觉杂乱）
- 不强行"中国红"

### Decision 6: 加载策略

**Context**: 客户端合并两个 API → 加载时间可能稍长。

**Decision**:

- 加载态：12 张 Skeleton 卡（与最终布局等高，避免 CLS）
- 错误态：单个 API 失败时显示"部分数据可用"（不阻塞整个 Explore）
- 空态："No spots match your filters yet — try a different category" + "Clear Filters" 按钮

**Rationale**:
- Skeleton 等高是海外产品标配（LinkedIn / Airbnb）
- 单 API 失败不应让用户失去整个区块
- 空态文案**英文 + 行动按钮**，避免用户卡住

### Decision 7: PageShell 渲染顺序

**Context**: 在哪里插入 Explore？

**Decision**:

```
Header → Hero → FeatureNav → CityQuickEntry → HotPosts → HotSpots → Explore → Footer
                                                                ↑ NEW
```

**Rationale**:
- Explore 在 HotSpots 之后（与"热门景点"形成内容互补：先看"最热"，再看"按兴趣筛选"）
- 在 Footer 之前（避免破坏 CTA 收尾）

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| 客户端聚合两个 API 加载时间稍长 | 用户看到 Loading 时间 +100ms | Skeleton 等高 + React Query `keepPreviousData`（切换 tab 时保留旧数据） |
| mock 数据与真实字段不一致 | 实施时发现字段缺失 | 联合类型 `ExploreItem` 是宽松的（字段都可选），后端字段微调不影响组件 |
| 海外用户对"中国红"反感 | 第一印象差 | 全局不引入红/金色（仅城市 badge 用各城市品牌色） |
| Quick View 增加复杂度 | 0.3 人天额外工作量 | Preview drawer 复用 AiAssistantModal 模式（同一 `useState` 受控模式） |
| 8 单元导致 PageShell 体积变大 | LCP 轻微下降 | Explore 用 `'use client'` + dynamic import（如不需要 SEO） |

## 与跨单元决策的对接

| 跨单元决策 | 本单元落地方式 |
|---|---|
| Decision 1（技术栈） | `'use client'` + `@tanstack/react-query` + `next/image` + `next/link` |
| Decision 2（响应式断点） | `lg:grid-cols-4 md:grid-cols-2 grid-cols-1` |
| Decision 3（错误处理） | 单 API 失败隔离；空态 + 重试；不影响其他单元 |
| Decision 4（性能预算） | LCP < 2.5s / CLS < 0.1 / Skeleton 等高 |
| Decision 5（多语言） | 仅英文；分类标签、CTA、错误消息全部英文 |
| Decision 6（主题色） | Indigo `#4F46E5` + Warm Orange `#F59E0B`（**新增全局色板**） |

## 新增全局色板（建议加入 `tailwind.config.ts`）

```typescript
// tailwind.config.ts 扩展
{
  colors: {
    brand: {
      primary: '#4F46E5',     // indigo-600, trust & professional
      accent: '#F59E0B',      // amber-500, CTA emphasis
      surface: '#F8FAFC',       // slate-50, page background
      ink: '#0F172A',         // slate-900, primary text
      muted: '#64748B',       // slate-500, secondary text
    },
  }
}
```

**Rationale**: 海外产品视觉基线（Stripe / Linear / Vercel 类似）

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `tasks.md` / `specs/homepage-explore/spec.md`