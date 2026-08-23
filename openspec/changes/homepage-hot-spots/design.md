# Design: homepage-hot-spots（HotSpots 单元内设计决策）

> **Change**: homepage-hot-spots  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-24  
> **Related**: proposal.md / tasks.md / specs/homepage-hot-spots/spec.md  
> **跨单元决策继承自**: 已归档 `wanderchina-homepage/design.md`

---

## Context

本单元与 HotPosts 模式高度相似（异步组件 + 三态 + 响应式），但数据结构与布局策略不同。聚焦浏览量格式化、卡片比例、城市 badge 颜色映射等单元内决策。

## Goals / Non-Goals

**Goals:**

- React Query 获取 Top 8 景点（按 view_count DESC）
- 桌面 4×2 / 平板 2×4 / 移动 snap-x 横滑
- 加载 / 空 / 错误三态齐全
- 浏览量格式化：`"12.5k views"` / `"4823 views"`
- 城市 badge 颜色与 `CITY_COLOR_MAP` 共享

**Non-Goals:**

- 不做景点预订 / 购票（仅展示）
- 不做用户评分 / 收藏
- 不做多语言
- 不做个性化推荐（严格按 view_count DESC）
- 不做景点详情 hover 预览

## Decisions

### Decision 1: React Query 缓存策略

**Context**: 景点数据比帖子更静态（景点不会突然爆红或消失）。

**Decision**:

- `staleTime: 10 * 60 * 1000`（10 分钟，比 HotPosts 长）
- `retry: 3`
- `refetchOnWindowFocus: false`
- queryKey: `['homepage', 'hot-spots', { limit }]`

**Rationale**: 10 分钟 staleTime 减少请求频率；景点浏览量变动慢。

### Decision 2: API 契约

**Context**: 与后端 `/api/homepage/hot-spots` 对齐。

**Decision**:

**请求**：`GET {apiBaseUrl}/api/homepage/hot-spots?limit=8`

**响应**：
```typescript
interface HotSpotsApiResponse {
  code: number;
  message: string;
  data: { items: HotSpotItem[]; generated_at: string } | null;
}

interface HotSpotItem {
  spot_id: number;
  name_en: string;
  name_zh?: string;
  cover_url: string;
  city_code: string;
  city_name_en: string;
  view_count: number;
  recommended_duration?: string;
  ticket_price?: string;
}
```

### Decision 3: 浏览量格式化

**Context**: 大数字需友好展示（避免显示 `12453 views` 显得冰冷）。

**Decision**:

```typescript
formatViewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;  // "1.2M views"
  if (count >= 10_000) return `${(count / 1_000).toFixed(1)}k`;         // "12.5k views"
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;          // "1.2k views"
  return count.toString();                                              // "4823 views"
}
```

**Rationale**:
- ≥10k 用 `k` 是惯例（YouTube / Twitter）
- ≥1M 用 `M`
- <1k 用整数（避免无意义的 `0.5k`）

### Decision 4: 卡片宽高比

**Context**: 封面图需要"显气质"的视觉比例。

**Decision**: `aspect-[3/4]`（竖版 3:4，参考小红书 / Instagram 帖子比例）

**Rationale**:
- 竖版封面更显景点纵深感（古建筑 / 山景）
- 桌面 4×2 网格整齐（不参差）

### Decision 5: 城市 badge 颜色映射

**Context**: 8 城市各有不同品牌色（与 CityQuickEntry 共享）。

**Decision**:

- `CITY_COLOR_MAP: Record<string, { bg: string; text: string }>` 位于 `config/cities.ts`
- 城市 badge：`bg-white/90 backdrop-blur` + `text-${cityColor}`
- 缺失城市 fallback：`bg-gray-100` + `text-gray-700`

**Rationale**:
- 单一数据源（与 CityQuickEntry 共享）
- 半透明白底 + backdrop-blur 让 badge 在任何封面图上都可读

### Decision 6: 与 HotPosts 的模式复用

**Context**: HotPosts 与 HotSpots 都是异步三态组件，可复用部分模式。

**Decision**:

- 复用：三态分发逻辑（Loading / Empty / Error）
- 复用：`<Link prefetch>` 跳转机制
- 复用：MSW mock 模式
- **不复用**：组件本身（数据结构、布局、视觉差异大）

**Rationale**: 模式可复用 ≠ 组件可复用。提前抽象会过度设计（premature abstraction）。

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| API 后端未上线 | 前端无法联调 | MSW mock 8 条静态景点数据 |
| 封面图 CDN 故障 | 单卡视觉降级 | onError 降级为灰色占位；warn 日志 |
| 推荐时长 / 票价字段缺失 | 单字段空白 | 模板条件渲染，不抛 React error |
| `formatViewCount` 边界 case | 数字显示错误 | 单元测试覆盖 0 / 999 / 1000 / 9999 / 10000 / 1000000 边界 |

## 与跨单元决策的对接

| 跨单元决策 | 本单元落地方式 |
|---|---|
| Decision 1（技术栈） | `'use client'` + `@tanstack/react-query` + `next/image` + `next/link` |
| Decision 2（响应式断点） | `lg:grid-cols-4` + `md:hidden flex` 横滑 |
| Decision 3（错误处理） | 自治 ErrorBoundary + Retry；不影响其他单元 |
| Decision 4（性能预算） | staleTime 10min + lazy load 封面图 |
| Decision 5（多语言） | 仅英文；view_count 格式 `"12.5k"` / `"4823"` |
| Decision 6（主题色） | 城市 badge 用 `CITY_COLOR_MAP`（继承自顶层 hex） |

---

**版本**: 1.0.0  
**最后更新**: 2026-08-24  
**关联**: `proposal.md` / `tasks.md` / `specs/homepage-hot-spots/spec.md`